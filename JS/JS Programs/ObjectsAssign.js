//- Question 1

/* const person = {
	firstName: `Kaustubh`,
	lastName: `Tripathi`,
	age: 25,
	city: `Ghaziabad`,
};

console.log(person);
console.log(`\n`);

for (const key in person) {
	console.log(person[key]);
}

console.log(`\n`);
person.occupation = `Student`;
console.log(person); */

//- Question 2

/* const person = {
	firstName: `Kaustubh`,
	lastName: `Tripathi`,
	age: 25,
	city: `Ghaziabad`,
	fullName: function () {
		console.log(` My full name is ${this.firstName} ${this.lastName}.`);
	},
	agein10: function () {
		return this.age + 10;
	},
};
person.fullName();
let age10 = person.agein10();
console.log(age10); */

//- Question 3

/* const person = {
	firstName: `Kaustubh`,
	lastName: `Tripathi`,
	age: 25,
	city: `Ghaziabad`,
};

person.age = 24;
delete person.city;

console.log(person); */

//- Question 4

/* const person = {
	firstName: `Kaustubh`,
	lastName: `Tripathi`,
	age: 25,
	city: `Ghaziabad`,
};

function printObjectKey(obj, key) {
	return obj[key];
}

let key1 = printObjectKey(person, "firstName");
console.log(key1);
console.log(person[`lastName`]);
console.log(person.city); */

//- Question 5

/* const person = {
	firstName: `Kaustubh`,
	lastName: `Tripathi`,
	age: 25,
	city: `Ghaziabad`,
};

for (let key in person) {
	console.log(`${key} - ${person[key]}`);
} */

//- Question 6

/* const students = [
    {
        rollNo: 1,
        firstName: `Kaustubh`,
        lastName: `Tripathi`,
        age: 25,
        city: `Ghaziabad`,
        grade: `9`,
    },
    {
        rollNo: 2,
        firstName: `Nakshatra`,
        lastName: `Gupta`,
        age: 25,
        city: `Ghaziabad`,
        grade: `9`,
    },
];

function printProperty(students) {
    for (const student of students) {
        console.log(`Name - ${student.firstName}\nGrade - ${student.grade}`);
    }
    for (let student = 0; student < students.length; student++) {
        console.log(
            `Name - ${students[student].firstName}\nGrade - ${students[student].grade}`
        );
    }
    for (let student = 0; student < students.length; student++) {
        console.log(
            `Name - ${students[student][`firstName`]}\nGrade - ${
                students[student][`grade`]
            }`
        );
    }
}

printProperty(students); */

//- Question 7

/* const book = {
	title: `Let us C`,
	author: `S Ramanujan`,
	details: {
		publisher: `Classmate Books`,
		year: 2002,
	},
};

function displayAll(book) {
	for (const prop in book) {
		if (typeof book[prop] === `object`) {
			console.log(`${prop} : `);

			for (const details in book[prop]) {
				console.log(`${details} - ${book[prop][details]}`);
			}
		} else {
			console.log(`${prop} - ${book[prop]}`);
		}
	}
}

displayAll(book); */

//- Question 8

/* const person = {
		firstName: `Kaustubh`,
		lastName: `Tripathi`,
		age: 25,
		city: `Ghaziabad`,
};

// const { firstName: firstName } = person;
// const { lastName: lastName } = person;
// const { age: age } = person;

const { firstName, lastName, age } = person;

console.log(firstName);
console.log(lastName);
console.log(age); */

//- Question 9
/* const car = {
	brand: `Tesla`,
	model: `Model 3`,
	price: 35000,
};

const { brand, price } = car;

console.log(brand);
console.log(price); */

//- Question 10

//$ Without Class Syntax

/* function Car(brand, model, price) {
		this.brand = brand;
		this.model = model;
		this.price = price;

		this.getDetails = function () {
				return `Brand - ${this.brand}\nModel - ${this.model}\nPrice - ${this.price}`;
		};
}

let car1 = new Car(`Mercedes`, `S`, 20000000);
let car2 = new Car(`Lamborgini`, `Avantador`, 30000000);
let car3 = new Car(`Rolls Royce`, `Whatever`, 70000000);

console.log(car1.getDetails());
console.log(car2.getDetails());
console.log(car3.getDetails()); */

//$ With Class Syntax

/* class Car {
		constructor(brand, model, price) {
				this.brand = brand;
				this.model = model;
				this.price = price;
		}
		getDetails() {
				return `Brand - ${this.brand}\nModel - ${this.model}\nPrice - ${this.price}`;
		}
}

let car1 = new Car(`Mercedes`, `S`, 20000000);
let car2 = new Car(`Lamborgini`, `Avantador`, 30000000);
let car3 = new Car(`Rolls Royce`, `Whatever`, 70000000);

console.log(car1);
console.log(car2);
console.log(car3);

console.log(car1.getDetails());
console.log(car2.getDetails());
console.log(car3.getDetails()); */

//- Question 11

/* const person1 = {
    firstName: `Kaustubh`,
    lastName: `Tripathi`,
    age: 25,
    city: `Ghaziabad`,
    contact: `9811656514`,
    weight: 57,
};

const person2 = {
    firstName: `Nakshatra`,
    lastName: `Gupta`,
    age: 25,
    city: `Ghaziabad`,
};

//$ Using Object.assign()
let personAssign = {};
personAssign = Object.assign(personAssign, person1, person2);

console.log(personAssign);
console.log(person1);
console.log(person2);

//$ Using SPread Op.
const personSpread = { ...person1, ...person2 };

console.log(personSpread);
console.log(person1);
console.log(person2); */

