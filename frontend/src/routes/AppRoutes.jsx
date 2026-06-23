import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login"; 
import Dashboard from "../pages/Dashboard";
import Tickets from "../pages/Tickets";

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

            
        </Routes>
    </BrowserRouter>
);

}

export default AppRoutes;