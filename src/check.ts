/**
 * Check whether the given value is NaN.
 *
 * 値がNaNであるかどうか調べます。
 * @param value value
 * @returns true: NaN
 */
export function isNan(value: any): boolean {
    return value !== value;
}


/**
 * Check whether the given value is NOT NaN.
 *
 * 値がNaNでないかどうか調べます。
 * @param value value
 * @returns true: !NaN
 */
export function notNan(value: any): boolean {
    return value === value;
}


/**
 * Check whether the given value is void (null/undefined).
 *
 * 値がvoid値(null/undefined)であるかどうか調べます。
 * @param value value
 * @returns true: void(null/undefined)
 */
export function isVoid(value: any): boolean {
    return value === undefined || value === null;
}


/**
 * Check whether the given value is NOT void (null/undefined).
 *
 * 値がvoid値(null/undefined)でないかどうか調べます。
 * @param value value
 * @returns true: !void(null/undefined)
 */
export function notVoid(value: any): boolean {
    return value !== undefined && value !== null;
}


/**
 * Check whether the given value is N/A (void/NaN).
 *
 * 値がN/A値(void/NaN)であるかどうか調べます。
 * @param value value
 * @returns true: N/A(null/undefined/NaN)
 */
export function isNa(value: any): boolean {
    return value === undefined || value === null || value !== value;
}


/**
 * Check whether the given value is NOT N/A (void/NaN).
 *
 * 値がN/A値(void/NaN)でないかどうか調べます。
 * @param value value
 * @returns true: !N/A(null/undefined/NaN)
 */
export function notNa(value: any): boolean {
    return value !== undefined && value !== null && value === value;
}


/**
 * Check whether the given value is structured.
 *
 * 値が構造的であるかどうか調べます。
 * @param value value
 * @returns false: number/boolean/symbol/string/function/undefined/null, true: else
 */
export function isStructured(value: any): boolean {
    return typeof value === "object" && value !== null;
}


/**
 * Check whether the given value is NOT structured.
 *
 * 値が構造的でないかどうか調べます。
 * @param value value
 * @returns true: number/boolean/symbol/string/function/undefined/null, false: else
 */
export function notStructured(value: any): boolean {
    return typeof value !== "object" || value === null;
}


/**
 * Check whether two values are equal values. This function determines both NaN as equal.
 *
 * 2つの値が等しいか調べます。この関数は双方のNaN値を等価とみなします。
 * @param value1 value
 * @param value2 value
 * @returns equality of two values
 */
export function equalValues(value1: any, value2: any): boolean {
    return value1 === value2 || (value1 !== value1 && value2 !== value2);
}
