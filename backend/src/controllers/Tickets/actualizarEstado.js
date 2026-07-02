import pool from "../../config/database.js";

export const actualizarEstadoTicket = async (req, res) => {

    let client;

    try {

        client = await pool.connect();

        await client.query("BEGIN");

        const { id } = req.params;
        const { estado_id } = req.body;

        // ==========================
        // Obtener información del ticket
        // ==========================

        const ticketResult = await client.query(
            `
            SELECT
                tecnico_id,
                categoria_id
            FROM tickets
            WHERE id = $1
            `,
            [id]
        );

        if (ticketResult.rows.length === 0) {

            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                message: "Ticket no encontrado"
            });

        }

        const {
            tecnico_id,
            categoria_id
        } = ticketResult.rows[0];

        // ==========================
        // Actualizar estado del ticket
        // ==========================

        if (estado_id == 2) {

            // Ticket CERRADO

            await client.query(
                `
                UPDATE tickets
                SET
                    estado_id = $1,
                    fecha_actualizacion = NOW(),
                    fecha_cierre = NOW()
                WHERE id = $2
                `,
                [
                    estado_id,
                    id
                ]
            );

        } else {

            // Cualquier otro estado

            await client.query(
                `
                UPDATE tickets
                SET
                    estado_id = $1,
                    fecha_actualizacion = NOW()
                WHERE id = $2
                `,
                [
                    estado_id,
                    id
                ]
            );

        }

        // ==========================
        // Si el ticket fue cerrado,
        // asignar uno EN ESPERA
        // ==========================

        if (estado_id == 2) {

            const esperaResult = await client.query(
                `
                SELECT id
                FROM tickets
                WHERE
                    estado_id = 4
                    AND categoria_id = $1
                ORDER BY fecha_creacion ASC
                LIMIT 1
                `,
                [categoria_id]
            );

            if (esperaResult.rows.length > 0) {

                const ticketEspera =
                    esperaResult.rows[0].id;

                await client.query(
                    `
                    UPDATE tickets
                    SET
                        tecnico_id = $1,
                        estado_id = 1,
                        fecha_actualizacion = NOW()
                    WHERE id = $2
                    `,
                    [
                        tecnico_id,
                        ticketEspera
                    ]
                );

            }

        }

        await client.query("COMMIT");

        return res.status(200).json({

            success: true,

            message: "Estado actualizado correctamente."

        });

    } catch (error) {

        if (client) {

            try {

                await client.query("ROLLBACK");

            } catch (e) {

                console.error(e);

            }

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    } finally {

        if (client) {

            client.release();

        }

    }

};