import axios from "axios";

const API_URL = "http://localhost:3000/api/noticias";

// ==========================
// Obtener todas las noticias
// ==========================

export const getNoticias = async () => {

    const response = await axios.get(API_URL);

    return response.data.noticias;

};

// ==========================
// Obtener una noticia por ID
// ==========================

export const getNoticiaPorId = async (id) => {

    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data;

};

// ==========================
// Crear noticia
// ==========================

export const crearNoticia = async (noticia) => {

    const response = await axios.post(
        API_URL,
        noticia
    );

    return response.data;

};

// ==========================
// Actualizar noticia
// ==========================

export const actualizarNoticia = async (
    id,
    noticia
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        noticia
    );

    return response.data;

};

// ==========================
// Eliminar noticia
// ==========================

export const eliminarNoticia = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;

};
export const getEtiquetas = async () => {

    const response = await axios.get(
        "http://localhost:3000/api/catalogos/etiquetas"
    );

    return response.data.etiquetas;

};