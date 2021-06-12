import {applyExtensions} from "./common"

export function extendString() {
    applyExtensions(String.prototype, {
        padLeft,
        padRight,
    });
}

export function padLeft(value, length, padChar=" ") {
    if (length <= value.length) {
        return value;
    }

    return padChar.repeat(length - value.length) + value;
}


export function padRight(value, length, padChar=" ") {
    if (length <= value.length) {
        return value;
    }

    return value + padChar.repeat(length - value.length);
}
