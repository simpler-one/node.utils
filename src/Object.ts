import { equalValues } from "./check";


/**
 * Get a property value.
 *
 * プロパティの値を取得します。
 * @param obj object
 * @param path path to property
 * @returns value of property
 */
export function getProperty(obj: object, path: string[]): any {
    let cur = obj;

    for (const k of path) {
        if (cur === null || cur === undefined) {
            return undefined;
        }

        cur = cur[k];
    }

    return cur;
}


/**
 * Set a property value.
 *
 * プロパティの値を設定します。
 * @param obj object
 * @param path path to property
 * @param value value
 * @returns success to set
 */
export function setProperty(obj: object, path: string[], value: any): boolean {
    if (obj === null || obj === undefined) {
        return false;
    }

    let cur = obj;
    for (const k of path.slice(0, -1)) {
        cur = cur[k];
        if (cur === null || cur === undefined) {
            return false;
        }
    }

    cur[path[path.length - 1]] = value;
    return true;
}


/**
 * Compare two objects to check them equality.
 *
 * 2つのオブジェクトが等しいか比較します。
 * @param obj1 object
 * @param obj2 object
 * @param recursive checks recursively
 * @returns equality
 */
export function equals(obj1: any, obj2: any, recursive: boolean= false) {
    if (obj1 === obj2) {
        return true;
    }
    if (obj1 === null || obj2 === null || typeof obj1 !== "object" || typeof obj2 !== "object") {
        return false;
    }

    if ((obj1 instanceof Array) !== (obj2 instanceof Array)) {
        return false;
    }

    const keyList = Object.keys(obj1);
    const keySet = new Set(Object.keys(obj2));

    if (keyList.length !== keySet.size) {
        return false;
    }

    for (const k of keyList) {
        if (!keySet.has(k)) {
            return false;
        }
    }

    if (!recursive) {
        for (const k of keyList) {
            if (!equalValues(obj1[k], obj2[k])) {
                return false;
            }
        }
    } else {
        for (const k of keyList) {
            const v1 = obj1[k];
            const v2 = obj2[k];
            if (!equalValues(v1, v2) && !equals(v1, v2)) {
                return false;
            }
        }
    }

    return true;
}


/**
 * Copy values of object.
 *
 * オブジェクトの値をコピーします。
 * @param src source object
 * @param dst destination object
 * @param recursive copies recursively
 */
export function copy(src: object, dst: object, recursive: boolean= false): void {
    if (typeof src !== "object" || typeof dst !== "object" || src === null || dst === null) {
        return;
    }

    if (!recursive) {
        /* eslint-disable-next-line guard-for-in *//* tslint:disable-next-line:forin */
        for (const k in src) {
            dst[k] = src[k];
        }
        return;
    }

    /* eslint-disable-next-line guard-for-in *//* tslint:disable-next-line:forin */
    for (const k in src) {
        const srcV = src[k];
        if (typeof srcV !== "object" || srcV === null) {
            dst[k] = srcV;
            continue;
        }

        // TODO: array
        const dstV = dst[k];
        if (typeof dstV !== "object" || dstV === null) {
            dst[k] = clone(srcV, true);
        } else {
            copy(srcV, dstV, true);
        }
    }
}


/**
 * Create a copy of object.
 *
 * オブジェクトのコピーを作成します。
 * @param src source object
 * @param recursive copies recursively
 * @returns cloned object
 */
export function clone<T>(src: T, recursive: boolean= false): T {
    if (typeof src !== "object" || src === null) {
        return src;
    }

    let result: T;
    if (recursive) {
        result = (src instanceof Array ? [] : {}) as T;
        /* eslint-disable-next-line guard-for-in *//* tslint:disable-next-line:forin */
        for (const k in src) {
            result[k] = clone(src[k], true);
        }
    } else {
        if (src instanceof Array) {
            result = [...src] as any;
        } else {
            result = {...src};
        }
    }

    Object.setPrototypeOf(result, Object.getPrototypeOf(src));
    return result;
}


/**
 * Create a new iterator. It'll return every enumerable property.
 *
 * 新しいイテレータを作成します。イテレータは全ての列挙可能なプロパティを返却します。
 * @param obj object
 * @param recursive iterate recursively
 * @param includesBranch includes branch object
 */
export function* iterEntries(
    obj: object,
    recursive: boolean= false,
    includesBranch: boolean= false
): Generator<[string[], any]> {
    if (!recursive) {
        /* eslint-disable-next-line guard-for-in *//* tslint:disable-next-line:forin */
        for (const k in obj) {
            yield [[k], obj[k]];
        }
        return;
    }

    for (const [p, v] of _entries(obj, [], includesBranch)) {
        yield [p, v];
    }
}


function* _entries(obj: object, basePath: string[], includesBranch: boolean): Generator<[string[], any]> {
    /* eslint-disable-next-line guard-for-in *//* tslint:disable-next-line:forin */
    for (const k in obj) {
        const v = obj[k];
        const curPath = [...basePath, k];
        if (typeof v !== "object" || v === null) {
            yield [curPath, v];
            continue;
        }

        if (includesBranch) {
            yield [curPath, v];
        }

        for (const [cldP, cldV] of _entries(v, curPath, includesBranch)) {
            yield [cldP, cldV];
        }
    }
}


/**
 * Create void removed object.
 *
 * void値が削除されたオブジェクトを生成します
 * @param obj object
 * @returns void removed object
 */
export function voidRemoved(obj: object): object {
    const result = {};

    /* eslint-disable-next-line guard-for-in *//* tslint:disable-next-line:forin */
    for (const k in obj) {
        const v = obj[k];
        if (v !== null && v !== undefined) {
            result[k] = v;
        }
    }

    return result;
}


/**
 * Create empty removed object.
 *
 * 空の値が削除されたオブジェクトを生成します
 * @param obj object
 * @returns empty removed object
 */
export function emptyRemoved(obj: object): object {
    const result = {};

    /* eslint-disable-next-line guard-for-in *//* tslint:disable-next-line:forin */
    for (const k in obj) {
        const v = obj[k];
        if (v !== null && v !== undefined && v.length !== 0) {
            result[k] = v;
        }
    }

    return result;
}


export function parseObjectPath(path: string): string[] {
    if (path.length === 0) {
        return [];
    }

    const result = [];
    let i = 0;

    while (path[i] === " ") {
        i++;
    }

    while (i < path.length) {
        const c = path[i];
        if (c === ".") {
            i = _parseObjectPathAfterSeparator(path, i + 1, result);
        } else if (c === "[") {
            i = _parseObjectPathAfterObject(path, i, result);
        } else {
            i = _parseObjectPathAfterSeparator(path, i, result);
        }
    }

    return result;
}


function _parseObjectPathAfterObject(path: string, start: number, result: string[]): number {
    for (let i = start; i < path.length; i++) {
        const c = path[i];
        if (c === ".") {
            return i;
        }

        if (c == "[") {
            const srt = i + 1;
            const end = path.indexOf("]", srt);
            if (end < 0) {
                result.push(path.substr(srt));
                return path.length;
            }

            result.push(path.substr(srt, end - srt));
            i = end;
        }
    }

    return path.length;
}


function _parseObjectPathAfterSeparator(path: string, start: number, result: string[]): number {
    let srt = start;
    for (let i = srt; i < path.length; i++) {
        const c = path[i];
        if (c == "[") {
            result.push(path.substr(srt, i - srt));
            return i;
        }

        if (c === ".") {
            result.push(path.substr(srt, i - srt));
            srt = i + 1;
        }
    }

    result.push(path.substr(srt));
    return path.length;
}
