import axios from "axios";

const API_URL = "http://localhost:3000/api/dashboard";

export const getDashboard = async (usuarioId) => {

    const response = await axios.get(
        `${API_URL}/${usuarioId}`
    );

    return response.data;
};
export const getUltimosTickets = async (usuarioId) => {

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
