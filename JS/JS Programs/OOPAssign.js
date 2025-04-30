//- Question 1

/* class Car {
    #brand;
    #model;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
    }

    getCarInfo() {
        return `Brand - ${this.#brand}, Model - ${this.#model}`;
    }
}

const car1 = new Car(`Toyota`, `Corolla`);
const car2 = new Car(`Honda`, `Civic`);

console.log(car1.getCarInfo());
console.log(car2.getCarInfo()); */

//- Question 2

/* class Person {
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    greet() {
        return `Hello, my name is ${this.#name}, and I am ${
            this.#age
        } years old.`;
    }
}

const person1 = new Person(`Kaustubh Tripathi`, 25);

console.log(person1.greet()); */

//- Question 3

/* class Rectangle {
    #width;
    #height;

    constructor(width, height) {
        this.#height = height;
        this.#width = width;
    }

    get area() {
        return this.#height * this.#width;
    }

    get perimeter() {
        return 2 * (this.#height + this.#width);
    }

    get width() {
        return this.#width;
    }
    get height() {
        return this.#height;
    }

    set width(width) {
        this.#width = width;
    }
    set height(height) {
        this.#height = height;
    }
}

const rect = new Rectangle(4, 5);

console.log(rect.width);
console.log(rect.height);
console.log(rect.area);
console.log(rect.perimeter); */

//- Question 4

/* class Animal {
    #name;
    #type;

    constructor(name, type) {
        this.#name = name;
        this.#type = type;
    }

    get name() {
        return this.#name;
    }

    get type() {
        return this.#type;
    }

    set name(name) {
        this.#name = name;
    }
    set type(type) {
        this.#type = type;
    }

    describe() {
        return `This is a ${this.#type} named ${this.#name}.`;
    }
}

class Dog extends Animal {
    #breed;
    constructor(breed, type, name) {
        super(name, type);

        this.#breed = breed;
    }

    bark() {
        return `Woof! Woof! goes ${this.name} who is a ${this.type} of breed ${
            this.#breed
        }`;
    }
}

const dog1 = new Dog(`labrador`, `Dog`, `Luffy`);

console.log(dog1.bark());
console.log(dog1.describe()); */

//- Question 5
/* class Vehicle {
    move() {
        return `The Vehicle is moving!`;
    }
}

class Bike extends Vehicle {
    move() {
        return `The Bike is moving`;
    }
}

const vehicle = new Vehicle();
const bike = new Bike();

console.log(vehicle.move());
console.log(bike.move()); */

//- Question 6

/* class MathHelper {
    static add(num1, num2) {
        return num1 + num2;
    }
}

console.log(MathHelper.add(4, 5)); */

//- Question 7

/* class BankAccount {
    #balance;

    constructor(balance) {
        if (balance >= 0) {
            this.#balance = balance;
        } else {
            console.log(`Balance can't be -ve, Setting it to 0!`);
        }
    }

    deposit(amount) {
        if (amount > 0) this.#balance += amount;
        else console.log(`Invalid Deposit Amount! It should be +ve.`);
    }

    withdraw(amount) {
        if (this.#balance >= amount && amount > 0) this.#balance -= amount;
        else if (amount > this.#balance) console.log(`Insufficient Balance!`);
        else console.log(`Amount can't be -ve!`);
    }

    checkBalance() {
        console.log(`Your balance is ${this.#balance}`);
    }

    getBalance() {
        return this.#balance;
    }
}

const myAccount = new BankAccount(1000);
myAccount.deposit(500);
myAccount.withdraw(200);
console.log(myAccount.getBalance());
myAccount.withdraw(1500); // Attempts to withdraw more than balance, shows error
myAccount.deposit(-50); // Invalid deposit, shows error */

//- Question 8

/* class Shape {
    area() {
        throw new Error(`Area method should be overridden by subclasses`);
    }
}

class Circle extends Shape {
    #radius;

    constructor(radius) {
        super();
        if (radius < 0) {
            throw new Error("Radius can't be negative");
        }
        this.#radius = radius;
    }

    area() {
        return Math.PI * this.#radius ** 2;
    }
}

class Rectangle extends Shape {
    #length;
    #breadth;

    constructor(length, breadth) {
        super();
        if (length >= 0 && breadth >= 0) {
            this.#length = length;
            this.#breadth = breadth;
        } else {
            throw new Error("Length & Breadth can't be negative");
        }
    }

    area() {
        return this.#length * this.#breadth;
    }
}

class Triangle extends Shape {
    #base;
    #height;

    constructor(base, height) {
        super();
        if (base >= 0 && height >= 0) {
            this.#base = base;
            this.#height = height;
        } else {
            throw new Error("Base & Height can't be negative");
        }
    }

    area() {
        return (1 / 2) * this.#base * this.#height;
    }
}

// const anyShape = new Shape();
const rectangle = new Rectangle(3, 4);
const circle = new Circle(3);
const triangle = new Triangle(3, 4);

// console.log(`Area of undefined Shape - ${anyShape.area()}`);
console.log(`Area of Rectangle - ${rectangle.area()}`);
console.log(`Area of Circle - ${circle.area()}`);
console.log(`Area of Triangle - ${triangle.area()}`); */

//- Question 9

/* class Engine {
    start() {
        return `Engine Started.`;
    }
}

class Car {
    #engine = new Engine();

    start() {
        return this.#engine.start();
    }
}

const myCar = new Car();
console.log(myCar.start()); */

//- Question 10

/* class Animal {
    constructor() {
        if (new.target === Animal) {
            throw new Error(`Animal class can't be instantiated!`);
        }
    }

    speak() {
        throw new Error(`speak() must be overridden by sub classes!`);
    }
}

class Dog extends Animal {
    constructor() {
        super();
    }
    speak() {
        return `Bark`;
    }
}
class Cat extends Animal {
    constructor() {
        super();
    }

    speak() {
        return `Meow`;
    }
}

const myDog = new Dog();
const myCat = new Cat();

console.log(myDog.speak());
console.log(myCat.speak()); */
