'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import MainLayout from '@/components/main-layout';
import PerformanceOverview from '@/components/dashboard/performance-overview';
import TopicPerformanceChart from '@/components/dashboard/topic-performance-chart';
import AdaptiveStudyPlan from '@/components/dashboard/adaptive-study-plan';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRestart = () => {
    try {
      localStorage.removeItem('simulationHistory');
      window.location.reload();
    } catch (error) {
      console.error('Falha ao reiniciar o painel:', error);
    }
  };

  return (
    <MainLayout key={isClient ? 'client-render' : 'server-render'}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Painel</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reiniciar Painel
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação limpará permanentemente todo o seu histórico de simulados. Seus dados de desempenho serão zerados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleRestart}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-1 rounded-lg">
        <div className="grid w-full auto-rows-max gap-6">
          <PerformanceOverview />
          <TopicPerformanceChart />
          <AdaptiveStudyPlan />
        </div>
      </div>
    </MainLayout>
  );
}
