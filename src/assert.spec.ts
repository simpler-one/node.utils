import {
    allNotEmpty, allNotNa, allInteger, allNotNegative, allNotVoid, allNumeric, allPositive
} from "./assert";


describe("assert", () => {
    describe("allNotVoid()", () => {
        it("should pass without errors", (done) => {
            // Given
            const obj = {a: 0, b: false, c: [], d: ""};
            // When
            allNotVoid(obj);
            // Then
            done();
        });

        it("should fail", (done) => {
            // Given
            const obj = {a: undefined};
            // When
            try {
                allNotVoid(obj);
                fail();
            } catch (e) {
                // Then
                done();
            }
        });
    });


    describe("allNotNa()", () => {
        it("should pass without errors", (done) => {
            // Given
            const obj = {a: 0, b: false, c: [], d: ""};
            // When
            allNotNa(obj);
            // Then
            done();
        });

        it("should fail", (done) => {
            // Given
            const obj = {a: Number.NaN};
            // When
            try {
                allNotNa(obj);
                fail();
            } catch (e) {
                // Then
                done();
            }
        });
    });


    describe("allNotEmpty()", () => {
        it("should pass without errors", (done) => {
            // Given
            const obj = {a: "abc", b: [123]};
            // When
            allNotEmpty(obj);
            // Then
            done();
        });

        it("should fail when empty given", (done) => {
            // Given
            const obj = {a: []};
            // When
            try {
                allNotEmpty(obj);
                fail();
            } catch (e) {
                // Then
                done();
            }
        });

        it("should fail when void given", (done) => {
            // Given
            const obj = {a: null};
            // When
            try {
                allNotEmpty(obj);
                fail();
            } catch (e) {
                // Then
                done();
            }
        });
    });


    describe("allNumeric()", () => {
        it("should pass without errors", (done) => {
            // Given
            const obj = {a: 123, b: Number.POSITIVE_INFINITY, c: Number.NEGATIVE_INFINITY, d: Number.NaN};
            // When
            allNumeric(obj);
            // Then
            done();
        });

        it("should fail", (done) => {
            // Given
            const obj = {a: "123"};
            // When
            try {
                allNumeric(obj);
                fail();
            } catch (e) {
                // Then
                done();
            }
        });
    });


    describe("allInteger()", () => {
        it("should pass without errors", (done) => {
            // Given
            const obj = {a: 123, b: 0};
            // When
            allInteger(obj);
            // Then
            done();
        });

        it("should fail", (done) => {
            // Given
            const obj = {a: 3.14};
            // When
            try {
                allInteger(obj);
                fail();
            } catch (e) {
                // Then
                done();
            }
        });
    });


    describe("allPositive()", () => {
        it("should pass without errors", (done) => {
            // Given
            const obj = {a: 123, b: Number.POSITIVE_INFINITY};
            // When
            allPositive(obj);
            // Then
            done();
        });

        it("should fail", (done) => {
            // Given
            const obj = {a: 0};
            // When
            try {
                allPositive(obj);
                fail();
            } catch (e) {
                // Then
                done();
            }
        });
    });


    describe("allNotNegative()", () => {
        it("should pass without errors", (done) => {
            // Given
            const obj = {a: 123, b: Number.POSITIVE_INFINITY, c: 0};
            // When
            allNotNegative(obj);
            // Then
            done();
        });

        it("should fail", (done) => {
            // Given
            const obj = {a: -1};
            // When
            try {
                allNotNegative(obj);
                fail();
            } catch (e) {
                // Then
                done();
            }
        });
    });
});
