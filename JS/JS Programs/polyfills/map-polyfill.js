"use strict";

Array.prototype.myMap = function (callback, thisArg) {
    if (typeof callback !== `function`) {
        throw new TypeError(`Callback must be a function`);
    }

    if (!this) {
        throw new TypeError(`this is null or undefined`);
    }

    const obj = Object(this);
    const len = obj.length >>> 0;

    let index = 0;
    const result = new Array(len);

    while (index < len) {
        if (index in obj) {
            const element = callback.call(thisArg, obj[index], index, obj);
            result[index] = element;
        }

        // Or hasOwnProperty for strict checks
        /* if (obj.hasOwnProperty(index)) {
            const element = callback.call(thisArg, obj[index], index, obj);
            result[index] = element;
        } */

        index++;
    }

    return result;
};

// Test 1: Dense Array
const arr = [1, 2, 3];
console.log(
    "Dense Array: ",
    arr.myMap((x) => x * 2)
); // [2, 4, 6]
console.log(`\n`);

// Test 2: Sparse Array
const sparse = new Array(3);
sparse[0] = 1;
console.log(
    "Sparse Array: ",
    sparse.myMap((x) => x * 2)
); // [2, , ] (result[1] and result[2] are undefined)
console.log("Sparse Array element access: ", sparse.myMap((x) => x * 2)[1]); // undefined
console.log(`\n`);

// Test 3: Array-Like Object
const arrayLike = { 0: "a", 1: "b", length: 2 };
console.log(
    "Array-Like Object: ",
    Array.prototype.myMap.call(arrayLike, (x) => x.toUpperCase())
); // ["A", "B"]
console.log(`\n`);

// Test 4: thisArg
const context = { multiplier: 10 };
console.log(
    "Custom thisArg: ",
    [1, 2].myMap(function (x) {
        return x * this.multiplier;
    }, context)
); // [10, 20]
console.log(`\n`);

// Test 5: Error Cases
try {
    console.log("Error Cases: \n");
    Array.prototype.myMap.call(null, (x) => x);
} catch (e) {
    console.log("lol", e.message);
} // "this is null or undefined"
try {
    [1].myMap("not a function");
} catch (e) {
    console.log(e.message);
} // "Callback must be a function"
console.log(`\n`);

// Test 6: String as this
console.log(Array.prototype.myMap.call("abc", (x) => x.toUpperCase())); // ["A", "B", "C"]
console.log(`\n`);
