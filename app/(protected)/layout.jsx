import { AppSidebar } from "@/app/components/ui/app-sidebar";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import ThemeSwitcher from "@/app/components/ui/theme-switcher";
import { logout } from "@/lib/supabase/auth/actions";
import { CircleFadingPlus, LogOut, Settings, User } from "lucide-react";

export default function Layout({ children }) {
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
                                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src="" alt="" />
                                                <AvatarFallback>RE</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-36" align="end">
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
