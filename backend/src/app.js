import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/Dashboards/dashboardRoutes.js";
import noticiasRoutes from "./routes/Noticias/noticiasRoutes.js";
import ticketRoutes from "./routes/Tickets/ticketRoutes.js";
import catalogosRoutes from "./routes/Tickets/catalogosRoutes.js"; 

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static("uploads")
);

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/noticias", noticiasRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/catalogos", catalogosRoutes); 

export default app;