export function bindThis(func) {
    func(this, ...arguments)
}

export applyExtensions(prototype, funcs) {
    Object.entries(funcs).forEach(([k, fn]) => {
        prototype.k = bindThis(fn)
    })
}
