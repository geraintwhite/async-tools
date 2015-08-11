var test = require('tape'),
    asyncUtils = require('./');


  test('forEachSync', function(t) {

    t.test('empty list passed in', function(st) {
      asyncUtils.forEachSync([], null, function() {
        st.pass('fin should have been called');
        st.end();
      });
    });

    t.test('cb run for each item sequentially', function(st) {
      var list = [];
      var numbers = [1, 2, 3, 4, 5];
      var time = Date.now();

      asyncUtils.forEachSync(numbers,
      function(i, next) {
        st.ok(numbers.indexOf(i) > -1, i + ' is in original list');
        setTimeout(function() {
          list.push(i);
          next();
        }, 100);
      },
      function() {
        st.deepEqual(list, numbers, 'all numbers should have been added');
        st.ok(Date.now() - time > 100 * numbers.length, 'should have run synchronously');
        st.end();
      });
    });

    t.test('fin called early', function(st) {
      var list = [];
      var numbers = [1, 2, 3, 4, 5];
      var time = Date.now();

      asyncUtils.forEachSync(numbers,
      function(i, next, fin) {
        setTimeout(function() {
          list.push(i);
          if (i > 2) {
            fin(i);
          } else {
            next();
          }
        }, 100);
      },
      function(err) {
        st.deepEqual(list, numbers.filter(function(i) {
          return i < 4;
        }), 'numbers less than 4 should have been added');
        st.equal(err, 3, 'correct error parameter passed in');
        st.end();
      });
    });

  });

  test('forEach', function(t) {

    t.end();

  });

  test('whileSync', function(t) {

    t.end();

  });

  test('forEachFunctionSync', function(t) {

    t.end();

  });

  test('forEachFunction', function(t) {

    t.end();

  });

  test('wait', function(t) {

    t.end();

  });

  test('run', function(t) {

    t.end();

  });
