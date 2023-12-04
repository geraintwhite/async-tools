# async-tools

[![NPM Version](https://img.shields.io/npm/v/async-tools.svg)](https://www.npmjs.com/package/async-tools)
[![Build Status](https://img.shields.io/travis/geraintwhite/async-tools/master.svg)](https://travis-ci.org/geraintwhite/async-tools)

Useful async functions

## Installation

```sh
$ npm install async-tools
```

## Documentation

### `forEachSync(list, cb, fin)`
Calls a callback for each item in a list after one another

#### Params
- **Array** `list`: An array of values to be passed into the callback
- **forEachSyncCallback** `cb`: The callback function called with each list item
- **Function** `fin`: The callback function called at the end

### `forEachSyncCallback(item, next, fin)`

#### Params
- **Anything** `item`: The item at the current iteration of the loop
- **Function** `next`: The callback function called to advance the loop
- **Function** `fin`: The callback function called to end the loop early

### `forEach(list, cb, fin)`
Calls a callback for each item in a list at the same time

#### Params
- **Array** `list`: An array of values to be passed into the callback
- **forEachCallback** `cb`: The callback function called with each list item
- **Function** `fin`: The callback function called at the end with error Boolean

### `forEachCallback(item, done)`

#### Params
- **Anything** `item`: The item at the current iteration of the loop
- **Function** `done`: The callback function called to end the current iteration with optional error Boolean

### `whileSync(cb, fin)`
Calls a callback repeatedly until a condition is met

#### Params
- **whileSyncCallback** `cb`: The callback function called to get the condition value
- **Function** `fin`: The callback function called at the end

### `whileSyncCallback(next)`

#### Params
- **Function** `next`: The callback function called with the condition value to advance the loop

### `forEachFunctionSync(funcs, fin)`
Calls functions in a list after one another

#### Params
- **Array** `funcs`: An array of functions (`forEachFunctionSyncCallback`) to be called
- **Function** `fin`: The callback function called at the end

### `forEachFunctionSyncCallback(next, fin)`

#### Params
- **Function** `next`: The callback function called to advance the loop
- **Function** `fin`: The callback function called to end the loop early

### `forEachFunction(funcs, fin)`
Calls functions in a list at the same time

#### Params
- **Array** `funcs`: An array of functions (`forEachFunctionCallback`) to be called
- **Function** `fin`: The callback function called at the end with error Boolean

### `forEachFunctionCallback(done)`

#### Params
- **Function** `done`: The callback function called to end the current iteration with optional error Boolean

### `wait(cond, cb, dur)`
Blocks until a condition is met

#### Params
- **Function** `cond`: The condition function - returns True when condition is met
- **Function** `cb`: The callback function called when the condition is met
- **Number** `dur`: Duration between condition checks - default 500ms

### `syncFuncLoop(func)`
Promise like interface to `forEachFunctionSync`

#### Params
- **syncFuncLoopCallback** `func`: The initial callback function to run

#### Return
- **Object** syncFuncLoop object containing the following methods:
 - `then` (syncFuncLoopCallback): Register a method to be called after `next()`
 - `finally` (Function): Register a method to be called at the end with error message parameter

### `syncFuncLoopCallback(next, fin)`

#### Params
- **Function** `next`: The callback function called to advance the loop
- **Function** `fin`: The callback function called to end the loop early with optional error message parameter

### `run(func)`
Return new instance of `syncFuncLoop`

#### Params
- **syncFuncLoopCallback** `func`: The initial callback function to run

## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License

See the [LICENSE](./LICENSE) file.
