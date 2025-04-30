const start = document.querySelector(`#start`);
const stopp = document.querySelector(`#stop`);
const body = document.querySelector(`body`);

function randomColor() {
    const hex = `0123456789abcdef`;
    let color = `#`;

    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 17)];
    }
    return color;
}

let startColor;
function startChanging() {
    startColor = setInterval(() => {
        if (!startColor) {
            body.style.backgroundColor = randomColor();
        }
    }, 1000);
}
function stopChanging() {
    clearInterval(startColor);
    startColor = null;
}

start.addEventListener(`click`, startChanging);
stopp.addEventListener(`click`, stopChanging);
