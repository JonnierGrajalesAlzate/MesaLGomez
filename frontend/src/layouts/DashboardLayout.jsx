import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F5F9FC]">

            <Topbar />

            <main
                className="
                    p-4
                    md:p-6
                    lg:p-8
                "
            >
                {children}
            </main>

        </div>
    );
}

export default DashboardLayout;