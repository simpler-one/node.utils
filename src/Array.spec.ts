import {
    at
} from "./Array";


describe("Array", () => {
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
    });
});
