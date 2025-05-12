Array.prototype.myForEach = function (callback, thisArg) {
    if (typeof callback !== `function`) {
        throw new TypeError(`Callback must be a function`);
    }

    if (!this) {
        throw new TypeError(`this is null or undefined`);
    }

    // Convert this to object and get length
    const obj = Object(this);
    const len = obj.length >>> 0; // Convert to unsigned 32-bit integer

    let index = 0;
    while (index < len) {
        if (index in obj) {
            callback.call(thisArg, obj[index], index, obj);
        }

        /* // Or hasOwnProperty for strict checks
        if (obj.hasOwnProperty(index)) {
            callback.call(thisArg, obj[index], index, obj);
        } */

        index++;
    }
};

function square(element, index, array) {
    console.log(`Square of ${element}: ${element * element}`);
    console.log(`Index: ${index}`);
    console.log(`Array/this: `, array);
}

// Test 1: Dense Array
const arr = [1, 2, 3, 4, 5];
console.log("Test on actual array:");
arr.myForEach(square);
console.log(`\n\n`);

// Test 2: Sparse Array
const sparseArr = new Array(10);
sparseArr[0] = 1;
sparseArr[5] = 5;
console.log("Test on sparse array:");
sparseArr.myForEach(square); // Should only log for indices 0 and 5
console.log(`\n\n`);

// Test 3: Array-Like Object
const arrayLike = { length: 3, 0: 1, 1: 2, 2: 3, 3: 4 };
console.log("Test on array-like:");
Array.prototype.myForEach.call(arrayLike, square); // Should log 1, 2, 3
console.log(`\n\n`);

// Test 4: With thisArg
const context = { name: "test" };
console.log("Test with thisArg:");
[1, 2].myForEach(function () {
    console.log(this.name);
}, context); // Logs "test" twice
console.log(`\n\n`);

// Test 5: Error Cases
console.log("Test errors:");
try {
    Array.prototype.myForEach.call(null, square);
} catch (e) {
    console.log(e.message); // "this is null or undefined"
}
try {
    [1, 2].myForEach("not a function");
} catch (e) {
    console.log(e.message); // "Callback must be a function"
}
console.log(`\n\n`);

/* // Test on actual array
const arr = [1, 2, 3, 4, 5];
console.log(`Test on actual array:`);
arr.myForEach(square);
console.log(`\n\n`);

// Test on sparse array
const sparseArr = new Array(10);
sparseArr[0] = 1;
sparseArr[10] = 15;
console.log(`Test on sparse array:`);
// sparseArr.myForEach(square);
sparseArr.myForEach(square);
console.log(`\n\n`);

// Test on array-like
const arrayLike = {
    length: 3, // Intentional check
    0: 1,
    1: 2,
    2: 3,
    3: 4,
};

console.log(`Test on array-like:`);
// arrayLike.myForEach(square);
Array.prototype.myForEach.call(arrayLike, square);
console.log(`\n\n`); */
