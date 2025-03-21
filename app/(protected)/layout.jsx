"use client";

import { AppSidebar } from "@/app/components/ui/app-sidebar";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { Skeleton } from "@/app/components/ui/skeleton";
import ThemeSwitcher from "@/app/components/ui/theme-switcher";
import { logout } from "@/lib/supabase/auth/actions";
import { createClient } from "@/lib/supabase/client";
import { CircleFadingPlus, LogOut, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                const { data } = await supabase
                    .from("profiles")
                    .select("name, email, avatar_url")
                    .eq("id", user.id)
                    .single();

                if (data) setProfile(data);
            }
        }

        fetchProfile();
    }, []);

    const getFirstLetter = () => {
        if (!profile?.name)
            return <Skeleton className="h-full w-full rounded-full" />;
        return profile.name.charAt(0).toUpperCase();
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex w-full flex-col">
                <div className="sticky top-0 z-50 flex h-16 w-full items-center border-b bg-background shadow-sm">
                    <div className="w-full px-[10px] sm:px-[18px]">
                        <header className="flex items-center justify-between py-2">
                            <SidebarTrigger />
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon">
                                    <CircleFadingPlus className="animate-pulse text-primary" />
                                </Button>
                                <ThemeSwitcher />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-9 w-9 rounded-full"
                                        >
                                            <Avatar className="h-9 w-9">
                                                {profile?.avatar_url ? (
                                                    <AvatarImage
                                                        src={profile.avatar_url}
                                                        alt={`${profile?.name || "User"}'s avatar`}
                                                    />
                                                ) : (
                                                    <AvatarFallback>
                                                        {getFirstLetter()}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel className="pr-4 font-normal">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    {profile?.avatar_url ? (
                                                        <AvatarImage
                                                            src={
                                                                profile.avatar_url
                                                            }
                                                            alt={`${profile?.name || "User"}'s avatar`}
                                                        />
                                                    ) : (
                                                        <AvatarFallback>
                                                            {getFirstLetter()}
                                                        </AvatarFallback>
                                                    )}
                                                </Avatar>
                                                <div className="grid space-y-1">
                                                    {profile?.name ? (
                                                        <p className="font-medium leading-none">
                                                            {profile.name}
                                                        </p>
                                                    ) : (
                                                        <Skeleton className="h-4 w-24" />
                                                    )}
                                                    {profile?.email ? (
                                                        <p className="text-xs leading-none text-muted-foreground">
                                                            {profile.email}
                                                        </p>
                                                    ) : (
                                                        <Skeleton className="h-3 w-32" />
                                                    )}
                                                </div>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <User className="mr-1 h-4 w-4" />
                                                <span>Account</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-1 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={logout}>
                                                <LogOut className="mr-1 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </header>
                    </div>
                </div>
                <main className="flex-1 p-4 sm:p-6">{children}</main>
            </div>
        </SidebarProvider>
    );
}
