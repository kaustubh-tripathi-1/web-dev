import marker from "../assets/marker.png";

export default function Card(props) {
    return (
        <div className="flex justify-center h-2/6 w-full p-2">
            <div className="h-44 w-32 ">
                <img
                    src={props.img.src}
                    alt={props.img.alt}
                    className="h-full w-full object-cover rounded-xl"
                />
            </div>
            <div className="flex flex-col w-3/6 pl-2 lg:w-2/6">
                <div className="flex w-4/6 pt-3 space-x-3">
                    <div className="flex space-x-1">
                        <img
                            src={marker}
                            alt="location-pin"
                            className="h-3 m-0.5"
                        />
                        <p className="text-xs">{props.country.toUpperCase()}</p>
                    </div>
                    <a
                        href={props.googleMapsLink}
                        className="text-xxs text-gray-400 underline"
                        target="_blank"
                    >
                        View on Google Maps
                    </a>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{props.location}</h2>
                </div>
                <div className="pt-3">
                    <p className=" text-sm font-semibold"> {props.dates} </p>
                    <p className="text-xs lg:text-small"> {props.desc} </p>
                </div>
            </div>
        </div>
    );
}
