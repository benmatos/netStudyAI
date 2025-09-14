'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

type SimulationResult = {
  topicId: string;
  topicName: string;
  score: number;
  correct: number;
  total: number;
  date: string;
};

const PerformanceOverview = () => {
  const [overallAccuracy, setOverallAccuracy] = useState(0);
  const [simulationsCompleted, setSimulationsCompleted] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      const history: SimulationResult[] = JSON.parse(localStorage.getItem('simulationHistory') || '[]');
      if (history.length > 0) {
        const totalCorrect = history.reduce((acc, r) => acc + r.correct, 0);
        const totalQuestions = history.reduce((acc, r) => acc + r.total, 0);
        const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
        
        setOverallAccuracy(accuracy);
        setSimulationsCompleted(history.length);

        // Animate progress bar
        const timer = setTimeout(() => setProgress(accuracy), 500);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Could not parse simulation history:", error);
    }
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Precisão Geral</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overallAccuracy.toFixed(0)}%</div>
          <p className="text-xs text-muted-foreground">Com base em todos os simulados</p>
          <Progress value={progress} className="mt-2 h-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Simulados Concluídos</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{simulationsCompleted}</div>
          <p className="text-xs text-muted-foreground">Total de simulados realizados</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo Total de Estudo</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">--:--</div>
          <p className="text-xs text-muted-foreground">Recurso em breve</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceOverview;
