import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import {
    crearTicket, 
    obtenerUltimosTickets, 
    TodosTickets, 
    InfoTicket,  
    obtenerDetalleTicket
} from "../../controllers/Tickets/ticketController.js";

import { actualizarEstadoTicket } from "../../controllers/Tickets/actualizarEstado.js";

const router = Router(); 

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

router.get(
    "/ultimos-tickets/:usuarioId",
    obtenerUltimosTickets
);

router.get(
    "/todos-tickets/:usuarioId",
    TodosTickets
);

router.get(
    "/info-ticket/:ticketId",
    InfoTicket
);

router.put("/:id/estado", actualizarEstadoTicket);

router.get(
    "/:id",
    obtenerDetalleTicket
);

export default router;