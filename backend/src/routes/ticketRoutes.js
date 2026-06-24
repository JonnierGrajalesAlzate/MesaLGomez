import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import {
    crearTicket
} from "../controllers/ticketController.js";

const router = Router();

// Crear carpeta uploads si no existe

const uploadsPath = path.resolve("uploads");

if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, {
        recursive: true
    });
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, uploadsPath);

    },

    filename: (req, file, cb) => {

        const nombreArchivo =
            `${Date.now()}-${file.originalname}`;

        cb(null, nombreArchivo);

    }

});

const fileFilter = (req, file, cb) => {

    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain"
    ];

    if (
        tiposPermitidos.includes(file.mimetype)
    ) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Tipo de archivo no permitido"
            ),
            false
        );

    }

};

const upload = multer({

    storage,

    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },

    fileFilter

});

router.post(
    "/",
    upload.single("adjunto"),
    crearTicket
);

export default router;