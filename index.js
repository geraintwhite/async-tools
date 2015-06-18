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
   * @param {Function} fin The callback function called at the end
   */

  /**
   * @name forEachCallback
   * @callback
   * @param {Anything} item The item at the current iteration of the loop
   * @param {Function} done The callback function called to end the current iteration
   */

  asyncUtils.forEach = function (list, cb, fin) {
    var i = 0;
    function done () { if (++i == list.length) fin(); }
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
   * @param {Function} fin The callback function called at the end
   */

  /**
   * @name forEachFunctionCallback
   * @callback
   * @param {Function} done The callback function called to end the current iteration
   */

  asyncUtils.forEachFunction = function (funcs, fin) {
    var i = 0;
    function done () { if (++i == funcs.length) fin(); }
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


  return asyncUtils;
})();
