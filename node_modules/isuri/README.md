isUri
=====
[![npm](https://img.shields.io/npm/v/isuri.svg)](https://www.npmjs.com/package/isuri)
[![Downloads](https://img.shields.io/npm/dm/isuri.svg)](https://www.npmjs.com/package/isuri)
[![Node.js Version](https://img.shields.io/node/v/isuri.svg)](https://www.npmjs.com/package/isuri)
[![Build Status](https://travis-ci.org/DavidTPate/isuri.svg?branch=master)](https://travis-ci.org/DavidTPate/isuri)
[![Coverage Status](https://coveralls.io/repos/github/DavidTPate/isuri/badge.svg?branch=master)](https://coveralls.io/github/DavidTPate/isuri?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/DavidTPate/isuri/badges/dependencies.svg)](https://www.bithound.io/github/DavidTPate/isuri/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/DavidTPate/isuri/badges/devDependencies.svg)](https://www.bithound.io/github/DavidTPate/isuri/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/DavidTPate/isuri/badges/code.svg)](https://www.bithound.io/github/DavidTPate/isuri)

Javascript implementation for truly checking if the provided input is a valid URI, Based on [RFC 3986](http://tools.ietf.org/html/rfc3986).

## Install

#### NPM
```bash
$ npm install isuri
```

## Node.js
```js
var isUri = require('isuri');

isUri.isValid('http://example.com'); // returns true
isUri.isValid('Bananas in pajamas are coming down the stairs'); // returns false
```

### isUri.isValid(value)
Checks if the value provided is a valid URI and returns true if so, returns false otherwise.

### isUri.uriRegex()
Returns the regular expression used for validating URIs.

### isUri.createUriRegex([options])
Creates a new regular expression for validating URIs which accepts the following parameters:

- `options` - optional settings:
    - `scheme` - Specifies one or more acceptable Schemes, should only include the scheme name. Can be an Array or String (strings are automatically escaped for use in a Regular Expression).
    
```js
var isUri = require('isuri');
var httpRegex = isUri.createUriRegex({ scheme: [ /https?/ ] });

httpRegex.test('http://example.com'); // returns true
httpRegex.test('https://example.com'); // returns true
httpRegex.test('ftp://example.com'); // returns false
httpRegex.test('Bananas in pajamas are coming down the stairs'); // returns false
```

## Benchmarks
``` bash
> Benchmarking complex-ipv4.js

  Testing URI "http://asdf:qw%20er@127.0.0.1:8000?asdf=12345&asda=fc%2F#bacon"

  1 test completed.

  isUri#test(uri) x 6,229,053 ops/sec ±0.83% (183 runs sampled)

> Benchmarking complex-ipv6.js

  Testing URI "http://asdf:qw%20er@[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:8000?asdf=12345&asda=fc%2F#bacon"

  1 test completed.

  isUri#test(uri) x 5,197,138 ops/sec ±0.74% (182 runs sampled)

> Benchmarking complex-ipvFuture.js

  Testing URI "http://asdf:qw%20er@[v1.09azAZ-._~!$&'()*+,;=:]:8000?asdf=12345&asda=fc%2F#bacon"

  1 test completed.

  isUri#test(uri) x 4,418,023 ops/sec ±0.63% (183 runs sampled)

> Benchmarking complex-uri.js

  Testing URI "http://asdf:qw%20er@localhost:8000?asdf=12345&asda=fc%2F#bacon"

  1 test completed.

  isUri#test(uri) x 6,113,035 ops/sec ±0.68% (184 runs sampled)

> Benchmarking simple-uri.js

  Testing URI "mailto:John.Doe@example.com"

  1 test completed.

  isUri#test(uri) x 10,444,735 ops/sec ±0.73% (183 runs sampled)
```

## License

  [MIT](LICENSE)