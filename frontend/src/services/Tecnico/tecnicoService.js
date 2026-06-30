import axios from "axios";

const API_URL = "http://localhost:3000/api/tecnico";

// ==========================
// Dashboard del técnico
// ==========================

export const obtenerDashboardTecnico = async (tecnico_id) => {

    try {

        const response = await axios.get(
            `${API_URL}/dashboard/${tecnico_id}`
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

// ==========================
// Detalle de ticket
// ==========================

export const obtenerDetalleTicket = async (id) => {

    try {

        const response = await axios.get(
            `${API_URL}/${id}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error obteniendo detalle:",
            error.response?.data || error.message
        );

        throw error;

    }

};

// ==========================
// Actualizar estado
// ==========================

export const actualizarEstadoTicket = async (id, estado_id) => {

    try {

        const response = await axios.put(
            `${API_URL}/${id}/estado`,
            {
                estado_id
            }
        );

        return response.data;

    } catch (error) {

        console.error(
            "Error actualizando ticket:",
            error.response?.data || error.message
        );

        throw error;

    }

};