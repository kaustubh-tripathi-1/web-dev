import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState("");
    const [allowNum, setAllowNum] = useState(false);
    const [allowSpecialChar, setAllowSpecialChar] = useState(false);
    const [copied, setCopied] = useState(false);

    const passRef = useRef(null);

    function copyPassword() {
        if (!password) return; // Prevents copying empty passwords

        passRef.current?.select();
        window.navigator.clipboard.writeText(password);
        setCopied(true);

        setTimeout(() => {
            setCopied(false); // Hide after 3 seconds
        }, 3000);
    }

    const generatePassword = useCallback(
        //$ uses length as a default arg. but don't it as a dependency as it will defeat the purpose of useCallback, explicitly call generatePassword with an arg. instead
        (len = length) => {
            let pass = ``;
            let str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;

            if (allowNum) {
                str += "1234567890";
            }
            if (allowSpecialChar) {
                str += "~`!@#$%^&*_-";
            }

            for (let i = 0; i < len; i++) {
                let char = str.charAt(Math.floor(Math.random() * str.length));
                pass += char;
            }

            setPassword(pass);
        },
        [allowNum, allowSpecialChar],
    );

    useEffect(() => {
        generatePassword(length);
    }, [length, generatePassword]);

    return (
        <main className="flex h-full w-full justify-center bg-gray-900 text-amber-600">
            <section className="mt-10 h-3/12 w-3/6 transform rounded-2xl bg-blue-950 p-6 shadow-lg shadow-blue-400 transition-transform hover:scale-105 hover:transform">
                <div className="password-container flex h-3/6 w-full items-center justify-center">
                    <input
                        type="text"
                        readOnly
                        className="h-11 w-5/6 rounded-tl-xl rounded-bl-xl bg-white pr-4 pl-4 text-2xl font-semibold drop-shadow-xl selection:bg-amber-400 selection:text-blue-800"
                        name="password"
                        value={password}
                        ref={passRef}
                    />
                    <button
                        type="button"
                        className="h-11 w-1/6 cursor-pointer rounded-tr-xl rounded-br-xl bg-blue-700 text-2xl text-white hover:bg-blue-500 focus:bg-blue-500"
                        onClick={copyPassword}
                    >
                        Copy
                    </button>
                </div>
                <div className="settings-container flex h-11 w-full items-center justify-start">
                    <input
                        type="range"
                        name="password-length"
                        id="password-length"
                        value={length}
                        min={8}
                        max={30}
                        className="mx-1"
                        onChange={(event) => {
                            setLength(parseInt(event.target.value));
                        }}
                    />
                    <label
                        className="mx-1"
                        htmlFor="password-length"
                    >{`Length (${length})`}</label>
                    <input
                        type="checkbox"
                        name="allow-number"
                        id="allow-number"
                        className="mx-1"
                        checked={allowNum}
                        onChange={() => {
                            setAllowNum((prev) => !prev);
                        }}
                    />
                    <label className="mx-1" htmlFor="allow-number">
                        Numbers
                    </label>
                    <input
                        type="checkbox"
                        name="allow-special-char"
                        id="allow-special-char"
                        className="mx-1"
                        checked={allowSpecialChar}
                        onChange={() => {
                            setAllowSpecialChar((prev) => !prev);
                        }}
                    />
                    <label htmlFor="allow-special-char">
                        Special Characters
                    </label>
                </div>
            </section>
            <p
                className={`fixed bottom-[40px] left-1/2 -translate-x-1/2 -translate-y-10 rounded-lg bg-blue-600 px-4 py-2 text-lg font-semibold text-white transition-opacity duration-500 ${copied ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
                Copied to clipboard!✅
            </p>
        </main>
    );
}
