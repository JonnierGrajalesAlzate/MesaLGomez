import { Router } from "express"; 
import { obtenerDashboardUsuario } from "../../controllers/Dashboards/dashboardUsuarioController.js"; 
import { obtenerDashboardTecnico } from "../../controllers/Dashboards/dashboardTecnicoController.js"; 
const router = Router(); 
router.get( "/usuario/:usuario_id", obtenerDashboardUsuario ); 
router.get( "/tecnico/:tecnico_id", obtenerDashboardTecnico ); 
export default router;