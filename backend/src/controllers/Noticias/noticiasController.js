import pool from "../../config/database.js";

 
console.log("CARGANDO noticiasController");
export const obtenerNoticias = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT
    n.id,
    n.titulo,
    n.descripcion,
    e.id AS etiqueta_id,
    e.nombre AS etiqueta,
    e.color,
    n.usuario_id,
    n.fecha_creacion,
    u.nombre,
    u.apellido
FROM noticias n

INNER JOIN etiquetas e
    ON e.id = n.etiqueta_id

INNER JOIN usuarios u
    ON u.id = n.usuario_id

ORDER BY n.fecha_creacion DESC;
            `
        );

        return res.status(200).json({

            success: true,

            noticias: result.rows

        });

    } catch (error) {

    console.error("ERROR EN OBTENER NOTICIAS:");
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message
    });

}

};
 

export const obtenerNoticiaPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT
    n.id,
    n.titulo,
    n.descripcion,
    e.id AS etiqueta_id,
    e.nombre AS etiqueta,
    e.color,
    n.usuario_id,
    n.fecha_creacion,
    u.nombre,
    u.apellido
FROM noticias n

INNER JOIN etiquetas e
    ON e.id = n.etiqueta_id

INNER JOIN usuarios u
    ON u.id = n.usuario_id

WHERE n.id = $1;
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "La noticia no existe."

            });

        }

        return res.status(200).json({

            success: true,

            noticia: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Error al obtener la noticia."

            
        });

    }

};
 

export const crearNoticia = async (req, res) => {

    console.log("===== CREAR NOTICIA =====");
    console.log("Método:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Headers:", req.headers["content-type"]);
    console.log("Body:", req.body);

    try {

        const {
    titulo,
    descripcion,
    etiqueta_id,
    usuario_id
} = req.body;

        if (
    !titulo ||
    !descripcion ||
    !etiqueta_id ||
    !usuario_id
) {

            return res.status(400).json({

                success: false,

                message: "Todos los campos obligatorios deben ser enviados."

            });

        }

        const result = await pool.query(
            `
            INSERT INTO noticias(

    titulo,
    descripcion,
    etiqueta_id,
    usuario_id,
    fecha_creacion

)

VALUES(

    $1,
    $2,
    $3,
    $4,
    NOW()

)

RETURNING *;
            `,
            [
    titulo,
    descripcion,
    etiqueta_id,
    usuario_id
]
        );

        return res.status(201).json({

            success: true,

            message: "Noticia creada correctamente.",

            noticia: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Error al crear la noticia."

        });

    }

}; 

export const actualizarNoticia = async (req, res) => {

    try {

        const { id } = req.params;

        const {

    titulo,
    descripcion,
    etiqueta_id

} = req.body;

        const result = await pool.query(
            `
            UPDATE noticias

SET

    titulo = $1,
    descripcion = $2,
    etiqueta_id = $3

WHERE id = $4

RETURNING *;
            `,
            [
    titulo,
    descripcion,
    etiqueta_id,
    id
]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "La noticia no existe."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Noticia actualizada correctamente.",

            noticia: result.rows[0]

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Error al actualizar la noticia."

        });

    }

};


export const eliminarNoticia = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM noticias

            WHERE id = $1

            RETURNING *
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "La noticia no existe."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Noticia eliminada correctamente."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Error al eliminar la noticia."

        });

    }

};

export const obtenerEtiquetas = async (req, res) => {

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