import { isVoid, isNa } from "./check"


export class AssertionError extends Error {
    /**
     * @param message 
     */
    constructor(message: string) {
        super(message);
    }

    static fromTemplate(name: string, actualValue: any, message: string): AssertionError {
        return new AssertionError(`${name} ${message} (${actualValue})`)
    }
}



export function allNotVoid(obj: {[key: string]: any}): void {
    for (const k in obj) {
        if (isVoid(obj[k])) {
            throw AssertionError.fromTemplate(k, obj[k], "is void");
        }
    }
}


export function allNotNa(obj: {[key: string]: any}): void {
    for (const k in obj) {
        if (isNa(obj[k])) {
            throw AssertionError.fromTemplate(k, obj[k], "is N/A");
        }
    }
}


export function allNumeric(obj: {[key: string]: string | any[]}): void {
    for (const k in obj) {
        if (!(obj[k] instanceof Number)) {
            throw AssertionError.fromTemplate(k, obj[k], "is not numeric");
        }
    }
}


export function allPositive(obj: {[key: string]: number}): void {
    for (const k in obj) {
        if (obj[k] <= 0) {
            throw AssertionError.fromTemplate(k, obj[k], "is not positive");
        }
    }
}


export function allNotNegative(obj: {[key: string]: number}): void {
    for (const k in obj) {
        if (obj[k] < 0) {
            throw AssertionError.fromTemplate(k, obj[k], "is negative");
        }
    }
}


export function allInteger(obj: {[key: string]: number}): void {
    for (const k in obj) {
        if (obj[k] % 1 !== 0) {
            throw AssertionError.fromTemplate(k, obj[k], "is not integer");
        }
    }
}


export function allNotEmpty(obj: {[key: string]: string | any[]}): void {
    for (const k in obj) {
        if (0 < obj[k]?.length) {
            throw AssertionError.fromTemplate(k, obj[k], "is empty");
        }
    }
}
