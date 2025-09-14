import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Award, Medal, ShieldCheck, Star, Trophy } from 'lucide-react';
import type { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

const badges = [
  { icon: Star, label: 'First Quiz', color: 'text-yellow-500' },
  { icon: ShieldCheck, label: 'Security Pro', color: 'text-blue-500' },
  { icon: Award, label: 'Perfect Score', color: 'text-green-500' },
  { icon: Medal, label: '5 Day Streak', color: 'text-indigo-500' },
  { icon: Trophy, label: 'Top Performer', color: 'text-red-500' },
];

export default function GamificationStats({ className }: { className?: ClassValue }) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Points earned and badges collected.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-center p-6 bg-muted/50 rounded-lg">
          <div className="text-center">
            <p className="text-4xl font-bold">1,250</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-sm font-medium mb-2">Badges Earned</h3>
          <div className="flex flex-wrap gap-4">
            {badges.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1" title={label}>
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-muted`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
