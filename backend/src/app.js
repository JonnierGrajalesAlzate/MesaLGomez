import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import noticiasRoutes from "./routes/noticiasRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import catalogosRoutes from "./routes/catalogosRoutes.js";
import ticketTecnico from "./routes/Tecnico/ticketTecnicoRoutes.js"

const app = express();

// ==========================
// Middlewares
// ==========================

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static("uploads")
);

// ==========================
// Rutas
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/noticias", noticiasRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/catalogos", catalogosRoutes);
app.use("/api/tecnico", ticketTecnico);

export default app;