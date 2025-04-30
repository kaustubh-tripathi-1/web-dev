import { useState } from "react";
import avatar from "../../assets/ObjectStateImages/user.png";
import ToggleFavButton from "./ToggleFavButton.jsx";

export default function PracticeObjects() {
    const [contact, setContact] = useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (212) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: false,
    });

    function toggleFavorite() {
        setContact((prevContact) => {
            //$ For deep copy of nested objects
            const newContact = /* { ...prevContact } */ JSON.parse(
                JSON.stringify(prevContact),
            );
            newContact.isFavorite = !newContact.isFavorite;
            return newContact;

            //$ For shallow copy
            // return { ...prevContact, isFavorite: !prevContact.isFavorite };
        });
    }

    return (
        <main className="flex h-screen w-screen items-center justify-center bg-sky-900">
            <article className="card flex h-5/6 w-2/6 flex-col content-between items-center justify-around rounded-4xl bg-white">
                <img
                    src={avatar}
                    className="avatar w-4/6 justify-items-start"
                    alt="User profile picture of John Doe"
                />
                <div className="info flex h-3/6 w-full flex-col items-start justify-start">
                    <ToggleFavButton
                        toggleFavorite={toggleFavorite}
                        contact={contact}
                    />
                    <h2 className="name m-4 text-3xl font-bold">{`${contact.firstName} ${contact.lastName}`}</h2>
                    <p className="contact m-3 text-lg">{`${contact.phone}`}</p>
                    <p className="contact m-3 text-lg">{`${contact.email}`}</p>
                </div>
            </article>
        </main>
    );
}
