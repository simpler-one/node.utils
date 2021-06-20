import { drop as dropIter, filter as filterIter, map as mapIter } from "./Iterator";


/**
 * Create a mapped Map. It contains mapped key-value pairs.
 *
 * 変換されたMapを生成します。Mapは変換されたキーと値のペアを持ちます。
 * @param obj source map object
 * @param mapping mapping function
 * @returns mapped map
 */
export function map<KIn, VIn, KOut, VOut>(
    obj: Map<KIn, VIn>,
    mapping: ((pair: [KIn, VIn]) => [KOut, VOut])
): Map<KOut, VOut> {
    return new Map<KOut, VOut>(
        [...mapIter(obj.entries(), mapping)]
    );
}


/**
 * Create a filtered Map. It contains only accepted key-value pairs.
 *
 * フィルタされたMapを生成します。Mapは受入条件を満たしたキーと値のペアのみを持ちます。
 * @param obj source map object
 * @param acceptance acceptance condition
 * @returns filtered map
 */
export function filter<K, V>(obj: Map<K, V>, acceptance: ((pair: [K, V]) => boolean)): Map<K, V> {
    return new Map<K, V>(
        [...filterIter(obj.entries(), acceptance)]
    );
}


/**
 * Create a filtered Map. It contains only NOT rejected key-value pairs.
 *
 * フィルタされたMapを生成します。Mapは拒否条件を満たさなかったキーと値のペアのみを持ちます。
 * @param obj source map object
 * @param rejection rejection condition
 * @returns filtered map
 */
export function drop<K, V>(obj: Map<K, V>, rejection: ((pair: [K, V]) => boolean)): Map<K, V> {
    return new Map<K, V>(
        [...dropIter(obj.entries(), rejection)]
    );
}


/**
 * Create a reverse-lookup Map.
 *
 * 新しい逆引きMapを生成します。
 * @param obj source map object
 * @param acceptance acceptance condition
 * @returns reverse-lookup map
 */
export function reverseLookup<K, V>(obj: Map<K, V>): Map<V, K> {
    return new Map<V, K>(
        [...mapIter(obj.entries(), ([k, v]) => [v, k] as [V, K])]
    );
}
