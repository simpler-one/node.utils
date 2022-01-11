/**
 * Split `value` at the position of `length`.
 * Negative `length` will be mapped to position from the end.
 *
 * 配列を `length` の位置で分割します。
 * 負の `length` は末尾からの位置に変換されます。
 * @param value string value
 * @param length not negative: length of first string. negative: length of last string
 * @returns two split strings.
 *   - length >= 0: [length, ...]
 *   - length <  0: [..., |length|]
 */
export function splitAt(value: string, length: number): [string, string];
/**
 * Split `value` at the position of `length`.
 * Negative `length` will be mapped to position from the end.
 *
 * 配列を `length` の位置で分割します。
 * 負の `length` は末尾からの位置に変換されます。
 * @param value string value
 * @param length not negative: length of first string. negative: length of last string
 * @returns two split strings.
 *   - length >= 0: [length, ...]
 *   - length <  0: [..., |length|]
 */
export function splitAt(value: string, length: number, gap: number): [string, string];
export function splitAt(value: string, length: number, gap: number = 0): [string, string] {
    const len = 0 <= length ? length : value.length + length;
    return [value.substring(0, len), value.substring(len + gap)];
}


/**
 * Split string into string before and string after the last `separator`.
 *
 * 最後に見つかった `separator` より前の文字列と後ろの文字列に分割します。
 * @param value string value
 * @param separator separator string
 * @param emptyText empty text
 * @returns Found: [before `separator`, after `separator`], NotFound: [`emptyText`, all]
 */
export function splitFirst(value: string, separator: string, emptyText: string = ""): [string, string] {
    const sepI = value.indexOf(separator);
    if (sepI < 0) {
        return [emptyText, value];
    }

    return [value.substring(0, sepI), value.substring(sepI + separator.length)];
}


/**
 * Split string into string before and string after the last `separator`.
 *
 * 最後に見つかった `separator` より前の文字列と後ろの文字列に分割します。
 * @param value string value
 * @param separator separator string
 * @param emptyText empty text
 * @returns Found: [before `separator`, after `separator`], NotFound: [all, `emptyText`]
 */
export function splitLast(value: string, separator: string, emptyText: string = ""): [string, string] {
    const sepI = value.lastIndexOf(separator);
    if (sepI < 0) {
        return [value, emptyText];
    }

    return [value.substring(0, sepI), value.substring(sepI + separator.length)];
}


export function isEmpty(value: string): boolean {
    return value === null || value === undefined || value.length === 0;
}


export function isBlank(value: string): boolean {
    return value === null || value === undefined || value.length === 0 || value.search(/[^ 　\t]/) > 0;
}


export function fillTemplate(template: string, args: { [key: string]: any }): string {
    if(!template || !args) {
        return template;
    }

    let result = template;
    for (const [k, v] of Object.entries(args)) {
        result = result.replaceAll(k, String(v));
    }

    return result;
}
