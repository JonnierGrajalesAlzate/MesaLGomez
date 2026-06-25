import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login"; 
import Dashboard from "../pages/Dashboard";
import Tickets from "../pages/Tickets";
import CrearTickets from "../pages/CrearTickets";
import Ayuda from "../pages/Ayuda"; 

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
            
        </Routes>
    </BrowserRouter>
);

}

export default AppRoutes;