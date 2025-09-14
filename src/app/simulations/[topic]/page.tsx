import MainLayout from '@/components/main-layout';
import SimulationClient from '@/components/simulations/simulation-client';
import { topics, questions, ClientTopic } from '@/lib/data';
import { notFound } from 'next/navigation';

interface SimulationPageProps {
  params: {
    topic: string;
  };
}

export default function SimulationPage({ params }: SimulationPageProps) {
  const topicData = topics.find((t) => t.id === params.topic);
  const topicQuestions = questions.filter((q) => q.topicId === params.topic);

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
