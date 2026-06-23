import { Router } from "express";
import {
    getDashboard,
    getUltimosTickets, TodosTickets, InfoTicket
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

router.get(
    "/todos-tickets/:usuarioId",
    TodosTickets
);

router.get(
    "/info-ticket/:ticketId",
    InfoTicket
);


export default router;