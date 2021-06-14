

/**
 * 
 * @param obj 
 * @param callback 
 */
export function map<K, V, K2, V2>(obj: Map<K, V>, callback: ((pair: [K, V]) => [K2, V2])): Map<K2, V2> {
    return new Map<K2, V2>(
        [...obj.entries()].map(callback)
    )
}


/**
 * 
 * @param obj 
 * @param callback 
 */
 export function filter<K, V>(obj: Map<K, V>, callback: ((pair: [K, V]) => boolean)): Map<K, V> {
    return new Map<K, V>(
        [...obj.entries()].filter(callback)
    )
}
