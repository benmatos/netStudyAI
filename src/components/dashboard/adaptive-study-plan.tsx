'use client';

import { useState } from 'react';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { getStudyPlanAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { userPerformance } from '@/lib/data';

export default function AdaptiveStudyPlan() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGeneratePlan = async () => {
    setLoading(true);
    setPlan(null);
    const result = await getStudyPlanAction(userPerformance);
    setLoading(false);
    if (result.success) {
      setPlan(result.plan);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div>
                <CardTitle>Adaptive Study Plan</CardTitle>
                <CardDescription>
                    Let our AI generate a personalized study plan based on your latest performance.
                </CardDescription>
            </div>
            <Button onClick={handleGeneratePlan} disabled={loading}>
                {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <BrainCircuit className="mr-2 h-4 w-4" />
                )}
                Generate Plan
            </Button>
        </div>
      </CardHeader>
      {(loading || plan) && (
        <CardContent>
          <div className="prose prose-sm prose-p:text-foreground prose-li:text-foreground dark:prose-invert max-w-none rounded-lg border bg-muted/50 p-4">
            {loading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating your personalized plan...</span>
              </div>
            )}
            {plan && (
              <div>
                <h4 className="font-semibold text-foreground">Your Personalized Plan:</h4>
                <p>{plan}</p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
