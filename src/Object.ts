/**
 * Get a property value.  
 * プロパティの値を取得します。
 * @param obj object
 * @param path path to property
 */
export function getProperty(obj: Object, path: string[]): any {
    let cur = obj

    for (const k of path) {
        if (!cur) {
            return undefined
        }

        cur = cur[k]
    }

    return cur
}


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
    if (typeof src !== "object" || typeof dst !== "object" || src === null || dst === null) {
        return;
    }

    if (!recursive) {
        for (const k in src) {
            dst[k] = src[k];
        }
        return;
    }

    for (const k in src) {
        const srcV = src[k];
        if (typeof srcV !== "object" || srcV === null) {
            dst[k] = srcV;
            continue;
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
 * Create a merged object from two objects.  
 * 2つのオブジェクトをマージしたオブジェクトを生成します。
 * @param obj1 object
 * @param obj2 object
 * @param recursive merge recursively
 * @returns merged object
 */
export function merge<T1, T2>(obj1: T1, obj2: T2, recursive: boolean=false): T1 & T2 {
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
        return;
    }

    // TODO: array
    if (!recursive) {
        return {
            ...obj1,
            ...obj2,
        };
    }

    // TODO: array
    const result: any = {...obj1};
    for (const k in obj2) {
        const v = obj2[k];

        if (v === null || v === undefined) {
            continue; // Should overwrite?
        }

        if (typeof v !== "object" || typeof result[k] !== "object" || result[k] === null) {
            result[k] = v;
            continue;
        }

        result[k] = merge(v, result[v], true)
    }

    return result;
}


export function naRemoved(obj: Object): Object {
    const result = {};

    for (const k in obj) {
        const v = obj[k];
        if (v !== null && v !== undefined) {
            result[k] = v;
        }
    }

    return result;
}
