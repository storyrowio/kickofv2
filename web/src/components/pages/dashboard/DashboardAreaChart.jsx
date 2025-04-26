"use client"

import {TrendingUp, TrendingUpIcon} from "lucide-react"
import {Area, AreaChart, CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {Badge} from "@/components/ui/badge.jsx";
import * as React from "react";

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
}

export default function DashboardAreaChart() {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <CardDescription>Total Revenue</CardDescription>
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                    <TrendingUpIcon className="size-3" />
                    +12.5%
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <h1 className="@[250px]/card:text-4xl text-2xl xl:text-3xl font-semibold tabular-nums">
                        $1,250.00
                    </h1>
                    <ChartContainer config={chartConfig} className="w-1/2 h-14">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-primary)"
                                        stopOpacity={1}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-primary)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="url(#fillDesktop)"
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
