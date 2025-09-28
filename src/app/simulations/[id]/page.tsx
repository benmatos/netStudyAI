'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Home, RefreshCw, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Question {
  id: number;
  topicId: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface SimulationResult {
  completedAt: string;
  score: number;
  totalQuestions: number;
  durationInSeconds: number;
}


interface StoredQuiz {
  disciplineName: string;
  questions: Question[];
  createdAt: string;
  results?: SimulationResult[];
}

const slugify = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

function SimulationClientPage() {
  const params = useParams();
  const id = params.id as string;

  const [quiz, setQuiz] = useState<StoredQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && id) {
        const storedQuizzes: StoredQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
        const currentQuiz = storedQuizzes.find(q => slugify(q.disciplineName) === id);
        setQuiz(currentQuiz || null);
        setStartTime(new Date());
    }
  }, [id]);

  const saveResult = (finalScore: number) => {
    if (!quiz || !startTime) return;
  
    const endTime = new Date();
    const durationInSeconds = Math.round((endTime.getTime() - startTime.getTime()) / 1000);

    const newResult: SimulationResult = {
      completedAt: new Date().toISOString(),
      score: finalScore,
      totalQuestions: quiz.questions.length,
      durationInSeconds: durationInSeconds,
    };

    const storedQuizzes: StoredQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const updatedQuizzes = storedQuizzes.map(q => {
      if (slugify(q.disciplineName) === id) {
        const updatedResults = q.results ? [...q.results, newResult] : [newResult];
        return { ...q, results: updatedResults };
      }
      return q;
    });

    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };


  if (!isClient) {
    return <div className="container mx-auto p-8 text-center">Carregando...</div>;
  }

  if (!quiz) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Questionário não encontrado</h1>
        <p className="text-muted-foreground mt-2">
          O questionário que você está tentando acessar não existe.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Voltar para a Página Inicial</Link>
        </Button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= quiz.questions.length;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= quiz.questions.length) {
        saveResult(score + (selectedAnswer === currentQuestion.answer && !isAnswered ? 1 : 0));
    }
    setCurrentQuestionIndex(nextIndex);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setStartTime(new Date());
  };
  
  const progressValue = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (isFinished) {
    const finalScorePercentage = ((score / quiz.questions.length) * 100).toFixed(0);
    return (
      <main className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Simulado Concluído!</CardTitle>
            <CardDescription>
              Você completou o questionário de {quiz.disciplineName}.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className={`text-6xl font-bold ${Number(finalScorePercentage) >= 70 ? 'text-green-500' : 'text-destructive'}`}>
              {finalScorePercentage}%
            </div>
            <p className="text-muted-foreground">
              Você acertou {score} de {quiz.questions.length} questões.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={handleRestart}>
              <RefreshCw className="mr-2" />
              Refazer 
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2" />
                Início
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-xl font-semibold">{quiz.disciplineName}</h1>
                <div className="text-sm text-muted-foreground">
                Questão {currentQuestionIndex + 1} de {quiz.questions.length}
                </div>
            </div>
            <Progress value={progressValue} />
        </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            key={currentQuestion.id}
            onValueChange={(value) => setSelectedAnswer(Number(value))}
            disabled={isAnswered}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => {
              let stateClass = '';
              if (isAnswered) {
                if (index === currentQuestion.answer) {
                  stateClass = 'border-green-500 bg-green-500/10 text-green-400';
                } else if (index === selectedAnswer) {
                  stateClass = 'border-destructive bg-destructive/10 text-destructive';
                }
              }

              return (
                <Label
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${stateClass} ${!isAnswered ? 'cursor-pointer hover:border-primary' : ''}`}
                  htmlFor={`r${index}`}
                >
                  <RadioGroupItem value={String(index)} id={`r${index}`} />
                  <span className="flex-1 text-base">{option}</span>
                  {isAnswered && index === currentQuestion.answer && <Check className="text-green-500" />}
                  {isAnswered && index !== currentQuestion.answer && index === selectedAnswer && <X className="text-destructive" />}
                </Label>
              );
            })}
          </RadioGroup>

          {isAnswered && (
             <Alert className={`mt-6 ${selectedAnswer === currentQuestion.answer ? 'border-green-500/50 text-green-400' : 'border-destructive/50 text-destructive'}`} variant={selectedAnswer === currentQuestion.answer ? 'default' : 'destructive'}>
                {selectedAnswer === currentQuestion.answer ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                <AlertTitle className="font-bold">{selectedAnswer === currentQuestion.answer ? 'Resposta Correta!' : 'Resposta Incorreta'}</AlertTitle>
                <AlertDescription className={selectedAnswer === currentQuestion.answer ? 'text-green-400/80' : 'text-destructive/80'}>
                  {currentQuestion.explanation}
                </AlertDescription>
             </Alert>
          )}

        </CardContent>

        <CardFooter className="justify-end border-t pt-6">
          {isAnswered ? (
             <Button onClick={handleNext} size="lg">
                Próxima Questão
             </Button>
          ) : (
             <Button onClick={handleAnswer} disabled={selectedAnswer === null} size="lg">
               Responder
             </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function SimulationPage() {
  // We need to wrap the client component in a default export for the page to be a client component.
  // This is a requirement for using hooks like `useParams`.
  return <SimulationClientPage />;
}
