import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import DashboardLayoutTecnico from "../../layouts/tecnico/DashboardLayoutTecnico.jsx";
import TablaNoticias from "../../components/tecnico/Noticias/TablaNoticias.jsx";
import ModalNoticia from "../../components/tecnico/Noticias/ModalNoticia.jsx";

import {

    getNoticias,

    crearNoticia,

    actualizarNoticia,

    eliminarNoticia

} from "../../services/noticiasService.js";

function Noticias() {

    const usuario =
        JSON.parse(localStorage.getItem("usuario")) || {};

    const [noticias, setNoticias] = useState([]);

    const [modalAbierto, setModalAbierto] =
        useState(false);

    const [noticiaSeleccionada,
        setNoticiaSeleccionada] =
        useState(null);

    //==========================
    // Cargar noticias
    //==========================

    const cargarNoticias = async () => {

    try {

        const noticias = await getNoticias();

        setNoticias(noticias);

    } catch (error) {

        console.error(error);

    }

};

    useEffect(() => {

        cargarNoticias();

    }, []);

    //==========================
    // Nueva noticia
    //==========================

    const nuevaNoticia = () => {

        setNoticiaSeleccionada(null);

        setModalAbierto(true);

    };

    //==========================
    // Editar
    //==========================

    const editarNoticia = (noticia) => {

        setNoticiaSeleccionada(noticia);

        setModalAbierto(true);

    };

    //==========================
    // Guardar
    //==========================

    const guardarNoticia = async (datos) => {

        try {

            if (noticiaSeleccionada) {

                await actualizarNoticia(

    noticiaSeleccionada.id,

    {

        titulo: datos.titulo,
        descripcion: datos.descripcion,
        etiqueta_id: Number(datos.etiqueta_id)

    }

);

                Swal.fire({

                    icon: "success",

                    title: "Noticia actualizada"

                });

            } else {

                await crearNoticia({

    titulo: datos.titulo,
    descripcion: datos.descripcion,
    etiqueta_id: Number(datos.etiqueta_id),
    usuario_id: usuario.id

});

                Swal.fire({

                    icon: "success",

                    title: "Noticia creada"

                });

            }

            setModalAbierto(false);

            cargarNoticias();

        } catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "No fue posible guardar."

            });

        }

    };

    //==========================
    // Eliminar
    //==========================

    const borrarNoticia = async (noticia) => {

        const result =
            await Swal.fire({

                title:
                    "¿Eliminar noticia?",

                text:
                    noticia.titulo,

                icon:
                    "warning",

                showCancelButton:
                    true,

                confirmButtonText:
                    "Eliminar",

                cancelButtonText:
                    "Cancelar"

            });

        if (!result.isConfirmed)
            return;

        try {

            await eliminarNoticia(
                noticia.id
            );

            Swal.fire({

                icon:
                    "success",

                title:
                    "Eliminada"

            });

            cargarNoticias();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <DashboardLayoutTecnico>

            <div className="space-y-8">

                {/* Encabezado */}

                <div
                    className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-200
                        shadow-sm
                        p-8
                        flex
                        justify-between
                        items-center
                    "
                >

                    <div>

                        <h1
                            className="
                                text-4xl
                                font-bold
                                text-[#0B2347]
                            "
                        >

                            Noticias

                        </h1>

                        <p
                            className="
                                mt-2
                                text-slate-500
                            "
                        >

                            Administra las noticias del sistema.

                        </p>

                    </div>

                    <button

                        onClick={nuevaNoticia}

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

                        + Nueva noticia

                    </button>

                </div>

                {/* Tabla */}

                <TablaNoticias

                    noticias={noticias}

                    onEditar={editarNoticia}

                    onEliminar={borrarNoticia}

                />

                {/* Modal */}

                <ModalNoticia

                    abierto={modalAbierto}

                    noticia={noticiaSeleccionada}

                    onClose={() => {

                        setModalAbierto(false);

                        setNoticiaSeleccionada(null);

                    }}

                    onGuardar={guardarNoticia}

                />

            </div>

        </DashboardLayoutTecnico>

    );

}

export default Noticias;