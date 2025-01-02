import axios from "axios";

export const getEventList = async (district, setEvent) => {
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