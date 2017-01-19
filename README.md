# Javascript BaseX converter
Pure Javascript ES2015 base encode decoder

[![Build Status](https://travis-ci.org/thesimj/js-hexi.svg?branch=master)](https://github.com/thesimj/js-hexi)

Javascript Base64, Base16, text to bytes array converter.

## Usage

### Encoding
Encode "Hello world" to Base64 
```javascript
import JSHexi from "jshexi";
....
const unibytes = JSHexi.toBytes("Hello world (｡◕‿◕｡)");
const bytes = JSHexi.toBytes("Hello world", true);
// now bytes contains Uint8Array with bytes

JSHexi.toBase64(unibytes);
// Output: AEgAZQBsAGwAbwAgAHcAbwByAGwAZAAgACj/YSXVID8l1f9hACk=

JSHexi.toBase64(bytes);
// Output: SGVsbG8gd29ybGQ=
```
### Decoding
Encode "AEgAZQBsAGwAbwAgAHcAbwByAGwAZAAgACj/YSXVID8l1f9hACk=" / "SGVsbG8gd29ybGQ=" to String 
```javascript
import JSHexi from "jshexi";
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
