import Link from 'next/link';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { topics } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function SimulationsPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Simulados</h1>
      </div>
      <p className="text-muted-foreground mt-2">
        Escolha um tópico para iniciar um exame simulado e testar seus conhecimentos.
      </p>
      <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Card key={topic.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <topic.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline">{topic.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{topic.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/simulations/${topic.id}`}>
                  Iniciar Simulado <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
