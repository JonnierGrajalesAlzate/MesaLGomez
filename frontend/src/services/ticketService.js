import axios from "axios";

const API_URL = "http://localhost:3000/api/tickets";

export const crearTicket = async (formData) => {

    const response = await axios.post(
        API_URL,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};