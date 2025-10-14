'use server';

import { 
  recommendExcessCapacity,
  type RecommendExcessCapacityInput,
  type RecommendExcessCapacityOutput,
} from '@/ai/flows/recommend-excess-capacity';

export async function getRecommendation(input: RecommendExcessCapacityInput): Promise<RecommendExcessCapacityOutput> {
  // Here you could add extra validation or data fetching if needed
  // before calling the Genkit flow.

  console.log('Calling recommendExcessCapacity flow with input:', input);

  try {
    const recommendation = await recommendExcessCapacity(input);
    console.log('Flow returned:', recommendation);
    return recommendation;
  } catch (error) {
    console.error("Error calling Genkit flow:", error);
    throw new Error("Failed to get recommendation from AI service.");
  }
}
