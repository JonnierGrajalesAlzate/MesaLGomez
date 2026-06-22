import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout"; 
const Dashboard = () => {
  return (
    <div>
      <DashboardLayout>
                <div className="flex justify-center items-center h-[70vh]">
                    <div className="bg-white p-8 rounded-3xl shadow-lg">
                        Pendiente por hacer
                    </div>
                </div>
            </DashboardLayout>
      <h1>¡Hola, Mundo!</h1>
    </div>
  );
};
export default Dashboard;