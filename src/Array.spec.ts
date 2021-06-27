import {
    at, setAt, first, last, getValue, setValue, reverseAt, setReverseAt, setFirst, setLast,
    copy,
} from "./Array";


describe("Array", () => {
    describe("getValue()", () => {
        it("should return a value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 1;
            // When
            const result = getValue(array, index);
            // Then
            expect(result).toEqual(2);
        });

        it("should return undefined", () => {
            // Given
            const array = [1, 2, 3];
            const index = 9;
            // When
            const result = getValue(array, index);
            // Then
            expect(result).toEqual(undefined);
        });
    });


    describe("setValue()", () => {
        it("should set a value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 1;
            const value = 100;
            // When
            setValue(array, index, value);
            // Then
            expect(array).toEqual([1, value, 3]);
        });

        it("should expand array and set a value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 9;
            const value = 100;
            // When
            setValue(array, index, value);
            // Then
            expect(array).toEqual([1, 2, 3, undefined, undefined, undefined, undefined, undefined, undefined, value]);
        });
    });


    describe("reverseAt()", () => {
        it("should return the last value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 0;
            // When
            const result = reverseAt(array, index);
            // Then
            expect(result).toEqual(3);
        });

        it("should return the second last value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 1;
            // When
            const result = reverseAt(array, index);
            // Then
            expect(result).toEqual(2);
        });
    });


    describe("setReverseAt()", () => {
        it("should set the last value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 0;
            const value = 100;
            // When
            setReverseAt(array, index, value);
            // Then
            expect(array).toEqual([1, 2, value]);
        });

        it("should expand array and set a value", () => {
            // Given
            const array = [1, 2, 3];
            const index = -1;
            const value = 100;
            // When
            setReverseAt(array, index, value);
            // Then
            expect(array).toEqual([1, 2, 3, value]);
        });
    });


    describe("at()", () => {
        it("should return a value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 1;
            // When
            const result = at(array, index);
            // Then
            expect(result).toEqual(2);
        });

        it("should return the last value", () => {
            // Given
            const array = [1, 2, 3];
            const index = -1;
            // When
            const result = at(array, index);
            // Then
            expect(result).toEqual(3);
        });

        it("should return undefined", () => {
            // Given
            const array = [1, 2, 3];
            const index = 9;
            // When
            const result = at(array, index);
            // Then
            expect(result).toEqual(undefined);
        });
    });


    describe("setAt()", () => {
        it("should set a value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 1;
            const value = 100;
            // When
            setAt(array, index, value);
            // Then
            expect(array).toEqual([1, value, 3]);
        });

        it("should set the last value", () => {
            // Given
            const array = [1, 2, 3];
            const index = -1;
            const value = 100;
            // When
            setAt(array, index, value);
            // Then
            expect(array).toEqual([1, 2, value]);
        });

        it("should expand array and set a value", () => {
            // Given
            const array = [1, 2, 3];
            const index = 9;
            const value = 100;
            // When
            setAt(array, index, value);
            // Then
            expect(array).toEqual([1, 2, 3, undefined, undefined, undefined, undefined, undefined, undefined, value]);
        });
    });


    describe("first()", () => {
        it("should return the first value", () => {
            // Given
            const array = [1, 2, 3];
            // When
            const result = first(array);
            // Then
            expect(result).toEqual(1);
        });
    });


    describe("last()", () => {
        it("should return the last value", () => {
            // Given
            const array = [1, 2, 3];
            // When
            const result = last(array);
            // Then
            expect(result).toEqual(3);
        });
    });


    describe("setFirst()", () => {
        it("should set the first value", () => {
            // Given
            const array = [1, 2, 3];
            const value = 999;
            // When
            setFirst(array, value);
            // Then
            expect(array).toEqual([value, 2, 3]);
        });
    });


    describe("setLast()", () => {
        it("should set the last value", () => {
            // Given
            const array = [1, 2, 3];
            const value = 999;
            // When
            setLast(array, value);
            // Then
            expect(array).toEqual([1, 2, value]);
        });
    });


    describe("copy()", () => {
        it("should copy items of src length", () => {
            // Given
            const src = [1, 2, 3];
            const dst = [0, 0, 0, 9, 9, 9];

            // When
            copy(src, dst);

            // Then
            expect(dst).toEqual([1, 2, 3, 9, 9, 9]);
        });

        it("should copy items of given length", () => {
            // Given
            const src = [1, 2, 3];
            const dst = [0, 0, 0, 9, 9, 9];
            const length = 2;

            // When
            copy(src, dst, length);

            // Then
            expect(dst).toEqual([1, 2, 0, 9, 9, 9]);
        });

        it("should copy items of given length from given start", () => {
            // Given
            const src = [1, 2, 3];
            const srcOffset = 1;
            const dst = [0, 0, 0, 9, 9, 9];
            const dstOffset = 2;
            const length = 2;

            // When
            copy(src, srcOffset, dst, dstOffset, length);

            // Then
            expect(dst).toEqual([0, 0, 2, 3, 9, 9]);
        });

        it("should copy items of given length from given start with given cloning function", () => {
            // Given
            const src = [1, 2, 3];
            const srcOffset = 1;
            const dst = [0, 0, 0, 9, 9, 9];
            const dstOffset = 2;
            const length = 2;
            const cloning = (v: number) => -v;

            // When
            copy(src, srcOffset, dst, dstOffset, length, cloning);

            // Then
            expect(dst).toEqual([0, 0, -2, -3, 9, 9]);
        });


        it("should throw error", (done) => {
            // Given
            try {
                // When
                copy.call(undefined);
            } catch (e) {
                // Then
                done();
            }
        });
    });
});
