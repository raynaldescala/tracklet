"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import { useApplications } from "@/app/contexts/applications-context";
import { format } from "date-fns";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Skeleton } from "./skeleton";

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

export default function RecentApplications() {
    const { applications, isLoading, skeletonCount, getApplications } =
        useApplications();

    useEffect(() => {
        getApplications();
    }, []);

    return (
        <Card className="flex h-full flex-col p-6">
            <CardHeader className="flex flex-col justify-between gap-3 space-y-0 p-0 pb-4 sm:flex-row sm:items-center sm:gap-6">
                <div>
                    <CardTitle className="text-2xl">
                        Recent Applications
                    </CardTitle>
                    <CardDescription className="space-y-0">
                        Your most recently added job applications
                    </CardDescription>
                </div>
                <Button asChild className="w-fit">
                    <Link href="/applications">View All Applications</Link>
                </Button>
            </CardHeader>
            <CardContent className="flex flex-1 items-center p-0">
                <div className="grid w-full gap-6 duration-500 animate-in fade-in">
                    <div className="overflow-x-auto rounded-lg border shadow-sm">
                        <Table className="w-full min-w-[800px]">
                            <TableHeader>
                                <TableRow className="text-left hover:bg-inherit">
                                    <TableHead className="w-48 whitespace-nowrap px-4 py-3">
                                        Company
                                    </TableHead>
                                    <TableHead className="w-48 whitespace-nowrap px-4 py-3">
                                        Position
                                    </TableHead>
                                    <TableHead className="w-36 whitespace-nowrap px-4 py-3">
                                        Date Applied
                                    </TableHead>
                                    <TableHead className="w-32 whitespace-nowrap px-4 py-3">
                                        Status
                                    </TableHead>
                                    <TableHead className="w-20 whitespace-nowrap px-4 py-3 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    [...Array(skeletonCount)].map(
                                        (_, index) => (
                                            <TableRow key={`skeleton-${index}`}>
                                                <TableCell className="whitespace-nowrap p-4">
                                                    <Skeleton className="h-5 w-32" />
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap p-4">
                                                    <Skeleton className="h-5 w-24" />
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap p-4">
                                                    <Skeleton className="h-5 w-20" />
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap p-4">
                                                    <Skeleton className="h-5 w-24" />
                                                </TableCell>
                                                <TableCell className="whitespace-nowrap p-4 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        disabled
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )
                                ) : applications.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="whitespace-nowrap p-4 text-sm text-muted-foreground md:text-center"
                                        >
                                            No applications found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    applications?.map((app, index) => (
                                        <TableRow
                                            key={index}
                                            className="text-left"
                                        >
                                            <TableCell className="whitespace-nowrap p-4 font-medium">
                                                {app.company}
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap p-4">
                                                {app.position}
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap p-4">
                                                {format(
                                                    app.date_applied,
                                                    "MMM d, yyyy",
                                                )}
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap p-4">
                                                <Badge
                                                    className={`font-semibold ${getStatusBadge(app.status)}`}
                                                >
                                                    <span className="text-slate-100">
                                                        {app.status}
                                                    </span>
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-1 h-4 w-4" />{" "}
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Pencil className="mr-1 h-4 w-4" />{" "}
                                                            Edit Application
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Trash2 className="mr-1 h-4 w-4" />{" "}
                                                            Delete Application
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
