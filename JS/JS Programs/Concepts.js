/* function arrayInput(arr) {
  let n = prompt("Enter the no. of values for array -");
  for (let i = 0; i < n; i++) {
    arr[i] = prompt();
  }
  return arr;
}
let arr = [];
arr = arrayInput(arr);

console.log(arr);
 */

/* //- Iterating over an object using for-in
const languages = {
  c: "C",
  cpp: `C++`,
  js: `Javascript`,
  java: `Java`,
};

for (let key in languages) {
  console.log(`${key} file extension is for ${languages[key]}`);
}
 */

//- DOM

/* let div = document.querySelector("body");
let i = `dark`;
if (i === `dark`) {
  div.style.backgroundColor = "#201e1e";
  div.style.color = "white";
}
div.style.fontSize = "1rem";
div.style.textAlign = "center";

let submit = document.createElement("button");

submit.setAttribute("type", "submit");
submit.innerText = "CLick ME!!";
submit.style.backgroundColor = "red";
submit.style.color = "white";

let outerdiv = document.querySelector(".text");

const body = document.querySelector("body");
body.prepend(submit);

document.querySelector("#heading2").remove();

document.querySelector(".text").style.backgroundColor = "#201e1e";

let para = document.createElement("p");

para.innerHTML = "<em>I live in XYZ.</em>";
body.append(para);

para.setAttribute("class", "p1");
para.classList.add("p2");
// para.classList.remove("p2");

console.dir(para.classList);

// para.innerText = "ABCD";

const textp = document.createTextNode(`EFGH`);

para.append(textp); */

//- Events

/* let body = document.querySelector("body");

let btn = document.createElement("button");

btn.innerHTML = "Mode";

body.append(btn);

let mode = "light";
let darkm = () => {
  if (mode === "light") {
    mode = "dark";
    body.classList.remove("light");
    body.classList.add("dark");
  } else {
    mode = "light";
    body.classList.remove("dark");
    body.classList.add("light");
  }
};

const dark = btn.addEventListener("mouseover", darkm);
const light = btn.addEventListener("mouseout", darkm); */

//- Classes and Objects

//$ Prototype
/* const emp = {
    calTax() {
        console.log(`Tax`);
    },
};

const Ram = {
    salary: 200000,
    __proto__: emp, //& Given Access to Ram object of calTax() method of emp Object inside the Ram object itself
};

//? Old Syntax for prototypal inheritance
Ram.__proto__ = emp; //& Given Access to Ram object of calTax() method of emp Object.

//? New Syntax for prototypal inheritance
Object.setPrototypeOf(Ram, emp);

Ram.calTax(); //& Now Ram can use calTax() */

//$ Adding a prototype method for all objects like arrays, objects, strings etc.
/* const heros = [`ironman`, `thor`, `hulk`];

//& Array, strings etc. ( childrens ) -> Object ( no parent ) -> null ( prototype ref. )

let heroPowers = {
    ironman: `suit`,
    thor: `hammer and thunder`,
    hulk: `big green guy`,

    getSuperPower: function () {
        console.log(this.ironman);
    },
};

//& Adding a custom method (name) to the prototype of Object for all objects ( arrays, strings, functions etc. )
Object.prototype.name = () => {
    console.log(`Kaustubh`);
};

heroPowers.name(); */

//& Adding a custom method trueLength() to all strings

/* let username = `Kaustubh        `;

String.prototype.trueLength = function () {
    console.log(this);
    console.log(`${this}`);
    console.log(`True Length of string is ${this.trim().length}`);
};

username.trueLength();

`Kaustubh Tripathi`.trueLength(); */

//$ Class

/* class Car {
    constructor(brand, mileage) {
        console.log(
            `Constructor is called by new keyword as soon as the object is created and it initializes the object.`
        );
        this.brand = brand; //& Can set properties while initializing the objects with the help of constructors
        this.mileage = mileage;
    }

    start() {
        console.log(`start`);
    }
    stop() {
        console.log(`stop`);
    }

    setBrandName(brand) {
        this.brand = brand; //& this.brand is a property defined for all objects that will be created through this class and brand is the parameter which the function will accept
    } 
}

//* Creating new object of class Car with new Keyword
let fortuner = new Car(`Toyota`, 20);
//* Setting Property for Fortuner Car object
// fortuner.setBrandName(`Toyota`);
let Camero = new Car(`Chevorlet`, 22);
// Camero.setBrandName(`Chevorlet`); */

