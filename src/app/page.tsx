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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { generateQuestionsFromPdf } from '@/ai/flows/generate-questions-flow';

export default function NovaDisciplinaPage() {
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
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Criar Nova Disciplina</CardTitle>
          <CardDescription>
            Dê um nome para a nova disciplina e faça o upload de um arquivo PDF. O conteúdo será usado para gerar questões de múltipla escolha automaticamente.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Gerando Questões...' : 'Gerar Questões'}
            </Button>
            {generatedQuestions && (
              <div className="w-full space-y-2">
                <Label htmlFor="generated-questions">JSON Gerado</Label>
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
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
