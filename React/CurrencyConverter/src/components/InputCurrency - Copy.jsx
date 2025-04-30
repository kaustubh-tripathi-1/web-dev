import { useDebounce } from "../hooks/useDebounce.js";

export default function InputCurrency({
    currencies = [],
    currencyData,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    selectName,
    forLabel,
    className = ``,
}) {
    const debouncedFromAmount = useDebounce(fromAmount, 3000);
    const debouncedToAmount = useDebounce(toAmount, 3000);

    /**
     * @param {Event} event
     */
    function handleOnChange(event) {
        const inputValue = event.target.value;

        if (inputValue === "") {
            if (forLabel === "from") {
                setFromAmount("");
                setToAmount("");
            } else {
                setToAmount("");
                setFromAmount("");
            }
            return;
        }

        const numericValue = Number(inputValue);
        if (isNaN(numericValue) || numericValue < 0) return;

        if (forLabel === "from") {
            setFromAmount(numericValue);
        } else {
            setToAmount(numericValue);
        }
    }

    function handleOnChangeSelect(e) {
        if (selectName === "from-select") {
            setFromCurrency(e.target.value);
        } else {
            setToCurrency(e.target.value);
        }
    }

    return (
        <div
            className={`w-full h-5/12 p-3 bg-white grid grid-cols-2 grid-rows-2 justify-between rounded-xl ${className}`}
        >
            <label
                htmlFor={forLabel}
                className="text-gray-700 text-xl justify-self-start"
            >
                {forLabel === "from" ? "From" : "To"}
            </label>
            <p className="text-gray-700 text-xl justify-self-end">
                Currency Type
            </p>
            <input
                className="h-5/6 w-9/6 px-2 bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 self-center outline-none text-xl rounded-xl transition-colors duration-200 ease-in-out"
                type="number"
                id={forLabel}
                value={forLabel === `from` ? fromAmount : toAmount}
                onChange={handleOnChange}
            />
            <select
                className="bg-blue-200 w-4/12 h-5/6 hover:bg-blue-300 focus:bg-blue-300 self-center justify-self-end rounded-xl px-2 cursor-pointer outline-none transition-colors duration-200 ease-in-out"
                name={selectName}
                value={selectName === "from-select" ? fromCurrency : toCurrency}
                onChange={handleOnChangeSelect}
            >
                {currencies.map((currency) => (
                    <option value={currency} key={currency} className="text-lg">
                        {currency.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
        // <div
        //     className={`w-full h-5/12 p-3 bg-white grid grid-cols-2 grid-rows-2 justify-between rounded-xl ${className}`}
        // >
        //     <label
        //         htmlFor={forLabel}
        //         className="text-gray-700 text-xl justify-self-start"
        //     >
        //         {forLabel === `from` ? "From" : "To"}
        //     </label>
        //     <p className="text-gray-700 text-xl justify-self-end">
        //         Currency Type
        //     </p>
        //     <input
        //         className="h-5/6 w-9/6 px-2 bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 self-center outline-none text-xl rounded-xl "
        //         type="number"
        //         id={forLabel}
        //         value={forLabel === `from` ? fromAmount : toAmount}
        //         onChange={handleOnChange}
        //     />
        //     {
        //         <select
        //             className="bg-blue-200 w-4/12 h-5/6 hover:bg-blue-300 focus:bg-blue-300 self-center justify-self-end rounded-xl px-2 cursor-pointer outline-none"
        //             name={selectName}
        //             value={
        //                 selectName === `from-select` ? fromCurrency : toCurrency
        //             }
        //             onChange={handleOnChangeSelect}
        //         >
        //             {currencies.map((currency) => {
        //                 return (
        //                     <option value={currency} key={currency}>
        //                         {currency.toUpperCase()}
        //                     </option>
        //                 );
        //             })}
        //         </select>
        //     }
        // </div>
    );
}
