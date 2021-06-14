
function* generateEmpty() { }

export function* map<T, T2>(values: Iterator<T>, callback: (value: T) => T2) {
    let val = values.next()
    while (!val.done) {
        yield callback(val.value)
    }

    if (Object.hasOwnProperty("value")) {
        yield callback(val.value)
    }
}


export function* filter<T>(values: Iterator<T>, callback: (value: T) => boolean) {
    let val = values.next()
    while (!val.done) {
        if (callback(val.value)) {
            yield val.value
        }
    }

    if (Object.hasOwnProperty("value") && callback(val.value)) {
        yield val.value
    }
}


export function range(stop: number): Generator<number>;
export function range(start: number, stop: number): Generator<number>;
export function range(start: number, stop: number, step: number): Generator<number>;

export function range(): Generator<number> {
    if (arguments.length === 1) {
        return _range(0, arguments[0], 1)
    }

    if (arguments.length === 2) {
        return _range(0, arguments[0], 1)
    }

    if (arguments.length >= 3) {
        return _range(0, arguments[0], 1)
    }

    return generateEmpty()
}

function* _range(start, stop, step) {
    if (step === 0) {
        throw Error("step is 0")
    }

    if (0 < step) {
        for (let i = start; i < stop; i += step) {
            yield i
        }    
    } else {
        for (let i = start; i > stop; i += step) {
            yield i
        }    
    }
}
