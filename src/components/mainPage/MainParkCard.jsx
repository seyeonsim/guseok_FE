import { Link } from "react-router-dom";
import "../../styles/new/MainEventCard.css";

function MainParkCard({parkData}) {
    return ( <>
        <div className="main-card">
            <Link to={`/park/${parkData.id}`}>
                    <div className="card-img">
                        <img src={parkData.image} alt={parkData.name} />
                    </div>
                    <div className="card-text">
                        <strong className="card-title">{parkData.name}</strong>
                        <p>{parkData.address}</p>
                    </div>
            </Link>
        </div>
    </> );
}

export default MainParkCard;