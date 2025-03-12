"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/app/components/ui/sidebar";
import { BarChart3, FileEdit, Home, MessageSquareText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Dashboard", url: "/dashboard", icon: Home },
    { label: "Applications", url: "/applications", icon: FileEdit },
    { label: "Analytics", url: "/analytics", icon: BarChart3 },
    { label: "Feedback", url: "/feedback", icon: MessageSquareText },
];

export function AppSidebar() {
    const { isMobile, setOpenMobile } = useSidebar();
    const pathname = usePathname();

    const handleNavClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="transition-transform hover:scale-105 hover:bg-inherit data-[state=open]:hover:scale-105"
                        >
                            <Link href="/dashboard" className="flex gap-2">
                                <div className="bg-background-foreground/60 flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Image
                                        src="/logo.svg"
                                        alt="Tracklet logo"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span className="text-2xl font-bold">
                                    Tracklet
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname.startsWith(item.url)}
                                        className="px-4"
                                    >
                                        <Link
                                            href={item.url}
                                            onClick={handleNavClick}
                                            className="flex gap-4"
                                        >
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
