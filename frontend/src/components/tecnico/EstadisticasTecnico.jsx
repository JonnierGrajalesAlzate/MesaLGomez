import abierto from "../../assets/abierto.png";
import proceso from "../../assets/proceso.png";
import cerrado from "../../assets/cerrado.png";
import reabierto from "../../assets/Reabrir.png";

function EstadisticasTecnico({ estadisticas }) {

    const tarjetas = [

        {
            titulo: "Abiertos",
            cantidad: Number(estadisticas?.abiertos || 0),
            color: "#0076e3",
            icono: abierto
        },

        {
            titulo: "En proceso",
            cantidad: Number(estadisticas?.proceso || 0),
            color: "#f59e0b",
            icono: abierto
        },

        {
            titulo: "En espera",
            cantidad: Number(estadisticas?.espera || 0),
            color: "#ef4444",
            icono: abierto
        },

        {
            titulo: "Cerrados",
            cantidad: Number(estadisticas?.cerrados || 0),
            color: "#22c55e",
            icono: abierto
        }

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                tarjetas.map((tarjeta) => (

                    <div
                        key={tarjeta.titulo}
                        className="
                            bg-white
                            rounded-3xl
                            border
                            border-slate-200
                            shadow-sm
                            hover:shadow-lg
                            transition-all
                            duration-300
                            p-6
                        "
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-slate-500 text-sm font-medium">

                                    {tarjeta.titulo}

                                </p>

                                <h2
                                    className="text-4xl font-bold mt-3"
                                    style={{
                                        color: tarjeta.color
                                    }}
                                >

                                    {tarjeta.cantidad}

                                </h2>

                            </div>

                            {/* Aquí colocarás el icono */}

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-slate-100
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                {/*

                                <img
                                    src={Icono}
                                    className="w-9 h-9"
                                />

                                */}

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default EstadisticasTecnico;