'use client';

import { useState, useEffect } from 'react';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { getStudyPlanAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { topics } from '@/lib/data';

type SimulationResult = {
  topicId: string;
  topicName: string;
  score: number;
  correct: number;
  total: number;
  date: string;
};

export default function AdaptiveStudyPlan() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [performanceData, setPerformanceData] = useState<Record<string, number> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const history: SimulationResult[] = JSON.parse(localStorage.getItem('simulationHistory') || '[]');
      
      const performanceByTopic: Record<string, number> = {};
      topics.forEach(topic => {
        const topicResults = history.filter(r => r.topicId === topic.id);
        let score = 0;
        if (topicResults.length > 0) {
          const totalCorrect = topicResults.reduce((acc, r) => acc + r.correct, 0);
          const totalQuestions = topicResults.reduce((acc, r) => acc + r.total, 0);
          score = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
        }
        performanceByTopic[topic.name] = score;
      });
      setPerformanceData(performanceByTopic);
    } catch (error) {
      console.error("Could not load performance data:", error);
    }
  }, []);

  const handleGeneratePlan = async () => {
    if (!performanceData || Object.values(performanceData).every(score => score === 0)) {
        toast({
            variant: 'destructive',
            title: 'Dados Insuficientes',
            description: 'Você precisa completar pelo menos um simulado para gerar um plano de estudo.',
        });
        return;
    }
      
    setLoading(true);
    setPlan(null);
    const result = await getStudyPlanAction(performanceData);
    setLoading(false);
    if (result.success) {
      setPlan(result.plan);
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: result.error,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div>
                <CardTitle>Plano de Estudo Adaptativo</CardTitle>
                <CardDescription>
                    Deixe nossa IA gerar um plano de estudo personalizado com base em seu desempenho mais recente.
                </CardDescription>
            </div>
            <Button onClick={handleGeneratePlan} disabled={loading}>
                {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <BrainCircuit className="mr-2 h-4 w-4" />
                )}
                Gerar Plano
            </Button>
        </div>
      </CardHeader>
      {(loading || plan) && (
        <CardContent>
          <div className="prose prose-sm prose-p:text-foreground prose-li:text-foreground dark:prose-invert max-w-none rounded-lg border bg-muted/50 p-4">
            {loading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Gerando seu plano personalizado...</span>
              </div>
            )}
            {plan && (
              <div>
                <h4 className="font-semibold text-foreground">Seu Plano Personalizado:</h4>
                <p>{plan}</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
