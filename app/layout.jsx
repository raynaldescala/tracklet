import { Toaster } from "@/app/components/ui/sonner";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Providers from "./providers";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata = {
    title: "Tracklet - Track Every Step of Your Job Search",
    description:
        "Job application tracking made simple. Stay organized and keep every opportunity within reach.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <Providers attribute="class" defaultTheme="system" enableSystem>
                    {children}
                    <Toaster richColors position="top-right" />
                </Providers>
            </body>
        </html>
    );
}
