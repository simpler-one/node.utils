const READONLY = {writable: false};


/**
 * Check equality of two objects.  
 * 2つのオブジェクトが等しいか調べます。
 * @param obj1 object
 * @param obj2 object
 * @param recursive checks recursively
 * @returns equality
 */
export function equals(obj1: any, obj2: any, recursive=false) {
    if (obj1 === obj2) {
        return true
    }
    if (obj1 === null || obj2 === null || typeof obj1 !== "object" || typeof obj2 !== "object") {
        return false;
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
        if (v1 !== v2 && (!recursive || !equals(v1, v2))) {
            return false;
        }
    }

    return true;
}


/**
 * Copy values of object.  
 * オブジェクトの値をコピーします。
 * @param src source object
 * @param dst destination object
 * @param recursive copies recursively
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
 * @returns cloned object
 */
export function clone<T>(src: T, recursive: boolean=false): T {
    if (typeof src !== "object" || src === null) {
        return src;
    }

    let result: T
    if (recursive) {
        result = {} as T
        for (const k in src) {
            result[k] = clone(src[k], true)
        }
    } else {
        result = {...src};
    }

    Object.setPrototypeOf(result, Object.getPrototypeOf(src))
    return result;
}


/**
 * Set properties of object readonly.  
 * オブジェクトのプロパティを読み取り専用に設定します。
 * @param obj object
 */
export function setReadonly(obj: Object): void {
    for (const k in obj) {
        Object.defineProperty(obj, k, READONLY);
    }
}


/**
 * Create a cloned object having readonly properties.  
 * 読み取り専用の値を持つオブジェクトのクローンを生成します。
 * @param obj object
 * @param recursive clones recursively
 * @returns 
 */
export function cloneAsReadonly<T>(obj: T, recursive: boolean=false): T {
    const result = clone(obj, recursive);
    setReadonly(result);
    return result;
}
