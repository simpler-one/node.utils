import { clip } from "./Number";


/**
 * Get a value at index.
 *
 * 値を取得します。
 * @param array array
 * @param index index
 * @returns value
 */
export function getValue<T>(array: T[], index: number): T {
    return array[index];
}


/**
 * Set a value at index.
 *
 * 値を設定します。
 * インデックスが負数の場合は終端から数えたインデックスでします。
 * @param array array
 * @param index index
 * @param value value
 */
export function setValue<T>(array: T[], index: number, value: T): void {
    array[index] = value;
}


/**
 * Get a value at index.
 * It gets a value at index from end when index is negative.
 *
 * インデックスの値を取得します。
 * インデックスが負数の場合は終端から数えたインデックスで取得します。
 * @param array array
 * @param index index
 * @returns value
 */
export function at<T>(array: T[], index: number): T {
    return 0 <= index ? array[index] : array[array.length + index - 1];
}


/**
 * Set a value at index.
 * It sets a value at index from end when index is negative.
 *
 * インデックスの値を設定します。
 * インデックスが負数の場合は終端から数えたインデックスで設定します。
 * @param array array
 * @param index index
 * @param value value
 */
export function setAt<T>(array: T[], index: number, value: T): void {
    if (0 <= index) {
        array[index] = value;
    } else {
        array[array.length + index - 1] = value;
    }
}


/**
 * Get a value at index from end.
 *
 * 終端から数えたインデックスの値を取得します。
 * @param array array
 * @param index index
 * @returns value
 */
export function reverseAt<T>(array: T[], index: number): T {
    return array[array.length - index - 1];
}


/**
 * Set a value at index from end.
 *
 * 終端から数えたインデックスの値を設定します。
 * @param array array
 * @param index index
 * @param value value
 */
export function setReverseAt<T>(array: T[], index: number, value: T): void {
    array[array.length - index - 1] = value;
}


/**
 * Get the first value of array.
 *
 * 配列の最初の値を取得します。
 * @param array array
 * @returns last value
 */
export function first<T>(array: T[]): T {
    return array[0];
}


/**
 * Set the first value of array.
 *
 * 配列の最初の値を設定します。
 * @param array array
 * @param value value
 */
export function setFirst<T>(array: T[], value: T): void {
    array[0] = value;
}


/**
 * Get the last value of array.
 *
 * 配列の最後の値を取得します。
 * @param array array
 * @returns last value
 */
export function last<T>(array: T[]): T {
    return array[array.length - 1];
}


/**
 * Set the last value of array.
 *
 * 配列の最後の値を設定します。
 * @param array array
 * @param value value
 */
export function setLast<T>(array: T[], value: T): void {
    array[array.length - 1] = value;
}


/**
 * Copy values shallowly.
 *
 * 値をシャローコピーします。
 * @param source source array
 * @param destination destination array
 */
export function copy<T>(source: T[], destination: T[]): void;
/**
 * Copy values shallowly.
 *
 * 値をシャローコピーします。
 * @param source source array
 * @param destination destination array
 * @param length copy length
 */
export function copy<T>(source: T[], destination: T[], length: number): void;
/**
 * Copy values shallowly.
 *
 * 値をシャローコピーします。
 * @param source source array
 * @param sourceOffset beginning index on source array
 * @param destination destination array
 * @param destinationOffset beginning index on destination array
 * @param length copy length
 */
export function copy<T>(
    source: T[], sourceOffset: number, destination: T[], destinationOffset: number, length: number
): void;
/**
 * Copy values.
 *
 * 値をコピーします。
 * @param source source array
 * @param sourceOffset beginning index on source array
 * @param destination destination array
 * @param destinationOffset beginning index on destination array
 * @param length copy length
 * @param clone cloning function
 */
export function copy<T>(
    source: T[], sourceOffset: number,
    destination: T[], destinationOffset: number,
    length: number,
    clone: (value: T) => T
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
    case 5:
        let clone: (value: T) => T;
        [srcOffset, dst, dstOffset, len, clone] = args;
        _copy(src, srcOffset, dst, dstOffset, len, clone);
        return;
    default:
        throw new Error("Invalid overload arguments");
    }

    _defaultCopy(src, srcOffset, dst, dstOffset, len);
}

function _defaultCopy<T>(
    source: T[], sourceOffset: number, destination: T[], destinationOffset: number, length: number
): void {
    for (let i = 0; i < length; i++) {
        destination[destinationOffset + i] = source[sourceOffset + i];
    }
}

