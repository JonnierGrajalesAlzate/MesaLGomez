import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboard, getUltimosTickets } from "../services/dashboardService";
import { getNoticias } from "../services/noticiasService";
import Footer from "../components/Footer" 
import crear from "../assets/crearTickets.png";
import tickets from "../assets/tickets.png";
import Base from "../assets/baseConocimiento.png"; 


function Dashboard() {
    const navigate = useNavigate();

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    ) || {};

    const [estadisticas, setEstadisticas] = useState({
        pendientes: 0,
        resueltos: 0,
        total: 0,
    });

    const [loading, setLoading] = useState(true);
    const [ultimosTickets, setUltimosTickets] = useState([]);
    const [noticias, setNoticias] = useState([]);

    const cargarDashboard = async () => {
        try {
            const data = await getDashboard(usuario.id);

            setEstadisticas({
                pendientes: data.pendientes,
                resueltos: data.resueltos,
                total: data.total,
            });

            const ticketsData = await getUltimosTickets(usuario.id);
            setUltimosTickets(ticketsData);

            const noticiasData = await getNoticias();

            console.log("Noticias:", noticiasData);

            setNoticias(noticiasData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDashboard();
    }, []);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-[70vh]">
                    <div className="bg-white p-8 rounded-3xl shadow-lg">
                        Cargando información...
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
    <DashboardLayout>
        <div className="w-full space-y-8">

            <div
    className="
        bg-white
        rounded-3xl
        p-8
        shadow-lg
        border border-slate-200
    "
>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8">

                <div className="flex flex-col md:flex-row items-center justify-center gap-10 h-full">

                    {/* Sección de bienvenida*/}
                    <div className="flex-1 text-center">

                        <h2 className="text-3xl font-bold text-[#0B2347] mb-3">
                            Hola {usuario.nombre},
                        </h2>

                        <h2 className="text-3xl font-bold text-[#0B2347] mb-4">
                            Te damos la bienvenida a Soporte LG
                        </h2>

                        <p className="text-slate-500">
                            Aquí tienes un resumen de tu actividad de tickets.
                        </p>

                    </div>
                    <div className="rounded-2xl p-6 min-w-[180px]">

                        <div className="flex flex-col gap-6">
                        
                            <div className="text-center">
                                <p className="text-sm text-orange-500">
                                    Pendientes
                                </p>

                                <p className="text-3xl font-bold text-orange-500">
                                    {estadisticas.pendientes}
                                </p>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-green-600">
                                    Resueltos
                                </p>

                                <p className="text-3xl font-bold text-green-600">
                                    {estadisticas.resueltos}
                                </p>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-slate-600">
                                    Total
                                </p>

                                <p className="text-3xl font-bold text-[#1E222B]">
                                    {estadisticas.total}
                                </p>
                            </div>

                        </div>
                    </div> 

                </div>

            </div>

            {/* Sección de noticias*/}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

                <h3 className="font-bold text-xl text-[#0076e3] mb-5">
                    Noticias
                </h3>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">

                    {noticias.length > 0 ? (
                        noticias.map((noticia) => (
                            <div
                                key={noticia.id}
                                className="
                                    border-l-4
                                    border-[#00d4a1]
                                    rounded-lg
                                    p-4
                                    bg-slate-50
                                "
                            >
                                <div className="flex justify-between items-center">

                                    <h4 className="font-semibold text-[#1e222b]">
                                        {noticia.titulo}
                                    </h4>

                                    <span
                                        className={
                                            noticia.etiqueta === "Importante"
                                                ? "bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full"
                                                : "bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                                        }
                                    >
                                        {noticia.etiqueta}
                                    </span>

                                </div>

                                <p className="text-sm text-slate-500 mt-2">
                                    {noticia.descripcion}
                                </p>

                                <div className="mt-2 text-xs text-slate-400">
                                    Publicado por Soporte LG
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-slate-400">
                            No hay noticias disponibles.
                        </p>
                    )}

                </div>

            </div>

        </div>

        </div>
        {/*Accesos rápidos: Crear tickets, ver tickets y sección ayuda*/}
                <div>

            <h2 className="text-2xl font-bold text-[#0076e3] mb-6">
                Accesos rápidos
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div
                    onClick={() => navigate("/crear-ticket")}
                    className="group bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-[#c3cfdb] transition-all"
                >

                    <div className="bg-[#c3cfdb] w-fit p-4 rounded-2xl mb-5 group-hover:bg-white transition-colors duration-300">
                        <img src={crear} alt="" className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-[#1e222b]">
                        Crear Ticket
                    </h3>

                    <p className="mt-3 text-[#1e222b]">
                        Reporta un incidente o solicita soporte técnico.
                    </p>

                    <button className="mt-6 text-[#1e222b] px-5 py-3 rounded-xl font-semibold cursor-pointer">
                        Abrir Ticket
                    </button>

                </div>

                <div
                    onClick={() => navigate("/tickets")}
                    className="group bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:shadow-lg hover:bg-[#c3cfdb] hover:-translate-y-1 transition-all"
                >

                    <div className="bg-[#c3cfdb] w-fit p-4 rounded-2xl mb-5 group-hover:bg-white transition-colors duration-300">
                        <img src={tickets} alt="" className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-[#1e222b]">
                        Mis Solicitudes
                    </h3>

                    <p className="mt-3 text-[#1e222b]">
                        Consulta el estado y seguimiento de tus tickets.
                    </p>

                    <button className="mt-6 cursor-pointer text-[#1e222b] px-5 py-3 rounded-xl font-semibold">
                        Ver Solicitudes
                    </button>

                </div>

                <div
                    onClick={() => navigate("/ayuda")}
                    className="group bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-[#c3cfdb] transition-all"
                >

                    <div className="bg-[#c3cfdb] w-fit p-4 rounded-2xl mb-5 group-hover:bg-white transition-colors duration-300">
                        <img src={Base} alt="" className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-bold text-[#1e222b]">
                        Centro de Ayuda
                    </h3>

                    <p className="mt-3 text-[#1e222b]">
                        Manuales, guías y preguntas frecuentes.
                    </p>

                    <button className="mt-6 cursor-pointer text-[#1e222b] px-5 py-3 rounded-xl font-semibold">
                        Ver Ayuda
                    </button>

                </div>

            </div>

        </div>

            {/*Tabla con las solicitudes recientes */}

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

                <div className="bg-[#0076e3] p-6 border-b border-slate-200 flex justify-between items-center">

                    <div>

                        <h2 className="text-xl font-bold text-white">
                            Solicitudes recientes
                        </h2>

                        <p className="text-sm text-white mt-1">
                            Últimos tickets registrados por el usuario.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/tickets")}
                        className="bg-[#c3cfdb] text-[#1e222b] font-bold px-4 py-2 rounded-xl cursor-pointer transition hover:bg-[#ffffffbd]"
                    >
                        Ver todas
                    </button>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-50">

                            <tr className="text-xs uppercase tracking-wider text-slate-500">

                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Asunto</th>
                                <th className="p-4 text-left">Categoría</th>
                                <th className="p-4 text-left">Estado</th>
                                <th className="p-4 text-left">Prioridad</th>
                                <th className="p-4 text-left">Fecha</th>

                            </tr>

                        </thead>

                        <tbody>

                            {ultimosTickets.length > 0 ? (

                                ultimosTickets.map((ticket) => (

                                    <tr
                                        key={ticket.id}
                                        className="border-t border-slate-100 hover:bg-slate-100 transition"
                                    >

                                        <td className="p-4 font-semibold">
                                            #{ticket.id}
                                        </td>

                                        <td className="p-4">
                                            {ticket.titulo}
                                        </td>

                                        <td className="p-4">
                                            {ticket.categoria}
                                        </td>

                                        <td className="p-3">
                                        <span
                                            className={`
                                                px-2
                                                py-1
                                                text-xs
                                                rounded-full
                                                font-semibold
                                                ${
                                                    ticket.estado === "ABIERTO"
                                                        ? "text-green-500"
                                                        : ticket.estado === "CERRADO"
                                                        ? "text-blue-500"
                                                        : "text-slate-500"
                                                }
                                            `}
                                        >
                                            {ticket.estado}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`
                                                px-2
                                                py-1
                                                text-xs
                                                rounded-full
                                                font-semibold
                                                ${
                                                    ticket.prioridad === "BAJA"
                                                        ? "text-blue-500"
                                                        : ticket.prioridad === "MEDIA"
                                                        ? "text-orange-500"
                                                        : ticket.prioridad === "ALTA"
                                                        ? "text-red-500"
                                                        : ticket.prioridad === "CRITICA"
                                                        ? "text-red-900"
                                                        : "text-slate-500"
                                                }
                                            `}
                                        >
                                            {ticket.prioridad}
                                        </span>
                                    </td>

                                        <td className="p-4 text-slate-500">
                                           {new Date(ticket.fecha_creacion).toLocaleString("es-CO", {
                                              day: "2-digit",
                                              month: "2-digit",
                                              year: "numeric",
                                              hour: "2-digit",
                                              minute: "2-digit",
                                               })}
                                        </td>
                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center p-10 text-slate-400"
                                    >
                                        No hay tickets registrados
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
        <Footer />
    </DashboardLayout>
    
    
);
}

export default Dashboard;