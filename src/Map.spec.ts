import { drop, filter, map, reverseLookup } from "./Map";

const MAP = new Map([
    [1, 10],
    [2, 20],
    [3, 30],
    [4, 40],
    [5, 50],
]);
const MAP_COPY = new Map(MAP.entries());


describe("Map", () => {
    describe("drop()", () => {
        it("should return empty map and rejection will not be called", () => {
            // Given
            const obj = new Map([]);
            const rejection = () => { throw new Error("Fail"); };
            // When
            const result = drop(obj, rejection);
            // Then
            expect(result).toEqual(new Map([]));
        });

        it("should return empty map", () => {
            // Given
            const obj = MAP;
            const rejection = () => true;
            // When
            const result = drop(obj, rejection);
            // Then
            expect(result).toEqual(new Map([]));
        });

        it("should return map having not rejected values", () => {
            // Given
            const obj = MAP;
            const rejection = ([k, v]: [number, number]) => k % 2 === 0;
            // When
            const result = drop(obj, rejection);
            // Then
            expect(result).toEqual(new Map([
                [1, 10],
                [3, 30],
                [5, 50],
            ]));
        });

        it("should not break original", () => {
            // Given
            const obj = MAP;
            const rejection = () => true;
            // When
            const result = drop(obj, rejection);
            // Then
            expect(result).not.toEqual(MAP_COPY);
            expect(obj).toEqual(MAP_COPY);
        });
    });


    describe("filter()", () => {
        it("should return empty iterator and acceptance will not be called", () => {
            // Given
            const obj = new Map([]);
            const acceptance = () => { throw new Error("Fail"); };
            // When
            const result = filter(obj, acceptance);
            // Then
            expect(result).toEqual(new Map([]));
        });

        it("should return empty iterator", () => {
            // Given
            const obj = MAP;
            const acceptance = () => false;
            // When
            const result = filter(obj, acceptance);
            // Then
            expect(result).toEqual(new Map([]));
        });

        it("should return iterator having accepted values", () => {
            // Given
            const obj = MAP;
            const acceptance = ([k, v]: [number, number]) => k % 2 === 0;
            // When
            const result = filter(obj, acceptance);
            // Then
            expect(result).toEqual(new Map([
                [2, 20],
                [4, 40],
            ]));
        });

        it("should not break original", () => {
            // Given
            const obj = MAP;
            const acceptance = () => false;
            // When
            const result = filter(obj, acceptance);
            // Then
            expect(result).not.toEqual(MAP_COPY);
            expect(obj).toEqual(MAP_COPY);
        });
    });


    describe("map()", () => {
        it("should return empty map and acceptance will not be called", () => {
            // Given
            const obj = new Map([]);
            const mapping = () => { throw new Error("Fail"); };
            // When
            const result = map(obj, mapping);
            // Then
            expect(result).toEqual(new Map([]));
        });

        it("should return mapped map", () => {
            // Given
            const obj = MAP;
            const mapping = ([k, v]: [number, number]) => [k, v * 2] as [number, number];
            // When
            const result = map(obj, mapping);
            // Then
            expect(result).toEqual(new Map([
                [1, 20],
                [2, 40],
                [3, 60],
                [4, 80],
                [5, 100],
            ]));
        });
    });


    describe("reverseLookup()", () => {
        it("should return empty map", () => {
            // Given
            const obj = new Map([]);
            // When
            const result = reverseLookup(obj);
            // Then
            expect(result).toEqual(new Map([]));
        });

        it("should return mapped map", () => {
            // Given
            const obj = MAP;
            // When
            const result = reverseLookup(obj);
            // Then
            expect(result).toEqual(new Map([
                [10, 1],
                [20, 2],
                [30, 3],
                [40, 4],
                [50, 5],
            ]));
        });
    });
});
