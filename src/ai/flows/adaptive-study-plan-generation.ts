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
  studyPlan: z.string().describe('Um plano de estudo personalizado.'),
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
  prompt: `Você é um gerador de planos de estudo de IA. Seu objetivo é gerar planos de estudo com base no desempenho do usuário em exames práticos.

Aqui está o desempenho do usuário em cada tópico (porcentagem de respostas corretas):

{{#each (lookup topicPerformance)}}
  {{@key}}: {{this}}%
{{/each}}

Com base nessas informações, crie um plano de estudo personalizado. Se a pontuação do usuário for inferior a 50% em um tópico, recomende focar na teoria e em exercícios extras. Se a pontuação estiver entre 50% e 80%, sugira revisão e prática. Se a pontuação for superior a 80%, recomende questões avançadas.

Certifique-se de que o plano de estudo seja adaptado às áreas fracas do usuário. Considere suas preferências, se houver: {{userPreferences}}.

Produza o plano de estudo como uma única string.
`,
});

const adaptiveStudyPlanFlow = ai.defineFlow(
  {
    name: 'adaptiveStudyPlanFlow',
    inputSchema: AdaptiveStudyPlanInputSchema,
    outputSchema: AdaptiveStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await adaptiveStudyPlanPrompt(input);
    return output!;
  }
);