//$Inheritance

/*//& Parent Class ( Superset )
/& class Person {
    eat() {
        console.log(`eating`);
    }
    sleep() {
        console.log(`sleeping`);
    }
}

//& Child Class of Person
class Engineer extends Person {
    work() {
        console.log(`working`);
    }
}
//& Child Class of Person
class Doctor extends Person {
    operate() {
        console.log(`operating`);
    }
}

let doctor = new Engineer();

//& Now eat and sleep methods will be accesible to objects of Engineer and Doctor as they're the child class of Person

//& Method Overriding - If there are same methods in Parent and Child classes, child class method is called.
 */

//$ Super Keyword

//& Constructor control flow in parent and child class and use of super keyword
/* class Person {
    constructor(name) {
        this.species = "Homo Sapiens";
        this.name = name;
        console.log(`Entered Parent Constructor`);
    }
    eat() {
        console.log(`eating`);
    }
    sleep() {
        console.log(`sleeping`);
    }
}
//& Child Class of Person
class Engineer extends Person {
    constructor(name) {
        console.log(`Entered Child Constructor`);

        super(name); //& Passing the name argument to parent class with super()

        this.name = name;
        console.log(`Exited Child Constructor`);
    }

    work() {
        console.log(`working`);
    }
}

// let eng = new Engineer(`CS`);
let obj = new Engineer(`Kaustubh`); */

//- Advanced JS - Async Await, Promises, Callbacks

//$ Async Programming
/* 
console.log(`1`);
console.log(`2`);

//& Asynchronous ( will be executed parallely and code after it will still execute immediately w/o waiting for this)
setTimeout(() => {
    console.log(`hello`);
}, 5000);

console.log(`3`);
console.log(`4`); */

//$ Callback Hell / Nesting

/* function getData(data, nextData) {
    setTimeout(() => {
        console.log(data);
        if (nextData) {
            nextData();
        }
    }, 2000);
}

//& Difficult to manage this code of callback nesting/hell
getData(1, () => {
    getData(2, () => {
        getData(3, () => {
            getData(4);
        });
    });
}); */

//$ To resolve this, Promise was introduced

//& Creating promises to understand the concept
/* let prom = new Promise((resolve, reject) => {
    console.log(`I'm a promise`);

    // resolve(`Promise fulfilled.`); //& Fulfilled State using resolve

    reject(`Promise unfulfilled, some error occurred.`); //& Value passed to reject will be shown as an error
}); */

//& Generally we don't create our Promises, Promises are returned to us by some API etc. Then we handle that promise -

/* function getData(data, nextData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(`success`); //& If not resolved/reject, the promise state will always remain pending
            if (nextData) {
                nextData();
            }
        }, 2000);
    });
}

let val = getData(23).then((data) => {
    console.log(data);
    return data;
})
val.then((data) => {
    console.log(data);
    return data;
});
setTimeout(() => {
    console.log(val);
}, 3000); */

//& Actually using a promise returned by an API or something else
//& No need to pass callbacks now
/*function returnPromise() {
    return new Promise((resolve, reject) => {
        console.log(`Inside Promise`);

        const state = true;

        if (state) {
            resolve(`Promise fulfilled!`);
        } else {
            reject(`Promise rejected coz of some error`);
        }
    });
} //& A function that returns a promise ( mimicing the behaviour of an API)

let promise = returnPromise(); //& Storing the returned promise in a var.

promise
    .then((result) => {
        console.log(`In then, resolved msg - ${result}`);
    }) //& What to do when promise was fulfilled
    .catch((error) => {
        console.log(`In catch, error msg - ${error}`);
    }); //& What to do when promise was rejected */

//$ Promise Chains

/* //$ Simple working Promise
//& API work kind of
function asyncFunc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`data1`);
            resolve(`success`);
        }, 3000);
    });
}

let p1 = asyncFunc();

//& Handling the promise returned by API
console.log(`fetching data 1`);
p1.then((result) => {
    console.log(result);
}); */

//$ Promise chaining basic

/* //& API work kind of
function asyncFunc1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`data1`);
            resolve(`success`);
        }, 3000);
    });
}
function asyncFunc2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`data2`);
            resolve(`success`);
        }, 3000);
    });
}

let p1 = asyncFunc1();
let p2 = asyncFunc2();

//# In this case, both promises will be resolved together
//& Handling the promise1 returned by API
console.log(`fetching data 1`);
p1.then((result) => {
    console.log(result);
});
//& Handling the promise2 returned by API
console.log(`fetching data 2`);
p2.then((result) => {
    console.log(result);
}); */

