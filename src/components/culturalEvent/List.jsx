import { useEffect, useRef } from "react";

function List({ eventData, selectedEvent, onListClick }) {
    const listRef = useRef(null);

    useEffect(() => {
        if (selectedEvent?.no && selectedEvent.no === eventData.no) {
            listRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selectedEvent, eventData]);

    return (
        <div 
            ref={listRef}
            style={{ 
                display: "flex", 
                padding: '10px', 
                margin: '10px', 
                cursor: 'pointer',
                border: selectedEvent.no === eventData.no ? '2px solid red' : '1px solid #ccc' 
            }}
            onClick={() => onListClick(eventData)}
        >
            <div>
                <img src={eventData.main_img} alt={eventData.title} />
            </div>
            <div>
                <strong>{eventData.title}</strong>
                <p>{eventData.place}</p>
            </div>
        </div>
    );
}

export default List;
