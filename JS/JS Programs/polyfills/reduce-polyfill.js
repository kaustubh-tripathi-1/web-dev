"use strict";

Array.prototype.myReduce = function (callback, initialValue) {
    if (typeof callback !== `function`) {
        throw new TypeError(`Callback must be a function`);
    }

    if (!this) {
        throw new TypeError(`this is null or undefined`);
    }

    const obj = Object(this);
    const len = obj.length >>> 0;

    if (len === 0 && initialValue === undefined) {
        throw new TypeError(`Reduce of empty array with no initial value`);
    }

    if (len === 0) {
        return initialValue;
    }

    let index = 0;
    let accumulator;

    if (initialValue === undefined) {
        // Handle sparse arrays
        while (index < len && !(index in obj)) {
            index++; // Find the 1st non empty slot/element
        }
        if (index >= len) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        accumulator = obj[index];
        index++; // Move to the next element
    } else {
        accumulator = initialValue;
    }

    while (index < len) {
        if (index in obj) {
            accumulator = callback(accumulator, obj[index], index, obj);
        }

        index++;
    }

    return accumulator;
};

// Test 1: Dense Array with initialValue
console.log(
    "Dense Array with initialValue: ",
    [1, 2, 3].myReduce((acc, x) => acc + x, 10)
); // 16

// Test 2: Dense Array without initialValue
console.log(
    "Dense Array without initialValue: ",
    [1, 2, 3].myReduce((acc, x) => acc + x)
); // 6

// Test 3: Sparse Array
const sparse = [, , 1, 2];
sparse[4] = 3;
console.log(
    "Sparse Array: ",
    sparse.myReduce((acc, x) => acc + x)
); // 6 (starts with 1)

// Test 4: Array-Like Object
const arrayLike = { 0: "a", 1: "b", length: 2 };
console.log(
    "Array-Like Object: ",
    Array.prototype.myReduce.call(arrayLike, (acc, x) => acc + x, "")
); // "ab"

// Test 5: Empty Array with initialValue
console.log(
    "Empty Array with initialValue: ",
    [].myReduce((acc, x) => acc + x, 0)
); // 0

// Test 7: Error Cases
console.log("Error Cases: ");
try {
    Array.prototype.myReduce.call(null, (x) => x);
} catch (e) {
    console.log(e.message);
} // "this is null or undefined"
try {
    [1].myReduce("not a function");
} catch (e) {
    console.log(e.message);
} // "Callback must be a function"
try {
    [].myReduce((acc, x) => acc + x);
} catch (e) {
    console.log(e.message);
} // "Reduce of empty array with no initial value"
try {
    [, ,].myReduce((acc, x) => acc + x);
} catch (e) {
    console.log(e.message);
} // "Reduce of empty array with no initial value"
