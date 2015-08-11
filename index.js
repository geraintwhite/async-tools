module.exports = (function () {
  var asyncUtils = {};


  /**
   * Calls a callback for each item in a list after one another
   * @name forEachSync
   * @function
   * @param {Array} list An array of values to be passed into the callback
   * @param {forEachSyncCallback} cb The callback function called with each list item
   * @param {Function} fin The callback function called at the end
   */

  /**
   * @name forEachSyncCallback
   * @callback
   * @param {Anything} item The item at the current iteration of the loop
   * @param {Function} next The callback function called to advance the loop
   * @param {Function} fin The callback function called to end the loop early
   */

  asyncUtils.forEachSync = function (list, cb, fin) {
    var i = -1;
    (function next () {
      if (++i == list.length) fin();
      else cb(list[i], next, fin);
    })();
  };


  /**
   * Calls a callback for each item in a list at the same time
   * @name forEach
   * @function
   * @param {Array} list An array of values to be passed into the callback
   * @param {forEachCallback} cb The callback function called with each list item
   * @param {Function} fin The callback function called at the end with error Boolean
   */

  /**
   * @name forEachCallback
   * @callback
   * @param {Anything} item The item at the current iteration of the loop
   * @param {Function} done The callback function called to end the current iteration with optional error Boolean
   */

  asyncUtils.forEach = function (list, cb, fin) {
    var i = 0, error = false;
    function done (err) {
      error = err || error;
      if (++i == list.length) fin(error);
    }
    list.forEach(function (item) { cb(item, done); });
  };


  /**
   * Calls a callback repeatedly until a condition is met
   * @name whileSync
   * @function
   * @param {whileSyncCallback} cb The callback function called to get the condition value
   * @param {Function} fin The callback function called at the end
   */

  /**
   * @name whileSyncCallback
   * @callback
   * @param {Function} next The callback function called with the condition value to advance the loop
   */

  asyncUtils.whileSync = function (cb, fin) {
    (function next (cond) {
      if (cond) cb(next);
      else fin();
    })(true);
  };


  /**
   * Calls functions in a list after one another
   * @name forEachFunctionSync
   * @function
   * @param {Array} funcs An array of functions (`forEachFunctionSyncCallback`) to be called
   * @param {Function} fin The callback function called at the end
   */

  /**
   * @name forEachFunctionSyncCallback
   * @callback
   * @param {Function} next The callback function called to advance the loop
   * @param {Function} fin The callback function called to end the loop early
   */

  asyncUtils.forEachFunctionSync = function (funcs, fin) {
    var i = -1;
    (function next () {
      if (++i == funcs.length) fin();
      else funcs[i](next, fin);
    })();
  };


  /**
   * Calls functions in a list at the same time
   * @name forEachFunction
   * @function
   * @param {Array} funcs An array of functions (`forEachFunctionCallback`) to be called
   * @param {Function} fin The callback function called at the end with error Boolean
   */

  /**
   * @name forEachFunctionCallback
   * @callback
   * @param {Function} done The callback function called to end the current iteration with optional error Boolean
   */

  asyncUtils.forEachFunction = function (funcs, fin) {
    var i = 0, error = false;
    function done (err) {
      error = err || error;
      if (++i == funcs.length) fin(error);
    }
    funcs.forEach(function (func) { func(done); });
  };


  /**
   * Blocks until a condition is met
   * @name wait
   * @function
   * @param {Function} cond The condition function - returns True when condition is met
   * @param {Function} cb The callback function called when the condition is met
   * @param {Number} dur Duration between condition checks - default 500ms
   */

  asyncUtils.wait = function (cond, cb, dur) {
    if (!dur) dur = 500;
    (function check () {
      if (cond()) cb();
      else setTimeout(function () { check(); }, dur);
    })();
  };


  /**
   * Promise like interface to `forEachFunctionSync`
   * @name syncFuncLoop
   * @function
   * @param {syncFuncLoopCallback} func The initial callback function to run
   * @return {Object} syncFuncLoop object containing the following methods:
   *
   *  - `then` (syncFuncLoopCallback): Register a method to be called after `next()`
   *  - `finally` (Function): Register a method to be called at the end with error message parameter
   */

  /**
   * @name syncFuncLoopCallback
   * @callback
   * @param {Function} next The callback function called to advance the loop
   * @param {Function} fin The callback function called to end the loop early with optional error message parameter
   */

  function syncFuncLoop (func) {
    var funcs = [func], fin;

    this.then = function (func) {
      funcs.push(func);
      return this;
    };

    this.finally = function (func) {
      fin = func;
      next();
    };

    function next() {
      if (funcs.length) funcs.shift()(next, fin);
      else if (typeof fin === 'function') fin();
    }
  }


  /**
   * Return new instance of `syncFuncLoop`
   * @name run
   * @function
   * @param {syncFuncLoopCallback} func The initial callback function to run
   */

  asyncUtils.run = function (func) {
    return new syncFuncLoop(func);
  };


  return asyncUtils;
})();
