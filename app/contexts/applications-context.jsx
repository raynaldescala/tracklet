"use client";

import { fetchApplications } from "@/lib/supabase/applications/actions";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const ApplicationsContext = createContext({});

export function ApplicationsProvider({ children }) {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [skeletonCount, setSkeletonCount] = useState(1);
    const pathname = usePathname();

    async function getApplications() {
        if (pathname !== "/applications" && pathname !== "/dashboard") return;

        setIsLoading(true);
        setSkeletonCount(1);

        try {
            let data = [];

            if (pathname === "/dashboard") data = await fetchApplications(5);
            else if (pathname === "/applications")
                data = await fetchApplications();

            setSkeletonCount(data?.length || 0);

            if (data?.length > 0)
                await new Promise((resolve) => setTimeout(resolve, 300));

            setApplications(data);
        } catch (error) {
            toast.error("Error fetching applications");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ApplicationsContext.Provider
            value={{ applications, isLoading, skeletonCount, getApplications }}
        >
            {children}
        </ApplicationsContext.Provider>
    );
}

export const useApplications = () => useContext(ApplicationsContext);