//& So to avoid and implement async prog., we chain promises

//& API work kind of
/* function asyncFunc1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`data1`);
            resolve(`success`);
        }, 3000);
    });
}
function asyncFunc2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`data2`);
            resolve(`success`);
        }, 3000);
    });
}

let p1 = asyncFunc1();

//% Now both promises are chained together so that 1st one is executed first and data is fetched & then after 3 more seconds, 2nd is executed and 2nd data is fetched
//% like in a login page, we want to fetch the username first and after it is found then we match the password
//& Handling the promise1 returned by API
console.log(`fetching data 1`);
p1.then((result) => {
    //& Handling the promise2 returned by API
    let p2 = asyncFunc2();
    console.log(`fetching data 2`);
    p2.then((result) => {
        console.log(result);
    });
}); */

//& Actual/Better way to chain promises

/* function asyncFunc1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`data1`);
            resolve(`success`);
        }, 3000);
    });
}
function asyncFunc2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`data2`);
            resolve(`success`);
        }, 3000);
    });
}

console.log(`fetching data 1`);
asyncFunc1().then((result) => {
    console.log(`fetching data 2`);
    asyncFunc2().then((result) => {
        console.log(result);
    });
}); */

//& Previous Example with Promises
/* function getData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(`success`);
        }, 2000);
    });
}

//& Actual Promise Chain
getData(1)
    .then((result) => {
        return getData(2);
    })
    .then((result) => {
        return getData(3);
    })
    .then((result) => {
        return getData(4);
    })
    .then((result) => {
        console.log(result);
    }); */

//$ Async - Await

//^ Better, simpler and more readable way to write Async programming code

//& Basic Example to understand
//& API that returns weather data
/* function api() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`weather data`);
            resolve(`successfully gave weather data`);
        }, 2000);
    });
}

async function getWeatherData() {
    await api(); //& All ahead execution will be stopped until this process is done
    await api();
}

getWeatherData(); */

//& Previous getData() example with Async - Await

/* function getData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(`success`);
        }, 2000);
    });
}

async function getDataAgain() {
    await getData(1);
    await getData(2);
    await getData(3);
}

// getDataAgain(); //& Unnecessary Call to async Function

//% To avoid that unnecessary call, Use IIFE, but can use IIFE only once as it doesn't have any name
(async function () {
    await getData(1);
    await getData(2);
    await getData(3);
})(); */

//- setTimeout(), clearTiemout() and setInterval(), clearInterval() functions funcitoning

/* const displayDate = () => {
    let date = new Date();
    console.log(date.toLocaleTimeString());
};

let dateStop;

let dateCall = () => {
    dateStop = setInterval(displayDate, 1000);
};

document.querySelector(`#start`).addEventListener(`click`, dateCall);
document.querySelector(`#stop`).addEventListener(`click`, () => {
    clearInterval(dateStop);
});

function changeText() {
    document.querySelector(`h1`).innerHTML = `KT`;
}
let change;
function changeName() {
    change = setTimeout(changeText, 3000);
}
document.querySelector(`#start`).addEventListener(`click`, changeName);
document.querySelector(`#stop`).addEventListener(`click`, () => {
    clearTimeout(change);
}); */

//- Fetch API

/* let url = `https://api.github.com/users/kaustubh-tripathi-1`;
let response;
async function github() {
    try {                               //& In async-await, we use try, catch block to handle with errors as we used to do with .then() and .catch() with Promises
        response = await fetch(url);
        js = await response.json(); //& To convert the object into JSON, can use .json() but as this task is also async, we use await here too.
        console.log(response);
        console.log(js);
        console.log(typeof response);
        console.log(typeof js);
    } catch (error) {
        console.log(error);
    }
}

github(); */

//$ Using the fetched data from API in our Webpage

/* let para = document.querySelector(`#data`);

let url = `https://api.github.com/users/kaustubh-tripathi-1`;
let response;
async function github() {
    try {
        response = await fetch(url);
        js = await response.json(); //& Converts the Object to JSON
        console.log(response);
        console.log(response.url); //& Possible as it is a Response Object
        console.log(response.ok); //& Response object's ok property ( bool ) which states the response was successful
        console.log(response.status); //& Response object's status property contains the HTTP Code for the response
        console.log(js);
        console.log(typeof response);
        console.log(typeof js);

        para.innerHTML = `${js.bio}`; //& Inserting the data fetched from the API in our webpage
    } catch (error) {
        console.log(error);
    }
}

github(); */

