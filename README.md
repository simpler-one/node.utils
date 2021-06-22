English | [日本語](README-jp.md)

# Node Util
[![build](https://github.com/simpler-one/node.utils/actions/workflows/build.yml/badge.svg)](https://github.com/simpler-one/node.utils/actions/workflows/build.yml)
[![test](https://github.com/simpler-one/node.utils/actions/workflows/test.yml/badge.svg)](https://github.com/simpler-one/node.utils/actions/workflows/test.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/32115e7847ea4983b05a87839525d80c)](https://www.codacy.com/gh/simpler-one/node.utils/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=simpler-one/node.utils&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/32115e7847ea4983b05a87839525d80c)](https://www.codacy.com/gh/simpler-one/node.utils/dashboard?utm_source=github.com&utm_medium=referral&utm_content=simpler-one/node.utils&utm_campaign=Badge_Coverage)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)


## What?
This is a utility library for JavaScript and TypeScript.


## Quick Start
### case-1: use as simple library

```typescript
import { clone } from "@simpler-one/Object";


const obj = {
    a: 42,
    b: "answer",
};

const obj2 = clone(obj);
console.log(obj2); // {a: 42, b: "answer"}
```


### case-2: use as extension library

See: [@simpler-one/node.util-extensions](TODO)

index.ts

```typescript
import { applyDefault } from "@simpler-one/util-extensions/Object";

applyDefault();  // Extend once
```

foo-bar.ts
```
// No import

const obj = {
    a: 42,
    b: "answer",
};

const obj2 = Object.clone(obj);  // Run anywhere
console.log(obj2); // {a: 42, b: "answer"}
```
