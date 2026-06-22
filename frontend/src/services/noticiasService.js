import axios from "axios";

const API_URL = "http://localhost:3000";

export const getNoticias = async () => {
    const response = await axios.get(
        `${API_URL}/noticias`
    );

    return response.data;
};