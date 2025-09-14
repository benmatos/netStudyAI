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
      'A record of the user performance on each topic. The keys are the topic names and the values are the percentage of correct answers (0-100).'
    ),
  userPreferences: z
    .string()
    .optional()
    .describe('Optional preferences about the study plan.'),
});
export type AdaptiveStudyPlanInput = z.infer<typeof AdaptiveStudyPlanInputSchema>;

const AdaptiveStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A personalized study plan.'),
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
  prompt: `You are an AI study plan generator. Your goal is to generate study plans based on the user's performance on practice exams.

Here is the user's performance on each topic (percentage of correct answers):

{{#each (lookup topicPerformance)}}
  {{@key}}: {{this}}%
{{/each}}

Based on this information, create a personalized study plan. If the user's score is less than 50% in a topic, recommend focusing on theory and extra exercises. If the score is between 50% and 80%, suggest revision and practice. If the score is greater than 80%, recommend advanced questions.

Make sure the study plan is tailored to the user's weak areas. Consider their preferences, if any: {{userPreferences}}.

Output the study plan as a single string.
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
