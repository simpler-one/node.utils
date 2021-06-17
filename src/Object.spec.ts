import {clone, copy, equals, getProperty, merge, naRemoved} from "./Object"

const OBJ = Object.freeze({
    a: 123,
    b: {c: "abc"},
});


describe("String", () => {
    describe("clone()", () => {
        it("should return shallow copy", () => {
            // Given
            const obj = OBJ;
            // When
            const result = clone(obj, false);
            // Then
            expect(result).toEqual(obj);
            expect(result.b).toBe(obj.b);
        });

        it("should return deep copy", () => {
            // Given
            const obj = OBJ;
            // When
            const result = clone(obj, true);
            // Then
            expect(result).toEqual(obj);
            expect(result.b).not.toBe(obj.b);
        });
    });


    describe("copy()", () => {
        it("should set shallow copied values", () => {
            // Given
            const obj = OBJ;
            const result = {}
            // When
            copy(obj, result, false);
            // Then
            expect(result).toEqual(obj);
            expect(result["b"]).toBe(obj.b);
        });

        it("should set deep copied values", () => {
            // Given
            const obj = OBJ;
            const result = {}
            // When
            copy(obj, result, true);
            // Then
            expect(result).toEqual(obj);
            expect(result["b"]).not.toBe(obj.b);
        });

        it("should leave not copied properties (shallow)", () => {
            // Given
            const obj = OBJ;
            const result = {
                d: 999,
            }
            // When
            copy(obj, result, false);
            // Then
            expect(result.d).toEqual(999);
        });

        it("should leave not copied properties (deep)", () => {
            // Given
            const obj = OBJ;
            const result = {
                d: 999,
            }
            // When
            copy(obj, result, true);
            // Then
            expect(result.d).toEqual(999);
        });
    });
});
