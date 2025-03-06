"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/app/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, YAxis } from "recharts";

const chartData = [
    { status: "Applied", value: 186, fill: "hsl(var(--chart-1))" },
    { status: "Interviewing", value: 305, fill: "hsl(var(--chart-2))" },
    { status: "Offered", value: 73, fill: "hsl(var(--chart-3))" },
    { status: "Rejected", value: 237, fill: "hsl(var(--chart-4))" },
];

const chartConfig = {
    Applied: {
        label: "Applied",
        color: "hsl(var(--chart-1))",
    },
    Interviewing: {
        label: "Interviewing",
        color: "hsl(var(--chart-2))",
    },
    Offered: {
        label: "Offered",
        color: "hsl(var(--chart-3))",
    },
    Rejected: {
        label: "Rejected",
        color: "hsl(var(--chart-4))",
    },
};

export default function ConversionFunnel() {
    // Create a legend payload based on chartData.
    const legendPayload = chartData.map((item) => ({
        value: item.status,
        color: item.fill,
        dataKey: item.status,
    }));

    return (
        <Card className="flex h-full flex-col p-6">
            <CardHeader className="space-y-0 p-0 pb-2">
                <CardTitle className="text-2xl">Conversion Funnel</CardTitle>
                <CardDescription>
                    Progression from submission to offer
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 p-0">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-square max-h-[250px] min-h-[150px] w-full"
                >
                    <BarChart data={chartData} margin={{ top: 20 }}>
                        <CartesianGrid vertical={false} />
                        <YAxis axisLine={false} tickLine={false} width={30} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="value"
                            radius={8}
                            fill="var(--color-desktop)"
                        >
                            <LabelList
                                dataKey="value"
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                        <ChartLegend
                            payload={legendPayload}
                            content={<ChartLegendContent nameKey="value" />}
                            className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        ></ChartLegend>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
