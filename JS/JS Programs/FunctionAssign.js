/* //- Question 1
const sum = (a, b) => {
  return a + b;
};

console.log(sum(4, 5)); */

/* //- Question 2
const greet = () => console.log(`Hello World`);

greet(); */

/* //- Question 3

const numbers = [1, 2, 3, 4, 5, 6];

let sum = numbers.reduce((sum, element) => sum + element, 0);

console.log(sum); */

/* //- Question 4

const numbers = [1, 2, 3, 4, 5, 6];

const square = (num) => {
  return num * num;
};
const cube = (num) => {
  return num * num * num;
};

function calculate(arr, callback) {
  result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }

  return result;
}

let squaredNumbers = calculate(numbers, square);
let cubedNumbers = calculate(numbers, cube);

console.log(`Original Array - `, numbers);
console.log(`Squared Array - `, squaredNumbers);
console.log(`Cubed Array - `, cubedNumbers); */

//- Question 5

/* function display() {
  console.log(`Process Complete`);
}

setTimeout(display, 2000); */

//- Question 6

/* function createMultiplier(multiplier) {
  return function (num) {
    return multiplier * num;
  };
}

let mul = createMultiplier(3);
let result = mul(5);

console.log(result); */

//- Question 7

/* const numbers = [1, 2, 3, 4, 5, 6];

function applyOperation(arr, callback) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i]));
  }
  return result;
}

function double(num) {
  return num * 2;
}
function square(num) {
  return num * num;
}

let doubledNumbers = applyOperation(numbers, double);
let squaredNumbers = applyOperation(numbers, square);

console.log(`Numbers - `, numbers);
console.log(`Doubled Numbers - `, doubledNumbers);
console.log(`Squared Numbers - `, squaredNumbers); */

//- Question 8

/* const numbers = [1, 2, 3, 4, 5, 6];

const squaredNumbers = numbers.map((num) => num * num);

console.log(squaredNumbers);

const oddNumbers = numbers.filter((num) => {
  if (num % 2 !== 0) return num;
});

console.log(oddNumbers); */

//- Question 9

/* let str = `My name is Kaustubh.`;

const reverseStr = function (str) {
  let start = 0;
  let end = str.length - 1;

  let charArray = str.split(``);

  while (start < end) {
    let temp = charArray[start];
    charArray[start] = charArray[end];
    charArray[end] = temp;

    start++;
    end--;
  }

  return charArray.join(``);
};

let rev_str = reverseStr(str);

console.log(rev_str); */

//- Question 10

/* function factorial(num) {
  if (num == 0 || num == 1) return 1;

  return num * factorial(num - 1);
}

let result = factorial(5);

console.log(result); */

//- Question 11
/* function createCounter() {
  let count = 0;

  return function innerCounter() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter()); */

//- Question 12
/* const person = {
  name: "kaustubh",
  sayName: function () {
    console.log(`Regular Function`);
    console.log(this.name);

    const display = () => console.log(this.name);

    display();
  },
};

person.sayName(); */

//- Question 13

/* const person = {
  name: "Kaustubh",
  sayName: function (callback) {
    callback(); // Invokes the callback function
  },
};

function regularCallback() {
  console.log("Regular Function - this.name:", this.name); // 'this' depends on how it's called
}

// Case 1: Without binding - 'this' refers to the global object
person.sayName(regularCallback); // Output: undefined (or global value)

// Case 2: With bind() - 'this' refers to 'person'
person.sayName(regularCallback.bind(person)); // Output: "Kaustubh"

// Case 3: Using an arrow function - 'this' inherits from surrounding context
person.sayName(() => {
  console.log("Arrow Function - this.name:", this.name); // Output: "Kaustubh"
}); */

const person = {
    name: "Kaustubh",
    sayName: function () {
        const callback = () => {
            console.log(`Arrow Function using this - `, this.name);
        };
        callback();
    },
};

person.sayName();

//- Question 14
/* (function display() {
  console.log(`Executed Immediately!`);
})(); */

//- Question 15

/* function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
let result = sum(4)(8)(13);
console.log(result);

const sum1 = sum(4); // Partially applied function
const sum1And2 = sum1(210);
console.log(sum1And2(3)); */
