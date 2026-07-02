import pool from "../../config/database.js";

export const obtenerDashboardUsuario = async (req, res) => {
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