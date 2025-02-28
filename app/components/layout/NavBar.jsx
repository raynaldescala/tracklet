import { Button } from "@/app/components/ui/button";
import ThemeSwitcher from "@/app/components/ui/theme-switcher";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    return (
        <div className="border-b shadow-sm">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <header className="flex items-center justify-between py-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 transition-transform hover:scale-105"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Tracklet logo"
                            width={28}
                            height={28}
                            className="fill-current"
                        />
                        <span className="text-2xl font-bold">Tracklet</span>
                    </Link>
                    <nav className="flex items-center gap-2 sm:gap-4">
                        <ThemeSwitcher />
                        <Button
                            variant="ghost"
                            asChild
                            className="hidden font-medium transition-colors hover:text-primary sm:block"
                        >
                            <Link href="/signup">Sign up</Link>
                        </Button>
                        <Button
                            variant="outline"
                            asChild
                            className="border-primary font-medium hover:bg-primary/5"
                        >
                            <Link
                                href="/login"
                                className="flex items-center gap-1"
                            >
                                Login <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </nav>
                </header>
            </div>
        </div>
    );
};

export default NavBar;
