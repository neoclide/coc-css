# rfc-3986
Javascript implementation of the ABNF from RFC-3986 to allow validation of parts of the specification.

[![npm](https://img.shields.io/npm/v/rfc-3986.svg)](https://www.npmjs.com/package/rfc-3986)
[![Downloads](https://img.shields.io/npm/dm/rfc-3986.svg)](https://www.npmjs.com/package/rfc-3986)
[![Node.js Version](https://img.shields.io/node/v/rfc-3986.svg)](https://www.npmjs.com/package/rfc-3986)
[![Build Status](https://travis-ci.org/DavidTPate/rfc-3986.svg?branch=master)](https://travis-ci.org/DavidTPate/rfc-3986)
[![Coverage Status](https://coveralls.io/repos/github/DavidTPate/rfc-3986/badge.svg?branch=master)](https://coveralls.io/github/DavidTPate/rfc-3986?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/DavidTPate/rfc-3986/badges/dependencies.svg)](https://www.bithound.io/github/DavidTPate/rfc-3986/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/DavidTPate/rfc-3986/badges/devDependencies.svg)](https://www.bithound.io/github/DavidTPate/rfc-3986/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/DavidTPate/rfc-3986/badges/code.svg)](https://www.bithound.io/github/DavidTPate/rfc-3986)

## Install

```bash
$ npm install rfc-3986
```

## API

```js
var rfc3986 = require('rfc-3986')
```

## RFC-3986
This is an object which has various properties containing regular expressions matching parts of the specification.

### rfc3968.cidr
Matches the CIDR part of an IP address, matches numbers 0-32.

### rfc3986.IPv4address
Matches an IPv4 address.

### rfc3986.IPv6address
Matches an IPv6 address.

### rfc3986.IPvFuture
Matches an IPvFuture address.

### rfc3986.IPLiteral
Matches an IPLiteral which is either an IPv4, IPv6, or IPvFuture.

### rfc3986.scheme
Matches the scheme part of the URI.

### rfc3986.hierPart
Matches the hierarchial part of the URI which identifies the authority (domain/ip address) and the path.

### rfc3986.query
Matches the query part of a URI which contains the query parameters and the `?` delimiter.

### rfc3986.fragment
Matches the fragment part of a URI which contains the hash value.

### rfc3986.uri
Matches a URI which conforms to RFC-3986.