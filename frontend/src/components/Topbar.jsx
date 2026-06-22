import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo2 from "../assets/logo2.png";

function Topbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const usuario =
        JSON.parse(localStorage.getItem("usuario")) || {};

    const menuItems = [
        {
            path: "/dashboard",
            label: "Inicio",
        },
        {
            path: "/crear-ticket",
            label: "Crear Ticket",
        },
        {
            path: "/tickets",
            label: "Tickets",
        },
        {
            path: "/ayuda",
            label: "Ayuda",
        },
        {
            path: "/configuracion",
            label: "Configuración",
        },
    ];

    return (
        <>
            <header
                className="
                    sticky
                    top-0
                    z-[999]
                    h-28
                    bg-[#0076e3]
                    border-b
                    border-white/10
                    shadow-lg
                    px-6
                    lg:px-12
                    flex
                    items-center
                    justify-between
                "
            >
                {/* LOGO */}

                <div className="flex items-center gap-4">
                    <img
                        src={logo2}
                        alt="Logo"
                        className="w-14 h-14 object-contain"
                    />

                    <div>
                        <h1 className="font-bold text-white text-2xl">
                            LG Soporte
                        </h1>

                        <p className="text-sm text-white/80">
                            Londoño Gómez
                        </p>
                    </div>
                </div>

                {/* MENU DESKTOP */}

                <nav className="hidden lg:flex items-center gap-10">
                    {menuItems.map((item) => {
                        const active =
                            location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="
                                    relative
                                    text-white
                                    font-semibold
                                    text-lg
                                    py-2
                                    transition-all
                                    duration-300
                                    group
                                "
                            >
                                {item.label}

                                {/* Línea inferior animada */}
                                <span
                                    className={`
                                        absolute
                                        left-0
                                        -bottom-1
                                        h-[3px]
                                        bg-[#00d4a1]
                                        rounded-full
                                        transition-all
                                        duration-300
                                        ${
                                            active
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }
                                    `}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* USUARIO + HAMBURGUESA */}

                <div className="flex items-center gap-5">
                    <div className="hidden md:block text-right">
                        <p className="font-semibold text-white text-base">
                            {usuario.nombre || "Usuario"}
                        </p>

                        <p className="text-sm text-white/80">
                            {usuario.rol || "Sin rol"}
                        </p>
                    </div>

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            bg-[#005fc0]
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-lg
                            text-white
                            shadow-md
                        "
                    >
                        {usuario.nombre
                            ? usuario.nombre
                                  .charAt(0)
                                  .toUpperCase()
                            : "U"}
                    </div>

                    {/* BOTÓN HAMBURGUESA */}

                    <button
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        className="
                            lg:hidden
                            flex
                            items-center
                            justify-center
                            text-white
                            text-3xl
                            w-12
                            h-12
                            rounded-lg
                            hover:bg-[#0064c2]
                            transition-all
                            duration-300
                        "
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </header>

            {/* OVERLAY */}

            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[998] lg:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* MENÚ MÓVIL */}

            <div
                className={`
                    fixed
                    top-28
                    left-0
                    right-0
                    z-[9999]
                    lg:hidden
                    bg-[#0076e3]
                    shadow-2xl
                    border-b
                    border-white/10
                    transition-all
                    duration-300
                    overflow-hidden

                    ${
                        menuOpen
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0 pointer-events-none"
                    }
                `}
            >
                {menuItems.map((item) => {
                    const active =
                        location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() =>
                                setMenuOpen(false)
                            }
                            className={`
                                flex
                                items-center
                                px-6
                                py-5
                                text-lg
                                font-medium
                                border-l-4
                                transition-all
                                duration-300

                                ${
                                    active
                                        ? "bg-[#0064c2] text-white border-[#00d4a1]"
                                        : "text-white/90 border-transparent hover:bg-[#0064c2] hover:border-[#00d4a1]"
                                }
                            `}
                        >
                            {item.label}
                        </Link>
                    );
                })}

                <div className="border-t border-white/10 p-5">
                    <div className="flex items-center gap-4">
                        <div
                            className="
                                w-12
                                h-12
                                rounded-full
                                bg-[#005fc0]
                                flex
                                items-center
                                justify-center
                                font-bold
                                text-white
                            "
                        >
                            {usuario.nombre
                                ? usuario.nombre
                                      .charAt(0)
                                      .toUpperCase()
                                : "U"}
                        </div>

                        <div>
                            <p className="text-white font-semibold">
                                {usuario.nombre ||
                                    "Usuario"}
                            </p>

                            <p className="text-sm text-white/70">
                                {usuario.rol ||
                                    "Sin rol"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Topbar;