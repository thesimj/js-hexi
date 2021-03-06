# JavaScript BaseX converter
Pure JavaScript base encode decoder

[![Build Status](https://travis-ci.org/thesimj/js-hexi.svg?branch=master)](https://travis-ci.org/thesimj/js-hexi)
[![NPM Version](https://img.shields.io/npm/v/js-hexi.svg?style=flat-square)](https://www.npmjs.com/package/js-hexi)
[![npm downloads](https://img.shields.io/npm/dm/js-hexi.svg?style=flat-square)](https://www.npmjs.org/package/js-hexi)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

Javascript Base64, Base16, text to bytes array converter.

## Usage

### Encoding
Encode "Hello world" to Base64 
```javascript
import JSHexi from "js-hexi";
....
const unibytes = JSHexi.toBytes("Hello world (｡◕‿◕｡)");
const bytes = JSHexi.toBytes("Hello world", false);
// now bytes contains Uint8Array with bytes

JSHexi.toBase64(unibytes);
// Output: AEgAZQBsAGwAbwAgAHcAbwByAGwAZAAgACj/YSXVID8l1f9hACk=

JSHexi.toBase64(bytes);
// Output: SGVsbG8gd29ybGQ=
```
### Decoding
Encode "AEgAZQBsAGwAbwAgAHcAbwByAGwAZAAgACj/YSXVID8l1f9hACk=" / "SGVsbG8gd29ybGQ=" to String 
```javascript
import JSHexi from "js-hexi";
....
const bytes = JSHexi.fromBase64("AEgAZQBsAGwAbwAgAHcAbwByAGwAZAAgACj/YSXVID8l1f9hACk=");
const unibytes = JSHexi.fromBase64("SGVsbG8gd29ybGQ=", false);
// now bytes contains Uint8Array with bytes

JSHexi.fromBytes(unibytes);
// Output: Hello world (｡◕‿◕｡)

JSHexi.fromBytes(bytes);
// Output: Hello world
```

### More examples
You can see in test folders
