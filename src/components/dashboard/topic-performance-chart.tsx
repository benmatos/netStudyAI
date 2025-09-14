'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';
import { topics } from '@/lib/data';

type SimulationResult = {
  topicId: string;
  topicName: string;
  score: number;
  correct: number;
  total: number;
  date: string;
};

const chartConfig = {
  score: {
    label: 'Pontuação',
    color: 'hsl(var(--primary))',
  },
};

export default function TopicPerformanceChart({ className }: { className?: ClassValue }) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    try {
      const history: SimulationResult[] = JSON.parse(localStorage.getItem('simulationHistory') || '[]');
      
      const performanceByTopic = topics.map(topic => {
        const topicResults = history.filter(r => r.topicId === topic.id);
        let score = 0;
        if (topicResults.length > 0) {
          const totalCorrect = topicResults.reduce((acc, r) => acc + r.correct, 0);
          const totalQuestions = topicResults.reduce((acc, r) => acc + r.total, 0);
          score = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
        }
        return {
          name: topic.name.replace(/ e /g, ' & ').replace(/ Modelos/, '').replace(/ de Rede/, ''),
          score: score,
        };
      });

      setChartData(performanceByTopic);

    } catch (error) {
      console.error("Could not process simulation history for chart:", error);
    }
  }, []);


  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Desempenho por Tópico</CardTitle>
        <CardDescription>Suas pontuações de precisão para cada tópico.</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full h-[300px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 5,
                  right: 5,
                  left: -25,
                  bottom: 40,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={1}
                  tickFormatter={(value) => value.length > 15 ? `${value.slice(0, 15)}...` : value}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="score" fill="var(--color-score)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] w-full items-center justify-center">
            <p className="text-muted-foreground">Complete um simulado para ver seu desempenho.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
