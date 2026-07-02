import axios from "axios";

const API_URL = "http://localhost:3000/api/catalogos";

export const obtenerCategorias = async () => {

    const response = await axios.get(
        `${API_URL}/categorias`
    );

    return response.data;
};

export const obtenerPrioridades = async () => {

    const response = await axios.get(
        `${API_URL}/prioridades`
    );

    return response.data;
};