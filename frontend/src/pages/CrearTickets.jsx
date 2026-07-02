import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Footer from "../components/Footer";
import { crearTicket } from "../services/Tickets/ticketService";
import ModalTicket from "../components/ModalTicket";

import {
    obtenerCategorias,
    obtenerPrioridades
} from "../services/Tickets/catalogosService";

function CrearTickets() {

    const usuario =
        JSON.parse(localStorage.getItem("usuario")) || {};

    const [categorias, setCategorias] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [archivo, setArchivo] = useState(null);

    const [mensaje, setMensaje] = useState("");

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        categoria_id: "",
        prioridad_id: ""
    });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [ticketSeleccionado, setTicketSeleccionado] = useState(null);

    useEffect(() => {
    cargarCatalogos()
    const handlePaste = (event) => {

        const items =
            event.clipboardData?.items;

        if (!items) return;

        for (const item of items) {

            if (
                item.type.startsWith("image/")
            ) {

                const file =
                    item.getAsFile();

                if (file) {

                    setArchivo(file);

                    setMensaje(
                        "Captura pegada correctamente"
                    );

                }

                break;

            }

        }

    };

    window.addEventListener(
        "paste",
        handlePaste
    );

    return () => {

        window.removeEventListener(
            "paste",
            handlePaste
        );

    };

}, []);

    const cargarCatalogos = async () => {

        try {

            const categoriasData =
                await obtenerCategorias();

            const prioridadesData =
                await obtenerPrioridades();

            setCategorias(categoriasData);
            setPrioridades(prioridadesData);

        } catch (error) {

            console.error(
                "Error cargando catálogos",
                error
            );

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleFileChange = (e) => {

        setArchivo(
            e.target.files[0]
        );

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            data.append(
                "titulo",
                formData.titulo
            );

            data.append(
                "descripcion",
                formData.descripcion
            );

            data.append(
                "categoria_id",
                formData.categoria_id
            );

            data.append(
                "prioridad_id",
                formData.prioridad_id
            );

            data.append(
                "usuario_id",
                usuario.id
            );

            if (archivo) {

                data.append(
                    "adjunto",
                    archivo
                );

            }

            const response = await crearTicket(data);

setMensaje(response.message);

setTicketSeleccionado({
    id: response.ticket.id
});

setMostrarModal(true);

            setFormData({
                titulo: "",
                descripcion: "",
                categoria_id: "",
                prioridad_id: ""
            });

            setArchivo(null);

        } catch (error) {

            console.error(error);

            setMensaje(
                "Error al crear el ticket"
            );

        }

    };

    return (

        <DashboardLayout>

            <div
                className="
                    bg-white
                    border
                    border-slate-200
                    p-6
                    rounded-xl
                    shadow-sm
                "
            >

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-slate-800
                        text-center
                    "
                >
                    Nueva solicitud
                </h1>

                <p
                    className="
                        text-slate-500
                        mt-1
                        text-center
                    "
                >
                    Registra un nuevo ticket de soporte
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="
                    mt-6
                    bg-white
                    border
                    border-slate-200
                    rounded-xl
                    shadow-sm
                    p-6
                    space-y-5
                "
            >

                <div>

                    <label
                        className="
                            block
                            mb-2
                            font-medium
                            text-slate-900
                        "
                    >
                        Título
                    </label>

                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Ingrese el asunto del ticket"
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-500
                        "
                        required
                    />

                </div>

                <div
                    className="
                        grid
                        md:grid-cols-2
                        gap-4
                    "
                >

                    <div>

                        <label
                            className="
                                block
                                mb-2
                                font-medium
                                text-slate-900
                            "
                        >
                            Categoría
                        </label>

                        <select
                            name="categoria_id"
                            value={formData.categoria_id}
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                border-slate-300
                                text-slate-500
                                rounded-lg
                                px-4
                                py-3
                            "
                            required
                        >

                            <option value="">
                                Seleccione una categoría
                            </option>

                            {categorias.map((categoria) => (

                                <option
                                    key={categoria.id}
                                    value={categoria.id}
                                >
                                    {categoria.nombre}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div> 

                        <div>

                            <label
                                className="
                                    block
                                    mb-2
                                    font-medium
                                    text-slate-900
                                "
                            >
                                Prioridad
                            </label> 
                            <div className="grid grid-cols-3 gap-3">

    {prioridades.map((prioridad) => {

        const seleccionada =
            Number(formData.prioridad_id) === prioridad.id;

        return (

            <button
                key={prioridad.id}
                type="button"
                onClick={() =>
                    setFormData({
                        ...formData,
                        prioridad_id: prioridad.id
                    })
                }
                style={{
                    backgroundColor: seleccionada
                        ? prioridad.color
                        : `${prioridad.color}20`, // Color con transparencia
                    borderColor: prioridad.color,
                    color: seleccionada
                        ? "#FFFFFF"
                        : prioridad.color
                }}
                className="
                    border-2
                    rounded-xl
                    py-4
                    px-4
                    font-semibold
                    transition-all
                    cursor-pointer
                    hover:scale-105
                "
            >
                {prioridad.nombre}
            </button>

        );

    })}

</div></div></div>

                </div>

                <div>

                    <label
                        className="
                            block
                            mb-2
                            font-medium
                            text-slate-900
                        "
                    >
                        Descripción
                    </label>

                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Describe detalladamente el problema..."
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            px-4
                            py-3
                            resize-none
                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-500
                        "
                        required
                    />

                </div>

                 <div>

    <label
        className="
            block
            mb-2
            font-medium
            text-slate-900
        "
    >
        Evidencia del problema
    </label>

    <div
        className="
            border-2
            border-dashed
            border-slate-300
            rounded-xl
            p-6
            transition
            hover:border-[#0076e3]
        "
    >

        <input
            type="file"
            onChange={handleFileChange}
            className="
                w-full
                text-slate-500
            "
        />

        <div
            className="
                mt-4
                text-center
                text-sm
                text-slate-500
            "
        >
            📎 Seleccione un archivo o
            <span
                className="
                    text-[#0076e3]
                    font-semibold
                "
            >
                {" "}presione Ctrl + V
            </span>
            para pegar una captura de pantalla.
        </div>

    </div>

    {archivo && (

        <div className="mt-4">

            <p
                className="
                    text-sm
                    font-medium
                    text-slate-700
                    mb-2
                "
            >
                Archivo seleccionado
            </p>

            <div 
                className="
                    bg-slate-100
                    border
                    border-slate-200
                    px-4
                    py-3
                    rounded-lg
                    text-slate-700
                "
            >
            {archivo.name}
            </div>

            {
                archivo.type?.startsWith(
                    "image/"
                ) && (

                    <img
                        src={
                            URL.createObjectURL(
                                archivo
                            )
                        }
                        alt="Vista previa"
                        className="
                            mt-4
                            max-h-80
                            rounded-xl
                            border
                            border-slate-200
                            shadow-sm
                        "
                    />

                )
            }

        </div>

    )}

</div>

                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="
                            px-6
                            py-3
                            rounded-lg
                            bg-[#0076e3]
                            cursor-pointer
                            hover:bg-[#1685ed]
                            text-white
                            font-medium
                            transition
                        "
                    >
                        Crear Ticket
                    </button>

                </div>

                {mensaje && (
                    <div
                        className="
                            bg-sky-700
                            border
                            border-green-300
                            text-white
                            p-3
                            rounded-lg
                        "
                    >
                        {mensaje}
                    </div>

                )}

            </form>
            {mostrarModal && (
    <ModalTicket
        ticket={ticketSeleccionado}
        onClose={() => {
            setMostrarModal(false);
            setTicketSeleccionado(null);
        }}
    />
)}
            <Footer />

        </DashboardLayout>

    );

}

export default CrearTickets;