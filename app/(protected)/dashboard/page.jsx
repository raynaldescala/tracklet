import { Progress } from "@/app/components/ui/progress";
import { CircleCheck, FileEdit, MessagesSquare, Users } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="grid gap-6 p-4 duration-500 animate-in fade-in sm:p-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Track and manage your job applications in one place.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="min-h-[130px] rounded-lg border p-6 md:min-h-[auto]">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Total Applications
                        </span>
                        <FileEdit className="size-4 text-muted-foreground/65" />
                    </div>
                    <span className="mb-1 inline-block text-2xl font-bold">
                        7
                    </span>
                    <p className="text-xs text-muted-foreground/65">
                        +1 from last week
                    </p>
                </div>
                <div className="min-h-[130px] rounded-lg border p-6 md:min-h-[auto]">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Response Rate
                        </span>
                        <MessagesSquare className="size-4 text-muted-foreground/65" />
                    </div>
                    <span className="mb-1 inline-block text-2xl font-bold">
                        71%
                    </span>
                    <div className="flex h-4 items-center">
                        <Progress value="71" className="h-3" />
                    </div>
                </div>
                <div className="min-h-[130px] rounded-lg border p-6 md:min-h-[auto]">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Success Rate
                        </span>
                        <CircleCheck className="size-4 text-muted-foreground/65" />
                    </div>
                    <span className="mb-1 inline-block text-2xl font-bold">
                        20%
                    </span>
                    <div className="flex h-4 items-center">
                        <Progress value="20" className="h-3" />
                    </div>
                </div>
                <div className="min-h-[130px] rounded-lg border p-6 md:min-h-[auto]">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Active Interviews
                        </span>
                        <Users className="size-4 text-muted-foreground/65" />
                    </div>
                    <span className="mb-1 inline-block text-2xl font-bold">
                        3
                    </span>
                    <p className="text-xs text-muted-foreground/65">
                        3 in progress
                    </p>
                </div>
            </div>
        </div>
    );
}
