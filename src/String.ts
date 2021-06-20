
/**
 * Fill left-side of `value` with given `padChar` to `length`.
 *
 * `value` の左側を `padChar` で `length` の文字列長になるまで埋めます。
 * @param value text value
 * @param length target length
 * @param padChar pad character
 * @returns padded value
 */
export function padLeft(value: string, length: number, padChar: string= " "): string {
    if (length <= value.length) {
        return value;
    }

    return padChar.repeat(length - value.length) + value;
}


/**
 * Fill right-side of `value` with given `padChar` to `length`.
 *
 * `value` の右側を `padChar` で `length` の文字列長になるまで埋めます。
 * @param value text value
 * @param length target length
 * @param padChar pad character
 * @returns padded value
 */
export function padRight(value: string, length: number, padChar: string= " "): string {
    if (length <= value.length) {
        return value;
    }

    return value + padChar.repeat(length - value.length);
}
