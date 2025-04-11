"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { useApplications } from "@/app/contexts/applications-context";
import { addApplication } from "@/lib/supabase/applications/actions";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    status: z.enum(["Applied", "Interviewing", "Rejected", "Offered"]),
    dateApplied: z.date({
        required_error: "Date applied is required",
        invalid_type_error: "Date applied is required",
    }),
    notes: z.string().optional(),
});

export default function ApplicationForm({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { getApplications } = useApplications();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            position: "",
            status: "Applied",
            dateApplied: "",
            notes: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);

        try {
            const result = await addApplication({
                status: values.status,
                company: values.company,
                position: values.position,
                date_applied: values.dateApplied,
                notes: values.notes || null,
            });

            if (result.error) {
                toast.error("Failed to add application: " + result.error);
            } else if (result.success) {
                setOpen(false);
                toast.success("Application added successfully");

                getApplications(true);
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
                if (isLoading) return;
                setOpen(open);
                if (open) form.reset();
            }}
        >
            <DialogTrigger onClick={() => setOpen(true)} asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-h-[90dvh] overflow-auto sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Application</DialogTitle>
                    <DialogDescription>
                        Track a new job application
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Company name"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Job title"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isLoading}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Applied">
                                                Applied
                                            </SelectItem>
                                            <SelectItem value="Interviewing">
                                                Interviewing
                                            </SelectItem>
                                            <SelectItem value="Rejected">
                                                Rejected
                                            </SelectItem>
                                            <SelectItem value="Offered">
                                                Offered
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateApplied"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date Applied</FormLabel>
                                    <Popover modal>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "align-center flex w-full justify-between pl-3 font-normal",
                                                        !field.value &&
                                                        "text-muted-foreground",
                                                    )}
                                                    disabled={isLoading}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "MMMM d, yyyy",
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            side="top"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                    new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Additional notes"
                                            rows="4"
                                            className="resize-none"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="submit"
                                className="w-36"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-primary-foreground/80 dark:text-muted-foreground" />
                                ) : (
                                    "Add Application"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
