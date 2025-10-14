'use server';

/**
 * @fileOverview Recommends optimal excess solar capacity metrics for sellers using generative AI.
 *
 * - recommendExcessCapacity - A function that suggests optimal excess solar capacity metrics.
 * - RecommendExcessCapacityInput - The input type for the recommendExcessCapacity function.
 * - RecommendExcessCapacityOutput - The return type for the recommendExcessCapacity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendExcessCapacityInputSchema = z.object({
  weatherData: z.string().describe('Historical and current weather data including sunshine hours, cloud cover, and temperature.'),
  solarProductionData: z.string().describe('Data on solar panel production, capacity, and efficiency.'),
  location: z.string().describe('The geographical location for which to recommend excess capacity metrics.'),
});
export type RecommendExcessCapacityInput = z.infer<typeof RecommendExcessCapacityInputSchema>;

const RecommendExcessCapacityOutputSchema = z.object({
  recommendedExcessCapacity: z.number().describe('The recommended excess solar capacity in kWh.'),
  justification: z.string().describe('A detailed justification for the recommended capacity based on the input data.'),
});
export type RecommendExcessCapacityOutput = z.infer<typeof RecommendExcessCapacityOutputSchema>;

export async function recommendExcessCapacity(input: RecommendExcessCapacityInput): Promise<RecommendExcessCapacityOutput> {
  return recommendExcessCapacityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendExcessCapacityPrompt',
  input: {schema: RecommendExcessCapacityInputSchema},
  output: {schema: RecommendExcessCapacityOutputSchema},
  prompt: `You are an expert in renewable energy and solar panel efficiency. Analyze the following weather and solar production data for the given location to recommend an optimal excess solar capacity metric for sellers.

Location: {{{location}}}
Weather Data: {{{weatherData}}}
Solar Production Data: {{{solarProductionData}}}

Consider factors like seasonal variations, average sunshine hours, panel efficiency, and typical energy consumption patterns in the area.

Provide a recommended excess solar capacity in kWh and a detailed justification for your recommendation.

Ensure the recommended capacity is accurate and appealing to potential buyers, encouraging them to subscribe to the seller's excess solar energy.

Output format: {
  "recommendedExcessCapacity": "<capacity_in_kWh>",
  "justification": "<detailed_justification>"
}`,
});

const recommendExcessCapacityFlow = ai.defineFlow(
  {
    name: 'recommendExcessCapacityFlow',
    inputSchema: RecommendExcessCapacityInputSchema,
    outputSchema: RecommendExcessCapacityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
