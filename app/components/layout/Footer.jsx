import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Footer = () => {
    return (
        <footer className="mx-auto w-full max-w-6xl px-6 pb-8 sm:flex-row sm:px-8">
            <div className="mb-4 border-t" />
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="flex flex-col gap-3">
                    <div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            <Image
                                src="/logo.svg"
                                alt="Tracklet logo"
                                width={24}
                                height={24}
                                className="fill-current"
                            />
                            <span className="text-lg font-bold">Tracklet</span>
                        </Link>
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs text-muted-foreground/65">
                            © {new Date().getFullYear()} Raynald Escala. All
                            rights reserved.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            variant="link"
                            asChild
                            className="h-fit p-0 text-[0.79rem] text-muted-foreground"
                        >
                            <Link href="contact">Contact</Link>
                        </Button>
                        <span className="inline-block h-4 w-[1px] bg-border" />
                        <Button
                            variant="link"
                            asChild
                            className="h-fit p-0 text-[0.79rem] text-muted-foreground"
                        >
                            <Link href="Privacy">Privacy Policy</Link>
                        </Button>
                        <span className="inline-block h-4 w-[1px] bg-border" />
                        <Button
                            variant="link"
                            asChild
                            className="h-fit p-0 text-[0.79rem] text-muted-foreground"
                        >
                            <Link href="terms">Terms of Service</Link>
                        </Button>
                    </div>
                    <div className="block sm:hidden">
                        <p className="text-xs text-muted-foreground/65">
                            © {new Date().getFullYear()} Raynald Escala. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
