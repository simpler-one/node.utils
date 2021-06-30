import { clip } from "./Number";


/**
 * Return the item at the position of `index`.
 *
 * `index` の位置にある要素を返却します。
 * @param array array
 * @param index index
 * @returns item in array
 */
export function getValue<T>(array: T[], index: number): T {
    return array[index];
}


/**
 * Replace the item at the position of `index` with `newItem`.
 *
 * `index` の位置にある要素を `newItem` で置き換えます。
 * @param array array
 * @param index index
 * @param newItem new item
 */
export function setValue<T>(array: T[], index: number, newItem: T): void {
    array[index] = newItem;
}


/**
 * Return the item at the position of `index`.
 * Negative `index` will be mapped to position from the end.
 *
 * `index` の位置にある要素を返却します。
 * 負の `index` は末尾からの位置に変換されます。
 * @param array array
 * @param index index
 * @returns item in array
 *   index >= 0: array[index]
 *   index <  0: array[array.length - |index|]
 */
export function at<T>(array: T[], index: number): T {
    return 0 <= index ? array[index] : array[array.length + index];
}


/**
 * Replace the item at the position of `index` with `newItem`.
 * Negative `index` will be mapped to position from the end.
 *
 * `index` の位置にある要素を `newItem` に置き換えます。
 * 負の `index` は末尾からの位置に変換されます。
 * @param array array
 * @param index index
 * @param newItem new item
 */
export function setAt<T>(array: T[], index: number, newItem: T): void {
    if (0 <= index) {
        array[index] = newItem;
    } else {
        array[array.length + index] = newItem;
    }
}


/**
 * Return the item at the position of `index` from the end.
 *
 * 末尾から見て `index` の位置にある要素を返却します。
 * @param array array
 * @param index index
 * @returns item in array
 */
export function reverseAt<T>(array: T[], index: number): T {
    return array[array.length - index - 1];
}


/**
 * Replace the item at the position of `index` from end with `newItem`.
 *
 * 末尾から見て `index` の位置にある要素を `newItem` に置き換えます。
 * @param array array
 * @param index index
 * @param newItem new item
 */
export function setReverseAt<T>(array: T[], index: number, newItem: T): void {
    array[array.length - index - 1] = newItem;
}


/**
 * Return the first item of array.
 *
 * 配列の最初の値を取得します。
 * @param array array
 * @returns first item
 */
export function first<T>(array: T[]): T {
    return array[0];
}


/**
 * Replace the first value of array with `newItem`.
 *
 * 配列の最初の要素を `newItem` に置き換えます。
 * @param array array
 * @param newItem new item
 */
export function setFirst<T>(array: T[], newItem: T): void {
    array[0] = newItem;
}


/**
 * Return the last item of array.
 *
 * 配列の最後の値を取得します。
 * @param array array
 * @returns last item
 */
export function last<T>(array: T[]): T {
    return array[array.length - 1];
}


/**
 * Replace the last item of array with `newItem`.
 *
 * 配列の最後の要素を `newItem` に置き換えます。
 * @param array array
 * @param newItem new item
 */
export function setLast<T>(array: T[], newItem: T): void {
    array[array.length - 1] = newItem;
}


/**
 * Copy all items to `destination` shallowly.
 *
 * `destination` へシャローコピーします。
 * @param source source array
 * @param destination destination array
 */
export function copy<T>(source: T[], destination: T[]): void;
/**
 * Copy items to `destination` shallowly.
 *
 * `destination` へシャローコピーします。
 * @param source source array
 * @param destination destination array
 * @param length copy length
 */
export function copy<T>(source: T[], destination: T[], length: number): void;
/**
 * Copy items of `length` to `destination` shallowly.
 *
 * `destination` へ `length` 個の要素をシャローコピーします。
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
 * Copy items of `length` to `destination` with `clone`.
 *
 * `clone` 関数を用いて `destination` へ `length` 個の要素をコピーします。
 * @param source source array
 * @param sourceOffset beginning index on source array
 * @param destination destination array
 * @param destinationOffset beginning index on destination array
 * @param length copy length
 * @param clone cloning function
 */
export function copy<T>(
    source: T[], sourceOffset: number, destination: T[], destinationOffset: number, length: number,
    clone: (value: T) => T
): void;
export function copy<T>(src: T[], ...args: any[]): void {
    let srcOffset: number = 0;
    let dst: T[];
    let dstOffset: number = 0;
    let len: number = src?.length;

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
 * Test whether both arrays are equal.
 *
 * 両方の配列が等しいか調べます。
 * @param array1 array
 * @param array2 array
 * @returns equality
 */
export function equals<T>(array1: T[], array2: T[]): boolean;
/**
 * Test whether both arrays are equal by using `equal` operator.
 *
 * `equal` 演算子を用いて、両方の配列が等しいか調べます。
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
 * Test whether both partial arrays are equal.
 *
 * 両方の配列の一部が等しいか調べます。
 * @param array1 array
 * @param array2 array
 * @param length length to compare
 * @returns partial equality
 */
export function partialEquals<T>(array1: T[], array2: T[], length: number): boolean;
/**
 * Test whether both partial arrays are equal.
 *
 * 両方の配列の一部が等しいか調べます。
 * @param array1 array
 * @param offset1 beginning position of array1
 * @param array2 array
 * @param offset2 beginning position of array2
 * @param length length to compare
 * @returns partial equality
 */
export function partialEquals<T>(array1: T[], offset1: number, array2: T[], offset2: number, length: number): boolean;
/**
 * Test whether both partial arrays are equal by using `equal` operator.
 *
 * `equal` 演算子を用いて、両方の配列の一部が等しいか調べます。
 * @param array1 array
 * @param offset1 beginning position of array1
 * @param array2 array
 * @param offset2 beginning position of array2
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


/**
 * Test whether `array` starts with `prefix`.
 *
 * `array` が `prefix` で始まるかどうか調べます。
 * @param array array
 * @param prefix prefix
 * @returns test result
 */
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


/**
 * Test whether `array` ends with `suffix`.
 *
 * `array` が `suffix` で終わるかどうか調べます。
 * @param array array
 * @param suffix suffix
 * @returns test result
 */
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
 * Split `array` at the position of `length`.
 * Negative `length` will be mapped to position from the end.
 *
 * 配列を `length` の位置で分割します。
 * 負の `length` は末尾からの位置に変換されます。
 * @param array array
 * @param length not negative: length of first array. negative: length of last array
 * @returns two split arrays.
 *   - length >= 0: [length, ...]
 *   - length <  0: [..., |length|]
 */
export function spitAt<T>(array: T[], length: number): [T[], T[]] {
    let len = 0 <= length ? length : array.length + length;
    len = clip(len, 0, array.length);
    return [array.slice(0, len), array.slice(len)];
}


/**
 * Split `array` into array without the last item and the last item.
 *
 * `array` を末尾以外と末尾の要素に分割します。
 * @param array array
 * @returns [popped array, last item]
 */
export function splitLast<T>(array: T[]): [T[], T] {
    return [array.slice(0, array.length - 1), array[array.length - 1]];
}
