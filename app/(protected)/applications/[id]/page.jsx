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
import { use, useState } from "react";

export default function ApplicationDetailsPage({ params }) {
    const [application, setApplication] = useState(null);

    const { id } = use(params);

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
                            Frontend Developer
                        </h2>
                        <p className="text-muted-foreground">Acne Inc.</p>
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
                                        Applied
                                    </span>
                                </Badge>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Date Applied
                                </p>
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <p>Mar 15, 2025</p>
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
                                    <p>Makati</p>
                                </div>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Source
                                </p>
                                <div className="flex items-center">
                                    <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <p>LinkedIn</p>
                                </div>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-muted-foreground">
                                    Application Link
                                </p>
                                <div className="flex items-center">
                                    <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <Button
                                        asChild
                                        variant="link"
                                        className="h-fit p-0 text-base"
                                    >
                                        <Link
                                            target="_blank"
                                            href="https://site.com/..."
                                        >
                                            https://site.com/...
                                        </Link>
                                    </Button>
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
                                Mar 15, 2023
                            </time>
                            <p className="mb-4 text-sm">
                                Applied for Frontend Developer position at Acme
                                Inc
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
                    />
                    <Button className="w-fit">Save Notes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
