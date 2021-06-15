import {map as mapIter, filter as filterIter, drop as dropIter} from "./Iterator"


/**
 * Create a new Map. It contains mapped key-value pairs  
 * 新しいMapを生成します。Mapは変換されたキーと値のペアを持ちます
 * @param obj source map object
 * @param mapping mapping function
 */
export function map<KIn, VIn, KOut, VOut>(obj: Map<KIn, VIn>, mapping: ((pair: [KIn, VIn]) => [KOut, VOut])): Map<KOut, VOut> {
    return new Map<KOut, VOut>(
        [...mapIter(obj.entries(), mapping)]
    )
}


/**
 * Create a new Map. It contains only accepted key-value pairs  
 * 新しいMapを生成します。Mapは受入条件を満たしたキーと値のペアのみを持ちます
 * @param obj source map object
 * @param acceptance acceptance condition
 */
export function filter<K, V>(obj: Map<K, V>, acceptance: ((pair: [K, V]) => boolean)): Map<K, V> {
    return new Map<K, V>(
        [...filterIter(obj.entries(), acceptance)]
    )
}


/**
 * Create a new Map. It contains only NOT rejected key-value pairs  
 * 新しいMapを生成します。Mapは拒否条件を満たさなかったキーと値のペアのみを持ちます
 * @param obj source map object
 * @param rejection rejection condition
 */
export function drop<K, V>(obj: Map<K, V>, rejection: ((pair: [K, V]) => boolean)): Map<K, V> {
    return new Map<K, V>(
        [...dropIter(obj.entries(), rejection)]
    )
}
