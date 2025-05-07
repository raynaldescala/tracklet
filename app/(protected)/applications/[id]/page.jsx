"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Textarea } from "@/app/components/ui/textarea";
import {
    deleteApplication,
    fetchApplicationById,
    updateApplicationNotes,
} from "@/lib/supabase/applications/actions";
import { format } from "date-fns";
import {
    ArrowLeft,
    Calendar,
    Edit,
    ExternalLink,
    Loader2,
    MapPin,
    Tag,
    Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function ApplicationDetailsPage({ params }) {
    const [application, setApplication] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [notes, setNotes] = useState("");
    const [isPending, startTransition] = useTransition();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { id } = use(params);
    const router = useRouter();

    useEffect(() => {
        async function getApplication() {
            try {
                const data = await fetchApplicationById(id);

                setApplication(data);
                setNotes(data?.notes || "");
            } catch (error) {
                console.error("Error fetching application:", error);
            } finally {
                setIsLoading(false);
            }
        }

        getApplication();
    }, [id]);

    async function handleSaveNotes() {
        setIsLoading(true);

        try {
            const result = await updateApplicationNotes(id, notes);
            if (result.error) {
                toast.error("Failed to update notes: " + result.error);
            } else {
                toast.success("Notes updated successfully");
                setApplication((prev) => ({ ...prev, notes }));
            }
        } catch (error) {
            toast.error("An unexpected error occured");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id) {
        setIsDeleting(true);
        try {
            const result = await deleteApplication(id);
            if (result.error) {
                toast.error("Failed to delete application: " + result.error);
                setIsDeleting(false);
            } else if (result.success) {
                toast.success("Application deleted successfully");
                startTransition(() => {
                    router.push("/applications");
                });
            }
        } catch (error) {
            toast.error("An unexpected error occured" + error);
            setIsDeleting(false);
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "Applied":
                return "bg-chart-1 hover:bg-chart-1/80 text-foreground";
            case "Interviewing":
                return "bg-chart-2 hover:bg-chart-2/80 text-foreground";
            case "Offered":
                return "bg-chart-3 hover:bg-chart-3/80 text-foreground";
            case "Rejected":
                return "bg-chart-4 hover:bg-chart-4/80 text-foreground";
            default:
                return "bg-gray-100 hover:bg-gray-100/80 text-foreground";
        }
    };

    const isPageDisabled = isLoading || isDeleting || isAlertOpen;

    return (
        <div className="mx-auto grid max-w-5xl gap-6 py-6">
            <div>
                <Link
                    href="/applications"
                    className={`flex w-fit items-center gap-2 text-sm text-muted-foreground/70 transition-colors hover:text-accent-foreground/70 ${isPageDisabled ? "pointer-events-none opacity-50" : ""}`}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
                <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row">
                    <div className="grid gap-2">
                        {application?.position ? (
                            <h2 className="text-3xl font-bold leading-none tracking-tight">
                                {application.position}
                            </h2>
                        ) : (
                            <Skeleton className="h-9 w-72" />
                        )}
                        {application?.company ? (
                            <p className="leading-none text-muted-foreground">
                                {application?.company}
                            </p>
                        ) : (
                            <Skeleton className="h-4 w-28" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="h-9 w-9 sm:h-10 sm:w-10"
                            disabled={isPageDisabled}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog
                            open={isAlertOpen}
                            onOpenChange={setIsAlertOpen}
                        >
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="h-9 w-9 sm:h-10 sm:w-10"
                                    disabled={isPageDisabled}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will permanently remove this
                                        application.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isDeleting}>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDelete(id)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            "Confirm"
                                        )}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Application Details
                    </CardTitle>
                    <CardDescription>
                        Basic information about your application
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Status
                                </p>
                                {application?.status ? (
                                    <Badge
                                        className={`font-semibold ${getStatusBadge("Applied")}`}
                                    >
                                        <span className="text-slate-100">
                                            {application.status}
                                        </span>
                                    </Badge>
                                ) : (
                                    <Skeleton className="h-[21.6px] w-16" />
                                )}
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Date Applied
                                </p>
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {application?.date_applied ? (
                                        <p>
                                            {format(
                                                application.date_applied,
                                                "MMM d, yyyy",
                                            )}
                                        </p>
                                    ) : (
                                        <Skeleton className="h-6 w-[90px]" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Location
                                </p>
                                <div className="flex items-center">
                                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {application ? (
                                        <p>
                                            {application?.location ||
                                                "No location provided"}
                                        </p>
                                    ) : (
                                        <Skeleton className="h-6 w-20"></Skeleton>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Source
                                </p>
                                <div className="flex items-center">
                                    <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {application ? (
                                        <p>
                                            {application?.source ||
                                                "No source provided"}
                                        </p>
                                    ) : (
                                        <Skeleton className="h-6 w-20"></Skeleton>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Application Link
                                </p>
                                <div className="flex items-center">
                                    <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {application ? (
                                        application?.application_link ? (
                                            <Button
                                                asChild
                                                variant="link"
                                                className="h-fit p-0 text-base"
                                                disabled={isPageDisabled}
                                            >
                                                <Link
                                                    target="_blank"
                                                    href={
                                                        application.application_link
                                                    }
                                                >
                                                    {
                                                        application.application_link
                                                    }
                                                </Link>
                                            </Button>
                                        ) : (
                                            <p>No link provided</p>
                                        )
                                    ) : (
                                        <Skeleton className="h-6 w-20"></Skeleton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <CardHeader className="pb-0 sm:pb-6">
                        <CardTitle className="text-2xl">
                            Application Timeline
                        </CardTitle>
                        <CardDescription>
                            Track the progress of your application
                        </CardDescription>
                    </CardHeader>
                    <Button
                        className="mb-6 ml-6 mr-0 w-fit sm:mb-0 sm:ml-0 sm:mr-6"
                        disabled={isPageDisabled}
                    >
                        Add Event
                    </Button>
                </div>
                <CardContent className="ml-1">
                    <ol className="border-text-muted-foreground relative border-s">
                        <li className="mb-10 ms-4">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
                            <h3 className="font-semibold">Applied</h3>
                            {application?.date_applied ? (
                                <time className="mb-2 block text-sm font-normal leading-none text-muted-foreground">
                                    {format(
                                        application.date_applied,
                                        "MMM d, yyyy",
                                    )}
                                </time>
                            ) : (
                                <Skeleton className="mb-2 h-[14px] w-[78px]" />
                            )}
                            {application?.position && application?.company ? (
                                <p className="mb-4 text-sm">
                                    {application?.position &&
                                        application?.company &&
                                        `Applied for ${application.position} position at ${application.company}`}
                                </p>
                            ) : (
                                <Skeleton className="h-5 w-60"></Skeleton>
                            )}
                        </li>
                    </ol>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Application Notes
                    </CardTitle>
                    <CardDescription>
                        Keep track of important details and updates
                    </CardDescription>
                </CardHeader>
                <CardContent className="ml-1">
                    <Textarea
                        placeholder="Add notes about this application..."
                        rows="8"
                        className="mb-6 resize-none"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={isPageDisabled}
                    />
                    <Button
                        className="w-28"
                        onClick={handleSaveNotes}
                        disabled={
                            isPageDisabled ||
                            application?.notes === notes ||
                            !notes
                        }
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary-foreground/80 dark:text-muted-foreground" />
                        ) : (
                            "Save Notes"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
