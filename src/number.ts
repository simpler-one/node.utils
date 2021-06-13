/**
 * 
 * @param value 
 * @param min 
 * @param max 
 */
export function clip(value: number, min: number, max: number): number {
    return Math.min(Math.max(min, value), max);
}
