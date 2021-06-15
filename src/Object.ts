const READONLY = {writable: false};


/**
 * Check equality of two objects
 * 2つのオブジェクトが等しいか調べます
 * @param obj1 object
 * @param obj2 object
 * @param recursive checks recursively
 * @returns equality
 */
export function equals(obj1, obj2, recursive=false) {
    if (obj1 === null || obj1 === undefined) {
        return obj1 === obj2;
    }
    if (obj2 === null || obj2 === undefined) {
        return false
    }

    const keyList = Object.keys(obj1);
    const keySet = new Set(Object.keys(obj2));

    if (keyList.length != keySet.size) {
        return false;
    }

    for (const k of keyList) {
        if (!keySet.has(k)) {
            return false;
        }
    }

    for (const k of keyList) {
        const v1 = obj1[k]
        const v2 = obj2[k]
        if (v1 === v2) {
            continue;
        }

        if (!recursive) {
            return false;
        }

        if (typeof v1 !== "object" || typeof v2 !== "object") {
            return false;
        }

        if (!equals(v1, v2)) {
            return false;
        }
    }

    return true;
}


/**
 * 
 * @param src 
 * @param dst 
 * @param recursive 
 */
export function copy(src: Object, dst: Object, recursive: boolean=false): void {
    if (typeof src !== "object" || typeof dst !== "object") {
        return;
    }

    if (!recursive) {
        for (const [k, srcV] of Object.entries(src)) {
            dst[k] = srcV;
        }
        return;
    }

    for (const [k, srcV] of Object.entries(src)) {
        if (typeof srcV !== "object" || srcV === null) {
            dst[k] = srcV;
            return;
        }

        // TODO: array
        const dstV = dst[k]
        if (typeof dstV !== "object" || dstV === null) {
            dst[k] = clone(srcV, true);
        } else {
            copy(srcV, dstV, true)
        }
    }
}


/**
 * Create a copy of object.
 * オブジェクトのコピーを作成します。
 * @param src source object
 * @param recursive copies recursively
 * @returns clone object
 */
export function clone<T>(src: T, recursive: boolean=false): T {
    if (typeof src !== "object") {
        return src;
    }

    // TODO: recursive
    const result = {
        ...src,
        constructor: src.constructor,
    };

    Object.defineProperty(result, "constructor", {enumerable: false});
    return result;
}


/**
 * TODO
 * @param obj 
 */
export function setReadonly(obj: Object): void {
    for (const k in obj) {
        Object.defineProperty(obj, k, READONLY);
    }
}


/**
 * TODO
 * @param obj 
 * @returns 
 */
export function cloneReadonly<T>(obj: T): T {
    const result = clone(obj);
    setReadonly(result);
    return result;
}
