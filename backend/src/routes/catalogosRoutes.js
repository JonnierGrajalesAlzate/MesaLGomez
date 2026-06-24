import { Router } from "express";
import {
    getCategorias,
    getPrioridades
} from "../controllers/catalogosController.js";

const router = Router();

router.get("/categorias", getCategorias);
router.get("/prioridades", getPrioridades);

export default router;