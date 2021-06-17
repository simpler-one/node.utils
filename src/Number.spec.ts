import {clip} from "./Number"


describe("Number", () => {
    describe("clip()", () => {
        it("should return original value (lower)", () => {
            // Given
            const value = 1;
            const min = 0;
            const max = 100;
            // When
            const result = clip(value, min, max);
            // Then
            expect(result).toEqual(value);
        });

        it("should return original value (upper)", () => {
            // Given
            const value = 99;
            const min = 0;
            const max = 100;
            // When
            const result = clip(value, min, max);
            // Then
            expect(result).toEqual(value);
        });

        it("should return lower clipped value", () => {
            // Given
            const value = -1;
            const min = 0;
            const max = 100;
            // When
            const result = clip(value, min, max);
            // Then
            expect(result).toEqual(min);
        });

        it("should return upper clipped value", () => {
            // Given
            const value = 101;
            const min = 0;
            const max = 100;
            // When
            const result = clip(value, min, max);
            // Then
            expect(result).toEqual(max);
        });
    });
});
