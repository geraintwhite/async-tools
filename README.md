# async-tools
Useful async functions

## Installation

```sh
$ npm install async-tools
```

## Documentation
## `forEachSync(list, cb, fin)`
Calls a callback for each item in a list after one another

### Params
- **Array** `list`: An array of values to be passed into the callback
- **Function** `cb`: The callback function called with each list item
- **Function** `fin`: The callback function called at the end

## `forEach(list, cb, fin)`
Calls a callback for each item in a list at the same time

### Params
- **Array** `list`: An array of values to be passed into the callback
- **Function** `cb`: The callback function called with each list item
- **Function** `fin`: The callback function called at the end

## `whileSync(cb, fin)`
Calls a callback repeatedly until a condition is met

### Params
- **Function** `cb`: The callback function to determine the condition
- **Function** `fin`: The callback function called at the end

## `forEachFunctionSync(funcs, fin)`
Calls functions in a list after one another

### Params
- **Array** `funcs`: An array of functions to be called
- **Function** `fin`: The callback function called at the end

## `forEachFunction(funcs, fin)`
Calls functions in a list at the same time

### Params
- **Array** `funcs`: An array of functions to be called
- **Function** `fin`: The callback function called at the end

## `wait(cond, cb, dur)`
Blocks until a condition is met

### Params
- **Function** `cond`: The condition function - returns True when condition is met
- **Function** `cb`: The callback function called when the condition is met
- **number** `dur`: Duration between condition checks - default 500ms



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
