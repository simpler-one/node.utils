import {
    isNan, notNan,
    isVoid, notVoid,
    isNa, notNa,
    isStructured, notStructured,
    equalValues,
} from "./check"


describe("check", ()=> {
    describe("isNan()", () => {
        it("should return true", () => {
            // Given
            const value = Number.NaN;
            // When
            const result = isNan(value);
            // Then
            expect(result).toEqual(true);
        });

        it("should return false", () => {
            // Given
            const value = 0;
            // When
            const result = isNan(value);
            // Then
            expect(result).toEqual(false);
        });
    });


    describe("notNan()", () => {
        it("should return true", () => {
            // Given
            const value = 0;
            // When
            const result = notNan(value);
            // Then
            expect(result).toEqual(true);
        });

        it("should return false", () => {
            // Given
            const value = Number.NaN;
            // When
            const result = notNan(value);
            // Then
            expect(result).toEqual(false);
        });
    });


    describe("isVoid()", () => {
        it("should return true", () => {
            // Given
            const values = [null, undefined];
            for (const v of values) {
                // When
                const result = isVoid(v);
                // Then
                expect(result).toEqual(true);
            }
        });

        it("should return false", () => {
            // Given
            const values = [
                Number.NaN,
                0,
                false,
                [],
                "",
            ];
            for (const v of values) {
                // When
                const result = isVoid(v);
                // Then
                expect(result).toEqual(false);
            }
        });
    });


    describe("notVoid()", () => {
        it("should return true", () => {
            // Given
            const values = [
                Number.NaN,
                0,
                false,
                [],
                "",
            ];
            for (const v of values) {
                // When
                const result = notVoid(v);
                // Then
                expect(result).toEqual(true);
            }
        });

        it("should return false", () => {
            // Given
            const values = [null, undefined];
            for (const v of values) {
                // When
                const result = notVoid(v);
                // Then
                expect(result).toEqual(false);
            }
        });
    });


    describe("isNa()", () => {
        it("should return true", () => {
            // Given
            const values = [null, undefined, Number.NaN];
            for (const v of values) {
                // When
                const result = isNa(v);
                // Then
                expect(result).toEqual(true);
            }
        });

        it("should return false", () => {
            // Given
            const values = [
                0,
                false,
                [],
                "",
            ];
            for (const v of values) {
                // When
                const result = isNa(v);
                // Then
                expect(result).toEqual(false);
            }
        });
    });


    describe("notNa()", () => {
        it("should return true", () => {
            // Given
            const values = [
                0,
                false,
                [],
                "",
            ];
            for (const v of values) {
                // When
                const result = notNa(v);
                // Then
                expect(result).toEqual(true);
            }
        });

        it("should return false", () => {
            // Given
            const values = [null, undefined, Number.NaN];
            for (const v of values) {
                // When
                const result = notNa(v);
                // Then
                expect(result).toEqual(false);
            }
        });
    });


    describe("isStructured()", () => {
        it("should return true", () => {
            // Given
            const values = [{}, []];
            for (const v of values) {
                // When
                const result = isStructured(v);
                // Then
                expect(result).toEqual(true);
            }
        });

        it("should return false", () => {
            // Given
            const values = [0, "", true, Symbol.iterator, () => void 0, null, undefined];
            for (const v of values) {
                // When
                const result = isStructured(v);
                // Then
                expect(result).toEqual(false);
            }
        });
    });


    describe("notStructured()", () => {
        it("should return true", () => {
            // Given
            const values = [0, "", true, Symbol.iterator, () => void 0, null, undefined];
            for (const v of values) {
                // When
                const result = notStructured(v);
                // Then
                expect(result).toEqual(true);
            }
        });

        it("should return false", () => {
            // Given
            const values = [{}, []];
            for (const v of values) {
                // When
                const result = notStructured(v);
                // Then
                expect(result).toEqual(false);
            }
        });
    });


    describe("equalValues()", () => {
        it("should return true when equal values given", () => {
            // Given
            const value1 = 42;
            const value2 = 42;
            // When
            const result = equalValues(value1, value2);
            // Then
            expect(result).toEqual(true);
        });

        it("should return true when NaN given", () => {
            // Given
            const value1 = Number.NaN;
            const value2 = Number.NaN;
            // When
            const result = equalValues(value1, value2);
            // Then
            expect(result).toEqual(true);
        });

        it("should return true when different values given", () => {
            // Given
            const value1 = null;
            const value2 = undefined;
            // When
            const result = equalValues(value1, value2);
            // Then
            expect(result).toEqual(false);
        });
    });
});
