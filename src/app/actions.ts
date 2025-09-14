// @ts-nocheck
'use server';

import {
  generateAdaptiveStudyPlan,
  type AdaptiveStudyPlanInput,
} from '@/ai/flows/adaptive-study-plan-generation';
import { userPerformance } from '@/lib/data';

export async function getStudyPlanAction(currentPerformance: Record<string, number>) {
  try {
    const input: AdaptiveStudyPlanInput = {
      topicPerformance: currentPerformance,
      userPreferences: 'Prefiro aprendizado visual e exemplos práticos.',
    };
    const result = await generateAdaptiveStudyPlan(input);
    return { success: true, plan: result.studyPlan };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Falha ao gerar o plano de estudo.' };
  }
}
