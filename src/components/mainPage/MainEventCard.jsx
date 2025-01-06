// 작성자 : 심세연

function MainEventCard({eventData}) {
    return ( <>
    <div className="main-card">
        <div className="card-img">
            <img src={eventData.main_img} alt={eventData.title} />
        </div>
        <div className="card-text">
            <h3 className="card-title">{eventData.title}</h3>
            <p>{eventData.event_date}</p>
            <p>{eventData.place}</p>
        </div>
    </div>
    </> );
}

export default MainEventCard;