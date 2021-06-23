import { clip } from "./Number"

// first
// last

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

// split pop
