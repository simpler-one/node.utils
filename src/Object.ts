const READONLY = {writable: false}


export function clone<T>(obj: T): T {
    if (typeof obj !== "object") {
        return obj
    }

    const result = {
        ...obj,
        constructor: obj.constructor,
    }

    Object.defineProperty(result, "constructor", {enumerable: false})
    return result
}


export function setReadonly(obj: Object): void {
    Object.keys(obj).forEach(k => {
        Object.defineProperty(obj, k, READONLY)
    })
}


export function cloneReadonly<T>(obj: T): T {
    const result = clone(obj)
    setReadonly(result)
    return result
}
