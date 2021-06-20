import { padLeft, padRight } from "./String";


describe("String", () => {
    describe("padLeft()", () => {
        it("should return original value", () => {
            // Given
            const value = "abcde";
            const length = 3;
            const padChar = " ";
            // When
            const result = padLeft(value, length, padChar);
            // Then
            expect(result).toEqual(value);
        });

        it("should return padded value", () => {
            // Given
            const value = "abc";
            const length = 5;
            const padChar = " ";
            // When
            const result = padLeft(value, length, padChar);
            // Then
            expect(result).toEqual("  abc");
        });
    });


    describe("padRight()", () => {
        it("should return original value", () => {
            // Given
            const value = "abcde";
            const length = 3;
            const padChar = " ";
            // When
            const result = padRight(value, length, padChar);
            // Then
            expect(result).toEqual(value);
        });

        it("should return padded value", () => {
            // Given
            const value = "abc";
            const length = 5;
            const padChar = " ";
            // When
            const result = padRight(value, length, padChar);
            // Then
            expect(result).toEqual("abc  ");
        });
    });
});
