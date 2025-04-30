let body = document.querySelector(`body`);
let td1 = document.querySelector(`#td1`);
let td2 = document.querySelector(`#td2`);
let td3 = document.querySelector(`#td3`);

window.addEventListener(`keydown`, (event) => {
    event.preventDefault();

    td1.innerHTML = `${event.key === ` ` ? `Space` : event.key}`;
    td2.innerHTML = `${event.keyCode}`;
    td3.innerHTML = `${event.code}`;
});
