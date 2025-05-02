"use client";

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
import { Textarea } from "@/app/components/ui/textarea";
import { fetchApplicationById, updateApplicationNotes } from "@/lib/supabase/applications/actions";
import { format } from "date-fns";
import {
    ArrowLeft,
    Calendar,
    Edit,
    ExternalLink,
    MapPin,
    Tag,
    Trash,
} from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApplicationDetailsPage({ params }) {
    const [application, setApplication] = useState(null);
    const [notes, setNotes] = useState("");
    const { id } = use(params);

    useEffect(() => {
        async function getApplication() {
            try {
                const data = await fetchApplicationById(id);
                setApplication(data);
                setNotes(data?.notes || "")
            } catch (error) {
                console.error("Error fetching application:", error);
            }
        }

        getApplication();
    }, [id]);

    async function handleSaveNotes() {
        try {
            const result = await updateApplicationNotes(id, notes);
            if (result.error) {
                toast.error("Failed to update notes: " + result.error);
            } else {
                toast.success("Notes updated successfully");
                setApplication(prev => ({ ...prev, notes }));
            }
        }
        catch (error) {
            toast.error("An unexpected error occured")
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

    return (
        <div className="mx-auto grid max-w-5xl gap-6 py-6">
            <div>
                <Link
                    href="/applications"
                    className="flex w-fit items-center gap-2 text-sm text-muted-foreground/70 transition-colors hover:text-accent-foreground/70"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {application?.position}
                        </h2>
                        <p className="text-muted-foreground">
                            {application?.company}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="h-9 w-9 sm:h-10 sm:w-10"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            className="h-9 w-9 sm:h-10 sm:w-10"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
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
                                <Badge
                                    className={`font-semibold ${getStatusBadge("Applied")}`}
                                >
                                    <span className="text-slate-100">
                                        {application?.status}
                                    </span>
                                </Badge>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Date Applied
                                </p>
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <p>
                                        {application?.date_applied &&
                                            format(
                                                application.date_applied,
                                                "MMM d, yyyy",
                                            )}
                                    </p>
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
                                    <p>
                                        {application?.location ||
                                            "No location provided"}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Source
                                </p>
                                <div className="flex items-center">
                                    <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <p>
                                        {application?.source ||
                                            "No source provided"}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Application Link
                                </p>
                                <div className="flex items-center">
                                    <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {application?.application_link ? (
                                        <Button
                                            asChild
                                            variant="link"
                                            className="h-fit p-0 text-base"
                                        >
                                            <Link
                                                target="_blank"
                                                href={
                                                    application.application_link
                                                }
                                            >
                                                {application.application_link}
                                            </Link>
                                        </Button>
                                    ) : (
                                        <p>No link provided</p>
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
                    <Button className="mb-6 ml-6 mr-0 w-fit sm:mb-0 sm:ml-0 sm:mr-6">
                        Add Event
                    </Button>
                </div>
                <CardContent className="ml-1">
                    <ol className="border-text-muted-foreground relative border-s">
                        <li className="mb-10 ms-4">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
                            <h3 className="font-semibold">Applied</h3>
                            <time className="mb-2 block text-sm font-normal leading-none text-muted-foreground">
                                {application?.date_applied &&
                                    format(
                                        application.date_applied,
                                        "MMM d, yyyy",
                                    )}
                            </time>
                            <p className="mb-4 text-sm">
                                {application?.position &&
                                    application?.company &&
                                    `Applied for ${application.position} position at ${application.company}`}
                            </p>
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
                    />
                    <Button className="w-fit" onClick={handleSaveNotes}>Save Notes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
