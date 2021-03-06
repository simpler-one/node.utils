function* generateEmpty() { /* NOP */ }


/**
 * Creates a wrapping iterator. It'll return a mapped value each iteration
 *
 * ラッパーイテレータを生成します。イテレータはイテレーション毎に、変換された値を返却します
 * @param iterator source iterator. this iterator will be consumed
 * @param mapping mapping function
 */
export function* map<TIn, TOut>(iterator: Iterator<TIn>, mapping: (value: TIn) => TOut): Generator<TOut> {
    let cur = iterator.next();
    while (!cur.done) {
        yield mapping(cur.value);
        cur = iterator.next();
    }

    if (cur.value !== undefined) {
        yield mapping(cur.value);
    }
}


/**
 * Create a wrapping iterator. It'll return a only accepted value each iteration
 *
 * ラッパーイテレータを生成します。イテレータはイテレーション毎に、受入条件を満たした値のみを返却します
 * @param iterator source iterator. this iterator will be consumed
 * @param acceptance acceptance condition
 */
export function* filter<T>(iterator: Iterator<T>, acceptance: (value: T) => boolean): Generator<T> {
    let cur = iterator.next();
    while (!cur.done) {
        if (acceptance(cur.value)) {
            yield cur.value;
        }
        cur = iterator.next();
    }

    if (cur.value !== undefined && acceptance(cur.value)) {
        yield cur.value;
    }
}


/**
 * Create a wrapping iterator. It'll return a only NOT rejected value each iteration
 *
 * ラッパーイテレータを生成します。イテレータはイテレーション毎に、拒否条件を満たさなかった値のみを返却します
 * @param iterator source iterator. this iterator will be consumed
 * @param rejection rejection condition
 * @returns filtered iterator
 */
export function drop<T>(iterator: Iterator<T>, rejection: (value: T) => boolean): Generator<T> {
    return filter(iterator, (value) => !rejection(value));
}


/**
 * Create a wrapping iterator. It'll return an array that aggregates values from every iterable each iteration
 *
 * ラッパーイテレータを生成します。イテレータはイテレーション毎に、各イテラブルの値を1つずつ集めた配列を返却します
 * @param obj1 iterable object
 * @param obj2 iterable object
 * @returns aggregating iterator
 */
export function zip<T1, T2>(obj1: Iterable<T1>, obj2: Iterable<T2>): Generator<[T1, T2]>;
/**
 * Create a wrapping iterator. It'll return an array that aggregates values from every iterable each iteration
 *
 * ラッパーイテレータを生成します。イテレータはイテレーション毎に、各イテラブルの値を1つずつ集めた配列を返却します
 * @param obj1 iterable object
 * @param obj2 iterable object
 * @param obj3 iterable object
 * @returns aggregating iterator
 */
export function zip<T1, T2, T3>(obj1: Iterable<T1>, obj2: Iterable<T2>, obj3: Iterable<T3>): Generator<[T1, T2, T3]>;
/**
 * Create a wrapping iterator. It'll return an array that aggregates values from every iterable each iteration
 *
 * ラッパーイテレータを生成します。イテレータはイテレーション毎に、各イテラブルの値を1つずつ集めた配列を返却します
 * @param objects iterable objects
 * @returns aggregating iterator
 */
export function zip(...objects: Iterable<any>[]): Generator<any[]>;
export function* zip(...objects: Iterable<any>[]): Generator<any[]> {
    if (objects.length === 0) {
        return;
    }

    const iters = objects.map(obj => obj[Symbol.iterator]());

    let curs = iters.map(iter => iter.next());
    while (curs.every(cur => !cur.done)) {
        yield curs.map(cur => cur.value);
        curs = iters.map(iter => iter.next());
    }

    if (curs.every(cur => cur.value !== undefined)) {
        yield curs.map(cur => cur.value);
    }
}


/**
 * Create a new iterator.
 * It'll return values increasing by `1` each iteration from `0` to `stop` [0 <= value < stop]
 *
 * 新しいイテレータを生成します。
 * イテレータはイテレーション毎に、 `0` から `stop` まで `1` ずつ増加する値を返却します [0 <= value < stop]
 * @param stop stop value. This value will not be included
 * @returns counting iterator
 */
export function range(stop: number): Generator<number>;
/**
 * Create a new iterator.
 * It'll return values increasing by `1` each iteration from `start` to `stop` [start <= value < stop]
 *
 * 新しいイテレータを生成します。
 * イテレータはイテレーション毎に、 `start` から `stop` まで `1` ずつ増加する値を返却します [start <= value < stop]
 * @param start start value
 * @param stop stop value. This value will not be included
 * @returns counting iterator
 */
export function range(start: number, stop: number): Generator<number>;
/**
 * Create a new iterator.
 * It'll return values increasing by `increment` each iteration from `start` to `stop` [start <= value < stop]
 *
 * 新しいイテレータを生成します。
 * イテレータはイテレーション毎に、 `start` から `stop` まで `increment` ずつ増加する値を返却します [start <= value < stop]
 * @param start start value
 * @param stop stop value. This value will not be included
 * @param increment increment value
 * @returns counting iterator
 */
export function range(start: number, stop: number, increment: number): Generator<number>;
export function range(...args: number[]): Generator<number> {
    if (args.length === 1) {
        return _range(0, args[0], 1);
    }

    if (args.length === 2) {
        return _range(args[0], args[1], 1);
    }

    if (args.length >= 3) {
        return _range(args[0], args[1], args[2]);
    }

    return generateEmpty();
}

function* _range(start: number, stop: number, increment: number) {
    if (increment === 0) {
        throw Error("increment is 0");
    }

    if (0 < increment) {
        for (let i = start; i < stop; i += increment) {
            yield i;
        }
    } else {
        for (let i = start; i > stop; i += increment) {
            yield i;
        }
    }
}
