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
}
    
export const obtenerUltimosTickets = async (usuarioId) => {

    const response = await axios.get(
        `${API_URL}/ultimos-tickets/${usuarioId}`
    );

    return response.data;
};

export const TodosTickets = async (usuarioId) => {
    const response = await axios.get(
        `${API_URL}/todos-tickets/${usuarioId}`
    );

    return response.data;
};


export const InfoTicket = async (usuarioId) => {

    const response = await axios.get(
        `${API_URL}/info-ticket/${usuarioId}`
    );

    return response.data;
};

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
