'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { userPerformance } from '@/lib/data';
import type { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

const chartData = Object.entries(userPerformance).map(([name, score]) => ({
  name: name.replace(/ e /g, ' & ').replace(/ Models/, '').replace(/ de Rede/, ''),
  score: score,
}));

const chartConfig = {
  score: {
    label: 'Pontuação',
    color: 'hsl(var(--primary))',
  },
};

export default function TopicPerformanceChart({ className }: { className?: ClassValue }) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Desempenho por Tópico</CardTitle>
        <CardDescription>Suas pontuações de precisão para cada tópico.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="score" fill="var(--color-score)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
