
/**
 * 
 * @param value 
 * @param length 
 * @param padChar 
 */
export function padLeft(value: string, length: number, padChar: string=" "): string {
    if (length <= value.length) {
        return value;
    }

    return padChar.repeat(length - value.length) + value;
}


export function padRight(value: string, length: number, padChar: string=" "): string {
    if (length <= value.length) {
        return value;
    }

    return value + padChar.repeat(length - value.length);
}
