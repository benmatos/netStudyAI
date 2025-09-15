'use client';

import { useState } from 'react';
import MainLayout from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Question } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const jsonFormatExample = `[
  {
    "id": 111,
    "topicId": "conceitos-basicos",
    "question": "Sua nova pergunta aqui...",
    "options": [
      "Opção A",
      "Opção B",
      "Opção C",
      "Opção D"
    ],
    "answer": 0,
    "explanation": "A explicação para a resposta correta."
  }
]`;

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState('');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.json')) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
          setFileContent(event.target?.result as string);
        };
        reader.readAsText(selectedFile);
      } else {
        toast({
          variant: 'destructive',
          title: 'Formato de Arquivo Inválido',
          description: 'Por favor, selecione um arquivo .json.',
        });
        setFile(null);
        setFileContent('');
      }
    }
  };

  const handleSubmit = () => {
    if (!file || !fileContent) {
      toast({
        variant: 'destructive',
        title: 'Nenhum Arquivo Selecionado',
        description: 'Por favor, escolha um arquivo JSON para enviar.',
      });
      return;
    }

    try {
      const newQuestions: Question[] = JSON.parse(fileContent);

      if (!Array.isArray(newQuestions) || newQuestions.length === 0) {
        throw new Error('O JSON deve ser um array de questões e não pode estar vazio.');
      }
      
      // Validação básica da estrutura da questão
      for (const q of newQuestions) {
          if (
            typeof q.id !== 'number' ||
            typeof q.topicId !== 'string' ||
            typeof q.question !== 'string' ||
            !Array.isArray(q.options) ||
            typeof q.answer !== 'number' ||
            typeof q.explanation !== 'string'
          ) {
              throw new Error(`A questão com ID ${q.id} tem um formato inválido.`);
          }
      }

      const existingQuestions: Question[] = JSON.parse(localStorage.getItem('customQuestions') || '[]');
      
      const questionsToAd = newQuestions.filter(newQ => !existingQuestions.some(existingQ => existingQ.id === newQ.id));

      const updatedQuestions = [...existingQuestions, ...questionsToAd];
      
      localStorage.setItem('customQuestions', JSON.stringify(updatedQuestions));

      toast({
        title: 'Sucesso!',
        description: `${questionsToAd.length} novas questões foram adicionadas com sucesso.`,
      });

      setFile(null);
      setFileContent('');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu.';
      toast({
        variant: 'destructive',
        title: 'Erro ao Processar o Arquivo',
        description: `Verifique o formato do seu JSON. Erro: ${errorMessage}`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Upload de Novas Questões</h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Adicione suas próprias questões aos simulados enviando um arquivo JSON.
      </p>

      <div className="grid gap-8 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enviar Arquivo</CardTitle>
            <CardDescription>Selecione o arquivo .json contendo as novas questões.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="json-upload">Arquivo JSON</Label>
              <Input id="json-upload" type="file" accept=".json" onChange={handleFileChange} />
            </div>
            {fileContent && (
              <div className="space-y-2">
                <Label htmlFor="file-content">Conteúdo do Arquivo</Label>
                <Textarea
                  id="file-content"
                  readOnly
                  value={fileContent}
                  rows={10}
                  className="font-code text-xs"
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={!file}>
              Enviar Questões
            </Button>
          </CardFooter>
        </Card>

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Formato do JSON</AlertTitle>
          <AlertDescription>
            <p className="mb-4">
              Seu arquivo deve ser um array de objetos, onde cada objeto representa uma questão. Siga o formato abaixo:
            </p>
            <pre className="p-4 bg-muted rounded-md text-xs overflow-x-auto">
              <code>{jsonFormatExample}</code>
            </pre>
             <p className="mt-4 text-sm">
              <strong>Importante:</strong>
             </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>O campo <code>id</code> deve ser um número único para cada questão.</li>
                <li>O campo <code>topicId</code> deve corresponder a um dos IDs de tópico existentes (ex: "conceitos-basicos").</li>
                 <li>Questões com um <code>id</code> que já existe no sistema não serão adicionadas novamente.</li>
              </ul>
          </AlertDescription>
        </Alert>
      </div>
    </MainLayout>
  );
}
