import { Button } from "@/components/ui/button";
import { ArrowRight, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="flex min-h-dvh flex-col bg-gradient-to-b from-white to-slate-50">
            <div className="border-b shadow-sm">
                <div className="mx-auto max-w-6xl px-6 sm:px-8">
                    <header className="flex items-center justify-between py-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            <Image
                                src="/logo.svg"
                                alt="Joblet logo"
                                width={28}
                                height={28}
                            />
                            <span className="text-2xl font-bold text-primary">
                                Joblet
                            </span>
                        </Link>
                        <nav className="flex items-center gap-4">
                            <Button variant="ghost" size="icon">
                                <Sun />
                            </Button>
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
                                className="border-primary/20 font-medium hover:bg-primary/5"
                            >
                                <Link
                                    href="/login"
                                    className="flex items-center gap-1"
                                >
                                    Login{" "}
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </nav>
                    </header>
                </div>
            </div>
            <main className="mx-auto flex max-w-6xl flex-1 items-center px-6 py-16 sm:px-8">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5">
                    <div className="col-span-1 grid gap-6 md:col-span-3">
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                            Track Every Step of Your{" "}
                            <span className="text-primary">Job Search</span>
                        </h1>
                        <p className="font-muted-foreground max-w-xl text-xl leading-relaxed">
                            Job application tracking made simple. Never miss an
                            opportunity again.
                        </p>
                        <div className="pt-4">
                            <Button
                                asChild
                                size="lg"
                                className="w-fit bg-primary px-8 py-6 text-lg shadow-lg transition-all hover:translate-y-[-2px] hover:bg-primary/90 hover:shadow-xl"
                            >
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-1 flex justify-center md:col-span-2 md:justify-end">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl"></div>
                            <Image
                                src="/hero.svg"
                                alt="Job tracking dashboard illustration"
                                width={450}
                                height={450}
                                className="relative w-full drop-shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
