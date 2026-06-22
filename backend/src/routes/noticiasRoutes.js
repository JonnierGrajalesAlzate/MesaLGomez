import { Router } from "express";
import { obtenerNoticias } from "../controllers/noticiasController.js";

const router = Router();

router.get("/", obtenerNoticias);

export default router;

