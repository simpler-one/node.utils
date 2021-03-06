import { drop, filter, map, range, zip } from "./Iterator";


function createDoneValueIterator<T>(value: T): Iterator<T> {
    return {
        next: () => {
            return {done: true, value};
        },
    };
}

function createDoneValueIterable<T>(value: T): Iterable<T> {
    return {
        [Symbol.iterator]: () => createDoneValueIterator(value),
    };
}


// TODO: add test {done: true, value: xxx}
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

        it("should return iterator having single value", () => {
            // Given
            const iter = createDoneValueIterator(123);
            const rejection = () => false;
            // When
            const result = drop(iter, rejection);
            // Then
            expect([...result]).toEqual([123]);
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

        it("should return iterator having single value", () => {
            // Given
            const iter = createDoneValueIterator(123);
            const acceptance = () => true;
            // When
            const result = filter(iter, acceptance);
            // Then
            expect([...result]).toEqual([123]);
        });
    });


    describe("map()", () => {
        it("should return empty iterator and acceptance will not be called", () => {
            // Given
            const iter = [][Symbol.iterator]();
            const mapping = () => { throw new Error("Fail"); };
            // When
            const result = map(iter, mapping);
            // Then
            expect([...result]).toEqual([]);
        });

        it("should return mapped iterator", () => {
            // Given
            const iter = [1, 2, 3, 4, 5][Symbol.iterator]();
            const mapping = (v: number) => v * 2;
            // When
            const result = map(iter, mapping);
            // Then
            expect([...result]).toEqual([2, 4, 6, 8, 10]);
        });

        it("should return iterator having single value", () => {
            // Given
            const iter = createDoneValueIterator(123);
            const mapping = (v: number) => v * 2;
            // When
            const result = map(iter, mapping);
            // Then
            expect([...result]).toEqual([246]);
        });
    });


    describe("range()", () => {
        it("should return empty iterator", () => {
            // Given
            const stop = 0;
            // When
            const result = range(stop);
            // Then
            expect([...result]).toEqual([]);
        });

        it("should return 0 to stop iterator", () => {
            // Given
            const stop = 5;
            // When
            const result = range(stop);
            // Then
            expect([...result]).toEqual([0, 1, 2, 3, 4]);
        });

        it("should return start to stop iterator", () => {
            // Given
            const start = 1;
            const stop = 5;
            // When
            const result = range(start, stop);
            // Then
            expect([...result]).toEqual([1, 2, 3, 4]);
        });

        it("should return start to stop decreasing iterator", () => {
            // Given
            const start = 5;
            const stop = 0;
            const increment = -1;
            // When
            const result = range(start, stop, increment);
            // Then
            expect([...result]).toEqual([5, 4, 3, 2, 1]);
        });

        it("should throw error", (done) => {
            // Given
            const start = -1;
            const stop = 5;
            const increment = 0;
            // When
            const result = range(start, stop, increment);
            try {
                result.next();
                fail();
            } catch (e) {
                // Then
                done();
            }
        });

        it("should return empty iterator when no arguments given", () => {
            // When
            const result = range.call([]);
            // Then
            expect([...result]).toEqual([]);
        });
    });


    describe("zip()", () => {
        it("should return empty iterator when nothing is given", () => {
            // When
            const result = zip();
            // Then
            expect([...result]).toEqual([]);
        });

        it("should return empty iterator", () => {
            // Given
            const iter1 = [];
            // When
            const result = zip(iter1);
            // Then
            expect([...result]).toEqual([]);
        });

        it("should return aggregating iterator", () => {
            // Given
            const iter1 = [1, 2, 3];
            const iter2 = "abc";
            // When
            const result = zip(iter1, iter2);
            // Then
            expect([...result]).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
        });

        it("should return short aggregating iterator", () => {
            // Given
            const iter1 = [1, 2, 3];
            const iter2 = "abc";
            const iter3 = [true, false];
            // When
            const result = zip(iter1, iter2, iter3);
            // Then
            expect([...result]).toEqual([[1, "a", true], [2, "b", false]]);
        });
    });

    it("should return iterator having single pair", () => {
        // Given
        const iter1 = createDoneValueIterable(123);
        const iter2 = createDoneValueIterable("abc");
        // When
        const result = zip(iter1, iter2);
        // Then
        expect([...result]).toEqual([[123, "abc"]]);
    });
});
