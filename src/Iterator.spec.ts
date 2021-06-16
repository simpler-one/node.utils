import {drop, filter, range, zip} from "./Iterator"


describe("Iterator", () => {
    describe("drop()", () => {
        it("should return empty iterator and rejection will not be called", () => {
            // Given
            const iter = [][Symbol.iterator]();
            const rejection = () => { throw new Error("Fail"); };
            // When
            const result = drop(iter, rejection);
            // Then
            expect([...result]).toEqual([]);
        });

        it("should return empty iterator", () => {
            // Given
            const iter = [1, 2, 3, 4, 5][Symbol.iterator]();
            const rejection = () => true;
            // When
            const result = drop(iter, rejection);
            // Then
            expect([...result]).toEqual([]);
        });


        it("should return iterator having not rejected values", () => {
            // Given
            const iter = [1, 2, 3, 4, 5][Symbol.iterator]();
            const rejection = (v: number) => v % 2 === 0;
            // When
            const result = drop(iter, rejection);
            // Then
            expect([...result]).toEqual([1, 3, 5]);
        });
    });


    describe("filter()", () => {
        it("should return empty iterator and acceptance will not be called", () => {
            // Given
            const iter = [][Symbol.iterator]();
            const acceptance = () => { throw new Error("Fail"); };
            // When
            const result = filter(iter, acceptance);
            // Then
            expect([...result]).toEqual([]);
        });

        it("should return empty iterator", () => {
            // Given
            const iter = [1, 2, 3, 4, 5][Symbol.iterator]();
            const acceptance = () => false;
            // When
            const result = filter(iter, acceptance);
            // Then
            expect([...result]).toEqual([]);
        });

        it("should return iterator having accepted values", () => {
            // Given
            const iter = [1, 2, 3, 4, 5][Symbol.iterator]();
            const acceptance = (v: number) => v % 2 === 0;
            // When
            const result = filter(iter, acceptance);
            // Then
            expect([...result]).toEqual([2, 4]);
        });
    });

    describe("range", () => {
        describe("should return empty iterator", () => {
            // Given
            const stop = 0;
            // When
            const result = zip(stop);
            // Then
            expect([...result]).toEqual([]);
        });

        describe("should return 0 to stop iterator", () => {
            // Given
            const stop = 5;
            // When
            const result = zip(stop);
            // Then
            expect([...result]).toEqual([0, 1, 2, 3, 4]);
        });

        describe("should return start to stop iterator", () => {
            // Given
            const start = 1;
            const stop = 5;
            // When
            const result = zip(start, stop);
            // Then
            expect([...result]).toEqual([1, 2, 3, 4]);
        });
    });
});
