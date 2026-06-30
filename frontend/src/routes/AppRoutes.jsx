import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login"; 
import Dashboard from "../pages/Dashboard";
import Tickets from "../pages/Tickets";
import CrearTickets from "../pages/CrearTickets";
import Ayuda from "../pages/Ayuda"; 
import Tecnico from "../pages/Tecnico/Tecnico";

function AppRoutes() {
return ( <BrowserRouter> <Routes>

            <Route
                path="/"
                element={<Login />}
            />
            <Route
                path="/dashboard"
                element={<Dashboard />}
            />
            <Route
              path="/tickets"
                element={<Tickets />}
            />
            <Route
              path="/crear-ticket"
                element={<CrearTickets />}
            />
            <Route
                  path="/ayuda"
                 element={<Ayuda />}
            />
            <Route
                  path="/tecnico"
                 element={<Tecnico />}
            />
            
        </Routes>
    </BrowserRouter>
);

}

export default AppRoutes;