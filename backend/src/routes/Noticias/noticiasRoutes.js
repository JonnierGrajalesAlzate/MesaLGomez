import { Router } from "express";

import {

    obtenerNoticias,

    obtenerNoticiaPorId,

    crearNoticia,

    actualizarNoticia,

    eliminarNoticia,

    obtenerEtiquetas

} from "../../controllers/Noticias/noticiasController.js"; 

const router = Router(); 

router.get("/", obtenerNoticias);

router.get("/etiquetas", obtenerEtiquetas);

router.get("/:id", obtenerNoticiaPorId);

router.post("/", crearNoticia);

router.put("/:id", actualizarNoticia);

router.delete("/:id", eliminarNoticia);

export default router;