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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Check, Home, RefreshCw, X, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

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
  const router = useRouter();
  const id = params.id as string;

  const [quiz, setQuiz] = useState<StoredQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const selectedAnswer = userAnswers[currentQuestionIndex];

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && id) {
        const storedQuizzes: StoredQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
        const currentQuiz = storedQuizzes.find(q => slugify(q.disciplineName) === id);
        if (currentQuiz) {
          setQuiz(currentQuiz);
          setUserAnswers(Array(currentQuiz.questions.length).fill(null));
          setStartTime(new Date());
        }
    }
  }, [id]);

  const handleDeleteQuiz = () => {
    if (!quiz) return;
    const storedQuizzes: StoredQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const updatedQuizzes = storedQuizzes.filter(q => q.createdAt !== quiz.createdAt);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    router.push('/');
  };
  
  const calculateScore = () => {
    if (!quiz) return 0;
    return userAnswers.reduce((acc, answer, index) => {
      if (answer === quiz.questions[index].answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

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
          O questionário que você está tentando acessar não existe ou foi excluído.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Voltar para a Página Inicial</Link>
        </Button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= quiz.questions.length;

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = Number(value);
    setUserAnswers(newAnswers);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(userAnswers[currentQuestionIndex + 1] !== null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswered(userAnswers[currentQuestionIndex - 1] !== null);
    }
  };
  
  const handleFinish = () => {
    const finalScore = calculateScore();
    saveResult(finalScore);
    setCurrentQuestionIndex(quiz.questions.length); // Trigger finish screen
  };


  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quiz.questions.length).fill(null));
    setIsAnswered(false);
    setStartTime(new Date());
  };
  
  const progressValue = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (isFinished) {
    const finalScore = calculateScore();
    const finalScorePercentage = ((finalScore / quiz.questions.length) * 100).toFixed(0);
    return (
      <main className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[calc(100vh-10rem)]">
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
              Você acertou {finalScore} de {quiz.questions.length} questões.
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
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold">{quiz.disciplineName}</h1>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                          </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                      <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Isso excluirá permanentemente o questionário.
                          </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteQuiz} className="bg-destructive hover:bg-destructive/90">
                          Excluir
                          </AlertDialogAction>
                      </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="text-sm text-muted-foreground">
                Questão {currentQuestionIndex + 1} de {quiz.questions.length}
                </div>
            </div>
            <Progress value={progressValue} />
        </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>

        <div className="px-6 pb-6 border-b flex justify-between items-center">
            <Button onClick={handlePrevious} variant="outline" disabled={currentQuestionIndex === 0}>
                <ArrowLeft className="mr-2" />
                Anterior
            </Button>
            {currentQuestionIndex < quiz.questions.length - 1 && (
                <Button onClick={handleNext} disabled={!isAnswered}>
                    Próxima
                    <ArrowRight className="ml-2" />
                </Button>
            )}
        </div>
              
        <CardContent className="pt-6">
          <RadioGroup
            key={currentQuestion.id}
            value={selectedAnswer !== null ? String(selectedAnswer) : undefined}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
            disabled={isAnswered}
          >
            {currentQuestion.options.map((option, index) => {
               const isCorrect = index === currentQuestion.answer;
               const isSelected = index === selectedAnswer;
               let stateClass = '';

               if (isAnswered) {
                 if (isCorrect) {
                   stateClass = 'border-green-500 bg-green-500/10 text-green-400';
                 } else if (isSelected) {
                   stateClass = 'border-destructive bg-destructive/10 text-destructive';
                 }
               }
              return (
                <Label
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${stateClass} ${!isAnswered ? 'cursor-pointer hover:border-primary' : 'cursor-default'}`}
                  htmlFor={`r${index}`}
                >
                  <RadioGroupItem value={String(index)} id={`r${index}`} />
                  <span className="flex-1 text-base">{option}</span>
                  {isAnswered && isCorrect && <Check className="text-green-500" />}
                  {isAnswered && !isCorrect && isSelected && <X className="text-destructive" />}
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

        {currentQuestionIndex === quiz.questions.length - 1 && (
            <CardFooter className="justify-end border-t pt-6">
                <Button onClick={handleFinish} size="lg" disabled={!isAnswered}>
                    Finalizar
                </Button>
            </CardFooter> 
        )}
      </Card>
    </div>
  );
}

export default function SimulationPage() {
  return <SimulationClientPage />;
}
