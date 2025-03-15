"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { PasswordInput } from "@/app/components/ui/password-input";
import { login } from "@/lib/supabase/auth/actions";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);

        try {
            const result = await login({
                email: values.email,
                password: values.password,
            });

            if (result.error) {
                toast.error("Login failed: " + result.error);
                // toast.error("Login failed: " + result.error, {
                //     className: "relative font-sans",
                //     description: (
                //         <button
                //             className="absolute right-0 top-0 mr-2 mt-2 hover:text-muted-foreground"
                //             onClick={() => toast.dismiss()}
                //         >
                //             <X size={16} />
                //         </button>
                //     ),
                // });
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="johndoe@mail.com"
                                                type="email"
                                                autoComplete="email"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <FormLabel htmlFor="password">
                                                Password
                                            </FormLabel>
                                            <Link
                                                href="#"
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                placeholder="******"
                                                autoComplete="current-password"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                            <div className="flex w-full items-center">
                                <div className="h-[1px] w-full border-t" />
                                <span className="mx-4 text-sm tracking-wide text-muted-foreground">
                                    OR
                                </span>
                                <div className="h-[1px] w-full border-t" />
                            </div>
                            <Button
                                variant="outline"
                                className="flex w-full items-center gap-3"
                                disabled={isLoading}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    width="15"
                                    fill="currentColor"
                                >
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                                    <path d="M1 1h22v22H1z" fill="none"></path>
                                </svg>
                                Continue with Google
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/sign-up" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
