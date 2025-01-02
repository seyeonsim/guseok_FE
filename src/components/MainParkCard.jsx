import { Link } from "react-router-dom";

function MainParkCard({parkData}) {
    return ( <>
    <Link to={`/park/${parkData.id}`}>
        <div>
            <div>
                <img src={parkData.image} alt={parkData.name} />
            </div>
            <div>
                <strong>{parkData.name}</strong>
                <p>{parkData.address}</p>
            </div>
        </div>
    </Link>
    </> );
}

export default MainParkCard;