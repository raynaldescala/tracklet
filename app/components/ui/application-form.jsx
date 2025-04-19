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
    dateApplied: z.date({
        required_error: "Date applied is required",
        invalid_type_error: "Date applied is required",
    }),
    applicationLink: z.string().url().optional().or(z.literal("")),
    location: z.string().optional(),
    source: z.string().optional(),
    notes: z.string().optional(),
});

export default function ApplicationForm({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const { getApplications } = useApplications();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            position: "",
            dateApplied: "",
            applicationLink: "",
            location: "",
            source: "",
            notes: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);

        try {
            const result = await addApplication({
                status: "Applied",
                company: values.company,
                position: values.position,
                date_applied: values.dateApplied,
                application_link: values.applicationLink || null,
                location: values.location || null,
                source: values.source || null,
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
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-1 rounded-full bg-primary" />
                                <h3 className="text-sm font-semibold">
                                    Basic Information
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Company{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Google"
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
                                            <FormLabel>
                                                Position{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Software Engineer"
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
                                    name="dateApplied"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Date Applied{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Popover
                                                modal
                                                open={calendarOpen}
                                                onOpenChange={setCalendarOpen}
                                            >
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
                                                                <span>
                                                                    Select date
                                                                </span>
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
                                                        onSelect={(date) => {
                                                            field.onChange(
                                                                date,
                                                            );
                                                            setCalendarOpen(
                                                                false,
                                                            );
                                                        }}
                                                        disabled={(date) =>
                                                            date > new Date() ||
                                                            date <
                                                                new Date(
                                                                    "1900-01-01",
                                                                )
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-1 rounded-full bg-primary" />
                                <h3 className="text-sm font-semibold">
                                    Additional Details
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="applicationLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Application Link
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="https://site.com/..."
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
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Makati, Remote, Hybrid - BGC"
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
                                    name="source"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Source</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="LinkedIn, Referral, Company Site"
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
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Add any additional details"
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
                            </div>
                        </div>
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
