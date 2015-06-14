module.exports = (function () {
  var asyncUtils = {};

  asyncUtils.forEachSync = function (list, cb, fin) {
    var i = -1;
    (function next () {
      if (++i == list.length) fin();
      else cb(list[i], next, fin);
    })();
  };

  asyncUtils.forEach = function (list, cb, fin) {
    var i = 0;
    function done () { if (++i == list.length) fin(); }
    list.forEach(function (item) { cb(item, done); });
  };

  asyncUtils.whileSync = function (cb, fin) {
    (function next (cond) {
      if (cond) cb(next);
      else fin();
    })(true);
  };

  asyncUtils.forEachFunctionSync = function (funcs, fin) {
    var i = -1;
    (function next () {
      if (++i == funcs.length) fin();
      else funcs[i](next, fin);
    })();
  };

  asyncUtils.forEachFunction = function (funcs, fin) {
    var i = 0;
    function done () { if (++i == funcs.length) fin(); }
    funcs.forEach(function (func) { func(done); });
  };

  asyncUtils.wait = function (cond, cb, dur) {
    if (!dur) dur = 500;
    (function check () {
      if (cond()) cb();
      else setTimeout(function () { check(); }, dur);
    })();
  };

  return asyncUtils;
})();
