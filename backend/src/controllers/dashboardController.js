import pool from "../config/database.js";

export const getDashboard = async (req, res) => {
    try {

        const { usuario_id } = req.params;

        const pendientes = await pool.query(`
            SELECT COUNT(*) total
            FROM tickets
            WHERE usuario_id = $1
            AND estado_id IN (1,3,4,6)
        `,[usuario_id]);

        const resueltos = await pool.query(`
            SELECT COUNT(*) total
            FROM tickets
            WHERE usuario_id = $1
            AND estado_id = 2
        `,[usuario_id]);

        const total = await pool.query(`
            SELECT COUNT(*) total
            FROM tickets
            WHERE usuario_id = $1
        `,[usuario_id]);

        res.json({
            success: true,
            pendientes: Number(pendientes.rows[0].total),
            resueltos: Number(resueltos.rows[0].total),
            total: Number(total.rows[0].total)
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error al obtener dashboard"
        });

    }
};
export const getUltimosTickets = async (req, res) => {
    try {

        const { usuarioId } = req.params;

        const result = await pool.query(
            `
            SELECT
                t.id,
                t.titulo,
                c.nombre AS categoria,
                e.nombre AS estado,
                p.nombre AS prioridad,
                t.fecha_creacion
            FROM tickets t
            INNER JOIN categorias c
                ON c.id = t.categoria_id
            INNER JOIN estados e
                ON e.id = t.estado_id
            INNER JOIN prioridades p
                ON p.id = t.prioridad_id
            WHERE t.usuario_id = $1
            ORDER BY t.fecha_creacion DESC
            LIMIT 3
            `,
            [usuarioId]
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error obteniendo tickets"
        });

    }
};