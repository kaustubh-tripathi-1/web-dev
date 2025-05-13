"use strict";

Array.prototype.myFilter = function (callback, thisArg) {
    if (typeof callback !== `function`) {
        throw new TypeError(`Callback must be a function`);
    }

    if (!this) {
        throw new TypeError(`this is null or undefined`);
    }

    const obj = Object(this);
    const len = obj.length >>> 0;

    const result = [];
    let index = 0;
    while (index < len) {
        if (index in obj) {
            const toInclude = callback.call(thisArg, obj[index], index, obj);
            if (toInclude) {
                result.push(obj[index]);
            }
        }

        // hasOwnProperty for more strict check
        /* if (obj.hasOwnProperty(index)) {
            const toInclude = callback.call(thisArg, obj[index], index, obj);
            if (toInclude) {
                result.push(obj[index]);
            }
        } */

        index++;
    }

    return result;
};

// Test 1: Dense Array
console.log(
    "Dense Array: ",
    [1, 2, 3, 4].myFilter((x) => x % 2 === 0)
); // [2, 4]

// Test 2: Sparse Array
const sparse = new Array(3);
sparse[0] = 1;
sparse[2] = 3;
console.log(
    "Sparse Array: ",
    sparse.myFilter((x) => x > 1)
); // [3]
console.log(
    "Sparse Array: ",
    sparse.myFilter(() => true)
); // [1, 3]

// Test 3: Array-Like Object
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
console.log(
    "Array-Like Object: ",
    Array.prototype.myFilter.call(arrayLike, (x) => x !== "b")
); // ["a", "c"]

// Test 4: Explicit undefined
console.log(
    "Explicit undefined: ",
    [1, undefined, 2].myFilter((x) => x !== undefined)
); // [1, 2]

// Test 5: thisArg
console.log(
    "Custom thisArg: ",
    [1, 2].myFilter(
        function (x) {
            return x > this.threshold;
        },
        { threshold: 1 }
    )
); // [2]

// Test 6: Error Cases
console.log("Error Cases: \n");
try {
    Array.prototype.myFilter.call(null, (x) => x);
} catch (e) {
    console.log(e.message);
} // "this is null or undefined"
try {
    [1].myFilter("not a function");
} catch (e) {
    console.log(e.message);
} // "Callback must be a function"
