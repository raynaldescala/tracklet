"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";

const formSchema = z.object({
    type: z.enum(["feature", "bug", "question", "other"], {
        required_error: "Please select a feedback type",
        invalid_type_error: "Please select a feedback type",
    }),
    feedback: z.string().min(1, {
        message: "Feedback is required",
    }),
});

export default function FeedbackPage() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: undefined,
            feedback: "",
        },
    });

    async function onSubmit() {}

    return (
        <div className="grid gap-6 duration-500 animate-in fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
                <p className="text-muted-foreground">
                    We'd love to hear your thoughts on Tracklet
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Send Feedback</CardTitle>
                    <CardDescription>
                        Your feedback helps improve Tracklet for everyone
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Feedback Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select feedback type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="feature">
                                                        Feature Suggestion
                                                    </SelectItem>
                                                    <SelectItem value="bug">
                                                        Bug Report
                                                    </SelectItem>
                                                    <SelectItem value="question">
                                                        Question
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="feedback"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Feedback</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us what you think..."
                                                    rows="6"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Send Feedback
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
