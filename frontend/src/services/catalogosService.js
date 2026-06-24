import axios from "axios";

const API_URL = "http://localhost:3000/api/catalogos";

export const getCategorias = async () => {

    const response = await axios.get(
        `${API_URL}/categorias`
    );

    return response.data;
};

export const getPrioridades = async () => {

    const response = await axios.get(
        `${API_URL}/prioridades`
    );

    return response.data;
};