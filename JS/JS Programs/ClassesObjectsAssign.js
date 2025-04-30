//- Apna College Qs

//- Question 1 & 2

let data = `Some Data`;

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    viewData() {
        console.log(`Data is - ${data}`);
    }
}

class Admin extends User {
    constructor(name, email) {
        super(name, email);
    }

    editData(newData) {
        data = newData;
    }
}

let Abhi = new User(`Abhi`, `abhi123@gmail.com`);
let Rawat = new User(`Rawat`, `Rawat123@gmail.com`);

Abhi.viewData();
Rawat.viewData;
console.log(Rawat.name);

let Mahender = new Admin(`Mahender`, `mahender@gmail.com`);

Mahender.editData(`data is changed!`);
