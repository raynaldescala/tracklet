"use client";

import { Pie, PieChart } from "recharts";

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

const chartData = [
    { status: "Applied", total: 2, fill: "hsl(var(--chart-1))" },
    { status: "Interviewing", total: 3, fill: "hsl(var(--chart-2))" },
    { status: "Offered", total: 1, fill: "hsl(var(--chart-3))" },
    { status: "Rejected", total: 1, fill: "hsl(var(--chart-4))" },
];

const totalChartData = chartData.reduce(
    (acc, cur) => acc + Number(cur.total),
    0,
);

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

export default function StatusChart() {
    return (
        <Card className="flex h-full flex-col p-6">
            <CardHeader className="space-y-0 p-0 pb-2">
                <CardTitle className="text-2xl">Application Status</CardTitle>
                <CardDescription className="space-y-0">
                    Distribution of your application statuses
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px] w-full max-w-[350px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="total"
                                    formatter={(value, name, item) => {
                                        const numericValue = Number(value);
                                        const percentage = totalChartData
                                            ? (
                                                  (numericValue /
                                                      totalChartData) *
                                                  100
                                              ).toFixed(1)
                                            : "0.0";

                                        const dotColor =
                                            item.payload.fill || item.color;

                                        return (
                                            <div className="flex items-center">
                                                <div
                                                    className="mr-2 h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                                    style={{
                                                        backgroundColor:
                                                            dotColor,
                                                    }}
                                                />
                                                <p>
                                                    <span className="text-muted-foreground">
                                                        {name}:{" "}
                                                    </span>
                                                    <span className="font-medium text-foreground">
                                                        {numericValue}{" "}
                                                    </span>
                                                    <span className="font-medium text-foreground">
                                                        ({percentage}%)
                                                    </span>
                                                </p>
                                            </div>
                                        );
                                    }}
                                />
                            }
                        />

                        <Pie
                            data={chartData}
                            dataKey="total"
                            innerRadius={50}
                            labelLine={false}
                            label={({ payload, ...props }) => {
                                return (
                                    <text
                                        cx={props.cx}
                                        cy={props.cy}
                                        x={props.x}
                                        y={props.y}
                                        textAnchor={props.textAnchor}
                                        dominantBaseline={
                                            props.dominantBaseline
                                        }
                                        fill="hsla(var(--foreground))"
                                    >
                                        {payload.total}
                                    </text>
                                );
                            }}
                            nameKey="status"
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="status" />}
                            className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
