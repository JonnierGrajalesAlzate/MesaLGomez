import pool from "../../config/database.js";

export const obtenerCategorias = async (req, res) => {
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

export const obtenerPrioridades = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                id,
                nombre,
                color
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
};
