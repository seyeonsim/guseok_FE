function MainEventCard({eventData}) {
    return ( <>
    <div>
        <div>
            <img src={eventData.main_img} alt={eventData.title} />
        </div>
        <div>
            <strong>{eventData.title}</strong>
            <p>{eventData.event_date}</p>
            <p>{eventData.place}</p>
        </div>
    </div>
    </> );
}

export default MainEventCard;