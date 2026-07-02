import { Router } from "express";
import {
    obtenerCategorias,
    obtenerPrioridades
} from "../../controllers/Tickets/catalogosController.js";

const router = Router();

router.get("/categorias", obtenerCategorias);
router.get("/prioridades", obtenerPrioridades);
export default router;