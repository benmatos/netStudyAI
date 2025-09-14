'use client';

import { useState } from 'react';
import type { Question, ClientTopic } from '@/lib/data';
import { getIconForTopic } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, ArrowRight, Home, RefreshCw, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface SimulationClientProps {
  topic: ClientTopic;
  questions: Question[];
}

export default function SimulationClient({ topic, questions }: SimulationClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = (currentQuestionIndex / questions.length) * 100;
  
  const TopicIcon = getIconForTopic(topic.id);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedOption(optionIndex);
    setIsAnswered(true);
    if (optionIndex === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleIDontKnow = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(-1); // Use -1 to indicate "I don't know"
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };
  
  if (isFinished) {
    const finalScore = (score / questions.length) * 100;
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="items-center">
          <CardTitle className="text-2xl font-headline">Simulado Concluído!</CardTitle>
          <CardDescription>Você terminou o simulado de {topic.name}.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">Sua Pontuação</p>
          <p className="text-6xl font-bold text-primary my-2">{finalScore.toFixed(0)}%</p>
          <p className="text-muted-foreground">Você respondeu {score} de {questions.length} perguntas corretamente.</p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={handleRestart}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar Novamente
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Painel
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TopicIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold md:text-2xl font-headline">{topic.name}</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </div>
      </div>
      <Progress value={progressValue} className="mb-6 h-2" />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.answer;
            const isSelected = selectedOption === index;
            
            let variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' = 'outline';
            if (isAnswered) {
              if (isCorrect) variant = 'default';
              else if (isSelected) variant = 'destructive';
            }

            return (
              <Button
                key={index}
                variant={variant}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className="justify-start h-auto text-wrap text-left"
              >
                {isAnswered && (isSelected || isCorrect) && (
                  isCorrect ? <CheckCircle className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />
                )}
                {option}
              </Button>
            );
          })}
        </CardContent>
        {!isAnswered && (
            <CardFooter className="pb-6 pt-2">
                <Button variant="ghost" className="text-muted-foreground" onClick={handleIDontKnow}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Eu não sei a resposta correta
                </Button>
            </CardFooter>
        )}
        {isAnswered && (
          <CardFooter className="flex-col items-start">
             <Alert variant={selectedOption === currentQuestion.answer ? "default" : "destructive"} className="bg-muted/50">
              <AlertTitle>{selectedOption === currentQuestion.answer ? "Correto!" : "Incorreto"}</AlertTitle>
              <AlertDescription>
                {currentQuestion.explanation}
              </AlertDescription>
            </Alert>
            <Button onClick={handleNext} className="mt-4 self-end">
              {currentQuestionIndex < questions.length - 1 ? "Próxima Pergunta" : "Finalizar"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
