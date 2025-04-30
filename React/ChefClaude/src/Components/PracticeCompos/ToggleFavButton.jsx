import starFilled from "../../assets/ObjectStateImages/star-filled.png";
import starEmpty from "../../assets/ObjectStateImages/star-empty.png";

export default function ToggleFavButton({ toggleFavorite, contact }) {
    return (
        <button
            onClick={toggleFavorite}
            aria-pressed={contact.isFavorite}
            aria-label={
                contact.isFavorite
                    ? "Remove from favourites"
                    : "Add to favorites"
            }
            className="favorite-button m-4 h-1/6 w-15 cursor-pointer"
        >
            <img
                src={contact.isFavorite ? starFilled : starEmpty}
                alt={
                    contact.isFavorite ? "filled star icon" : "empty star icon"
                }
                className="favorite w-full"
            />
        </button>
    );
}
