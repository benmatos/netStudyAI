'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { topics as defaultTopics, getIconForTopic, ClientTopic } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function SimulationsPage() {
  const [allTopics, setAllTopics] = useState<ClientTopic[]>(defaultTopics);

  useEffect(() => {
    try {
      const customTopics: ClientTopic[] = JSON.parse(localStorage.getItem('customTopics') || '[]');
      const combined = [...defaultTopics];
      const defaultIds = new Set(defaultTopics.map(t => t.id));

      customTopics.forEach(customT => {
        if (!defaultIds.has(customT.id)) {
          combined.push(customT);
        }
      });
      setAllTopics(combined);
    } catch (error) {
      console.error('Failed to load custom topics:', error);
      setAllTopics(defaultTopics);
    }
  }, []);

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Simulados</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Escolha um tópico para iniciar um exame simulado e testar seus conhecimentos.
      </p>
      <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {allTopics.map((topic) => {
          const Icon = getIconForTopic(topic.id);
          return (
            <Card key={topic.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline">{topic.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{topic.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/simulations/${topic.id}`}>
                    Iniciar Simulado <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}
