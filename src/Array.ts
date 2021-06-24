import { clip } from "./Number";


export function getValue<T>(array: T[], index: number): T {
    return array[index];
}


export function setValue<T>(array: T[], index: number, value: T): void {
    array[index] = value;
}


export function at<T>(array: T[], index: number): T {
    return 0 <= index ? array[index] : array[array.length + index - 1];
}


export function lastAt<T>(array: T[], index: number): T {
    return array[array.length - index - 1];
}


export function first<T>(array: T[]): T {
    return array[0];
}


export function setFirst<T>(array: T[], value: T): void {
    array[0] = value;
}


export function last<T>(array: T[]): T {
    return array[array.length - 1];
}


export function setLast<T>(array: T[], value: T): void {
    array[array.length - 1] = value;
}


export function copy<T>(source: T[], destination: T[]): void;
export function copy<T>(source: T[], destination: T[], length: number): void;
export function copy<T>(
    source: T[], sourceOffset: number, destination: T[], destinationOffset: number, length: number
): void;
export function copy<T>(src: T[], ...args: any[]): void {
    let srcOffset: number = 0;
    let dst: T[];
    let dstOffset: number = 0;
    let len: number = src.length;

    switch (args.length) {
    case 1:
        [dst] = args;
        break;
    case 2:
        [dst, len] = args;
        break;
    case 4:
        [srcOffset, dst, dstOffset, len] = args;
        break;
    default:
        throw new Error("Invalid overload arguments");
    }

    _copy(src, srcOffset, dst, dstOffset, len);
}

function _copy<T>(
    source: T[], sourceOffset: number, destination: T[], destinationOffset: number, length: number
): void {
    for (let i = 0; i < length; i++) {
        destination[destinationOffset + i] = source[sourceOffset + i];
    }
}


export function equals<T>(array1: T[], array2: T[]): boolean;
export function equals<T>(array1: T[], array2: T[], equal: (v1: T, v2: T) => boolean): boolean;

export function equals<T>(array1: T[], array2: T[], eq: (v1: T, v2: T) => boolean = undefined): boolean {
    if (array1.length !== array2.length) {
        return false;
    }

    return _partialEquals(array1, 0, array2, 0, array1.length, eq);
}


export function partialEquals<T>(array1: T[], array2: T[], length: number): boolean;
export function partialEquals<T>(array1: T[], offset1: number, array2: T[], offset2: number, length: number): boolean;
export function partialEquals<T>(
    array1: T[], offset1: number, array2: T[], offset2: number, length: number,
    equal: (v1: T, v2: T) => boolean
): boolean;

export function partialEquals<T>(array1: T[], ...args: any[]): boolean {
    let offset1: number = 0;
    let array2: T[];
    let offset2: number = 0;
    let len: number;
    let eq: (v1: T, v2: T) => boolean = undefined;

    switch (args.length) {
    case 2:
        [array2, len] = args;
        break;
    case 4:
        [offset1, array2, offset2, len] = args;
        break;
    case 5:
        [offset1, array2, offset2, len, eq] = args;
        break;
    default:
        throw new Error("Invalid overload arguments");
    }

    return _partialEquals(array1, offset1, array2, offset2, len, eq);
}
function _partialEquals<T>(
    array1: T[], offset1: number, array2: T[], offset2: number, length: number,
    eq: (v1: T, v2: T) => boolean
) {
    if (typeof eq !== "function") {
        for (let i = 0; i < length; i++) {
            if (array1[offset1 + i] !== array2[offset2 + i]) {
                return false;
            }
        }
        return true;
    }

    for (let i = 0; i < length; i++) {
        if (!eq(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}


export function startsWith<T>(array: T[], prefix: T[]): boolean {
    if (!(prefix?.length <= array?.length)) {
        return false;
    }

    for (let i = 0; i < prefix.length; i++) {
        if (array[i] !== prefix[i]) {
            return false;
        }
    }

    return true;
}


export function endsWith<T>(array: T[], suffix: T[]): boolean {
    const offset = array?.length - suffix?.length;
    if (!(0 <= offset)) {
        return false;
    }

    for (let i = 0; i < suffix.length; i++) {
        if (array[offset + i] !== suffix[i]) {
            return false;
        }
    }

    return true;
}


export function split<T>(array: T[], length: number): [T[], T[]] {
    let len = 0 <= length ? length : array.length + length;
    len = clip(len, 0, array.length);
    return [array.slice(0, len), array.slice(len)];
}


export function splitPop<T>(array: T[]): [T[], T] {
    return [array.slice(0, array.length - 1), array[array.length - 1]];
}
