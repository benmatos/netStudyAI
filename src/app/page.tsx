'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { generateQuestionsFromPdf, GenerateQuestionsOutput } from '@/ai/flows/generate-questions-flow';
import { PlusCircle } from 'lucide-react';

interface StoredQuiz {
  disciplineName: string;
  questions: GenerateQuestionsOutput['questions'];
  createdAt: string;
}

function CreateQuizForm({ onQuizCreated }: { onQuizCreated: (newQuiz: StoredQuiz) => void }) {
  const [disciplineName, setDisciplineName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError('Por favor, preencha o nome da disciplina e selecione um arquivo.');
      return;
    }

    setIsLoading(true);
    setGeneratedQuestions('');
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const pdfDataUri = reader.result as string;
        try {
          const result = await generateQuestionsFromPdf({
            disciplineName,
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
          setGeneratedQuestions(JSON.stringify(result.questions, null, 2));
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
      
      <div className="flex flex-col items-start gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Gerando Questões...' : 'Gerar Questões'}
        </Button>
        {generatedQuestions && (
          <div className="w-full space-y-2">
            <Label htmlFor="generated-questions">JSON Gerado (Salvo Localmente)</Label>
            <Textarea
              id="generated-questions"
              className="h-64 font-mono"
              value={generatedQuestions}
              readOnly
            />
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(generatedQuestions)}>
                Copiar JSON
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}


export default function HomePage() {
  const [quizzes, setQuizzes] = useState<StoredQuiz[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    setQuizzes(storedQuizzes);
  }, []);

  const handleQuizCreated = (newQuiz: StoredQuiz) => {
    setQuizzes(prevQuizzes => [...prevQuizzes, newQuiz]);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Meus Questionários</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie seus questionários gerados.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              Criar Novo Questionário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Disciplina</DialogTitle>
              <DialogDescription>
                Dê um nome para a nova disciplina e faça o upload de um arquivo PDF. O conteúdo será usado para gerar questões de múltipla escolha automaticamente.
              </DialogDescription>
            </DialogHeader>
            <CreateQuizForm onQuizCreated={handleQuizCreated} />
          </DialogContent>
        </Dialog>
      </div>

      {isClient && quizzes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{quiz.disciplineName}</CardTitle>
                <CardDescription>
                  Criado em: {new Date(quiz.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{quiz.questions.length} questões</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
         isClient && (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h2 className="text-xl font-semibold text-muted-foreground">Nenhum questionário encontrado</h2>
                <p className="text-muted-foreground mt-2">Clique em "Criar Novo Questionário" para começar.</p>
            </div>
         )
      )}
    </main>
  );
}