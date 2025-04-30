//- Question 1

/* const para = document.querySelector("#description");

para.innerHTML = "Hello, World!"; */

//- Question 2

/* const item = document.querySelectorAll(".item");

for (let i = 0; i < item.length; i++) {
    item[i].style.backgroundColor = "#606060";
    item[i].style.padding = "20px";
}
 */
//- Question 3

/* let outerDiv = document.querySelector(".text");

let ul1 = document.createElement("ul");
ul1.setAttribute("id", "myList");
ul1.style.backgroundColor = "red";

outerDiv.prepend(ul1);

let li1 = document.createElement("li");

li1.innerText = "New Item";

ul1.prepend(li1); */

//- Question 4

/* let allDiv = document.querySelectorAll("div");

allDiv.forEach((node) => {
    node.classList.add("menu-item");
});

let menu = document.querySelectorAll(".menu-item");

for (let i = 0; i < menu.length; i++) {
    menu[i].style.fontSize = "2rem";
} */

//- Question 5

/* para.setAttribute("id", "deleteMe");

let deleteButton = document.createElement("button");
deleteButton.setAttribute("id", "removeBtn");

const text = document.createTextNode("Click me to delete the paragragh");
deleteButton.appendChild(text);

const thirdChild = outerDiv.children[2];

outerDiv.insertBefore(deleteButton, thirdChild);

function deleteElement() {
    let paraToDelete = document.querySelector("#deleteMe");
    if (paraToDelete) {
        paraToDelete.remove();
    }
}

deleteButton.addEventListener("click", deleteElement); */

//- Question 6

/* let oldPara = document.querySelector(`#old-text`);

let newPara = document.createElement(`p`);

newPara.textContent = `This is new text`;

oldPara.replaceWith(newPara); */

//- Question 7

/* const div = document.querySelector(`#container`);

div.innerHTML = `<div class="newBox">
                    <h3>New Title</h3>
                    <p>Some content here...</p>
                </div>`; */

//- Question 8

/* const body = document.querySelector(`body`);
const tableDiv = document.querySelector(`#table-container`);
let flag = true;

const button = document.createElement(`button`);
button.innerHTML = `Click me to add a table in the Web Page`;

body.append(button);

button.addEventListener(`click`, createTable);

function createTable() {
    if (flag) {
        // flag = false;
        const table = document.createElement(`table`);

        for (let i = 0; i < 3; i++) {
            let row = document.createElement(`tr`);
            for (let j = 0; j < 3; j++) {
                let column = document.createElement(`td`);

                column.textContent = `${i + 1} - ${j + 1}`;

                row.append(column);
            }
            table.append(row);
        }

        tableDiv.append(table);
        table.classList.add(`table`);

        button.textContent = "Table Created!";
        button.disabled = true;
    }
} */

//- Question 9

/* const body = document.querySelector(`body`);

const input = document.createElement(`input`);
input.setAttribute(`type`, `text`);

const btn = document.createElement(`button`);
btn.textContent = `Click me to change the BG Color of Div`;

const div = document.querySelector(`#colorBox`);

div.append(input, btn);

btn.addEventListener(`click`, () => {
    let color = input.value;

    div.style.backgroundColor = color;
}); */

//- Question 10

/* const para = document.createElement(`p`);
const span = document.createElement(`span`);

// let flag = false; //$ false for normal state
span.textContent = `This is some sample text to be tested for highlight and whatnot`;

para.append(span);

let paraText = para.textContent;

const btn = document.createElement(`button`);
btn.textContent = `Click to highlight the text of para`;

document.querySelector(`body`).append(para, btn);

btn.addEventListener(`click`, () => {
    // if (!flag) {
    //     flag = true;

    //     //& Direct styling without class
    //     // para.innerHTML = `<mark style = "background-color : pink">${paraText}</mmark`;

    //     //& Styling with class in external CSS
    //     para.classList.remove(`normal`);
    //     para.classList.add(`highlight`);
    // } else {
    //     flag = false;

    //     //& Direct styling without class
    //     // para.innerHTML = paraText;

    //     //& Styling with class in external CSS
    //     para.classList.remove(`highlight`);
    //     para.classList.add(`normal`);
    // }

    //% Directly with classList.toggle() method

    span.classList.toggle(`highlight`);
}); */

//- Question 11

/** const divContainer = document.querySelector(`#dynamicContainer`);

(function createDivs() {
    for (let i = 0; i < 5; i++) {
        let div = document.createElement(`div`);

        let head = document.createElement(`h${i + 1}`);

        head.textContent = `Heading ${i + 1}`;

        div.append(head);

        divContainer.append(div);
    }
})();
 */
