const date = "2024.10.29";

const baseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;

const secondaryURL = `https://latest.currency-api.pages.dev/v1/currencies/eur.json`;

let dropdownSelects = document.querySelectorAll(`#dropdown select`);

let msg = document.querySelector(`#msg`);

for (let select of dropdownSelects) {
    for (currencyCode in countryList) {
        let newOption = document.createElement(`option`);

        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        select.append(newOption);

        if (select.name === `from` && currencyCode === `USD`) {
            newOption.selected = true;
        } else if (select.name === `to` && currencyCode === `INR`) {
            newOption.selected = true;
        }
    }

    select.addEventListener(`change`, (event) => {
        updateFlag(event.target);
    });
}

function updateFlag(element) {
    let currencyCode = element.value;

    let countryCode = countryList[currencyCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let image = element.parentElement.querySelector(`img`);

    image.src = newSrc;
}

let button = document.querySelector(`#btn`);

button.addEventListener(`click`, async (event) => {
    event.preventDefault();

    let amount = document.querySelector(`#amount-input`);

    let amountValue = amount.value;

    if (amountValue === `` || amountValue < 1 || isNaN(amountValue)) {
        amountValue = 1;
        amount.value = `1`;
    }

    const fromCurrency = document
        .querySelector(`#from select`)
        .value.toLowerCase();
    const toCurrency = document.querySelector(`#to select`).value.toLowerCase();

    const URL = `${baseURL}/${fromCurrency}.json`;

    console.log(URL);

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }

        let responseJSON = await response.json();

        let rate = responseJSON[fromCurrency][toCurrency];

        msg.innerHTML = `${amountValue} ${fromCurrency.toUpperCase()} = ${(
            rate * amountValue
        ).toFixed(2)} ${toCurrency.toUpperCase()}`;
    } catch (error) {
        msg.innerHTML = `Failed to fetch exchange rate. Try again later.`;
        console.error("Fetch error:", error);
        return;
    }
});
