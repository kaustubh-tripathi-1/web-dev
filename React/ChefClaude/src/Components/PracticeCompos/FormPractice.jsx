export default function FormPractice() {
    function signUp(formData) {
        //$ Grabbing each input's value individually
        /* const email = formData.get("email");
        const password = formData.get("password");
        const employmentStatus = formData.get("employmentStatus");
        const desc = formData.get("description");
        const langs = formData.getAll("languages");
        console.log(email);
        console.log(password);
        console.log(desc);
        console.log(employmentStatus);
        console.log(langs); */

        //$ Grabbing all form data in an object
        const data = Object.fromEntries(formData); //& doesn't get all the checked values of the checkboxes, for that use .getAll() too
        const languages = formData.getAll("languages");

        const newData = { ...data, languages };

        console.log(newData);
    }

    return (
        <section className="flex h-full w-full flex-col items-center bg-sky-400">
            <h1 className="mt-4 h-15 w-2/6 text-center text-4xl font-bold">
                Signup form
            </h1>
            <form
                // action={(formData) => signUp(formData)}
                onSubmit={(event) => {
                    event.preventDefault();
                    signUp(new FormData(event.currentTarget));
                    event.currentTarget.reset();
                }}
                className="flex h-5/6 w-3/6 flex-col items-start justify-start"
            >
                <label htmlFor="email" className="h-fit w-full text-2xl">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="joe@schmoe.com"
                    defaultValue="joe@schmoe.com"
                    autoComplete="on"
                    className="mt-2 mb-2 h-10 w-full rounded-2xl bg-white pl-3 text-lg text-black placeholder:text-gray-700"
                />

                <label htmlFor="password" className="h-fit w-full text-2xl">
                    Password:
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    defaultValue="pass123"
                    autoComplete="current-password"
                    className="mt-2 mb-2 h-10 w-full rounded-2xl bg-white pl-3 text-lg text-black"
                />

                <label htmlFor="description" className="h-fit w-full text-2xl">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue="This is a description"
                    className="mt-4 mb-4 w-full resize-none bg-white p-2 outline-none focus:border-2 focus:border-blue-700"
                ></textarea>

                <fieldset className="mt-4 mb-4 w-full">
                    <legend className="mb-2 h-fit w-full text-2xl">
                        Employment Status:
                    </legend>
                    <label className="mr-2">
                        <input
                            type="radio"
                            name="employmentStatus"
                            className="mr-2"
                            value="unemployed"
                            required
                        />
                        Unemployed
                    </label>
                    <label className="mr-2 ml-2">
                        <input
                            type="radio"
                            name="employmentStatus"
                            className="mr-2 ml-2"
                            value="partTime"
                        />
                        Part-time
                    </label>
                    <label className="mr-2 ml-2">
                        <input
                            type="radio"
                            name="employmentStatus"
                            className="mr-2 ml-2"
                            value="fullTime"
                            defaultChecked
                        />
                        Full-time
                    </label>
                </fieldset>

                <fieldset className="mb-4">
                    <legend className="mb-2 h-fit w-full text-2xl">
                        Languages you know :
                    </legend>
                    <input
                        className="mr-2"
                        type="checkbox"
                        name="languages"
                        id="c"
                        value="c"
                    />
                    <label className="mr-2" htmlFor="c">
                        C
                    </label>
                    <input
                        type="checkbox"
                        name="languages"
                        id="c++"
                        value="c++"
                        className="mr-2 ml-2"
                    />
                    <label htmlFor="c++">C++</label>
                    <input
                        type="checkbox"
                        name="languages"
                        id="java"
                        value="java"
                        className="mr-2 ml-2"
                    />
                    <label htmlFor="java">Java</label>
                    <input
                        type="checkbox"
                        name="languages"
                        id="python"
                        value="python"
                        className="mr-2 ml-2"
                    />
                    <label htmlFor="python">Python</label>
                    <input
                        type="checkbox"
                        name="languages"
                        id="javascript"
                        value="javascript"
                        className="mr-2 ml-2"
                    />
                    <label className="mr-2" htmlFor="javascript">
                        Javascript
                    </label>
                </fieldset>

                <button className="h-10 w-full cursor-pointer rounded-2xl border-2 border-emerald-700 bg-white text-center text-lg hover:bg-blue-700">
                    Submit
                </button>
            </form>
        </section>
    );
}
