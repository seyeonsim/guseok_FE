import axios from "axios";

export const getEventList = async (district, setEvent, limit = null) => {
    try {
        const response = await axios.get(process.env.REACT_APP_BACKSERVER + '/event', {
            params: { district, limit }
        });

        console.log(response.data);
        setEvent(response.data);

    } catch(error) {
        console.log(error)
    }

};

export const getParkList = async (district, setPark, limit) => {
    try {
        const response = await axios.get('http://localhost:8080' + '/park/list', {
            params: { district, limit }
        });
        
        console.log(response.data);
        setPark(response.data);

    } catch(error) {
        console.log(error);
    }
};

export const getUserDistrict = async (setDistrict) => {
    const token = localStorage.getItem("token"); 
    if (!token) {
        return; 
    }

    try {
        const response = await axios.get(process.env.REACT_APP_BACKSERVER + '/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }
        );
        console.log(response.data.district);
        setDistrict(response.data.district);

    } catch (error) {
        console.error(error);
    }
}