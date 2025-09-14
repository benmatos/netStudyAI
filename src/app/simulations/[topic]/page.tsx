'use client';

import MainLayout from '@/components/main-layout';
import SimulationClient from '@/components/simulations/simulation-client';
import { topics, questions as defaultQuestions, ClientTopic, Question } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SimulationPage() {
  const params = useParams();
  const topic = params.topic as string;

  const [allQuestions, setAllQuestions] = useState<Question[]>(defaultQuestions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const customQuestions: Question[] = JSON.parse(localStorage.getItem('customQuestions') || '[]');
      // Combine and remove duplicates, giving preference to custom questions if IDs conflict
      const combined = [...defaultQuestions];
      const defaultIds = new Set(defaultQuestions.map(q => q.id));
      
      customQuestions.forEach(customQ => {
        if (!defaultIds.has(customQ.id)) {
          combined.push(customQ);
        }
      });
      
      setAllQuestions(combined);
    } catch (error) {
      console.error("Failed to load custom questions:", error);
      setAllQuestions(defaultQuestions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const topicData = topics.find((t) => t.id === topic);
  
  if (isLoading) {
    return <MainLayout><div>Carregando...</div></MainLayout>;
  }
  
  const topicQuestions = allQuestions.filter((q) => q.topicId === topic);

  if (!topicData || topicQuestions.length === 0) {
    notFound();
  }

  const clientTopic: ClientTopic = {
    id: topicData.id,
    name: topicData.name,
    description: topicData.description,
  }

  return (
    <MainLayout>
      <SimulationClient topic={clientTopic} questions={topicQuestions} />
    </MainLayout>
  );
}
