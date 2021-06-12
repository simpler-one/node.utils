

export function map(obj, callback) {
    return new Map(
        [...obj.entries()].map(callback)
    )
}
