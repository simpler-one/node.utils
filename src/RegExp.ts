export function escape(value: string) {
    return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
