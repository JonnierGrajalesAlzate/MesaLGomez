import pool from "../config/database.js";

export const getCategorias = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                id,
                nombre
            FROM categorias
            ORDER BY nombre
        `);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error obteniendo categorías"
        });

    }
};

export const getPrioridades = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                id,
                nombre
            FROM prioridades
            ORDER BY id
        `);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error obteniendo prioridades"
        });

    }
};export const obtenerEtiquetas = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                nombre,
                color
            FROM etiquetas
            ORDER BY nombre;
        `);

        return res.status(200).json({

            success: true,

            etiquetas: result.rows

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};