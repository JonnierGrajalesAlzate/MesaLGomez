import axios from "axios";

const API_URL = "http://localhost:3000/api/dashboard";

export const obtenerDashboardUsuario = async (usuarioId) => {

    const response = await axios.get(
        `${API_URL}/usuario/${usuarioId}`
    );

    return response.data;

};