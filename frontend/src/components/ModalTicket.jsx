import { useEffect, useState } from "react";
import { InfoTicket } from "../services/dashboardService";

function ModalTicket({ ticket, onClose }) {

    const [detalle, setDetalle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const cargarDetalle = async () => {

            try {

                const data = await InfoTicket(ticket.id);

                setDetalle(data);

            } catch (error) {

                console.error("Error cargando detalle:", error);

            } finally {

                setLoading(false);

            }

        };

        if (ticket?.id) {
            cargarDetalle();
        }

    }, [ticket]);

    if (!ticket) return null;

    return (
        <div
            className="
                fixed
                inset-0
                bg-black/60
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-[9999]
                p-2
            "
        >

            <div
                className="
                    relative
                    z-[10000]
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    w-full
                    max-w-2xl
                    max-h-[85vh]
                    overflow-hidden
                    flex
                    flex-col
                "
            >

                {/* HEADER */}

                <div
                    className="
                        bg-[#0076e3]
                        px-4
                        py-3
                        flex
                        justify-between
                        items-center
                    "
                >

                    <div>
                        <h2 className="text-lg font-bold text-white">
                            Ticket #{ticket.id}
                        </h2>

                        <p className="text-blue-100 text-xs">
                            Información detallada
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            text-white
                            text-xl
                            font-bold
                            cursor-pointer
                        "
                    >
                        ✕
                    </button>

                </div>

                {/* BODY */}

                <div className="overflow-y-auto p-4">

                    {loading ? (

                        <div className="text-center py-10">
                            Cargando información...
                        </div>

                    ) : detalle ? (

                        <>
                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    gap-3
                                "
                            >

                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-[11px] text-slate-500 uppercase">
                                        Título
                                    </label>

                                    <p className="text-sm font-medium text-slate-800 break-words">
                                        {detalle.titulo}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-[11px] text-slate-500 uppercase">
                                        Estado
                                    </label>

                                    <p className="text-sm font-medium text-slate-800">
                                        {detalle.estado}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-[11px] text-slate-500 uppercase">
                                        Categoría
                                    </label>

                                    <p className="text-sm font-medium text-slate-800">
                                        {detalle.categoria}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-[11px] text-slate-500 uppercase">
                                        Prioridad
                                    </label>

                                    <p className="text-sm font-medium text-slate-800">
                                        {detalle.prioridad}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-[11px] text-slate-500 uppercase">
                                        Usuario
                                    </label>

                                    <p className="text-sm font-medium text-slate-800 break-words">
                                        {detalle.usuario}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-[11px] text-slate-500 uppercase">
                                        Técnico asignado
                                    </label>

                                    <p className="text-sm font-medium text-slate-800 break-words">
                                        {detalle.tecnic || "Sin asignar"}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-[11px] text-slate-500 uppercase">
                                        Fecha creación
                                    </label>

                                    <p className="text-sm font-medium text-slate-800">
                                        {new Date(
                                            detalle.fecha_creacion
                                        ).toLocaleString("es-CO")}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-[11px] text-slate-500 uppercase">
                                        Fecha cierre
                                    </label>

                                    <p className="text-sm font-medium text-slate-800">
                                        {detalle.fecha_cierre
                                            ? new Date(
                                                  detalle.fecha_cierre
                                              ).toLocaleString("es-CO")
                                            : "No cerrado"}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-4">

                                <label className="text-[11px] text-slate-500 uppercase">
                                    Descripción
                                </label>

                                <div
                                    className="
                                        mt-2
                                        bg-slate-100
                                        rounded-lg
                                        p-3
                                        text-sm
                                        text-slate-700
                                        break-words
                                        max-h-40
                                        overflow-y-auto
                                    "
                                >
                                    {detalle.descripcion}
                                </div>

                            </div>
                        </>

                    ) : (

                        <div className="text-center py-10 text-red-500">
                            No se pudo cargar la información del ticket.
                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ModalTicket;