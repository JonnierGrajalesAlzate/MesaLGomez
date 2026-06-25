import {
    useState,
    useEffect,
    useRef
} from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import logo2 from "../assets/logo2.png";

function Topbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] =
        useState(false);
    const userMenuRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

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
    ];

    const cerrarSesion = () => {
        localStorage.removeItem("usuario");
        navigate("/");
    };
    useEffect(() => {

    function handleClickOutside(event) {

        if (
            userMenuRef.current &&
            !userMenuRef.current.contains(event.target)
        ) {
            setUserMenuOpen(false);
        }

    }

    document.addEventListener(
        "mousedown",
        handleClickOutside
    );

    return () => {

        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );

    };

}, []);

    return (
        <>
            <header
                className="
                    sticky
                    top-0
                    z-50
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
                            Soporte LG
                        </h1>

                        <p className="text-sm text-white/80">
                            Londoño Gómez
                        </p>

                    </div>

                </div>

                {/* MENÚ DESKTOP */}

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

                {/* USUARIO */}

                <div
                    ref={userMenuRef}
                    className="flex items-center gap-5 relative"
>

                    <div className="hidden md:block text-right">

                        <p className="font-semibold text-white text-base">
                            {usuario.nombre || "Usuario"}
                        </p>

                        <p className="text-sm text-white/80">
                            {usuario.rol || "Sin rol"}
                        </p>

                    </div>

                    <button
                        onClick={() => {

                            setUserMenuOpen(
                                !userMenuOpen
                            );

                            setMenuOpen(false);

                        }}
                        className="
                            w-12
                            h-12
                            rounded-full
                            bg-[#00d4a1]
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-lg
                            text-white
                            shadow-md
                            hover:bg-[#00c9ff]
                            transition
                            cursor-pointer
                        "
                    >
                        {usuario.nombre
                            ? usuario.nombre
                                  .charAt(0)
                                  .toUpperCase()
                            : "U"}
                    </button>

                    {/* DROPDOWN USUARIO */}

                    {userMenuOpen && (

                        <div
                            className="
                                absolute
                                top-16
                                right-0
                                w-80
                                bg-white
                                rounded-3xl
                                shadow-2xl
                                overflow-hidden
                                z-[99999]
                            "
                        >

                            <div className="p-6">

                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-[#00d4a1]
                                            flex
                                            items-center
                                            justify-center
                                            text-white
                                            font-bold
                                            text-2xl
                                        "
                                    >
                                        {usuario.nombre
                                            ? usuario.nombre
                                                  .charAt(
                                                      0
                                                  )
                                                  .toUpperCase()
                                            : "U"}
                                    </div>

                                    <div>

                                        <h3 className="font-bold text-slate-800">
                                            {usuario.nombre}{" "}
                                            {
                                                usuario.apellido
                                            }
                                        </h3> 
                                        <p className="text-slate-500 text-sm">
                                            {usuario.cargo}
                                        </p>
                                        

                                    </div>

                                </div>

                            </div>

                            <div className=" p-5">

                                <button
                                    onClick={
                                        cerrarSesion
                                    }
                                    className="
                                        w-full
                                        py-3
                                        rounded-2xl
                                        bg-[#0076e3]
                                        hover:bg-[#00c9ff]
                                        text-white
                                        font-semibold
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    Cerrar Sesión
                                </button>

                            </div>

                        </div>

                    )}

                    {/* HAMBURGUESA */}

                    <button
                        onClick={() => {

                            setMenuOpen(!menuOpen);

                            setUserMenuOpen(false);

                        }}
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

            {menuOpen && !userMenuOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/30
                        z-[998]
                        lg:hidden
                    "
                    onClick={() =>
                        setMenuOpen(false)
                    }
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
                            onClick={() => {

                                setMenuOpen(false);
                                setUserMenuOpen(false);

                            }}
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
                                        ? "bg-[#0c3c69] text-white border-[#00d4a1]"
                                        : "text-white/90 border-transparent hover:bg-[#0064c2] hover:border-[#00d4a1]"
                                }
                            `}
                        >
                            {item.label}
                        </Link>
                    );
                })}

            </div>
        </>
    );
}

export default Topbar;