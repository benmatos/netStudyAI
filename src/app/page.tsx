import MainLayout from '@/components/main-layout';
import PerformanceOverview from '@/components/dashboard/performance-overview';
import TopicPerformanceChart from '@/components/dashboard/topic-performance-chart';
import GamificationStats from '@/components/dashboard/gamification-stats';
import AdaptiveStudyPlan from '@/components/dashboard/adaptive-study-plan';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Painel</h1>
      </div>
      <div
        className="flex flex-1 rounded-lg"
      >
        <div className="grid gap-6 w-full auto-rows-max">
          <PerformanceOverview />
          <div className="grid gap-6 lg:grid-cols-5">
            <TopicPerformanceChart className="lg:col-span-3" />
            <GamificationStats className="lg:col-span-2" />
          </div>
          <AdaptiveStudyPlan />
        </div>
      </div>
    </MainLayout>
  );
}
