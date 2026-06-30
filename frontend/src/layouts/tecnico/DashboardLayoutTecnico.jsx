import TopbarTecnico from "../../components/tecnico/topbarTecnico"

function DashboardLayoutTecnico({ children }) {
    return (
        <div className="min-h-screen bg-[#F5F9FC]">

            <TopbarTecnico />

            <main
                className="
                    p-4
                    md:p-6
                    lg:p-8
                    mt-6
                "
            >
                {children}
            </main>

        </div>
    );
}

export default DashboardLayoutTecnico;