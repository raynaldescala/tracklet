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
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const applications = [
    {
        company: "Acme Inc",
        position: "Frontend Developer",
        dateApplied: "Mar 15, 2023",
        status: "Interviewing",
        followUp: "Mar 25, 2023",
    },
    {
        company: "TechCorp",
        position: "Full Stack Engineer",
        dateApplied: "Mar 10, 2023",
        status: "Applied",
        followUp: "Mar 24, 2023",
    },
    {
        company: "Innovate Solutions",
        position: "React Developer",
        dateApplied: "Mar 5, 2023",
        status: "Rejected",
        followUp: "—",
    },
    {
        company: "Global Systems",
        position: "Senior Frontend Engineer",
        dateApplied: "Mar 1, 2023",
        status: "Offered",
        followUp: "—",
    },
    {
        company: "DevWorks",
        position: "UI/UX Developer",
        dateApplied: "Feb 28, 2023",
        status: "Interviewing",
        followUp: "Mar 22, 2023",
    },
    {
        company: "Quantum Software",
        position: "JavaScript Engineer",
        dateApplied: "Feb 25, 2023",
        status: "Applied",
        followUp: "—",
    },
    {
        company: "ByteWorks",
        position: "Frontend Architect",
        dateApplied: "Feb 20, 2023",
        status: "Interviewing",
        followUp: "Mar 23, 2023",
    },
];

// Function to get status badge styling
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
    return (
        <div className="grid gap-6 duration-500 animate-in fade-in">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Applications
                    </h1>
                    <p className="text-muted-foreground">
                        Track and manage your job applications in one place.
                    </p>
                </div>
                <Button className="w-fit">Add Application</Button>
            </div>

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
                            <TableHead className="w-36 whitespace-nowrap px-4 py-3">
                                Follow-up
                            </TableHead>
                            <TableHead className="w-20 whitespace-nowrap px-4 py-3 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map((app, index) => (
                            <TableRow key={index} className="text-left">
                                <TableCell className="whitespace-nowrap p-4 font-medium">
                                    {app.company}
                                </TableCell>
                                <TableCell className="whitespace-nowrap p-4">
                                    {app.position}
                                </TableCell>
                                <TableCell className="whitespace-nowrap p-4">
                                    {app.dateApplied}
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
                                <TableCell className="whitespace-nowrap p-4">
                                    {app.followUp}
                                </TableCell>
                                <TableCell className="whitespace-nowrap p-4 text-right">
                                    <DropdownMenu>
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
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
