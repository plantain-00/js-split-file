# js-split-file

[![Dependency Status](https://david-dm.org/plantain-00/js-split-file.svg)](https://david-dm.org/plantain-00/js-split-file)
[![devDependency Status](https://david-dm.org/plantain-00/js-split-file/dev-status.svg)](https://david-dm.org/plantain-00/js-split-file#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/js-split-file.svg?branch=master)](https://travis-ci.org/plantain-00/js-split-file)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/js-split-file?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/js-split-file/branch/master)
![Github CI](https://github.com/plantain-00/js-split-file/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/js-split-file.svg)](https://badge.fury.io/js/js-split-file)
[![Downloads](https://img.shields.io/npm/dm/js-split-file.svg)](https://www.npmjs.com/package/js-split-file)
[![gzip size](https://img.badgesize.io/https://unpkg.com/js-split-file?compression=gzip)](https://unpkg.com/js-split-file)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fjs-split-file%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/js-split-file)

A library to split big file to small binary data for nodejs and browsers.

## install

`npm i js-split-file`

## usage

```ts
import SplitFile from "js-split-file";
// <script src="js-split-file/js-split-file.min.js"></script>

// react-native:
import SplitFile from "js-split-file/react-native";

const splitFile = new SplitFile();
const binary = new Uint8Array([1, 2, 3]); // for browser, from File or Blob to Uint8Array; for nodejs, from Buffer to Uint8Array
const blocks = splitFile.split(binary, "a.pdf");
const piece = splitFile.decodeBlock(blocks[0]);
```

## options

```ts
const blocks = splitFile.split(new Uint8Array([1, 2, 3]), "a.pdf", 10000); // each piece's size <= 10000B
```

## dependencies

+ Uint8Array, or polyfill like `core-js`
+ for browser, it need `TextEncoder` and `TextDecoder`, if the browsers don't support them, use polyfill like `text-encoding`

## change logs

```ts
// v2
import SplitFile from "js-split-file/nodejs";
import SplitFile from "js-split-file/browser";

// v1
import { SplitFile } from "js-split-file/nodejs";
import { SplitFile } from "js-split-file/browser";
```
