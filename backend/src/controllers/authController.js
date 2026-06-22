import pool from "../config/database.js";

export const login = async (req, res) => {
    try {

        const { correo, password } = req.body;

        const result = await pool.query(
            `
            SELECT
                u.id,
                u.nombre,
                u.apellido,
                u.correo,
                u.cargo,
                r.nombre AS rol,
                u.password
            FROM usuarios u
            INNER JOIN roles r
                ON r.id = u.rol_id
            WHERE u.correo = $1
            `,
            [correo]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Correo incorrecto"
            });
        }

        const usuario = result.rows[0];

        if (usuario.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }

        delete usuario.password;

        res.status(200).json({
            success: true,
            usuario
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error interno"
        });

    }
};