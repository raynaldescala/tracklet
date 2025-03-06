import { AppSidebar } from "@/app/components/ui/app-sidebar";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import ThemeSwitcher from "@/app/components/ui/theme-switcher";
import { CircleFadingPlus } from "lucide-react";

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
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="" alt="" />
                                    <AvatarFallback>RE</AvatarFallback>
                                </Avatar>
                            </div>
                        </header>
                    </div>
                </div>
                <main className="flex-1">{children}</main>
            </div>
        </SidebarProvider>
    );
}
