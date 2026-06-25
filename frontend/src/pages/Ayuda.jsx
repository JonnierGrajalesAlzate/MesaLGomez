import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import abierto from "../assets/abierto.png";
import proceso from "../assets/proceso.png";
import cerrado from "../assets/cerrado.png";
import reabierto from "../assets/Reabrir.png";

import Footer from "../components/Footer";
function Ayuda() {

    const navigate = useNavigate();

    return (
        <DashboardLayout>

            <div className="space-y-8">

                {/* Encabezado */}
                <div className="bg-white border border-slate-200 rounded-xl p-8">

                    <h1 className="text-3xl font-bold text-slate-800 text-center">
                        Centro de Ayuda
                    </h1>

                    <p className="text-slate-500 mt-2 text-center">
                        Consulta información sobre el proceso de atención de tickets,
                        buenas prácticas y servicios disponibles.
                    </p>

                </div>

                {/* PRIORIDADES Y RECOMENDACIONES */}
<div className="grid lg:grid-cols-2 gap-6">

    {/* PRIORIDADES */}
    <div className="bg-white border border-slate-200 rounded-xl p-8">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Niveles de Prioridad
        </h2>

        <div className="space-y-4">

            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                

                <div>
                    <h3 className="font-semibold text-red-700">
                        Alta
                    </h3>

                    <p className="text-slate-600">
                        Incidentes que impiden continuar mis labores.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                 
                <div>
                    <h3 className="font-semibold text-yellow-700">
                        Media
                    </h3>

                    <p className="text-slate-600">
                        Problemas que afectan parcialmente mi trabajo.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                 
                <div>
                    <h3 className="font-semibold text-green-700">
                        Baja
                    </h3>

                    <p className="text-slate-600">
                        Solicitudes o requerimientos sin impacto inmediato.
                    </p>
                </div>
            </div>

        </div>

    </div>

    {/* RECOMENDACIONES */}
    <div className="bg-white border border-slate-200 rounded-xl p-8">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Recomendaciones
        </h2>

        <ul className="space-y-5">

            <li className="flex gap-3">
                
                <span className="text-slate-600">
                    1. Describe el problema de forma clara y detallada.
                </span>
            </li>

            <li className="flex gap-3">
                
                <span className="text-slate-600">
                    2. Adjunta la captura de pantalla cuando sea posible.
                </span>
            </li>

            <li className="flex gap-3">
                
                <span className="text-slate-600">
                    3. Selecciona correctamente la categoría y prioridad.
                </span>
            </li>

            <li className="flex gap-3">
                
                <span className="text-slate-600">
                    4. Realiza seguimiento periódico a tus solicitudes.
                </span>
            </li>

            <li className="flex gap-3"> 
                <span className="text-slate-600">
                    5. Especifica cuándo comenzó el incidente y si ocurrió después de algún cambio.
                </span>
                
            </li>
            <li className="text-slate-600">
                <span className="text-slate-600">
                  6. Indica el equipo, aplicación o servicio afectado en la descripción.
                </span>
            </li>

        </ul>

    </div>

</div>
                {/* Ciclo de vida */}
                <div className="bg-white border border-slate-200 rounded-xl p-8">

                    <h2 className="text-2xl font-bold text-slate-800 mb-8">
                        Ciclo de Vida del Ticket
                    </h2>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                        <div className="text-center">

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                    bg-[#c3cfdb]
                                    flex
                                    items-center
                                    justify-center
                                    mx-auto
                                    text-2xl
                                "
                            > 
                                    <img src={abierto} alt="" className="w-8 h-8" />

                            </div>

                            <h3 className="mt-4 font-semibold text-slate-800">
                                Abierto
                            </h3>

                            <p className="text-sm text-slate-500 mt-2">
                                La solicitud fue registrada correctamente.
                            </p>

                        </div>

                        <div className="hidden lg:block flex-1 h-px bg-slate-300"></div>

                        <div className="text-center">

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                     bg-[#c3cfdb]
                                    flex
                                    items-center
                                    justify-center
                                    mx-auto
                                    text-2xl
                                "
                            >
                                <img src={proceso} alt="" className="w-8 h-8" />
                            </div>

                            <h3 className="mt-4 font-semibold text-slate-800">
                                En Proceso
                            </h3>

                            <p className="text-sm text-slate-500 mt-2">
                                Un técnico se encuentra gestionando la solicitud.
                            </p>

                        </div>

                        <div className="hidden lg:block flex-1 h-px bg-slate-300"></div>

                        <div className="text-center">

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                     bg-[#c3cfdb]
                                    flex
                                    items-center
                                    justify-center
                                    mx-auto
                                    text-2xl
                                "
                            >
                                <img src={cerrado} alt="" className="w-8 h-8" />
                            </div>

                            <h3 className="mt-4 font-semibold text-slate-800">
                                Cerrado
                            </h3>

                            <p className="text-sm text-slate-500 mt-2">
                                El incidente fue solucionado y finalizado.
                            </p>

                        </div>

                        <div className="hidden lg:block flex-1 h-px bg-slate-300"></div>

                        <div className="text-center">

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                     bg-[#c3cfdb]
                                    flex
                                    items-center
                                    justify-center
                                    mx-auto
                                    text-2xl
                                "
                            >
                                <img src={reabierto} alt="" className="w-8 h-8" />
                            </div>

                            <h3 className="mt-4 font-semibold text-slate-800">
                                Reabierto
                            </h3>

                            <p className="text-sm text-slate-500 mt-2">
                                La solución no fue satisfactoria y requiere revisión.
                            </p>

                        </div>

                    </div>

                </div>

                {/* Servicios y recomendaciones */}
                {/* SERVICIOS */}
<div className="bg-white border border-slate-200 rounded-xl p-8 mb-6">

    <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Servicios
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

    {[
        {
            titulo: "Office365",
            descripcion: "Excel, Word, PowerPoint, Outlook, etc."
        },
        {
            titulo: "Infraestructura Tecnológica",
            descripcion: "Servidores, routers, redes, servicios, seguridad, etc."
        },
        {
            titulo: "Computadores",
            descripcion: "Actualizaciones, lentitud y configuración."
        },
        {
            titulo: "Accesos",
            descripcion: "Páginas y permisos."
        },
        {
            titulo: "Impresoras",
            descripcion: "Cambio de tóner, configuración y problemas de impresión."
        },
        {
            titulo: "Celulares",
            descripcion: "Configuraciones, actualizaciones y asignaciones."
        },
        {
            titulo: "Bitácora",
            descripcion: "Fallas, lentitud y otros inconvenientes."
        },
        {
            titulo: "SINCO",
            descripcion: "Errores, inconsistencias y accesos."
        },
        {
            titulo: "Facturas",
            descripcion: "Revisiones y validaciones."
        },
        {
            titulo: "Aplicaciones",
            descripcion: "Instalaciones y configuraciones."
        },
        {
            titulo: "Red",
            descripcion: "Conexión a internet y red corporativa."
        },
        {
            titulo: "Soporte General",
            descripcion:
                "Cuando no estés seguro de la categoría correspondiente."
        }
    ].map((servicio, index) => (
        <div
            key={index}
            className="
                border-l-4
                border-[#0076e3]
                pl-4
                py-2
            "
        >
            <h3 className="font-semibold text-slate-800">
                {servicio.titulo}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
                {servicio.descripcion}
            </p>
        </div>
    ))}

</div>

</div>


                {/* Banner inferior */}
                <div className="bg-[#0076e3] rounded-xl p-8 text-white">

                    <h2 className="text-2xl font-bold">
                        ¿No encuentras solución a tu problema?
                    </h2>

                    <p className="mt-2 text-blue-100">
                        Nuestro equipo de soporte está disponible para ayudarte.
                    </p>

                    <button
                        onClick={() => navigate("/crear-ticket")}
                        className="
                            mt-5
                            bg-white
                            text-[#0076e3]
                            font-semibold
                            px-6
                            py-3
                            rounded-lg
                            hover:bg-slate-100
                            transition
                            cursor-pointer
                        "
                    >
                        Crear Nuevo Ticket
                    </button>

                </div>

            </div>
            <Footer />
        </DashboardLayout>
    );
}

export default Ayuda;