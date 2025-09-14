'use server';

/**
 * @fileOverview Generates adaptive study plans based on user performance data.
 *
 * - generateAdaptiveStudyPlan - A function that generates a personalized study plan.
 * - AdaptiveStudyPlanInput - The input type for the generateAdaptiveStudyPlan function.
 * - AdaptiveStudyPlanOutput - The return type for the generateAdaptiveStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveStudyPlanInputSchema = z.object({
  topicPerformance: z
    .record(z.number())
    .describe(
      'Um registro do desempenho do usuário em cada tópico. As chaves são os nomes dos tópicos e os valores são a porcentagem de respostas corretas (0-100).'
    ),
  userPreferences: z
    .string()
    .optional()
    .describe('Preferências opcionais sobre o plano de estudo.'),
});
export type AdaptiveStudyPlanInput = z.infer<typeof AdaptiveStudyPlanInputSchema>;

const AdaptiveStudyPlanOutputSchema = z.object({
  studyPlan: z
    .string()
    .describe(
      'Um plano de estudo personalizado em formato de texto. Use markdown para formatar o plano, incluindo títulos para seções e listas de itens para recomendações. O plano deve ser acionável e claro.'
    ),
});
export type AdaptiveStudyPlanOutput = z.infer<typeof AdaptiveStudyPlanOutputSchema>;

export async function generateAdaptiveStudyPlan(
  input: AdaptiveStudyPlanInput
): Promise<AdaptiveStudyPlanOutput> {
  return adaptiveStudyPlanFlow(input);
}

const adaptiveStudyPlanPrompt = ai.definePrompt({
  name: 'adaptiveStudyPlanPrompt',
  input: {schema: AdaptiveStudyPlanInputSchema},
  output: {schema: AdaptiveStudyPlanOutputSchema},
  prompt: `Você é um tutor de IA especialista em certificações de rede. Seu objetivo é gerar um plano de estudo detalhado e acionável com base no desempenho do usuário.

O desempenho do usuário em cada tópico (porcentagem de respostas corretas) é:
{{#each topicPerformance}}
- {{this.[0]}}: {{this.[1]}}%
{{/each}}

Crie um plano de estudo personalizado com base nestas regras:
- Se a pontuação for < 50%: Recomende focar nos conceitos teóricos fundamentais e fazer exercícios de fixação.
- Se a pontuação estiver entre 50% e 80%: Sugira uma revisão dos pontos fracos e mais simulados práticos.
- Se a pontuação for > 80%: Desafie o usuário com questões avançadas e cenários complexos.

Considere as preferências do usuário: "{{userPreferences}}".

Formate o plano de estudo usando markdown. Deve ser fácil de ler e seguir. Use títulos (###) para cada tópico e listas com marcadores (-) para as recomendações. Comece com um resumo geral e depois detalhe cada tópico.
`,
});

const adaptiveStudyPlanFlow = ai.defineFlow(
  {
    name: 'adaptiveStudyPlanFlow',
    inputSchema: AdaptiveStudyPlanInputSchema,
    outputSchema: AdaptiveStudyPlanOutputSchema,
  },
  async input => {
    // Convert object to array of tuples for Handlebars
    const topicPerformanceArray = Object.entries(input.topicPerformance);

    const {output} = await adaptiveStudyPlanPrompt({
      ...input,
      topicPerformance: topicPerformanceArray as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    });

    return output!;
  }
);
