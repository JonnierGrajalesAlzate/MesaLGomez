import { useEffect, useState } from "react"; 
import TicketCard from "../../components/tecnico/TicketCard";
import EstadisticasTecnico from "../../components/tecnico/EstadisticasTecnico";
import ModalDetalleTicket from "../../components/tecnico/ModalDetalleTicket";
import Swal from "sweetalert2";
import DashboardLayoutTecnico from "../../layouts/tecnico/DashboardLayoutTecnico.jsx"

import {
    obtenerDashboardTecnico,
    obtenerDetalleTicket,
    actualizarEstadoTicket
} from "../../services/Tecnico/tecnicoService.js";

function Tecnico() {

    const usuario =
        JSON.parse(localStorage.getItem("usuario")) || {};

    const [estadisticas, setEstadisticas] = useState({

        abiertos: 0,
        proceso: 0,
        espera: 0,
        cerrados: 0

    });

    const [tickets, setTickets] = useState([]);

    const [modalAbierto, setModalAbierto] =
        useState(false);

    const [ticketSeleccionado, setTicketSeleccionado] =
        useState(null);

    const cargarDashboard = async () => {

        try {

            const response =
                await obtenerDashboardTecnico(
                    usuario.id
                );

            if (response.success) {

                setEstadisticas(
                    response.estadisticas
                );

                setTickets(
                    response.tickets
                );

            }

        } catch (error) {

            console.error(
                "Error cargando dashboard:",
                error
            );

        }

    };

    const verDetalle = async (ticket) => {

        try {

            const response =
                await obtenerDetalleTicket(
                    ticket.id
                );

            if (response.success) {

                setTicketSeleccionado(
                    response.ticket
                );

                setModalAbierto(true);

            }

        } catch (error) {

            console.error(
                "Error cargando detalle:",
                error
            );

        }

    };

    const iniciarTicket = async (ticket) => {

        try {

            await actualizarEstadoTicket(
                ticket.id,
                3 // EN PROCESO
            );

            setModalAbierto(false);

            setTicketSeleccionado(null);

            cargarDashboard();

        } catch (error) {

            console.error(error);

        }

    };

    const cerrarTicket = async (ticket) => {

    const result = await Swal.fire({

        title: "Cerrar ticket",

        text: "¿Está seguro de cerrar este ticket?",

        icon: "question",

        showCancelButton: true,

        confirmButtonText: "Sí, cerrar",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#16a34a"

    });

    if (!result.isConfirmed) {

        return;

    }

    try {

        const response =
            await actualizarEstadoTicket(
                ticket.id,
                2
            );

        Swal.fire({

            icon: "success",

            title: "Ticket cerrado",

            text: response.message,

            timer: 1800,

            showConfirmButton: false

        });

        setModalAbierto(false);

        setTicketSeleccionado(null);

        cargarDashboard();

    } catch (error) {

        Swal.fire({

            icon: "error",

            title: "Error",

            text: "No fue posible cerrar el ticket."

        });

    }

};

    useEffect(() => {

        if (usuario.id) {

            cargarDashboard();

        }

    }, []);

     return (

        <DashboardLayoutTecnico>

            <div className="w-full space-y-8">

                {/* Bienvenida */}

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

                        Hola {usuario.nombre}

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

                {/* Estadísticas */}

                <EstadisticasTecnico
                    estadisticas={estadisticas}
                />

                {/* Buscador */}

                <div>

                </div>

                {/* Filtros */}

                <div>

                </div>

                {/* Tickets */}

                <div className="space-y-6">

                    {

                        tickets.length > 0 ? (

                            tickets.map((ticket) => (

                                <TicketCard

                                    key={ticket.id}

                                    ticket={ticket}

                                    onVerDetalle={verDetalle}

                                    onIniciar={iniciarTicket}

                                    onCerrar={cerrarTicket}

                                />

                            ))

                        ) : (

                            <div
                                className="
                                    bg-white
                                    border
                                    border-slate-200
                                    rounded-3xl
                                    p-10
                                    text-center
                                    shadow-sm
                                "
                            >

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        text-slate-700
                                    "
                                >

                                    No tienes tickets asignados

                                </h2>

                                <p
                                    className="
                                        text-slate-500
                                        mt-3
                                    "
                                >

                                    Cuando se te asigne un ticket aparecerá aquí.

                                </p>

                            </div>

                        )

                    }

                </div>

            </div>

            <ModalDetalleTicket

                abierto={modalAbierto}

                ticket={ticketSeleccionado}

                onClose={() => {

                    setModalAbierto(false);

                    setTicketSeleccionado(null);

                }}

                onIniciar={iniciarTicket}

                onCerrar={cerrarTicket}

            />

        </DashboardLayoutTecnico>

    );

}

export default Tecnico;