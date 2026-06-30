import { Router } from "express";

import {
    obtenerDashboardTecnico,
    obtenerDetalleTicket
} from "../../controllers/Tecnico/TicketTecnicoController.js";

import {
    actualizarEstadoTicket
} from "../../controllers/actualizarEstado.js";

const router = Router();

// ==========================
// Dashboard del técnico
// ==========================

router.get(
    "/dashboard/:tecnico_id",
    obtenerDashboardTecnico
);

// ==========================
// Detalle del ticket
// ==========================

router.get(
    "/:id",
    obtenerDetalleTicket
);

// ==========================
// Actualizar estado
// ==========================

router.put(
    "/:id/estado",
    actualizarEstadoTicket
);

export default router;