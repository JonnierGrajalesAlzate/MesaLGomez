import pool from "../config/database.js";

export const crearTicket = async (req, res) => {

    let client;

    try {

        client = await pool.connect();

        await client.query("BEGIN");

        const {
            titulo,
            descripcion,
            categoria_id,
            prioridad_id,
            usuario_id
        } = req.body;

        // Validaciones

        if (
            !titulo ||
            !descripcion ||
            !categoria_id ||
            !prioridad_id ||
            !usuario_id
        ) {

            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios"
            });

        }

        // Buscar técnico asociado a la categoría

        const tecnicoResult = await client.query(
            `
            SELECT tecnico_id
            FROM categorias_tecnicos
            WHERE categoria_id = $1
            ORDER BY RANDOM()
            LIMIT 1
            `,
            [categoria_id]
        );

        if (tecnicoResult.rows.length === 0) {

            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message:
                    "No hay técnicos asignados para esta categoría"
            });

        }

        const tecnico_id =
            tecnicoResult.rows[0].tecnico_id;

        // Crear ticket

        const ticketResult = await client.query(
            `
            INSERT INTO tickets (
                titulo,
                descripcion,
                categoria_id,
                prioridad_id,
                usuario_id,
                tecnico_id,
                estado_id,
                fecha_creacion
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                1,
                NOW()
            )
            RETURNING *
            `,
            [
                titulo,
                descripcion,
                categoria_id,
                prioridad_id,
                usuario_id,
                tecnico_id
            ]
        );

        const ticket =
            ticketResult.rows[0];

        // Guardar adjunto (si existe)

        if (req.file) {

            await client.query(
                `
                INSERT INTO archivos_adjuntos (
                    ticket_id,
                    nombre_archivo,
                    ruta_archivo,
                    fecha_subida
                )
                VALUES (
                    $1,
                    $2,
                    $3,
                    NOW()
                )
                `,
                [
                    ticket.id,
                    req.file.originalname,
                    req.file.filename
                ]
            );

        }

        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            message:
                "Su Ticket fue creado correctamente",
            ticket
        });

    } catch (error) {

        try {

            if (client) {
                await client.query("ROLLBACK");
            }

        } catch (rollbackError) {

            console.error(
                "Error realizando rollback:",
                rollbackError
            );

        }

        console.error(
            "Error creando ticket:",
            error
        );

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