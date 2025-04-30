/* //- Question 1

let fruits = [`Apple`, `Banana`, `Mango`, `Orange`, `Pineapple`];

console.log(fruits);

fruits.push(`Grapes`);
console.log(fruits);

fruits.shift();
console.log(fruits);

fruits.unshift(`Watermelon`);
console.log(fruits);

fruits.pop();
console.log(fruits); */

/* //- Question 2

let num = [5, 12, 8, 130, 44];

for (let i = 0; i < num.length; i++) {
  if (num[i] > 10) console.log(num[i]);
}

num.forEach((element, index, num) => {
  num[index] = element * 2;
});

console.log(num); */

/* //- Question 3

let ages = [32, 33, 16, 40, 12];

let age18 = ages.find((element) => {
  return element > 18;
});

console.log(age18);

let ages18 = ages.filter((element) => element >= 18);

console.log(ages18); */

/* //- Question 4

let names = ["John", "Alice", "Bob", "David", "Charles"];
let i, j;
let len = names.length;

//* Manual Bubble Sort
// for (i = 0; i < len - 1; i++) {
//   for (j = 0; j < len - 1 - i; j++) {
//     if (names[j].toLowerCase() > names[j + 1].toLowerCase()) {
//       let temp = names[j];
//       names[j] = names[j + 1];
//       names[j + 1] = temp;
//     }
//   }
// }

names.sort();
console.log(names);
names.reverse();

console.log(names); */

/* //- Question 4

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      console.log(matrix[i][j]);
    }
  }
}

printMatrix(matrix);

let sum = 0;
function sumOfMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j];
    }
  }
}

sumOfMatrix(matrix);

console.log(`Sum of Array Elements is - ${sum}`); */

/* //- Question 5

let nums = [10, 20, 30, 40, 50];

let squareNums = nums.map((element) => element ** 2);

console.log(squareNums);

let sum = nums.reduce((result, element) => result + element, 0);

console.log(sum);

console.log(nums.some((element) => element > 25));
console.log(nums.every((element) => element > 5)); */

/* //- Question 6

let colors = ["Red", "Green", "Blue", "Yellow", "Purple"];

let newcolors = colors.slice(0, 3);

console.log(newcolors);

colors.splice(2, 1, "Cyan", "Magenta");

console.log(colors); */

/* //- Question 7

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// let final = arr1.concat(arr2);

// console.log(final);

let merged = [...arr1, ...arr2, ...arr1];

console.log(merged);

console.log(arr1);
console.log(arr2); */

/* //- Question 8

const [x, y, ...rest] = [15.5, 20.3, 4, 5, 6, 7];

console.log(x);
console.log(y);
console.log(rest); */

/* //- Question 9

let arr = [1, 2, 3, 4, 5];
let k = 3;
len = arr.length;

k = k % len;

// let newArr = arr.slice(-k).concat(arr.slice(0, arr.length - k));

// console.log(newArr);

rotate(arr, 0, len - 1);
rotate(arr, 0, k - 1);
rotate(arr, k, len - 1);

console.log(arr);

function rotate(arr, start, end) {
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
} */

/* let marks = [54, 96, 76, 49, 86];
let i; */

//- Use of Slice Splice, Shift, Unshift, Push, Pop
/* console.log(marks.splice(1, 3, 32, 43));

for (i = 0; i < marks.length; i++) {
  console.log(marks[i]);
}
let val = marks.push(89, 749, 7843);
let val1 = marks.unshift(389, 439);
let val2 = marks.shift();
let newval = marks.pop();
for (i = 0; i < marks.length; i++) {
  console.log(marks[i]);
}

console.log(`${val}`);
console.log(`${newval}`);
console.log(`${val1}`);
console.log(`${val2}`); */

//- Use of Arrow Functions
/* let cities = [`delhi`, `mumbai`, `gzb`];
cities.forEach((element, index, cities) => {
  cities[index] = element.charAt(0).toUpperCase() + element.slice(1);
});

console.log(cities); */

//- Use of forEach taking a function as an argument
/* function square(element, index, marks) {
  marks[index] = element * element;
}

marks.forEach(square);

console.log(marks); */

//- Use of forEach with index and array parameters
/* let updatedMarks = [];
marks.forEach((element) => {
  updatedMarks.push(element * element);
});

console.log(updatedMarks); */

/* //- Use of Map Method

let updatedMarks = marks.map((element) => {
  return element ** 3;
});

console.log(updatedMarks);

console.log(marks); */

/* //- Use of Filer Method

let updatedMarks = marks.filter((element) => {
  return element % 2 === 0;
});

console.log(updatedMarks);

console.log(marks); */

//- Use of Reduce Method

/* let sum = marks.reduce((sum, element) => {
  return sum + element;
}, 0);

console.log(sum);

console.log(marks); */

/* let sum = marks.reduce((largest, element) => {
  if (largest > element) {
    return largest;
  } else {
    return element;
  }
});

console.log(sum);

console.log(marks); */

/* let num = prompt("Enter a number :");

let number = [];

for (let i = 0; i < num; i++) {
  number[i] = i + 1;
}

console.log(`Array is : [${number}]`);

let sum = number.reduce((sum, element) => {
  return sum + element;
}, 0);
console.log("Sum is -", sum);
let product = number.reduce((product, element) => {
  return product * element;
}, 1);
console.log(`Product of array elements is - ${product}`); */
