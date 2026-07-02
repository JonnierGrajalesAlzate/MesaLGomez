import pool from "../../config/database.js";

export const obtenerDashboardTecnico = async (req, res) => {

    try {

        const { tecnico_id } = req.params;

        console.log("=================================");
        console.log("Dashboard Técnico");
        console.log("Técnico ID:", tecnico_id);
        console.log("=================================");

        const estadisticasResult = await pool.query(
            `
            SELECT

                COUNT(*) FILTER (WHERE estado_id = 1) AS abiertos,
                COUNT(*) FILTER (WHERE estado_id = 3) AS proceso,
                COUNT(*) FILTER (WHERE estado_id = 4) AS espera,
                COUNT(*) FILTER (WHERE estado_id = 2) AS cerrados

            FROM tickets

            WHERE tecnico_id = $1
            `,
            [tecnico_id]
        ); 

        const ticketsResult = await pool.query(
            `
            SELECT

                t.id,
                t.titulo,
                t.descripcion,

                c.nombre AS categoria,
                p.nombre AS prioridad,
                e.nombre AS estado,

                CONCAT(
                    u.nombre,
                    ' ',
                    u.apellido
                ) AS usuario,

                t.fecha_creacion

            FROM tickets t

            INNER JOIN categorias c
                ON c.id = t.categoria_id

            INNER JOIN prioridades p
                ON p.id = t.prioridad_id

            INNER JOIN estados e
                ON e.id = t.estado_id

            INNER JOIN usuarios u
                ON u.id = t.usuario_id

            WHERE t.tecnico_id = $1

            ORDER BY t.fecha_creacion ASC
            `,
            [tecnico_id]
        );

        console.log("Estadísticas:", estadisticasResult.rows[0]);
        console.log("Tickets encontrados:", ticketsResult.rows.length);
        console.log(ticketsResult.rows);

        return res.status(200).json({

            success: true,

            estadisticas: estadisticasResult.rows[0],

            tickets: ticketsResult.rows

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
