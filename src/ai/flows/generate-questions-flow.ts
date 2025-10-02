'use server';
/**
 * @fileOverview Flow para gerar questões de múltipla escolha a partir de um PDF.
 *
 * - generateQuestionsFromPdf - Função que processa o PDF e retorna as questões.
 * - GenerateQuestionsInput - O tipo de entrada para a função.
 * - GenerateQuestionsOutput - O tipo de retorno para a função.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Esquema para uma única questão
const QuestionSchema = z.object({
  id: z.number().describe('ID numérico único para a questão.'),
  topicId: z
    .string()
    .describe(
      'ID do tópico associado à questão (use o nome da disciplina em formato slug).'
    ),
  question: z.string().describe('O texto da pergunta.'),
  options: z
    .array(z.string())
    .describe('Uma lista de opções de resposta (múltipla escolha).'),
  answer: z
    .number()
    .describe('O índice (base 0) da resposta correta na lista de opções.'),
  explanation: z
    .string()
    .describe('Uma breve explicação sobre por que a resposta está correta.'),
});

// Esquema para a entrada do fluxo
const GenerateQuestionsInputSchema = z.object({
  disciplineName: z
    .string()
    .describe('O nome da disciplina para a qual as questões serão geradas.'),
  numberOfQuestions: z
    .number()
    .min(1)
    .max(100)
    .describe('O número total de questões a serem geradas.'),
  pdfDataUri: z
    .string()
    .describe(
      "O conteúdo de um arquivo PDF, como um data URI que deve incluir um MIME type e usar codificação Base64. Formato esperado: 'data:application/pdf;base64,<dados_codificados>'."
    ),
});
export type GenerateQuestionsInput = z.infer<
  typeof GenerateQuestionsInputSchema
>;

// Esquema para a saída do fluxo
const GenerateQuestionsOutputSchema = z.object({
  questions: z
    .array(QuestionSchema)
    .describe('Uma lista de questões de múltipla escolha geradas.'),
});
export type GenerateQuestionsOutput = z.infer<
  typeof GenerateQuestionsOutputSchema
>;

// Função exportada que será chamada pelo componente React
export async function generateQuestionsFromPdf(
  input: GenerateQuestionsInput
): Promise<GenerateQuestionsOutput> {
  return generateQuestionsFromPdfFlow(input);
}

// Definição do prompt do Genkit
const generateQuestionsPrompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: { schema: GenerateQuestionsInputSchema },
  output: { schema: GenerateQuestionsOutputSchema },
  prompt: `
    Você é um assistente especialista em criar material de estudo. Sua tarefa é analisar o conteúdo de um arquivo PDF e gerar um conjunto de questões de múltipla escolha (quizzes) com base nesse conteúdo.

    Disciplina: {{{disciplineName}}}
    Conteúdo do PDF: {{media url=pdfDataUri}}
    Número de questões a serem geradas: {{{numberOfQuestions}}}

    Siga estas regras estritamente:
    1.  Gere exatamente {{{numberOfQuestions}}} questões de múltipla escolha com base no conteúdo fornecido.
    2.  As perguntas devem cobrir diferentes partes do documento. Se o documento for dividido em capítulos ou seções, tente criar um número equilibrado de questões para cada um.
    3.  Cada questão deve ter exatamente 4 opções de resposta.
    4.  Para cada questão, forneça uma explicação clara e concisa para a resposta correta.
    5.  O 'topicId' de cada questão deve ser o nome da disciplina em formato de slug (letras minúsculas, sem espaços, use hífens). Por exemplo, 'Cálculo I' se torna 'calculo-i'.
    6.  Os IDs das questões devem ser numéricos e únicos, começando em 1.
    7.  A resposta ('answer') deve ser o índice (começando em 0) da opção correta.
    8.  Retorne a saída estritamente no formato JSON definido. Não inclua comentários ou qualquer outro texto fora do JSON.
  `,
});

// Definição do fluxo do Genkit
const generateQuestionsFromPdfFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFromPdfFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await generateQuestionsPrompt(input);
    
    // Adiciona uma verificação robusta para a saída
    if (!output || !output.questions || output.questions.length === 0) {
      throw new Error(
        'A geração de questões falhou ou não retornou questões. A IA pode não ter conseguido processar o documento ou aderir ao formato de saída esperado.'
      );
    }
    
    return output;
  }
);
