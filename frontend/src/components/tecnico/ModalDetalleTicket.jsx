function ModalDetalleTicket({

    abierto,

    onClose,

    ticket,

    onIniciar,

    onCerrar

}) {

    if (!abierto || !ticket) {

        return null;

    }

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/50
                backdrop-blur-sm
                flex
                justify-center
                items-center
                z-50
                p-6
            "
        >

            <div
                className="
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    w-full
                    max-w-5xl
                    max-h-[90vh]
                    overflow-y-auto
                "
            >

                {/* Header */}

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        border-b
                        p-6
                    "
                >

                    <div>

                        <h2 className="text-3xl font-bold text-[#0B2347]">

                            Ticket #{ticket.id}

                        </h2>

                        <p className="text-slate-500 mt-2">

                            {ticket.titulo}

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="
                            text-3xl
                            text-slate-500
                            hover:text-red-500
                        "
                    >

                        ×

                    </button>

                </div>

                {/* Contenido */}

                <div className="p-8 space-y-8">

                    {/* Descripción */}

                    <div>

                        <h3 className="font-bold text-lg mb-3">

                            Descripción

                        </h3>

                        <div
                            className="
                                bg-slate-50
                                rounded-2xl
                                p-5
                            "
                        >

                            {ticket.descripcion}

                        </div>

                    </div>

                    {/* Información */}

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <span className="text-slate-500">

                                Usuario

                            </span>

                            <p className="font-semibold">

                                {ticket.usuario}

                            </p>

                        </div>

                        <div>

                            <span className="text-slate-500">

                                Categoría

                            </span>

                            <p className="font-semibold">

                                {ticket.categoria}

                            </p>

                        </div>

                        <div>

                            <span className="text-slate-500">

                                Prioridad

                            </span>

                            <p className="font-semibold">

                                {ticket.prioridad}

                            </p>

                        </div>

                        <div>

                            <span className="text-slate-500">

                                Estado

                            </span>

                            <p className="font-semibold">

                                {ticket.estado}

                            </p>

                        </div>

                        <div>

                            <span className="text-slate-500">

                                Fecha creación

                            </span>

                            <p className="font-semibold">

                                {

                                    new Date(
                                        ticket.fecha_creacion
                                    ).toLocaleString()

                                }

                            </p>

                        </div>

                        {

                            ticket.fecha_cierre && (

                                <div>

                                    <span className="text-slate-500">

                                        Fecha cierre

                                    </span>

                                    <p className="font-semibold">

                                        {

                                            new Date(
                                                ticket.fecha_cierre
                                            ).toLocaleString()

                                        }

                                    </p>

                                </div>

                            )

                        }

                    </div>

                    {/* Archivo */}

                    <div>

                        <h3 className="font-bold text-lg mb-3">

                            Archivo adjunto

                        </h3>

                        {

                            ticket.nombre_archivo ? (

                                <a
                                    href={`http://localhost:3000/uploads/${ticket.ruta_archivo}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        text-[#0076e3]
                                        hover:underline
                                    "
                                >

                                    {ticket.nombre_archivo}

                                </a>

                            ) : (

                                <p className="text-slate-500">

                                    Este ticket no tiene archivos adjuntos.

                                </p>

                            )

                        }

                    </div>

                </div>

                {/* Footer */}

                <div
                    className="
                        border-t
                        p-6
                        flex
                        justify-end
                        gap-4
                    "
                >

                    {

                        ticket.estado_id === 1 && (

                            <button
                                onClick={() => onIniciar(ticket)}
                                className="
                                    bg-yellow-500
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    hover:bg-yellow-600
                                "
                            >

                                Iniciar

                            </button>

                        )

                    }

                    {

                        ticket.estado_id === 3 && (

                            <button
                                onClick={() => onCerrar(ticket)}
                                className="
                                    bg-green-600
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    hover:bg-green-700
                                "
                            >

                                Cerrar Ticket

                            </button>

                        )

                    }

                    <button
                        onClick={onClose}
                        className="
                            border
                            border-slate-300
                            px-6
                            py-3
                            rounded-xl
                            hover:bg-slate-100
                        "
                    >

                        Cerrar

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalDetalleTicket;