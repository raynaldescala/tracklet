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
} from "@/app/components/ui/alert-dialog";

import ApplicationForm from "@/app/components/ui/application-form";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import { useApplications } from "@/app/contexts/applications-context";
import { deleteApplication } from "@/lib/supabase/applications/actions";
import { format } from "date-fns";
import {
    Eye,
    Loader2,
    MoreHorizontal,
    Pencil,
    Search,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

export default function ApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [applicationToDelete, setApplicationToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { applications, isLoading, skeletonCount, getApplications } =
        useApplications();

    useEffect(() => {
        getApplications();
    }, []);

    const filteredApplications = applications?.filter((app) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            app.company.toLowerCase().includes(query) ||
            app.position.toLowerCase().includes(query);
        const matchesStatus =
            statusFilter === "all" || app.status.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

    async function handleDelete(id) {
        setIsDeleting(true);

        try {
            const result = await deleteApplication(id);
            if (result.error)
                toast.error("Failed to delete application: " + result.error);
            else if (result.success) {
                toast.success("Application deleted successfully");
                setDeleteDialogOpen(false);

                getApplications();
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="grid gap-6 duration-500 animate-in fade-in">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Applications
                    </h1>
                    <p className="text-muted-foreground">
                        A comprehensive overview of your job applications.
                    </p>
                </div>
                <ApplicationForm>
                    <Button className="w-fit">Add Application</Button>
                </ApplicationForm>
            </div>

            <Card className="p-4">
                <div className="flex flex-col items-stretch gap-4 sm:flex-row">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
                        <Input
                            placeholder="Search by company or position..."
                            type="search"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            disabled={isLoading}
                            className="h-10 pl-8"
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="h-10 w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="interviewing">
                                Interviewing
                            </SelectItem>
                            <SelectItem value="offer">Offer</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>

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
                            [...Array(skeletonCount)].map((_, index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    <TableCell className="whitespace-nowrap p-4">
                                        <Skeleton className="h-5 w-32" />
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap p-4">
                                        <Skeleton className="h-5 w-40" />
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap p-4">
                                        <Skeleton className="h-5 w-24" />
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
                            ))
                        ) : filteredApplications.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="whitespace-nowrap p-4 text-sm text-muted-foreground md:text-center"
                                >
                                    No applications found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredApplications?.map((app) => (
                                <TableRow key={app.id} className="text-left">
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
                                        <DropdownMenu
                                            open={openDropdownId === app.id}
                                            onOpenChange={(open) => {
                                                setOpenDropdownId(
                                                    open ? app.id : null,
                                                );
                                            }}
                                        >
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/applications/${app.id}`}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Eye className="mr-1 h-4 w-4" />{" "}
                                                        View Details
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-1 h-4 w-4" />{" "}
                                                    Edit Application
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onSelect={(e) => {
                                                        e.preventDefault();
                                                        setOpenDropdownId(null);
                                                        setApplicationToDelete(
                                                            app,
                                                        );
                                                        setDeleteDialogOpen(
                                                            true,
                                                        );
                                                    }}
                                                >
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
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
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
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete(applicationToDelete?.id);
                            }}
                            className="w-[86px]"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <Loader2 className="h-4 w-4 animate-spin text-primary-foreground/80 dark:text-muted-foreground" />
                            ) : (
                                "Confirm"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
