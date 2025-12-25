"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DataKey } from "recharts/types/util/types";

interface ReusableBarChartProps {
  data: any[]; // مصفوفة البيانات
  config: ChartConfig; // تكوين الألوان والعناوين لكل series
  height?: number; // ارتفاع الشارت
  title?: string; // عنوان الشارت
  axisKey: DataKey<any>;
}
const HomeChart = ({
  data,
  config,
  height = 100,
  title,
  axisKey,
}: ReusableBarChartProps) => {
  const seriesKeys = Object.keys(config);
  return (
    <div className=" rounded-lg shadow p-4">
      {title && <h2 className="text-lg font-semibold  mb-2">{title}</h2>}
      <ChartContainer config={config} className={`h-[${height}px] w-full`}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={axisKey}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {seriesKeys.map((key) => (
            <Bar key={key} dataKey={key} fill={config[key].color} radius={4} />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default HomeChart;
