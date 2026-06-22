import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboard, getUltimosTickets } from "../services/dashboardService";
import Footer from "../components/Footer"
import inicio from "../assets/inicio.png";
import crear from "../assets/crearTickets.png";
import tickets from "../assets/tickets.png";
import Base from "../assets/baseConocimiento.png";
import logo from "../assets/favicon.png"


function Dashboard() {
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

    const [estadisticas, setEstadisticas] = useState({
        activos: 0,
        resueltos: 0,
        total: 0,
    });
    

    const [loading, setLoading] = useState(true);
    const [ultimosTickets, setUltimosTickets] = useState([]);

    useEffect(() => {
        cargarDashboard();
    }, []);

    const cargarDashboard = async () => {
        try {
            const data = await getDashboard(usuario.id);

            setEstadisticas({
                activos: data.activos,
                resueltos: data.resueltos,
                total: data.total,
            });
 

            const ticketsData = await getUltimosTickets(usuario.id);
            setUltimosTickets(ticketsData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Información */}

        <div> 
            <h2 className="text-3xl font-bold text-[#0B2347] mb-3">
                Hola {usuario.nombre}, 
            </h2>
            <h2 className="text-3xl font-bold text-[#0B2347] mb-3">
                te damos la bienvenida a Soporte LG
            </h2>

            <p className="text-slate-500 mb-8">
                Aqui tienes un resumen de tu actividad de tickets
            </p>

            <div className="flex gap-10">

                <div>
                    <p className="text-slate-500 text-sm">
                        Activos
                    </p>

                    <p className="text-4xl font-bold text-[#1E222B]">
                        {estadisticas.activos}
                    </p>
                </div>

                <div>
                    <p className="text-slate-500 text-sm">
                        Resueltos
                    </p>

                    <p className="text-4xl font-bold text-[#1E222B]">
                        {estadisticas.resueltos}
                    </p>
                </div>

                <div>
                    <p className="text-slate-500 text-sm">
                        Total
                    </p>

                    <p className="text-4xl font-bold text-[#1E222B]">
                        {estadisticas.total}
                    </p>
                </div>

            </div>

        </div>
    </div>
</div>
            {/* ACCESOS RAPIDOS */}

            <div>

                <h2 className="text-2xl font-bold text-[#0076e3] mb-6">
                    Accesos rápidos
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div
                        onClick={() => navigate("/crear-ticket")}
                        className="bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-[#ffffff39]  transition-all"
                    >

                        <div className="bg-[#c3cfdb] w-fit p-4 rounded-2xl mb-5">
                            <img src={crear} alt="" className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-bold text-[1e222b]">
                            Crear Ticket
                        </h3>

                        <p className="mt-3 text-[1e222b]">
                            Reporta un incidente o solicita soporte técnico.
                        </p>

                        <button className="mt-6 bg-[] text-[1e222b] px-5 py-3 rounded-xl font-semibold cursor-pointer">
                            Abrir Ticket
                        </button>

                    </div>

                    <div
                        onClick={() => navigate("/tickets")}
                        className="bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:shadow-lg  hover:bg-[#ffffff39]  hover:-translate-y-1 transition-all"
                    >

                        <div className="bg-[#c3cfdb] w-fit p-4 rounded-2xl mb-5">
                            <img src={tickets} alt="" className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-bold text-[#1e222b]">
                            Mis Solicitudes
                        </h3>

                        <p className="mt-3 text-[#1e222b]">
                            Consulta el estado y seguimiento de tus tickets.
                        </p>

                        <button className="mt-6 cursor-pointer  text-[#1e222b] px-5 py-3 rounded-xl font-semibold">
                            Ver Solicitudes
                        </button>

                    </div>

                    <div
                        onClick={() => navigate("/ayuda")}
                        className="bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-[#ffffff39]  transition-all"
                    >

                        <div className="bg-[#c3cfdb]  w-fit p-4 rounded-2xl mb-5">
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

            {/* TABLA */}

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
                                        className="border-t border-slate-100 hover:bg-[#027efa2b] transition"
                                    >

                                        <td className="p-4 font-semibold">
                                            TK-{ticket.id}
                                        </td>

                                        <td className="p-4">
                                            {ticket.titulo}
                                        </td>

                                        <td className="p-4">
                                            {ticket.categoria}
                                        </td>

                                        <td className="p-4">

                                            <span
                                                className="px-3 py-1 rounded-full  text-black" >
                                                {ticket.estado}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <span
                                                className="px-3 py-1 rounded-full text-black">
                                                {ticket.prioridad}
                                            </span>

                                        </td>

                                        <td className="p-4 text-slate-500">
                                            {new Date(
                                                ticket.fecha_creacion
                                            ).toLocaleDateString()}
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