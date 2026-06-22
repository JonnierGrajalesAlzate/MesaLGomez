import { Router } from "express";
import {
    getDashboard,
    getUltimosTickets
} from "../controllers/dashboardController.js";
const router = Router();

router.get(
    "/ultimos-tickets/:usuarioId",
    getUltimosTickets
);


router.get(
    "/:usuario_id",
    getDashboard
);


export default router;