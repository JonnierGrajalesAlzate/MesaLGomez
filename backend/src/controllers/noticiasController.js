import pool from "../config/database.js";

export const getNoticias = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                n.id,
                n.titulo,
                n.descripcion,
                n.etiqueta_id,
                n.fecha_creacion,
                u.nombre,
                u.apellido
            FROM noticias n
            INNER JOIN usuarios u
                ON n.usuario_id = u.id
            ORDER BY n.fecha_creacion DESC
            LIMIT 5
        `);

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener las noticias"
        });
    }
};