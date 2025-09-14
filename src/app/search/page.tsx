'use client';

import { useState } from 'react';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { questions as allQuestions, topics, Question } from '@/lib/data';
import { CheckCircle } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Question[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(true);
      return;
    }

    const keywords = searchQuery.toLowerCase().split(' ').filter(kw => kw);
    
    const foundQuestions = allQuestions.filter(q => {
      const questionText = q.question.toLowerCase();
      const optionsText = q.options.join(' ').toLowerCase();
      const explanationText = q.explanation.toLowerCase();
      
      return keywords.every(kw => 
        questionText.includes(kw) || 
        optionsText.includes(kw) ||
        explanationText.includes(kw)
      );
    });

    setResults(foundQuestions);
    setSearched(true);
  };
  
  const getTopicName = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    return topic ? topic.name : 'Desconhecido';
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Buscar Questões</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Use palavras-chave para encontrar questões específicas em todo o banco de dados.
      </p>

      <div className="mt-6 flex w-full max-w-2xl items-center space-x-2">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ex: TCP handshake, máscara de sub-rede, OSPF..."
          className="text-base"
        />
        <Button type="button" onClick={handleSearch}>Buscar</Button>
      </div>

      <div className="mt-8">
        {searched && results.length === 0 && (
          <Alert>
            <AlertTitle>Nenhum Resultado</AlertTitle>
            <AlertDescription>
              Não foram encontradas questões com os termos pesquisados. Tente usar palavras-chave diferentes.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-6 mt-6 sm:grid-cols-1 lg:grid-cols-2">
          {results.map((q) => (
            <Card key={q.id} className="flex flex-col">
              <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{getTopicName(q.topicId)}</Badge>
                <CardTitle className="text-base font-semibold leading-relaxed">{q.question}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 text-sm">
                {q.options.map((opt, index) => (
                  <div key={index} className={`flex items-center gap-2 p-2 rounded-md ${index === q.answer ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>
                    {index === q.answer && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />}
                    <span className={index === q.answer ? 'font-bold' : ''}>{opt}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                 <Alert variant="default" className="w-full bg-muted/50">
                    <AlertTitle className="text-sm font-bold">Explicação</AlertTitle>
                    <AlertDescription>
                        {q.explanation}
                    </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
