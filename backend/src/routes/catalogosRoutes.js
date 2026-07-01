import { Router } from "express";
import {
    getCategorias,
    getPrioridades,
    getEtiquetas
} from "../controllers/catalogosController.js";

const router = Router();

router.get("/categorias", getCategorias);
router.get("/prioridades", getPrioridades);
router.get("/etiquetas", getEtiquetas);
export default router;