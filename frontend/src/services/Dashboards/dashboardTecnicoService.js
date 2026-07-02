import axios from "axios";

const API_URL = "http://localhost:3000/api/dashboard";

    export const obtenerDashboardTecnico = async (tecnico_id) => {

    try {

        const response = await axios.get(
    `${API_URL}/tecnico/${tecnico_id}`
);

        return response.data;

    } catch (error) {

        console.error(
            "Error obteniendo dashboard:",
            error.response?.data || error.message
        );

        throw error;

    } 
};