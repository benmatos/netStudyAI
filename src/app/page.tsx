'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  } from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { generateQuestionsFromPdf, GenerateQuestionsOutput } from '@/ai/flows/generate-questions-flow';
import { Book, CheckCircle, Clock, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface SimulationResult {
  completedAt: string;
  score: number;
  totalQuestions: number;
  durationInSeconds: number;
}

interface StoredQuiz {
  disciplineName: string;
  questions: GenerateQuestionsOutput['questions'];
  createdAt: string;
  results?: SimulationResult[];
}

function CreateQuizForm({ onQuizCreated }: { onQuizCreated: (newQuiz: StoredQuiz) => void }) {
  const [disciplineName, setDisciplineName] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError('Por favor, selecione um arquivo PDF.');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !disciplineName) {
      setError('Por favor, preencha todos os campos e selecione um arquivo.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const pdfDataUri = reader.result as string;
        try {
          const result = await generateQuestionsFromPdf({
            disciplineName,
            numberOfQuestions,
            pdfDataUri,
          });
          const newQuiz: StoredQuiz = {
            disciplineName,
            questions: result.questions,
            createdAt: new Date().toISOString(),
          };
          
          const existingQuizzes: StoredQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
          localStorage.setItem('quizzes', JSON.stringify([...existingQuizzes, newQuiz]));
          
          onQuizCreated(newQuiz);
          setDisciplineName('');
          setFile(null);
          setNumberOfQuestions(10);
          setDialogOpen(false); 
        } catch (e) {
          console.error(e);
          setError('Ocorreu um erro ao gerar as questões. Verifique o console para mais detalhes.');
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Falha ao ler o arquivo PDF.');
        setIsLoading(false);
      };
    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao processar o arquivo.');
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <PlusCircle className="mr-2" />
          Criar Novo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar Novo Questionário</DialogTitle>
          <DialogDescription>
            Preencha os detalhes e faça o upload de um arquivo PDF. A IA irá gerar as questões.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="discipline-name">Nome da Disciplina</Label>
            <Input
              id="discipline-name"
              placeholder="Ex: Direito Constitucional"
              value={disciplineName}
              onChange={(e) => setDisciplineName(e.target.value)}
              required
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="number-of-questions">Número de Questões</Label>
            <Input
              id="number-of-questions"
              type="number"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              min="3"
              max="50"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf-file">Arquivo PDF</Label>
            <Input
              id="pdf-file"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="file:text-primary file:font-semibold"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          
          <div className="flex justify-end gap-4 pt-4">
             <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              {isLoading ? 'Gerando...' : 'Gerar Questões'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export default function HomePage() {
  const [quizzes, setQuizzes] = useState<StoredQuiz[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
        const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]').sort(
            (a: StoredQuiz, b: StoredQuiz) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setQuizzes(storedQuizzes);
    }
  }, []);

  const handleQuizCreated = (newQuiz: StoredQuiz) => {
    setQuizzes(prevQuizzes => [newQuiz, ...prevQuizzes]);
  };
  
  const handleDeleteQuiz = (quizToDelete: StoredQuiz) => {
    const updatedQuizzes = quizzes.filter(quiz => quiz.createdAt !== quizToDelete.createdAt);
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const calculateAverageScore = () => {
    let totalScore = 0;
    let totalQuestions = 0;

    quizzes.forEach(quiz => {
      if (quiz.results) {
        quiz.results.forEach(result => {
          totalScore += result.score;
          totalQuestions += result.totalQuestions;
        });
      }
    });

    if (totalQuestions === 0) {
      return null;
    }

    return ((totalScore / totalQuestions) * 100).toFixed(0);
  };
  
    const calculateTotalStudyTime = () => {
    let totalSeconds = 0;
    quizzes.forEach(quiz => {
      if (quiz.results) {
        quiz.results.forEach(result => {
          totalSeconds += result.durationInSeconds;
        });
      }
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
  };


  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };
  
  const averageScore = calculateAverageScore();
  const totalStudyTime = calculateTotalStudyTime();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Meus Questionários</h1>
          <p className="text-muted-foreground mt-1">
            Seu centro de estudos pessoal. Crie, pratique e evolua.
          </p>
        </div>
        <CreateQuizForm onQuizCreated={handleQuizCreated} />
      </div>

      {isClient && (
        <div className="flex flex-col gap-8">
          {/* Visão Geral */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Visão Geral</h2>
            <div className="grid gap-4 sm:grid-cols-3">
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium">Total de Questionários</CardTitle>
                     <Book className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold">{quizzes.length}</div>
                     <p className="text-xs text-muted-foreground">Questionários criados</p>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium">Média de Acertos</CardTitle>
                     <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold">{averageScore !== null ? `${averageScore}%` : 'N/A'}</div>
                     <p className="text-xs text-muted-foreground">Performance geral</p>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium">Tempo de Estudo</CardTitle>
                     <Clock className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold">{totalStudyTime}</div>
                     <p className="text-xs text-muted-foreground">Total de tempo focado</p>
                  </CardContent>
               </Card>
            </div>
          </section>

          {/* Acesso Rápido */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Acesso Rápido</h2>
            {quizzes.length > 0 ? (
              <div className="grid gap-4">
                {quizzes.map((quiz, index) => (
                    <Card key={index} className="hover:border-primary/80 transition-colors">
                        <Link href={`/simulations/${slugify(quiz.disciplineName)}`} className="block">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-lg">{quiz.disciplineName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {quiz.questions.length} questões ・ Criado em {new Date(quiz.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                                <Trash2 className="h-5 w-5" />
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
                                            <AlertDialogAction onClick={() => handleDeleteQuiz(quiz)} className="bg-destructive hover:bg-destructive/90">
                                            Excluir
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center">
                  <Book className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground">Nenhum questionário aqui ainda</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">
                    Clique em "Criar Novo" para transformar seus PDFs de estudo em questionários interativos e começar a praticar.
                  </p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
