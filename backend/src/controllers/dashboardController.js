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
};export const TodosTickets = async (req, res) => {
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
};export const InfoTicket = async (req, res) => {

    try {

        const { ticketId } = req.params;

        const result = await pool.query(
            `
            SELECT
                t.id,
                t.titulo,
                t.descripcion,
                t.fecha_creacion,
                t.fecha_cierre,

                c.nombre AS categoria,
                p.nombre AS prioridad,
                e.nombre AS estado,

                u.nombre || ' ' || u.apellido AS usuario,

                COALESCE(
                    tec.nombre || ' ' || tec.apellido,
                    'Sin asignar'
                ) AS tecnico

            FROM tickets t

            INNER JOIN categorias c
                ON c.id = t.categoria_id

            INNER JOIN prioridades p
                ON p.id = t.prioridad_id

            INNER JOIN estados e
                ON e.id = t.estado_id

            INNER JOIN usuarios u
                ON u.id = t.usuario_id

            LEFT JOIN usuarios tec
                ON tec.id = t.tecnico_id

            WHERE t.id = $1
            `,
            [ticketId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener ticket"
        });

    }
};