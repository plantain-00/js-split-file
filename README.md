[![Dependency Status](https://david-dm.org/plantain-00/js-split-file.svg)](https://david-dm.org/plantain-00/js-split-file)
[![devDependency Status](https://david-dm.org/plantain-00/js-split-file/dev-status.svg)](https://david-dm.org/plantain-00/js-split-file#info=devDependencies)
[![Build Status](https://travis-ci.org/plantain-00/js-split-file.svg?branch=master)](https://travis-ci.org/plantain-00/js-split-file)
[![npm version](https://badge.fury.io/js/js-split-file.svg)](https://badge.fury.io/js/js-split-file)
[![Downloads](https://img.shields.io/npm/dm/js-split-file.svg)](https://www.npmjs.com/package/js-split-file)

# split-file
A library to split big file to small binary data for nodejs and browsers.

#### install

`npm i js-split-file`

#### usage

```ts
// nodejs:
import SplitFile from "js-split-file/nodejs";

// browser(module):
import SplitFile from "js-split-file/browser";

// browser(script tag):
// <script src="js-split-file/js-split-file.min.js"></script>

const splitFile = new SplitFile();
const binary = new Uint8Array([1, 2, 3]); // for browser, from File or Blob to Uint8Array; for nodejs, from Buffer to Uint8Array
const blocks = splitFile.split(binary, "a.pdf");
const piece = splitFile.decodeBlock(blocks[0]);
```

#### options

```ts
const blocks = splitFile.split(new Uint8Array([1, 2, 3]), "a.pdf", 10000); // each piece's size <= 10000B
```

#### dependencies

+ Uint8Array, or polyfill like `core-js`
+ for browser, it need `TextEncoder` and `TextDecoder`, if the browsers don't support them, use polyfill like `text-encoding`

#### change logs

```ts
// v2
import SplitFile from "js-split-file/nodejs";
import SplitFile from "js-split-file/browser";

// v1
import { SplitFile } from "js-split-file/nodejs";
import { SplitFile } from "js-split-file/browser";
```
