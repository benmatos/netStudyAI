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
import { CheckCircle, XCircle } from 'lucide-react';
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

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && id) {
        const storedQuizzes: StoredQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
        const currentQuiz = storedQuizzes.find(q => slugify(q.disciplineName) === id);
        setQuiz(currentQuiz || null);
    }
  }, [id]);

  const saveResult = (finalScore: number) => {
    if (!quiz) return;

    const newResult: SimulationResult = {
      completedAt: new Date().toISOString(),
      score: finalScore,
      totalQuestions: quiz.questions.length,
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
    if (currentQuestionIndex + 1 >= quiz.questions.length) {
        saveResult(score);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };
  
  const progressValue = (currentQuestionIndex / quiz.questions.length) * 100;

  if (isFinished) {
    return (
      <main className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-3xl">Simulado Concluído!</CardTitle>
            <CardDescription>
              Você completou o questionário de {quiz.disciplineName}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold">
              {((score / quiz.questions.length) * 100).toFixed(0)}%
            </p>
            <p className="text-muted-foreground mt-2">
              Você acertou {score} de {quiz.questions.length} questões.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={handleRestart}>Refazer Questionário</Button>
            <Button variant="outline" asChild>
              <Link href="/">Voltar ao Início</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="mb-4">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          &larr; Voltar para Meus Questionários
        </Link>
      </div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-xl">{quiz.disciplineName}</CardTitle>
            <div className="text-sm text-muted-foreground">
              Questão {currentQuestionIndex + 1} de {quiz.questions.length}
            </div>
          </div>
          <Progress value={progressValue} hidden/>
          <CardDescription className="pt-6 text-lg text-foreground">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          {isAnswered ? (
             <Button onClick={handleNext}>
                Próxima Questão
             </Button>
          ) : (
             <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
               Responder
             </Button>
          )}
        </CardFooter>
        <CardContent>
          <RadioGroup
            key={currentQuestion.id}
            onValueChange={(value) => setSelectedAnswer(Number(value))}
            disabled={isAnswered}
            className="space-y-1"
          >
            {currentQuestion.options.map((option, index) => {
              let stateClass = '';
              if (isAnswered) {
                if (index === currentQuestion.answer) {
                  stateClass = 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-500';
                } else if (index === selectedAnswer) {
                  stateClass = 'border-destructive bg-destructive/10 text-destructive dark:text-destructive';
                }
              }

              return (
                <Label
                  key={index}
                  className={`flex items-center space-x-1 p-4 rounded-md border transition-all ${stateClass} ${!isAnswered && 'cursor-pointer hover:bg-accent'}`}
                  htmlFor={`r${index}`}
                >
                  <RadioGroupItem value={String(index)} id={`r${index}`} />
                  <span className="flex-1">{option}</span>
                  {isAnswered && index === currentQuestion.answer && <CheckCircle className="text-green-600" />}
                  {isAnswered && index !== currentQuestion.answer && index === selectedAnswer && <XCircle className="text-red-600" />}
                </Label>
              );
            })}
          </RadioGroup>

          {isAnswered && (
             <Alert className={`mt-6 ${selectedAnswer === currentQuestion.answer ? 'border-green-500/50 text-green-900 dark:border-green-500 dark:text-green-400' : 'border-destructive/50 text-destructive dark:text-destructive'}`} variant={selectedAnswer === currentQuestion.answer ? 'default' : 'destructive'}>
                {selectedAnswer === currentQuestion.answer ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{selectedAnswer === currentQuestion.answer ? 'Resposta Correta!' : 'Resposta Incorreta'}</AlertTitle>
                <AlertDescription className={selectedAnswer === currentQuestion.answer ? 'text-green-800 dark:text-green-300' : ''}>
                  {currentQuestion.explanation}
                </AlertDescription>
             </Alert>
          )}

        </CardContent>
        
      </Card>
    </main>
  );
}

export default function SimulationPage() {
  // We need to wrap the client component in a default export for the page to be a client component.
  // This is a requirement for using hooks like `useParams`.
  return <SimulationClientPage />;
}
