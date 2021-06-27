/**
 * Return the absolute value.
 *
 * 絶対値を返却します。
 * @param value value
 * @returns absolute value
 */
export function abs(value: number) {
    return 0 <= value ? value : -value;
}

/**
 * Return a clipped (limited) value.
 *
 * 範囲内に制限された値を返却します。
 * @param value value
 * @param min min limit
 * @param max max limit
 * @returns clipped value
 */
export function clip(value: number, min: number, max: number): number {
    return Math.min(Math.max(min, value), max);
}
