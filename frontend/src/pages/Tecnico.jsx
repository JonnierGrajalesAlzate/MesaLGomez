import { useEffect, useState } from "react";  
import DashboardLayoutTecnico from "../layouts/tecnico/DashboardLayoutTecnico.jsx"
 

function Tecnico() {
    return (

        <DashboardLayoutTecnico>

            <div className="w-full space-y-8"> 

                <div
                    className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-200
                        shadow-sm
                        p-8
                    "
                >

                    <h1
                        className="
                            text-4xl
                            font-bold
                            text-[#0B2347]
                        "
                    >

                        Hola

                    </h1>

                    <p
                        className="
                            mt-3
                            text-slate-500
                        "
                    >

                        Bienvenido al panel del técnico.

                        Aquí podrás administrar todos tus tickets.

                    </p>

                </div>
            </div>

        </DashboardLayoutTecnico>

    );

}

export default Tecnico;