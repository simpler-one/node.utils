

/**
 * Create a new Map containing mapped key-value pairs by given mapping function
 * @param obj source map object
 * @param mapping mapping function
 */
export function map<K, V, K2, V2>(obj: Map<K, V>, mapping: ((pair: [K, V]) => [K2, V2])): Map<K2, V2> {
    return new Map<K2, V2>(
        [...obj.entries()].map(mapping)
    )
}


/**
 * Create a new Map containing filtered key-value pairs by given predicate
 * @param obj source map object
 * @param predicate 
 */
 export function filter<K, V>(obj: Map<K, V>, predicate: ((pair: [K, V]) => boolean)): Map<K, V> {
    return new Map<K, V>(
        [...obj.entries()].filter(predicate)
    )
}
