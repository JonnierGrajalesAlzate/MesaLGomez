import pool from "../../config/database.js";

export const crearTicket = async (req, res) => {
console.log("CARGANDO ticketController");
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

        // ==========================
        // Validaciones
        // ==========================

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

        // =====================================================
        // Buscar el técnico con MENOS tickets activos (< 2)
        // Estados activos:
        // 1 = ABIERTO
        // 3 = EN PROCESO
        // 5 = REABIERTO
        // =====================================================

        const tecnicoResult = await client.query(
            `
            SELECT
                ct.tecnico_id,
                COUNT(t.id) AS tickets_activos
            FROM categorias_tecnicos ct

            LEFT JOIN tickets t
                ON t.tecnico_id = ct.tecnico_id
                AND t.estado_id IN (1,3,5)

            WHERE ct.categoria_id = $1

            GROUP BY ct.tecnico_id

            HAVING COUNT(t.id) < 2

            ORDER BY COUNT(t.id) ASC, RANDOM()

            LIMIT 1
            `,
            [categoria_id]
        );

        let tecnico_id = null;
        let estado_id = 4; // EN ESPERA

        if (tecnicoResult.rows.length > 0) {

            tecnico_id = tecnicoResult.rows[0].tecnico_id;
            estado_id = 1; // ABIERTO

        }

        // ==========================
        // Crear Ticket
        // ==========================

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
                $7,
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
                tecnico_id,
                estado_id
            ]
        );

        const ticket = ticketResult.rows[0];

        // ==========================
        // Guardar archivo
        // ==========================

        if (req.file) {

            await client.query(
                `
                INSERT INTO archivos_adjuntos(
                    ticket_id,
                    nombre_archivo,
                    ruta_archivo,
                    fecha_subida
                )
                VALUES(
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
                estado_id === 1
                    ? "Su Ticket fue creado correctamente."
                    : "Su ticket quedó EN ESPERA.",
            ticket
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

export const obtenerUltimosTickets = async (req, res) => {
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

export const TodosTickets = async (req, res) => {
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
};

export const InfoTicket = async (req, res) => {

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

export const obtenerDetalleTicket = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT

                t.id,
                t.titulo,
                t.descripcion,

                t.estado_id,
                e.nombre AS estado,

                t.prioridad_id,
                p.nombre AS prioridad,

                c.nombre AS categoria,

                CONCAT(
                    u.nombre,
                    ' ',
                    u.apellido
                ) AS usuario,

                CONCAT(
                    tec.nombre,
                    ' ',
                    tec.apellido
                ) AS tecnico,

                t.fecha_creacion,
                t.fecha_cierre,

                a.nombre_archivo,
                a.ruta_archivo

            FROM tickets t

            INNER JOIN usuarios u
                ON u.id = t.usuario_id

            LEFT JOIN usuarios tec
                ON tec.id = t.tecnico_id

            INNER JOIN categorias c
                ON c.id = t.categoria_id

            INNER JOIN prioridades p
                ON p.id = t.prioridad_id

            INNER JOIN estados e
                ON e.id = t.estado_id

            LEFT JOIN archivos_adjuntos a
                ON a.ticket_id = t.id

            WHERE t.id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Ticket no encontrado"

            });

        }

        return res.status(200).json({

            success: true,

            ticket: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};