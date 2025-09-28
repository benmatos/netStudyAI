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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { generateQuestionsFromPdf, GenerateQuestionsOutput } from '@/ai/flows/generate-questions-flow';
import { ArrowRight, Book, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface StoredQuiz {
  disciplineName: string;
  questions: GenerateQuestionsOutput['questions'];
  createdAt: string;
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
        <Button size="lg">
          <PlusCircle className="mr-2" />
          Criar Novo Questionário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Novo Questionário</DialogTitle>
          <DialogDescription>
            Preencha os detalhes e faça o upload de um arquivo PDF. O conteúdo será usado para gerar questões automaticamente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discipline-name">Nome da Disciplina</Label>
            <Input
              id="discipline-name"
              placeholder="Ex: Cálculo I"
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
              min="1"
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
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          
          <div className="flex justify-end gap-4">
             <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button type="submit" disabled={isLoading}>
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
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]').sort(
        (a: StoredQuiz, b: StoredQuiz) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setQuizzes(storedQuizzes);
  }, []);

  const handleQuizCreated = (newQuiz: StoredQuiz) => {
    setQuizzes(prevQuizzes => [newQuiz, ...prevQuizzes]);
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const recentQuizzes = quizzes.slice(0, 4);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo do seu progresso.
          </p>
        </div>
        <CreateQuizForm onQuizCreated={handleQuizCreated} />
      </div>

      {isClient && (
        <div className="grid gap-8">
          {/* Visão Geral */}
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-3">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Book className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Questionários</p>
                  <p className="text-2xl font-bold">{quizzes.length}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Média de Acertos</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tempo de Estudo</p>
                  <p className="text-2xl font-bold">12h 30m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acesso Rápido */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Acesso Rápido</h2>
            {quizzes.length > 0 ? (
              <div className="grid gap-4">
                {recentQuizzes.map((quiz, index) => (
                  <Link key={index} href={`/simulations/${slugify(quiz.disciplineName)}`} passHref>
                     <Card className="hover:border-primary transition-all">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{quiz.disciplineName}</p>
                          <p className="text-sm text-muted-foreground">
                            {quiz.questions.length} questões ・ Criado em {new Date(quiz.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <ArrowRight className="text-muted-foreground h-5 w-5" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed rounded-lg">
                  <h2 className="text-xl font-semibold text-muted-foreground">Nenhum questionário encontrado</h2>
                  <p className="text-muted-foreground mt-2">Clique em "Criar Novo Questionário" para começar sua jornada de estudos.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
