var test = require('tape'),
    asyncUtils = require('./');


  test('forEachSync', function(t) {

    t.test('empty list passed in', function(st) {
      asyncUtils.forEachSync([],
      function cb() {
        st.fail('cb should not have been called');
        st.end();
      },
      function fin() {
        st.pass('fin should have been called');
        st.end();
      });
    });

    t.test('cb run for each item sequentially', function(st) {
      var list = [];
      var numbers = [1, 2, 3, 4, 5];
      var time = Date.now();

      asyncUtils.forEachSync(numbers,
      function cb(i, next) {
        st.ok(numbers.indexOf(i) > -1, i + ' is in original list');
        setTimeout(function() {
          list.push(i);
          next();
        }, 10);
      },
      function fin() {
        st.deepEqual(list, numbers, 'all numbers should have been added');
        st.ok(Date.now() - time > 10 * numbers.length, 'should have run synchronously');
        st.end();
      });
    });

    t.test('fin called early', function(st) {
      var list = [];
      var numbers = [1, 2, 3, 4, 5];

      asyncUtils.forEachSync(numbers,
      function cb(i, next, fin) {
        setTimeout(function() {
          list.push(i);
          if (i > 2) {
            fin(i);
          } else {
            next();
          }
        }, 10);
      },
      function fin(err) {
        st.deepEqual(list, numbers.filter(function(i) {
          return i < 4;
        }), 'numbers less than 4 should have been added');
        st.equal(err, 3, 'correct error parameter passed in');
        st.end();
      });
    });

  });

  test('forEach', function(t) {

    t.test('empty list passed in', function(st) {
      asyncUtils.forEach([],
      function cb() {
        st.fail('cb should not have been called');
        st.end();
      },
      function fin() {
        st.pass('fin should have been called');
        st.end();
      });
    });

    t.test('cb run for each item simultaneously', function(st) {
      var list = [];
      var numbers = [3, 1, 4, 2, 5];

      asyncUtils.forEach(numbers,
      function cb(i, done) {
        st.ok(numbers.indexOf(i) > -1, i + ' is in original list');
        setTimeout(function() {
          list.push(i);
          done();
        }, 10 * i);
      },
      function fin() {
        st.deepEqual(list, numbers.sort(), 'all numbers should have been added in the correct order');
        st.end();
      });
    });

    t.test('fin called with error', function(st) {
      var list = [];
      var numbers = [3, 1, 4, 2, 5];

      asyncUtils.forEach(numbers,
      function cb(i, done) {
        st.ok(numbers.indexOf(i) > -1, i + ' is in original list');
        setTimeout(function() {
          list.push(i);
          done(i % 2 === 0);
        }, 10 * i);
      },
      function fin(err) {
        st.deepEqual(list, numbers.sort(), 'all numbers should have been added in the correct order');
        st.equal(err, true, 'fin should be called with err argument');
        st.end();
      });
    });

  });

  test('whileSync', function(t) {

    t.test('cb called once', function(st) {
      var i = 0;

      asyncUtils.whileSync(
      function cb() {
        st.equal(++i, 1, 'cb only called once');
        st.end();
      },
      function fin() {
        st.fail('fin should not have been called');
        st.end();
      });
    });

    t.test('infinite loop', function(st) {
      var i = 1;
      var limit = 10;

      asyncUtils.whileSync(
      function cb(next) {
        st.pass('cb called ' + i + ' times');
        if (++i <= limit) {
          next(true);
        } else {
          st.end();
        }
      },
      function fin() {
        st.fail('fin should not have been called');
        st.end();
      });
    });

    t.test('loop ended after one call', function(st) {
      var i = 0;

      asyncUtils.whileSync(
      function cb(next) {
        st.equal(++i, 1, 'cb called once');
        next(false);
      },
      function fin() {
        st.equal(i, 1, 'fin should have been called after one loop');
        st.end();
      });
    });

    t.test('loop ended after n calls', function(st) {
      var i = 1;
      var limit = 10;

      asyncUtils.whileSync(
      function cb(next) {
        st.pass('cb called ' + i + ' times');
        next(++i <= limit);
      },
      function fin() {
        st.equal(i - 1, limit, 'fin should have been called after n loops');
        st.end();
      });
    });

    t.test('loop ended by external change', function(st) {
      var done = false;
      var start = Date.now();
      var duration = 100;

      setTimeout(function() { done = true; }, duration);
      asyncUtils.whileSync(
      function cb(next) {
        setTimeout(function() { next(!done); }, 1);
      },
      function fin() {
        st.ok(Date.now() - start - duration < 5, 'fin should have been called after ' + duration + ' ms');
        st.end();
      });
    });

  });

  test('forEachFunctionSync', function(t) {

    t.test('empty array passed in', function(st) {
      asyncUtils.forEachFunctionSync([],
      function fin() {
        st.pass('fin should have been called');
        st.end();
      });
    });

    t.test('each function in array called sequentially', function(st) {
      var list = [];
      var numbers = [1, 2, 3, 4, 5];
      var time = Date.now();

      function f(i) {
        return function(next) {
          st.ok(numbers.indexOf(i) > -1, i + ' is in original list');
          setTimeout(function() {
            list.push(i);
            next();
          }, 10);
        };
      }

      asyncUtils.forEachFunctionSync(
      numbers.map(function(i) {
        return f(i);
      }),
      function fin() {
        st.deepEqual(list, numbers, 'all numbers should have been added');
        st.ok(Date.now() - time > 10 * numbers.length, 'should have run synchronously');
        st.end();
      });
    });

    t.test('fin called early', function(st) {
      var list = [];
      var numbers = [1, 2, 3, 4, 5];

      function f(i) {
        return function(next, fin) {
          st.ok(numbers.indexOf(i) > -1, i + ' is in original list');
          setTimeout(function() {
            list.push(i);
            if (i > 2) {
              fin(i);
            } else {
              next();
            }
          }, 10);
        };
      }

      asyncUtils.forEachFunctionSync(
      numbers.map(function(i) {
        return f(i);
      }),
      function fin(err) {
        st.deepEqual(list, numbers.filter(function(i) {
          return i < 4;
        }), 'numbers less than 4 should have been added');
        st.equal(err, 3, 'correct error parameter passed in');
        st.end();
      });
    });

  });

  test('forEachFunction', function(t) {

    t.test('empty array passed in', function(st) {
      asyncUtils.forEachFunction([],
      function fin() {
        st.pass('fin should have been called');
        st.end();
      });
    });

    t.test('each function in array called simultaneously', function(st) {
      var list = [];
      var numbers = [3, 1, 4, 2, 5];

      function f(i) {
        return function(done) {
          st.ok(numbers.indexOf(i) > -1, i + ' is in original list');
          setTimeout(function() {
            list.push(i);
            done();
          }, 10 * i);
        };
      }

      asyncUtils.forEachFunction(
      numbers.map(function(i) {
        return f(i);
      }),
      function fin() {
        st.deepEqual(list, numbers.sort(), 'all numbers should have been added in the correct order');
        st.end();
      });
    });

    t.test('fin called with error', function(st) {
      var list = [];
      var numbers = [3, 1, 4, 2, 5];

      function f(i) {
        return function(done) {
          st.ok(numbers.indexOf(i) > -1, i + ' is in original list');
          setTimeout(function() {
            list.push(i);
            done(i % 2 === 0);
          }, 10 * i);
        };
      }

      asyncUtils.forEachFunction(
      numbers.map(function(i) {
        return f(i);
      }),
      function fin(err) {
        st.deepEqual(list, numbers.sort(), 'all numbers should have been added in the correct order');
        st.equal(err, true, 'fin should be called with err argument');
        st.end();
      });
    });

  });

  test('wait', function(t) {

    t.test('condition true immediately', function(st) {
      var start = Date.now();

      asyncUtils.wait(
      function cond() {
        st.pass('condition checked before calling cb');
        return true;
      },
      function cb() {
        st.ok(Date.now() - start < 5, 'cb called immediately');
        st.end();
      });
    });

    t.test('condition true after one check', function(st) {
      var done = false;
      var i = 0;

      setTimeout(function() { done = true; }, 0);
      asyncUtils.wait(
      function cond() {
        st.ok(++i <= 2, 'condition checked ' + i + ' times');
        return done;
      },
      function cb() {
        st.equal(done, true, 'done should now be true');
        st.end();
      });
    });

    t.test('custom duration passed in', function(st) {
      var done = false;
      var duration = 10;
      var limit = 5;
      var i = 0;

      setTimeout(function() { done = true; }, duration * limit);
      asyncUtils.wait(
      function cond() {
        st.ok(++i <= limit + 1, 'condition checked ' + i + ' times');
        return done;
      },
      function cb() {
        st.equal(i, limit + 1, 'condition should be checked ' + limit + ' times');
        st.equal(done, true, 'done should now be true');
        st.end();
      }, duration);
    });

  });

  test('run', function(t) {

    t.end();

  });
