import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

import logo from "../assets/logo.png";
import portada from "../assets/portada2.png";

function Login() {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        try {
            setLoading(true);

            const data = await login(
                correo,
                password
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(data.usuario)
            );

            if (data.usuario.rol === "Administrador") {

    navigate("/admin");

}
else if (data.usuario.rol === "Tecnico") {

    navigate("/tecnico");

}
else {

    navigate("/dashboard");

}

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Datos incorrectos"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* PANEL IZQUIERDO */}

            <div className="hidden lg:flex w-1/2 bg-white border-r border-slate-200 items-center justify-center">

                <div className="max-w-xl px-10 text-center">

                    <img
                        src={portada}
                        alt="Portada"
                        className="w-full max-w-md mx-auto object-contain"
                    />

                    <h1 className="mt-8 text-3xl font-bold text-slate-800">
                        Sistema de Mesa de Ayuda
                    </h1>

                    <p className="mt-4 text-slate-600 leading-relaxed">
                        Gestiona incidencias, solicitudes, requerimientos
                        tecnológicos y realiza seguimiento a cada ticket
                        desde una única plataforma.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">

                        <div className="bg-slate-50 border border-slate-200 px-5 py-3 rounded-lg">
                            <p className="text-sm font-medium text-slate-700">
                                Soporte TI
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 px-5 py-3 rounded-lg">
                            <p className="text-sm font-medium text-slate-700">
                                Tickets
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 px-5 py-3 rounded-lg">
                            <p className="text-sm font-medium text-slate-700">
                                Seguimiento
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            {/* PANEL DERECHO */}

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">

                <div className="w-full max-w-md">

                    <div className="bg-white border border-slate-200 rounded-xl shadow-lg">

                        {/* CABECERA */}

                        <div className="border-b border-slate-200 p-8 text-center">

                            <img
                                src={logo}
                                alt="Logo"
                                className="w-44 h-44 mx-auto object-contain"
                            />

                            <h2 className=" text-2xl font-bold text-slate-800">
                                LG Soporte
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Mesa de Ayuda Corporativa
                            </p>

                        </div>

                        {/* FORMULARIO */}

                        <div className="p-8">

                            <form
                                onSubmit={handleLogin}
                            >

                                <div className="mb-5">

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Correo Electrónico
                                    </label>

                                    <input
                                        type="email"
                                        value={correo}
                                        onChange={(e) =>
                                            setCorreo(e.target.value)
                                        } 
                                        className="
                                            w-full
                                            px-4
                                            py-3
                                            border
                                            border-slate-300
                                            rounded-lg
                                            bg-white
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-600
                                            focus:border-blue-600
                                        "
                                        required
                                    />

                                </div>

                                <div className="mb-5">

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="
                                            w-full
                                            px-4
                                            py-3
                                            border
                                            border-slate-300
                                            rounded-lg
                                            bg-white
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-600
                                            focus:border-blue-600
                                        "
                                        required
                                    />

                                </div>

                                {error && (

                                    <div className="
                                        mb-5
                                        bg-red-50
                                        border
                                        border-red-200
                                        text-red-600
                                        px-4
                                        py-3
                                        rounded-lg
                                        text-sm
                                    ">
                                        {error}
                                    </div>

                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        w-full
                                        py-3
                                        bg-blue-700
                                        hover:bg-blue-800
                                        text-white
                                        font-medium
                                        rounded-lg
                                        transition
                                        disabled:opacity-70
                                    "
                                >
                                    {
                                        loading
                                            ? "Ingresando..."
                                            : "Iniciar Sesión"
                                    }
                                </button>

                            </form>


                        </div>

    

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;