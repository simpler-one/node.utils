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
export function copy<T>(src: T[], ...args: T[]): void {
    let srcOffset: number = 0;
    let dst: T[];
    let dstOffset: number = 0;
    let len: number = source.length;

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
}

function _copy<>(
    source: T[], sourceOffset: number, destination: T[], destinationOffset: number, length: number
): void {
    for (let i = 0; i < length; i++) {
        destination[destinationOffset + i] = source[sourceOffset + i];
    }
}


export function equals<T>(array1: T[], array2: T[]): boolean;
export function equals<T>(array1: T[], array2: T[], comparison: (v1: T, v2: T) => boolean): boolean;

export function equals<T>(array1: T[], array2: T[], comparison: (v1: T, v2: T) => boolean = undefined): boolean {

}


export function partialEquals<T>(array1: T[], array2: T[], length: number): boolean;
export function partialEquals<T>(array1: T[], offset1: number, array2: T[], offset2: number, length: number): boolean;
export function partialEquals<T>(
    array1: T[], offset1: number, array2: T[], offset2: number, length: number,
    comparison: (v1: T, v2: T) => boolean
): boolean;

export function partialEquals<T>(array1: T[], ...args: any[]): boolean {

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