//- Event Loop working

/* What is the JavaScript Event Loop?
The event loop is a fundamental part of JavaScript's concurrency model that allows it to handle asynchronous tasks, despite being a single-threaded language. JavaScript uses the event loop to manage the execution of code, collect and process events, and execute queued sub-tasks (such as callback functions).



Here’s a breakdown of how the event loop works:

Call Stack: This is where your functions get executed. When a function is called, it gets pushed to the call stack. When it finishes executing, it's popped off the call stack. JavaScript executes everything in the call stack synchronously, one task at a time.

Web APIs (for Browser): When an asynchronous function like setTimeout(), fetch(), or event listeners are triggered, these tasks are passed to the browser's Web API. The Web API handles these asynchronous operations outside of the main call stack.

Task Queue: Once an asynchronous task completes (like a setTimeout callback after the specified delay), the callback function is moved to the task queue (also called the callback queue).

Event Loop: The event loop continuously checks if the call stack is empty. If the call stack is empty and there are tasks in the task queue, the event loop moves the first task from the task queue to the call stack and executes it. This ensures that asynchronous tasks (like setTimeout() callbacks) are executed after the synchronous code has finished.

Microtask Queue: In addition to the task queue, there's also a microtask queue, which includes tasks like promises. These microtasks have a higher priority than tasks in the task queue and are executed after the current code in the call stack finishes but before any task queue callbacks. */

//- Call() and this in JS

//$ Using another function with the context (this) of current function

/* function SetUsername(username) {
    //complex DB calls
    this.username = username;
    console.log("called");
}

function createUser(username, email, password) {
    SetUsername.call(this, username); //& Call method, if call() is not used then when setUsername() is called, its variable username is destroyed as soon as the function's memory is released and createUsername() 's username parameter isn't initialized

    this.email = email;
    this.password = password;
}

const kt = new createUser("kaustubh", "kt@abc.com", "123");
console.log(kt); */

//$ Borrowing a method from another object

/* const person1 = {
    name: "Alice",
    greet: function (greeting) {
        console.log(`${greeting}, my name is ${this.name}`);
    },
};

const person2 = {
    name: "Bob",
};

//& Borrow person1's greet method and use it for person2
person1.greet.call(person2, "Hello");   //& Can write object name as well as 'this' represents an object 
*/

//- apply()

//$ same as call(), only diff. is that list of arguments are in form of array

/* function SetUsername(username) {
    //complex DB calls
    this.username = username;
    console.log("called");
}

function createUser(username, email, password) {
    SetUsername.apply(this, [username]); //& apply() method, with username arg. passed as an array

    this.email = email;
    this.password = password;
}

const kt = new createUser("kaustubh", "kt@abc.com", "123");
console.log(kt); */

//- bind() in JS

//& Permanently binding a method to an object
/* const person = {
    name: "John",
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    },
};

const greetJohn = person.greet.bind(person); //$ Binding `this` to `person`
greetJohn(); //$ This will still refer to `person` when called later
//$ Without bind(), greetJohn() would've lost its context ( this ) and refer to the global object

//& Using bind() to preserve this in Event handlers

let button = document.querySelector(`#btn`);

const user = {
    name: "Alice",
    handleClick: function () {
        console.log(`Clicked by ${this.name}`);
    },
};

//$ Using bind to make sure `this` refers to the `user` object
button.addEventListener(`click`, user.handleClick.bind(user));
//$ Without bind(), this in handleClick() would refer to the button itself */

//& Partial Application of Arguments ( currying )
//& Binding with arguments
/* function multiply(a, b) {
    return a * b;
}

const multiplyBy5 = multiply.bind(null, 5); //$ Pre-setting the first argument (a = 5), this is null meaning context doesn't matter

console.log(multiplyBy5(4)); //$ 20 = 5 * 4 */

//& bind() with event handlers and React class

//$ When the button is click, the handleClick() method is executed with the context of app Object
/* class React {
    constructor() {
        this.library = `React`;
        this.server = `https://localhost:5000`;

        document
            .querySelector(`#button`)
            .addEventListener(`click`, this.handleclick.bind(this));
    }

    handleclick() {
        console.log(`button clicked`);
        console.log(this);
        console.log(this.server);
        console.log(this.library);
    }
}

const app = new React(); */
