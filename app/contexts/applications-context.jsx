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

    async function getApplications(shouldAddRow) {
        if (pathname !== "/applications" && pathname !== "/dashboard") return;

        setIsLoading(true);
        setSkeletonCount(1);

        try {
            const DASHBOARD_APPLICATIONS_LIMIT = 5;
            const ADD_ROW_COUNT = 1;
            let data = [];

            if (pathname === "/dashboard")
                data = await fetchApplications(DASHBOARD_APPLICATIONS_LIMIT);
            else if (pathname === "/applications")
                data = await fetchApplications();

            const extraCount =
                pathname === "/dashboard" &&
                data?.length >= DASHBOARD_APPLICATIONS_LIMIT
                    ? 0
                    : shouldAddRow
                      ? ADD_ROW_COUNT
                      : 0;
            setSkeletonCount((data?.length || 0) + extraCount);

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
