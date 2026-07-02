import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { obtenerEtiquetas } from "../../../services/Noticias/noticiasService";

function ModalNoticia({

    abierto,

    onClose,

    onGuardar,

    noticia

}) {

    const [formulario, setFormulario] = useState({

        titulo: "",
        

        descripcion: "",

        etiqueta_id: ""

    });

    const [etiquetas, setEtiquetas] = useState([]);
    useEffect(() => {
    console.log("Etiquetas:", etiquetas);
}, [etiquetas]);

    //==========================
    // Cargar etiquetas
    //==========================

    useEffect(() => {

        const cargarEtiquetas = async () => {

            try {

                const data = await obtenerEtiquetas();

                setEtiquetas(data);

            } catch (error) {

                console.error(error);

            }

        };

        cargarEtiquetas();

    }, []);

    //==========================
    // Cargar noticia al editar
    //==========================

    useEffect(() => {

        if (noticia) {

            setFormulario({

                titulo: noticia.titulo || "",

                descripcion: noticia.descripcion || "",

                etiqueta_id: noticia.etiqueta_id
                    ? Number(noticia.etiqueta_id)
                    : ""

            });

        } else {

            setFormulario({

                titulo: "",

                descripcion: "",

                etiqueta_id: ""

            });

        }

    }, [noticia]);

    if (!abierto) {

        return null;

    }

    const handleChange = (e) => {

    const { name, value } = e.target;

    console.log(name);
    console.log(value);

    setFormulario(prev => ({
        ...prev,
        [name]: value
    }));

};

    const guardar = () => {

        if (!formulario.titulo.trim()) {

            Swal.fire({

                icon: "warning",

                title: "Título requerido",

                text: "Ingrese el título de la noticia."

            });

            return;

        }

        if (!formulario.etiqueta_id) {

            Swal.fire({

                icon: "warning",

                title: "Etiqueta requerida",

                text: "Seleccione una etiqueta."

            });

            return;

        }

        if (!formulario.descripcion.trim()) {

            Swal.fire({

                icon: "warning",

                title: "Observaciones requeridas",

                text: "Ingrese las observaciones."

            });

            return;

        }

        onGuardar(formulario);

    };
    
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
                    shadow-xl
                    w-full
                    max-w-3xl
                    overflow-hidden
                "
            >

                {/* Header */}

                <div
                    className="
                        border-b
                        border-slate-200
                        px-8
                        py-6
                        flex
                        justify-between
                        items-center
                        bg-slate-50
                    "
                >

                    <div>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                text-[#0B2347]
                            "
                        >

                            {noticia
                                ? "Editar noticia"
                                : "Nueva noticia"}

                        </h2>

                        <p className="text-slate-500 mt-1">

                            Complete la información de la noticia.

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                            w-10
                            h-10
                            rounded-full
                            hover:bg-red-100
                            text-slate-500
                            hover:text-red-600
                            text-2xl
                            transition
                        "

                    >

                        ×

                    </button>

                </div>

                {/* Body */}

                <div
                    className="
                        p-8
                        space-y-6
                    "
                >

                    <div>

                        <label className="font-semibold text-slate-700">

                            Título

                        </label>

                        <input

                            type="text"

                            name="titulo"

                            value={formulario.titulo}

                            onChange={handleChange}

                            placeholder="Ej. Outlook presenta intermitencias"

                            className="
                                w-full
                                mt-2
                                border
                                border-slate-300
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-[#0076E3]
                            "

                        />

                    </div>

                    <div>

                        <label className="font-semibold text-slate-700">

                            Etiqueta

                        </label>

                        <select

                            name="etiqueta_id"

                            value={formulario.etiqueta_id}

                            onChange={handleChange}

                            className="
                                w-full
                                mt-2
                                border
                                border-slate-300
                                rounded-xl
                                p-3
                                bg-white
                                outline-none
                                focus:ring-2
                                focus:ring-[#0076E3]
                            "

                        >

                            <option value="">
                                Seleccione una etiqueta...
                            </option>

                            {etiquetas.map((item) => (

                                <option

                                    key={item.id}

                                    value={item.id}

                                >

                                    {item.nombre}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="font-semibold text-slate-700">

                            Observaciones

                        </label>

                        <textarea

                            rows={6}

                            name="descripcion"

                            value={formulario.descripcion}

                            onChange={handleChange}

                            placeholder="Escriba aquí el contenido de la noticia..."

                            className="
                                w-full
                                mt-2
                                border
                                border-slate-300
                                rounded-xl
                                p-3
                                outline-none
                              F  resize-none
                                focus:ring-2
                                focus:ring-[#0076E3]
                            "

                        />

                    </div>

                </div>

                {/* Footer */}

                <div
                    className="
                        border-t
                        border-slate-200
                        p-6
                        flex
                        justify-end
                        gap-4
                        bg-slate-50
                    "
                >

                    <button

                        onClick={onClose}

                        className="
                            px-6
                            py-3
                            rounded-xl
                            border
                            border-slate-300
                            hover:bg-slate-100
                        "

                    >

                        Cancelar

                    </button>

                    <button

                        onClick={guardar}

                        className="
                            bg-[#0076E3]
                            hover:bg-[#005ec2]
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                        "

                    >

                        Guardar

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalNoticia;