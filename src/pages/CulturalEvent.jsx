import { useEffect, useState } from "react";
import Map from "../components/sy/Map";
import axios from "axios";
import List from "../components/sy/List";

function CulturalEvent() {
    const [district, setDistrict] = useState("중구");
    const [event, setEvent] = useState([]);

    const getEventList = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKSERVER + '/event', {
                params: { district }
            });
    
            console.log(response.data);
            setEvent(response.data);

        } catch(error) {
            console.log(error)
        }

    };

    // useEffect(() => {
    //     getEventList();
    // }, [])

    useEffect(() => {
        getEventList();
    }, [district])


    return (
        <>
        <h1>Cultural Event</h1>
        <div style={{display: "flex"}}>
            <List event={event} />
            <Map event={event} />
        </div>
        </>
    );
}

export default CulturalEvent;