import { Router } from "express";

import {

    obtenerNoticias,

    obtenerNoticiaPorId,

    crearNoticia,

    actualizarNoticia,

    eliminarNoticia

} from "../controllers/noticiasController.js";

const router = Router();
console.log("CARGANDO noticiasRoutes");
router.get(
    "/",
    obtenerNoticias
);

router.get(
    "/:id",
    obtenerNoticiaPorId
);

router.post(
    "/",
    crearNoticia
);

router.put(
    "/:id",
    actualizarNoticia
);

router.delete(
    "/:id",
    eliminarNoticia
);

export default router;