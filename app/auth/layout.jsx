import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";

export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-dvh flex-col">
            <NavBar />
            <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-20 sm:px-8 sm:py-8">
                {children}
            </div>
            <Footer />
        </div>
    );
}