function _copy<T>(
    source: T[], sourceOffset: number, destination: T[], destinationOffset: number, length: number,
    clone: (value: T) => T
): void {
    for (let i = 0; i < length; i++) {
        destination[destinationOffset + i] = clone(source[sourceOffset + i]);
    }
}


/**
 * Compare two arrays to check them equality.
 *
 * 2つの配列が等しいか比較します。
 * @param array1 array
 * @param array2 array
 * @returns equality
 */
export function equals<T>(array1: T[], array2: T[]): boolean;
/**
 * Compare two arrays to check them equality.
 *
 * 2つの配列が等しいか比較します。
 * @param array1 array
 * @param array2 array
 * @param equal equality comparing function
 * @returns equality
 */
export function equals<T>(array1: T[], array2: T[], equal: (v1: T, v2: T) => boolean): boolean;
export function equals<T>(array1: T[], array2: T[], ...args: any[]): boolean {
    if (array1.length !== array2.length) {
        return false;
    }

    if (args.length === 0) {
        return _defaultPartialEquals(array1, 0, array2, 0, array1.length);
    }

    const [eq]: ((v1: T, v2: T) => boolean)[] = args;
    return _partialEquals(array1, 0, array2, 0, array1.length, eq);
}


/**
 * Compare two part of arrays to check them equality.
 *
 * 2つの配列の一部が等しいか比較します。
 * @param array1 array
 * @param array2 array
 * @param length length to compare
 * @returns partial equality
 */
export function partialEquals<T>(array1: T[], array2: T[], length: number): boolean;
/**
 * Compare two part of arrays to check them equality.
 *
 * 2つの配列の一部が等しいか比較します。
 * @param array1 array
 * @param offset1 beginning index on array1
 * @param array2 array
 * @param offset2 beginning index on array2
 * @param length length to compare
 * @returns partial equality
 */
export function partialEquals<T>(array1: T[], offset1: number, array2: T[], offset2: number, length: number): boolean;
/**
 * Compare two part of arrays to check them equality.
 *
 * 2つの配列の一部が等しいか比較します。
 * @param array1 array
 * @param offset1 beginning index on array1
 * @param array2 array
 * @param offset2 beginning index on array2
 * @param length length to compare
 * @param equal equality comparing function
 * @returns partial equality
 */
export function partialEquals<T>(
    array1: T[], offset1: number, array2: T[], offset2: number, length: number,
    equal: (v1: T, v2: T) => boolean
): boolean;

export function partialEquals<T>(array1: T[], ...args: any[]): boolean {
    let offset1: number = 0;
    let array2: T[];
    let offset2: number = 0;
    let len: number;

    switch (args.length) {
    case 2:
        [array2, len] = args;
        break;
    case 4:
        [offset1, array2, offset2, len] = args;
        break;
    case 5:
        let eq: (v1: T, v2: T) => boolean;
        [offset1, array2, offset2, len, eq] = args;
        return _partialEquals(array1, offset1, array2, offset2, len, eq);
    default:
        throw new Error("Invalid overload arguments");
    }

    return _defaultPartialEquals(array1, offset1, array2, offset2, len);
}

function _defaultPartialEquals<T>(
    array1: T[], offset1: number, array2: T[], offset2: number, length: number,
): boolean {
    for (let i = 0; i < length; i++) {
        if (array1[offset1 + i] !== array2[offset2 + i]) {
            return false;
        }
    }
    return true;
}

function _partialEquals<T>(
    array1: T[], offset1: number, array2: T[], offset2: number, length: number,
    eq: (v1: T, v2: T) => boolean
) {
    for (let i = 0; i < length; i++) {
        if (!eq(array1[offset1 + i], array2[offset2 + i])) {
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


/**
 * Split array to two arrays.
 *
 * 配列を2つに分割します。
 * @param array array
 * @param length length of first array
 * @returns split arrays
 */
export function split<T>(array: T[], length: number): [T[], T[]] {
    let len = 0 <= length ? length : array.length + length;
    len = clip(len, 0, array.length);
    return [array.slice(0, len), array.slice(len)];
}


/**
 * 
 *
 * @param array array
 * @returns [popped array, popped value]
 */
export function poppedSplit<T>(array: T[]): [T[], T] {
    return [array.slice(0, array.length - 1), array[array.length - 1]];
}
