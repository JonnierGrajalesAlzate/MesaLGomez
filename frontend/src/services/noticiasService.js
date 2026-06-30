import axios from "axios";

const API_URL = "http://localhost:3000/api/noticias";

export const getNoticias = async () => {

    const response = await axios.get(API_URL);

    return response.data.noticias;

};