//- Question 12

//$ WIthout Class syntax
/* function Person(firstName, lastName, age, city, contact, weight) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.city = city;
    this.contact = contact;
    this.weight = weight;
}

Person.prototype.greet = function () {
    console.log(`Hello ${this.firstName} ${this.lastName}!`);
};

const person1 = new Person(
    `Kaustubh`,
    `Tripathi`,
    25,
    `Ghaziabad`,
    `9811656514`,
    57
);

person1.greet(); */

//$ Class Syntax
/* class Person {
    constructor(firstName, lastName, age, city, contact, weight) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.city = city;
        this.contact = contact;
        this.weight = weight;
    }
}

Person.prototype.greet = function () {
    console.log(`Hello ${this.firstName} ${this.lastName}!`);
};

class Employee extends Person {
    constructor(firstName, lastName, jobTitle, age, city, contact, weight) {
        super(firstName, lastName, age, city, contact, weight);
        this.jobTitle = jobTitle;
    }

    getJobTitle() {
        return this.jobTitle;
    }
}

const person2 = new Person(
    `Kaustubh`,
    `Tripathi`,
    25,
    `Ghaziabad`,
    `9811656514`,
    57
);

person2.greet();

const emp1 = new Employee(
    `Kaustubh`,
    `Tripathi`,
    `Software Dev.`,
    25,
    `Ghaziabad`,
    `9811656514`,
    57
);

let job = emp1.getJobTitle();
console.log(job);

emp1.greet(); */

//- Question 13

//$ Object.freeze()

/* const settings = {
    theme: `dark`,
    volume: 69,
    brightness: 45,
};

settings.appCount = 40;

console.log(settings);
//& Locks the objects both properties and vlaues, also prevents addition/deletion of properties
Object.freeze(settings);
settings.theme = `light`;
settings.notifications = `on`;

console.log(settings);

delete settings.appCount;
console.log(settings); */

//$ Object.seal()

/* const settings = {
    theme: `dark`,
    volume: 69,
    brightness: 45,
};

settings.appCount = 40;

console.log(settings);

//& Locks the objects properties, not their values which can be reassigned, also prevents addition/deletion of properties
Object.seal(settings);
settings.notifications = `on`;
settings.theme = `light`;
console.log(settings);

delete settings.appCount;
console.log(settings); */

//- Question 14

/* class Animal {
    constructor(name, species, whatItDoes) {
        this.name = name;
        this.species = species;
        this.whatItDoes = whatItDoes;
    }

    speak() {
        console.log(
            `The ${this.species} of ${this.name} goes ${this.whatItDoes}`
        );
    }
}
class Dog extends Animal {
    bark() {
        console.log(`The dog barks`);
    }
}

const dog2 = new Dog(`Dog`, `Labrador`, `Woof`);

dog2.bark();
dog2.speak(); */

//- Question 15

//$ Shallow Copy

//% Arrays

/* let numbers = [1, 2, 3, [4, 5, 6]];

let numbers2 = [...numbers];

numbers2[3][1] = 9; //& Reassigning nested elements in the copy also changes the elements in the original array too as they point to the same reference
console.log(numbers);
console.log(numbers2);

console.log(numbers == numbers2);
console.log(numbers === numbers2);

//& But that is only true for the nested elements

numbers2[0] = 0;

console.log(numbers);
console.log(numbers2); */

//% Objects

/* let person = {
    firstName: `Kaustubh`,
    lastName: `Tripathi`,
    age: 25,
    other: {
        contact: `9811656514`,
        email: `kt40060@gmail.com`,
    },
};

// let person2 = { ...person };	//& Using Spread Operator

let person2 = Object.assign({}, person);	//& Using Object.assign()

console.log(person);
console.log(person2);

person2.other.contact = `9811656511`; //& Reassigning nested properties in the copy also changes the elements in the original object too as they point to the same reference

console.log(person);
console.log(person2);

console.log(person == person2);
console.log(person === person2);

//& But that is only true for the nested elements
person2.firstName = `kaustubh`;

console.log(person);
console.log(person2); */

//$ Deep Copy

//% Objects

/* let person = {
    firstName: `Kaustubh`,
    lastName: `Tripathi`,
    age: 25,
    other: {
        contact: `9811656514`,
        email: `kt40060@gmail.com`,
    },
};

let person2 = JSON.parse(JSON.stringify(person));

console.log(person);
console.log(person2);

person2.other.contact = `9811656511`; //& Does the changes only to the copied object as it is a deep copy with nested properties with different references

console.log(person);
console.log(person2);

//& And applicable to all properties

person2.firstName = `kaustubh`;

console.log(person);
console.log(person2);

console.log(person == person2);
console.log(person === person2); */

//- Question 16

/* let person = {
    firstName: `Kaustubh`,
    lastName: `Tripathi`,
    age: 25,
};

function addProperty(obj, key, value, writable, enumerable, configurable) {
    Object.defineProperty(obj, key, {
        value: value,
        writable: writable,
        enumerable: enumerable,
        configurable: configurable,
    });
}

addProperty(person, `email`, `kt40`, true, true, true);

console.log(person); */

//- Question 17

/* const inventory = {
    apple: 5,
    banana: 10,
    orange: 8,
};

//$ Listing all keys
console.log(Object.keys(inventory));

//$ Listing all values
console.log(Object.values(inventory));

//$ Creating an array of Key-Value pairs

let keyValueArray = Object.entries(inventory);

for (let [key, value] of keyValueArray) {
    console.log(key, value);
} */
