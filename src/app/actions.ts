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
      userPreferences: 'I prefer visual learning and practical examples.',
    };
    const result = await generateAdaptiveStudyPlan(input);
    return { success: true, plan: result.studyPlan };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate study plan.' };
  }
}
