import { useEffect, useMemo, useState } from "react";
import { useCurrencyInfo } from "./hooks/useCurrencyInfo.js";
import { useDebounce } from "./hooks/useDebounce.js";
import InputCurrency from "./components/InputCurrency.jsx";
import swapIcon from "./assets/sort.png";

export default function App() {
    const [fromCurrency, setFromCurrency] = useState(`usd`);
    const [toCurrency, setToCurrency] = useState(`inr`);
    // const [currencies, setCurrencies] = useState([]);
    const [currencyData, error] = useCurrencyInfo(fromCurrency);
    const [fromAmount, setFromAmount] = useState(``);
    const [toAmount, setToAmount] = useState(``);
    const [lastChanged, setLastChanged] = useState("from");

    //$ W/O memoizing currencies array for currency dropdown
    /* useEffect(() => {
        if (currencyData) {
            setCurrencies(Object.keys(currencyData));
        }
    }, [currencyData]); */

    //$ Memoizing currencies array for currency dropdown
    const currencies = useMemo(() => {
        return currencyData ? Object.keys(currencyData) : [];
    }, [currencyData]);

    //$ Add debounced values for amounts
    const debouncedFromAmount = useDebounce(fromAmount, 300);
    const debouncedToAmount = useDebounce(toAmount, 300);

    //$ W/O debounced state
    /* useEffect(() => {
        if (!currencyData) return;

        if (lastChanged === "from") {
            if (fromAmount === "" || fromAmount < 0) {
                setToAmount("");
            } else {
                setToAmount((currencyData[toCurrency] * fromAmount).toFixed(2));
            }
        } else if (lastChanged === "to") {
            if (toAmount === "" || toAmount < 0) {
                setFromAmount("");
            } else {
                setFromAmount((toAmount / currencyData[toCurrency]).toFixed(2));
            }
        }
    }, [currencyData, fromAmount, toAmount, toCurrency, lastChanged]); */

    //$ With debounced state
    useEffect(() => {
        if (!currencyData) return;

        //$ Unnecessary state updates
        /* if (lastChanged === "from") {
            if (debouncedFromAmount === "" || debouncedFromAmount < 0) {
                setToAmount("");
            } else {
                setToAmount(
                    (currencyData[toCurrency] * debouncedFromAmount).toFixed(2)
                );
            }
        } else if (lastChanged === "to") {
            if (debouncedToAmount === "" || debouncedToAmount < 0) {
                setFromAmount("");
            } else {
                setFromAmount(
                    (debouncedToAmount / currencyData[toCurrency]).toFixed(2)
                );
            }
        } */

        if (lastChanged === "from" && debouncedFromAmount !== "") {
            setToAmount(
                parseFloat(
                    currencyData[toCurrency] * debouncedFromAmount
                ).toFixed(2)
            );
        } else if (lastChanged === "to" && debouncedToAmount !== "") {
            setFromAmount(
                parseFloat(
                    debouncedToAmount / currencyData[toCurrency]
                ).toFixed(2)
            );
        }
    }, [
        currencyData,
        debouncedFromAmount,
        debouncedToAmount,
        toCurrency,
        lastChanged,
    ]);

    function swapFromAndTo() {
        if (fromCurrency === toCurrency) return; // Prevent redundant swaps

        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    }

    console.log(`re-rendered`);

    return (
        <main className="min-h-screen w-full bg-[url(./assets/bgImages/17454.jpg)] bg-cover bg-no-repeat bg-center flex flex-col items-center justify-evenly p-4">
            {/* <h1 className="w-full h-20 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex justify-center items-center text-4xl font-extrabold"> */}
            <h1
                className="w-full h-20 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl 
               bg-gradient-to-r from-blue-800 via-yellow-500 to-green-500 
               bg-[length:200%_200%] animate-[bg-slide_3s_infinite] 
               backdrop-blur-xs rounded-2xl shadow-lg 
               flex justify-center items-center 
               text-4xl font-extrabold text-transparent bg-clip-text"
            >
                Currency Converter
            </h1>
            <section className="w-full min-h-fit max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex flex-col gap-6">
                <div className="w-full min-h-max transition-all duration-500 ease-in-out transform hover:scale-105 flex flex-col gap-6">
                    <InputCurrency
                        currencyData={currencyData}
                        currencies={currencies}
                        fromCurrency={fromCurrency}
                        setFromCurrency={setFromCurrency}
                        toCurrency={toCurrency}
                        setToCurrency={setToCurrency}
                        fromAmount={fromAmount}
                        setFromAmount={(value) => {
                            setFromAmount(value);
                            setLastChanged("from");
                        }}
                        toAmount={toAmount}
                        setToAmount={(value) => {
                            setToAmount(value);
                            setLastChanged("to");
                        }}
                        selectName="from-select"
                        forLabel="from"
                    />
                    <button
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-28 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base sm:text-lg font-semibold rounded-xl border-2 border-amber-300 hover:border-amber-400 shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 cursor-pointer"
                        type="button"
                        onClick={swapFromAndTo}
                    >
                        <img
                            className="w-5 inline-block mr-1 -mt-1 animate-spin-slow hover:animate-spin"
                            src={swapIcon}
                            alt="swap-icon"
                        />
                        Swap
                    </button>
                    <InputCurrency
                        currencyData={currencyData}
                        currencies={currencies}
                        fromCurrency={fromCurrency}
                        setFromCurrency={setFromCurrency}
                        toCurrency={toCurrency}
                        setToCurrency={setToCurrency}
                        fromAmount={fromAmount}
                        setFromAmount={(value) => {
                            setFromAmount(value);
                            setLastChanged("from");
                        }}
                        toAmount={toAmount}
                        setToAmount={(value) => {
                            setToAmount(value);
                            setLastChanged("to");
                        }}
                        selectName="to-select"
                        forLabel="to"
                    />
                    {error && (
                        <p className="w-full text-center text-red-600 text-sm sm:text-lg font-semibold bg-amber-200/80 rounded-lg p-2 sm:p-3 shadow-md animate-pulse">
                            {error}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}
