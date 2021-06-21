import { isNa, isVoid } from "./check";


/**
 * Assertion Error
 */
export class AssertionError extends Error {
    /**
     * @param message error message
     */
    constructor(message: string) {
        super(message);
    }

    /**
     * Create a new instance from template parameters
     * @param name name
     * @param actualValue actual value
     * @param message message
     * @returns AssertionError
     */
    public static fromTemplate(name: string, actualValue: any, message: string): AssertionError {
        return new AssertionError(`${name} ${message} (${actualValue})`);
    }
}


/**
 * Assert all values of object are NOT void.
 *
 * オブジェクトの全ての値がvoidでないと宣言します。
 * @param obj object
 */
export function allNotVoid(obj: {[key: string]: any}): void {
    for (const k in obj) {
        if (isVoid(obj[k])) {
            throw AssertionError.fromTemplate(k, obj[k], "is void");
        }
    }
}


/**
 * Assert all values of object are NOT N/A.
 *
 * オブジェクトの全ての値がN/Aでないと宣言します。
 * @param obj object
 */
export function allNotNa(obj: {[key: string]: any}): void {
    for (const k in obj) {
        if (isNa(obj[k])) {
            throw AssertionError.fromTemplate(k, obj[k], "is N/A");
        }
    }
}


/**
 * Assert all values of object are numeric.
 *
 * オブジェクトの全ての値が数値であると宣言します。
 * @param obj object
 */
export function allNumeric(obj: {[key: string]: any}): void {
    for (const k in obj) {
        if (typeof obj[k] !== "number") {
            throw AssertionError.fromTemplate(k, obj[k], "is not numeric");
        }
    }
}


/**
 * Assert all values of object are positive.
 *
 * オブジェクトの全ての値が正数であると宣言します。
 * @param obj object
 */
export function allPositive(obj: {[key: string]: number}): void {
    for (const k in obj) {
        if (!(0 < obj[k])) {
            throw AssertionError.fromTemplate(k, obj[k], "is not positive");
        }
    }
}


/**
 * Assert all values of object are negative.
 *
 * オブジェクトの全ての値が負数であると宣言します。
 * @param obj object
 */
export function allNotNegative(obj: {[key: string]: number}): void {
    for (const k in obj) {
        if (!(0 <= obj[k])) {
            throw AssertionError.fromTemplate(k, obj[k], "is negative");
        }
    }
}


/**
 * Assert all values of object are integers.
 *
 * オブジェクトの全ての値が整数であると宣言します。
 * @param obj object
 */
export function allInteger(obj: {[key: string]: number}): void {
    for (const k in obj) {
        if (obj[k] % 1 !== 0) {
            throw AssertionError.fromTemplate(k, obj[k], "is not integer");
        }
    }
}


/**
 * Assert all values of object are NOT empty.
 *
 * オブジェクトの全ての値が空値でないと宣言します。
 * @param obj object
 */
export function allNotEmpty(obj: {[key: string]: string | any[]}): void {
    for (const k in obj) {
        if (!(0 < obj[k]?.length)) {
            throw AssertionError.fromTemplate(k, obj[k], "is empty");
        }
    }
}
