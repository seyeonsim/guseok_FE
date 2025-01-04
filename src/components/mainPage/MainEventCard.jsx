function MainEventCard({eventData}) {
    return ( <>
    <div className="main-card">
        <div className="card-img">
            <img src={eventData.main_img} alt={eventData.title} />
        </div>
        <div className="card-text">
            <strong className="card-title">{eventData.title}</strong>
            <p className>{eventData.event_date}</p>
            <p>{eventData.place}</p>
        </div>
    </div>
    </> );
}

export default MainEventCard;