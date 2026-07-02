import axios from "axios";

const API_URL = "http://localhost:3000/api/noticias";

export const obtenerNoticias = async () => {

    const response = await axios.get(API_URL);

    return response.data.noticias;

};

export const obtenerNoticiaPorId = async (id) => {

    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data;

}; 

export const crearNoticia = async (noticia) => {

    const response = await axios.post(
        API_URL,
        noticia
    );

    return response.data;

}; 

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

export const eliminarNoticia = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;

};
export const obtenerEtiquetas = async () => {

    const response = await axios.get(
        "http://localhost:3000/api/noticias/etiquetas"
    );

    return response.data.etiquetas;

};