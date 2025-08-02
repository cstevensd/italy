
import { GoogleGenAI, Type } from "@google/genai";
import { DestinationGuideData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const guideSchema = {
    type: Type.OBJECT,
    properties: {
        overview: {
            type: Type.STRING,
            description: "A brief, engaging description of the city or region, capturing its essence and what it's known for. Should be 2-3 sentences long."
        },
        placesToVisit: {
            type: Type.ARRAY,
            description: "A list of 3-5 key attractions or points of interest. For each place, provide its name and a direct Google Maps URL.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING,
                        description: "Name of the attraction or point of interest."
                    },
                    googleMapsUrl: {
                        type: Type.STRING,
                        description: "A valid, direct Google Maps URL for the location of the attraction."
                    }
                },
                required: ["name", "googleMapsUrl"]
            }
        },
        thingsToDo: {
            type: Type.ARRAY,
            description: "A list of 3-5 recommended activities based on the provided interests. These should be actionable suggestions like 'Explore the Uffizi Gallery for Renaissance art' or 'Hike the trails between the villages of Cinque Terre'.",
            items: { type: Type.STRING }
        },
        localTips: {
            type: Type.ARRAY,
            description: "A list of 2-3 practical tips for tourists. For specific places mentioned (like a highly-rated restaurant or shop), include its name and a direct Google Maps URL.",
            items: {
                type: Type.OBJECT,
                properties: {
                    description: {
                        type: Type.STRING,
                        description: "The full description of the local tip (e.g., 'For authentic gelato, avoid brightly colored mounds and seek out places using natural ingredients.'). If recommending a specific place, mention it here."
                    },
                    name: {
                        type: Type.STRING,
                        description: "The official name of the recommended place (e.g., 'Giolitti'). This is optional."
                    },
                    googleMapsUrl: {
                        type: Type.STRING,
                        description: "A valid, direct Google Maps URL for the recommended place. This is optional."
                    }
                },
                required: ["description"]
            }
        },
    },
    required: ["overview", "placesToVisit", "thingsToDo", "localTips"],
};

export const generateDestinationGuide = async (cityName: string): Promise<DestinationGuideData> => {
    const prompt = `Generate a concise travel guide for ${cityName}, Italy. The guide should be tailored for tourists interested in history, art, architecture, food, hiking, and exploring. Provide an overview, key places to visit (with Google Maps links), suggested activities, and some local tips including links to specific recommended venues (like restaurants or historical sites) where applicable.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: guideSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        return parsedData as DestinationGuideData;

    } catch (error) {
        console.error(`Error generating guide for ${cityName}:`, error);
        throw new Error(`Failed to generate guide for ${cityName}. Please check your API key and network connection.`);
    }
};