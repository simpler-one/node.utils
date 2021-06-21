English | [日本語](README-jp.md)

# Node Util
[![test](https://github.com/simpler-one/node.utils/actions/workflows/test.yml/badge.svg)](https://github.com/simpler-one/node.utils/actions/workflows/test.yml)

## What?
This is a utility library for JavaScript and TypeScript.


## Quick Start
### case-1: use as simple library

```
import { clone } from "@simpler-one/Object";


const obj = {
    a: 42,
    b: "answer",
};

const obj2 = clone(obj);
console.log(obj2);
```


### case-2: use as extension library

See: [@simpler-one/node.util-extensions](TODO)

index.ts

```
import { applyDefault } from "@simpler-one/util-extensions/Object";

applyDefault();  // Extend once
```

foo-bar.ts
```
const obj = {
    a: 42,
    b: "answer",
};

const obj2 = Object.clone(obj);  // Run anywhere
console.log(obj2);
```
