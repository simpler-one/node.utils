import { clone, copy, emptyRemoved, iterEntries, equals, getProperty, setProperty, voidRemoved } from "./Object";

const OBJ = Object.freeze({
    a: 123,
    b: {c: "abc"},
});


describe("Object", () => {
    describe("clone()", () => {
        it("should return shallow copied object", () => {
            // Given
            const obj = OBJ;
            // When
            const result = clone(obj, false);
            // Then
            expect(result).toEqual(obj);
            expect(result).not.toBe(obj);
            expect(result.b).toBe(obj.b);
        });

        it("should return shallow copied array", () => {
            // Given
            const obj = [OBJ, OBJ];
            // When
            const result = clone(obj, false);
            // Then
            expect(result).toEqual(obj);
            expect(result).not.toBe(obj);
            expect(result[0]).toBe(obj[0]);
        });

        it("should return deep copy", () => {
            // Given
            const obj = {
                x: OBJ,
                y: [OBJ, OBJ],
            };
            // When
            const result = clone(obj, true);
            // Then
            expect(result).toEqual(obj);
            expect(result.x).not.toBe(obj.x);
        });
    });


    describe("copy()", () => {
        it("should set shallow copied values", () => {
            // Given
            const obj = OBJ;
            const result = {} as any;
            // When
            copy(obj, result, false);
            // Then
            expect(result).toEqual(obj);
            expect(result.b).toBe(obj.b);
        });

        it("should set deep copied values", () => {
            // Given
            const obj = OBJ;
            const result = {b: {}};
            // When
            copy(obj, result, true);
            // Then
            expect(result).toEqual(obj);
            expect(result.b).not.toBe(obj.b);
        });

        it("should leave not copied properties (shallow)", () => {
            // Given
            const obj = OBJ;
            const result = {d: 999};
            // When
            copy(obj, result, false);
            // Then
            expect(result.d).toEqual(999);
        });

        it("should leave not copied properties (deep)", () => {
            // Given
            const obj = OBJ;
            const result = {d: 999};
            // When
            copy(obj, result, true);
            // Then
            expect(result.d).toEqual(999);
        });

        it("should overwrite null", () => {
            // Given
            const obj = OBJ;
            const result = {b: {c: null}};
            // When
            copy(obj, result, true);
            // Then
            expect(result).toEqual(OBJ);
        });

        it("should not copy when not object source given", () => {
            // Given
            const obj = null;
            const result = {};
            // When
            copy(obj, result, false);
            // Then
            expect(obj).toEqual(null);
        });

        it("should not copy when not object destination given", () => {
            // Given
            const obj = OBJ;
            const result = null;
            // When
            copy(obj, result, false);
            // Then
            expect(result).toEqual(null);
        });
    });


    describe("iterEntries()", () => {
        it("should return shallow iterator", () => {
            // Given
            const obj = OBJ;
            // When
            const result = iterEntries(obj, false);
            // Then
            expect([...result]).toEqual([
                [["a"], 123],
                [["b"], {c: "abc"}],
            ]);
        });

        it("should return leaf iterator", () => {
            // Given
            const obj = OBJ;
            // When
            const result = iterEntries(obj, true, false);
            // Then
            expect([...result]).toEqual([
                [["a"], 123],
                [["b", "c"], "abc"],
            ]);
        });

        it("should return tree iterator", () => {
            // Given
            const obj = OBJ;
            // When
            const result = iterEntries(obj, true, true);
            // Then
            expect([...result]).toEqual([
                [["a"], 123],
                [["b"], {c: "abc"}],
                [["b", "c"], "abc"],
            ]);
        });
    });

    describe("equals()", () => {
        it("should return true when same primitives given", () => {
            // Given
            const values = [
                123,
                Number.NEGATIVE_INFINITY,
                Number.POSITIVE_INFINITY,
                true,
                false,
                "",
                "abc",
                undefined,
                null,
            ];

            for (const v of values) {
                // When
                const result = equals(v, v, false);
                // Then
                expect(result).toEqual(true);
            }
        });

        it("should return false when NaN given", () => {
            // Given
            const value = Number.NaN;
            // When
            const result = equals(value, value, false);
            // Then
            expect(result).toEqual(false);
        });

        it("should return true when equal object given (shallow)", () => {
            // Given
            const obj1 = OBJ;
            const obj2 = {...OBJ};
            // When
            const result = equals(obj1, obj2, false);
            // Then
            expect(result).toEqual(true);
        });

        it("should return true when equal objects given (deep)", () => {
            // Given
            const obj1 = {
                z: {...OBJ},
            };
            const obj2 = {
                z: {...OBJ},
            };
            // When
            const result = equals(obj1, obj2, true);
            // Then
            expect(result).toEqual(true);
        });

        it("should return false when different property length object given", () => {
            // Given
            const obj1 = {a: 0, b: 1};
            const obj2 = {a: 0};
            // When
            const result = equals(obj1, obj2, false);
            // Then
            expect(result).toEqual(false);
        });

        it("should return false when different property object given", () => {
            // Given
            const obj1 = {a: 0};
            const obj2 = {b: 0};
            // When
            const result = equals(obj1, obj2, false);
            // Then
            expect(result).toEqual(false);
        });

        it("should return false when different object given", () => {
            // Given
            const obj1 = {a: {b: {c: 0}}};
            const obj2 = {a: {b: {c: 1}}};
            // When
            const result = equals(obj1, obj2, true);
            // Then
            expect(result).toEqual(false);
        });

        it("should return false when different object type given", () => {
            // Given
            const obj1 = {0: "abc", 1: "42"};
            const obj2 = ["abc", "42"];
            // When
            const result = equals(obj1, obj2, true);
            // Then
            expect(result).toEqual(false);
        });
    });


    describe("getProperty()", () => {
        it("should return value", () => {
            // Given
            const obj = OBJ;
            const path = ["b", "c"];
            // When
            const result = getProperty(obj, path);
            // Then
            expect(result).toEqual("abc");
        });

        it("should return undefined", () => {
            // Given
            const obj = OBJ;
            const path = ["x", "y", "z"];
            // When
            const result = getProperty(obj, path);
            // Then
            expect(result).toEqual(undefined);
        });
    });


    describe("setProperty()", () => {
        it("should set value", () => {
            // Given
            const obj = { a: { b: 0, c: 1 }};
            const path = ["a", "d"];
            const value = 2;
            // When
            const result = setProperty(obj, path, value);
            // Then
            expect(result).toEqual(true);
            expect(obj).toEqual({
                a: { b: 0, c: 1, d: 2 }
            });
        });

        it("should not set value", () => {
            // Given
            const obj = { a: { b: 0, c: 1 }};
            const path = ["x", "y", "x"];
            const value = 2;
            // When
            const result = setProperty(obj, path, value);
            // Then
            expect(result).toEqual(false);
            expect(obj).toEqual({ a: { b: 0, c: 1 }});
        });

        it("should not set value when void given", () => {
            // Given
            const obj = undefined;
            const path = ["x", "y", "x"];
            const value = 2;
            // When
            const result = setProperty(obj, path, value);
            // Then
            expect(result).toEqual(false);
        });
    });


    describe("naRemoved()", () => {
        it("should return N/A removed object", () => {
            // Given
            const obj = {
                a: 123,
                b: false,
                c: 0,
                d: "",
                e: [],
                f: null,
                g: undefined,
            };
            // When
            const result = voidRemoved(obj);
            // Then
            expect(result).toEqual({
                a: 123,
                b: false,
                c: 0,
                d: "",
                e: [],
            });
        });
    });


    describe("emptyRemoved()", () => {
        it("should return empty removed object", () => {
            // Given
            const obj = {
                a: 123,
                b: false,
                c: 0,
                d: "",
                e: [],
                f: null,
                g: undefined,
            };
            // When
            const result = emptyRemoved(obj);
            // Then
            expect(result).toEqual({
                a: 123,
                b: false,
                c: 0,
            });
        });
    });
});
