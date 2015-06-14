module.exports = (function () {
  var asyncUtils = {};

  /**
   * Calls a callback for each item in a list after one another
   * @name forEachSync
   * @function
   * @param {Array} list An array of values to be passed into the callback
   * @param {Function} cb The callback function called with each list item
   * @param {Function} fin The callback function called at the end
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
   * @param {Function} cb The callback function called with each list item
   * @param {Function} fin The callback function called at the end
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
   * @param {Function} cb The callback function to determine the condition
   * @param {Function} fin The callback function called at the end
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
   * @param {Array} funcs An array of functions to be called
   * @param {Function} fin The callback function called at the end
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
   * @param {Array} funcs An array of functions to be called
   * @param {Function} fin The callback function called at the end
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
   * @param {number} dur Duration between condition checks - default 500ms
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
