import { AppSidebar } from "@/app/components/ui/app-sidebar";
import { Button } from "@/app/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { logout } from "@/lib/supabase/auth/actions";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex w-full flex-col">
                <div className="sticky top-0 z-50 flex h-16 w-full items-center border-b bg-background shadow-sm">
                    <div className="w-full px-4">
                        <header className="flex items-center justify-between py-2">
                            <SidebarTrigger />
                            <Button onClick={logout}>Logout</Button>
                        </header>
                    </div>
                </div>
                <main className="flex-1">{children}</main>
            </div>
        </SidebarProvider>
    );
}
