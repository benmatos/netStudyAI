import MainLayout from '@/components/main-layout';
import SimulationClient from '@/components/simulations/simulation-client';
import { topics, questions as defaultQuestions, ClientTopic, Question } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SimulationPageProps {
  params: {
    topic: string;
  };
}

export default function SimulationPage({ params }: SimulationPageProps) {
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

  const topicData = topics.find((t) => t.id === params.topic);
  const topicQuestions = allQuestions.filter((q) => q.topicId === params.topic);

  if (isLoading) {
    return <MainLayout><div>Carregando...</div></MainLayout>;
  }

  if (!topicData || topicQuestions.length === 0) {
    notFound();
  }

  const topic: ClientTopic = {
    id: topicData.id,
    name: topicData.name,
    description: topicData.description,
  }

  return (
    <MainLayout>
      <SimulationClient topic={topic} questions={topicQuestions} />
    </MainLayout>
  );
}

export async function generateStaticParams() {
  return topics.map((topic) => ({
    topic: topic.id,
  }));
}
