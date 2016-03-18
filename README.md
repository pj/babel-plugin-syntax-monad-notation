# babel-plugin-syntax-monad-notation

Allow parsing of monad notation.

## Installation

```sh
$ npm install babel-plugin-syntax-monad-notation
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-monad-notation"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-monad-notation script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-monad-notation"]
});
```
