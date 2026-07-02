function TablaNoticias({

    noticias,

    onEditar,

    onEliminar

}) {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                border
                border-slate-200
                shadow-sm
                overflow-hidden
            "
        >

            <table className="w-full">

                <thead
                    className="
                        bg-[#F8FAFC]
                        border-b
                        border-slate-200
                    "
                >

                    <tr
                        className="
                            text-slate-600
                            text-sm
                            uppercase
                            tracking-wide
                        "
                    >

                        <th className="px-6 py-5 text-left">

                            Noticia

                        </th>

                        <th className="px-6 py-5 text-center">

                            Etiqueta

                        </th>

                        <th className="px-6 py-5 text-center">

                            Fecha

                        </th>

                        <th className="px-6 py-5 text-center">

                            Autor

                        </th>

                        <th className="px-6 py-5 text-center">

                            Acciones

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        noticias.length > 0

                            ? noticias.map((noticia) => {

                                const fecha =
                                    new Date(
                                        noticia.fecha_creacion
                                    );

                                const dias =
                                    (new Date() - fecha) /
                                    (1000 * 60 * 60 * 24);

                                return (

                                    <tr

                                        key={noticia.id}

                                        className="
                                            border-b
                                            border-slate-100
                                            hover:bg-slate-50
                                            transition-all
                                        "

                                    >

                                        {/* Titulo */}

                                        <td className="px-6 py-5">

                                            <h3
                                                className="
                                                    font-bold
                                                    text-[#0B2347]
                                                "
                                            >

                                                {noticia.titulo}

                                            </h3>

                                            <p
                                                className="
                                                    text-sm
                                                    text-slate-500
                                                    mt-1
                                                    line-clamp-2
                                                "
                                            >

                                                {noticia.descripcion}

                                            </p>

                                        </td>

                                        {/* Etiqueta */}

                                        <td className="px-6 py-5">

                                            <div
                                                className="
                                                    flex
                                                    justify-center
                                                    gap-2
                                                    flex-wrap
                                                "
                                            >

                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                                                    style={{
                                                        backgroundColor: noticia.color
                                                    }}
                                                >
                                                    {noticia.etiqueta}
                                                </span>

                                                {

                                                    dias <= 7 && (

                                                        <span
                                                            className="
                                                                bg-green-100
                                                                text-green-700
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                text-xs
                                                                font-semibold
                                                            "
                                                        >

                                                            Reciente

                                                        </span>

                                                    )

                                                }

                                            </div>

                                        </td>

                                        {/* Fecha */}

                                        <td
                                            className="
                                                px-6
                                                py-5
                                                text-center
                                                text-slate-600
                                            "
                                        >

                                            {

                                                fecha.toLocaleDateString()

                                            }

                                        </td>

                                        {/* Autor */}

                                        <td
                                            className="
                                                px-6
                                                py-5
                                                text-center
                                            "
                                        >

                                            <div
                                                className="
                                                    font-medium
                                                    text-[#0B2347]
                                                "
                                            >

                                                {

                                                    noticia.nombre

                                                } {

                                                    noticia.apellido

                                                }

                                            </div>

                                        </td>

                                        {/* Acciones */}

                                        <td className="px-6 py-5">

                                            <div
                                                className="
                                                    flex
                                                    justify-center
                                                    gap-3
                                                "
                                            >

                                                <button

                                                    onClick={() =>
                                                        onEditar(noticia)
                                                    }

                                                    className="
                                                        w-10
                                                        h-10
                                                        rounded-xl
                                                        bg-amber-100
                                                        hover:bg-amber-200
                                                        transition
                                                        flex
                                                        items-center
                                                        justify-center
                                                    "

                                                >

                                                    ✏️

                                                </button>

                                                <button

                                                    onClick={() =>
                                                        onEliminar(noticia)
                                                    }

                                                    className="
                                                        w-10
                                                        h-10
                                                        rounded-xl
                                                        bg-red-100
                                                        hover:bg-red-200
                                                        transition
                                                        flex
                                                        items-center
                                                        justify-center
                                                    "

                                                >

                                                    🗑️

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                );

                            })

                            :

                            <tr>

                                <td
                                    colSpan={5}
                                    className="
                                        py-16
                                        text-center
                                        text-slate-500
                                    "
                                >

                                    No existen noticias registradas.

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TablaNoticias;