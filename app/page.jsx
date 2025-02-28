import { Button } from "@/app/components/ui/button";
import { GridPattern } from "@/app/components/ui/grid-pattern";
import ThemeSwitcher from "@/app/components/ui/theme-switcher";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="flex min-h-dvh flex-col">
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
                                    Login{" "}
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </nav>
                    </header>
                </div>
            </div>
            <main className="relative flex flex-1 items-center py-16">
                <GridPattern
                    width={20}
                    height={20}
                    x={-1}
                    y={-1}
                    className={cn(
                        "absolute -z-10 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
                    )}
                />
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-8 md:grid-cols-5">
                    <div className="col-span-1 grid gap-6 md:col-span-3">
                        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                            Track Every Step of Your{" "}
                            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-violet-400 bg-clip-text text-transparent">
                                Job Search
                            </span>
                        </h1>
                        <p className="max-w-xl text-xl leading-normal text-muted-foreground">
                            Job application tracking made simple.{" "}
                            <span className="text-muted-foreground">
                                Stay organized and keep every opportunity within
                                reach.
                            </span>
                        </p>
                        <div className="pt-3">
                            <Button
                                asChild
                                size="lg"
                                className="w-fit bg-primary px-8 py-6 text-lg shadow-lg transition-all hover:translate-y-[-2px] hover:bg-primary/90 hover:shadow-xl"
                            >
                                <Link href="/signup">Get Started</Link>
                            </Button>
                            <span className="block w-full pt-3 text-sm text-muted-foreground/65">
                                Free to use. No credit card required.
                            </span>
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
