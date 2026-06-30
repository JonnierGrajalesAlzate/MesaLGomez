function TicketCard({

    ticket,

    onVerDetalle,

    onIniciar,

    onCerrar

}) {

    const colorEstado = () => {

        switch (ticket.estado_id) {

            case 1:
                return "bg-blue-100 text-blue-700";

            case 2:
                return "bg-green-100 text-green-700";

            case 3:
                return "bg-yellow-100 text-yellow-700";

            case 4:
                return "bg-gray-200 text-gray-700";

            case 5:
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-700";

        }

    };

    return (

        <div
            className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
                p-6
            "
        >

            {/* Encabezado */}

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-sm text-slate-400">

                        Ticket #{ticket.id}

                    </p>

                    <h2 className="text-xl font-bold text-[#0B2347] mt-1">

                        {ticket.titulo}

                    </h2>

                </div>

                <span
                    className={`
                        px-4
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                        ${colorEstado()}
                    `}
                >

                    {ticket.estado}

                </span>

            </div>

            {/* Descripción */}

            <p className="mt-4 text-slate-600">

                {ticket.descripcion}

            </p>

            {/* Información */}

            <div className="grid md:grid-cols-2 gap-4 mt-6">

                <div>

                    <span className="text-slate-400 text-sm">

                        Usuario

                    </span>

                    <p className="font-semibold">

                        {ticket.usuario}

                    </p>

                </div>

                <div>

                    <span className="text-slate-400 text-sm">

                        Categoría

                    </span>

                    <p className="font-semibold">

                        {ticket.categoria}

                    </p>

                </div>

                <div>

                    <span className="text-slate-400 text-sm">

                        Prioridad

                    </span>

                    <p className="font-semibold">

                        {ticket.prioridad}

                    </p>

                </div>

                <div>

                    <span className="text-slate-400 text-sm">

                        Fecha

                    </span>

                    <p className="font-semibold">

                        {

                            new Date(
                                ticket.fecha_creacion
                            ).toLocaleDateString()

                        }

                    </p>

                </div>

            </div>

            {/* Botones */}

            <div className="flex flex-wrap gap-3 mt-8">

                <button
                    onClick={() => onVerDetalle(ticket)}
                    className="
                        px-5
                        py-2
                        rounded-xl
                        border
                        border-[#0076e3]
                        text-[#0076e3]
                        hover:bg-[#0076e3]
                        hover:text-white
                        transition
                    "
                >

                    Ver detalle

                </button>

                {

                    ticket.estado_id === 1 && (

                        <button
                            onClick={() => onIniciar(ticket)}
                            className="
                                px-5
                                py-2
                                rounded-xl
                                bg-yellow-500
                                text-white
                                hover:bg-yellow-600
                                transition
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
                                px-5
                                py-2
                                rounded-xl
                                bg-green-600
                                text-white
                                hover:bg-green-700
                                transition
                            "
                        >

                            Cerrar Ticket

                        </button>

                    )

                }

            </div>

        </div>

    );

}

export default TicketCard;