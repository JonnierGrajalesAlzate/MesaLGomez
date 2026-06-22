const Footer = () => {
    return (
        <footer className="w-full  text-white py-4 border-t mt-9">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center">
                <p className="text-sm font-medium text-slate-500 mr-5">
                    LG Soporte
                </p>

                <p className="text-xs text-slate-500 mt-2 md:mt-0">
                    © {new Date().getFullYear()} Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;