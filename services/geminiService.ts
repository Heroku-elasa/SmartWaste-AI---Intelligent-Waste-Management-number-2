
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { PROMPTS } from '../constants';
import {
  Language,
  WasteSiteAnalysisInput,
  WasteSiteAnalysisResult,
  Grant,
  GrantSummary,
  EnvironmentalReport,
  NewsSummaryResult,
  RecyclingCalculatorResult,
  ApplicationDraft,
  Supplier,
  ResearchReport,
  WasteAnalysisResult,
  WasteReport,
  WastePrediction,
  DashboardAnalytics,
  ZeroWasteAdviceOutput,
  ContentGenerationResult
} from '../types';

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const startChat = (language: Language): Chat => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: PROMPTS.aiAssistant(language).systemInstruction,
    },
  });
  return chat;
};

// --- New Smart Dashboard Functions ---

export const submitWasteReport = async (
  report: WasteReport,
  language: Language
): Promise<string> => {
    const ai = getAI();
    const prompt = `A user has submitted the following waste report. Please provide a confirmation and analysis message.
    Location: ${report.location}
    Waste Type: ${report.wasteType}
    Volume: ${report.volume}
    Description: ${report.description || 'Not provided'}
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: prompt }] },
        config: {
            systemInstruction: PROMPTS.wasteReportProcessor(language).systemInstruction,
        },
    });
    return response.text;
};

export const predictWasteVolume = async (
  location: string,
  language: Language
): Promise<WastePrediction> => {
    const ai = getAI();
    const schema = {
        type: Type.OBJECT,
        properties: {
            predictionText: { type: Type.STRING },
        },
        required: ['predictionText'],
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: `Generate a waste volume prediction for the area: ${location}` }] },
        config: {
            systemInstruction: PROMPTS.wastePredictor(language).systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: schema,
        },
    });
    return JSON.parse(response.text);
};

export const getDashboardAnalytics = async (
  analytics: Omit<DashboardAnalytics, 'summary'>,
  language: Language
): Promise<DashboardAnalytics> => {
    const ai = getAI();
    const schema = {
        type: Type.OBJECT,
        properties: {
            summary: { type: Type.STRING },
        },
        required: ['summary'],
    };
    
    const prompt = `Generate a performance summary based on these metrics:
    AI Accuracy: ${analytics.aiAccuracy}%
    Today's Reports: ${analytics.todayReports}
    Routing Improvement: ${analytics.routingImprovement}%
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: prompt }] },
        config: {
            systemInstruction: PROMPTS.dashboardAnalyticsGenerator(language).systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: schema,
        },
    });

    const parsedResponse = JSON.parse(response.text);
    return { ...analytics, summary: parsedResponse.summary };
};


// --- Existing Functions ---

export const analyzeWasteImage = async (
  image: { base64: string; mimeType: string; },
  language: Language
): Promise<WasteAnalysisResult> => {
  const ai = getAI();
  const schema = {
    type: Type.OBJECT,
    properties: {
      identifiedItems: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            item: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['Recycling', 'Landfill', 'Compost', 'Special'] },
            instructions: { type: Type.STRING },
          },
          required: ['item', 'category', 'instructions'],
        },
      },
      estimatedWeightKg: { type: Type.NUMBER },
      pickupQuote: { type: Type.NUMBER },
      recyclingPotential: { type: Type.STRING, enum: ['High', 'Medium', 'Low', 'None'] },
    },
    required: ['identifiedItems', 'estimatedWeightKg', 'pickupQuote', 'recyclingPotential'],
  };

  const textPart = { text: "Analyze the attached image of waste. Identify the items, categorize them for disposal, estimate the total weight in kg, and provide a pickup quote based on the weight. The language for the response must be " + (language === 'fa' ? "Persian." : "English.") };
  const imagePart = { inlineData: { data: image.base64, mimeType: image.mimeType } };
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
    config: {
      systemInstruction: PROMPTS.wasteAnalyzer(language).systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text);
};


export const generateWasteSiteAnalysis = async (
  inputs: WasteSiteAnalysisInput,
  language: Language
): Promise<WasteSiteAnalysisResult> => {
  const ai = getAI();

  const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
      binType: { type: Type.STRING },
      binCount: { type: Type.NUMBER },
      reasoning: { type: Type.STRING }
    },
    required: ['binType', 'binCount', 'reasoning']
  };

  const monthlyDataSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: { month: { type: Type.STRING }, value: { type: Type.NUMBER } },
      required: ['month', 'value'],
    },
  };

  const schema = {
    type: Type.OBJECT,
    properties: {
      siteSuitability: { type: Type.STRING },
      estimatedMonthlyDiversion: {
        type: Type.OBJECT,
        properties: {
          total: { type: Type.STRING },
          monthlyBreakdown: monthlyDataSchema,
        },
        required: ['total', 'monthlyBreakdown'],
      },
      potentialAnnualSavings: {
        type: Type.OBJECT,
        properties: {
          total: { type: Type.STRING },
          monthlyBreakdown: monthlyDataSchema,
        },
        required: ['total', 'monthlyBreakdown'],
      },
      recommendations: { type: Type.ARRAY, items: recommendationSchema },
      logisticsConsiderations: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ['siteSuitability', 'estimatedMonthlyDiversion', 'potentialAnnualSavings', 'recommendations', 'logisticsConsiderations']
  };

  let userPromptText = `Location: "${inputs.locationText}".\nProject Description: "${inputs.description}".\n`;
  if (inputs.locationImage) {
    userPromptText += "Additionally, analyze the attached image of the location for optimal bin placement and accessibility.";
  }

  const textPart = { text: userPromptText };
  const parts: ({ text: string; } | { inlineData: { data: string; mimeType: string; }; })[] = [textPart];

  if (inputs.locationImage) {
    const imagePart = {
      inlineData: {
        data: inputs.locationImage.base64,
        mimeType: inputs.locationImage.mimeType,
      },
    };
    parts.unshift(imagePart);
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: parts },
    config: {
      systemInstruction: PROMPTS.wasteSiteAnalysisGenerator(language).systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text);
};

export const findGrants = async (query: string, language: Language): Promise<Grant[]> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: `Find recycling and waste reduction grants related to: ${query}` }] },
        config: {
            systemInstruction: PROMPTS.grantFinder(language).systemInstruction,
            tools: [{ googleSearch: {} }],
        },
    });

    try {
        const text = response.text;
        const jsonStart = text.indexOf('[');
        const jsonEnd = text.lastIndexOf(']');
         if (jsonStart !== -1 && jsonEnd !== -1) {
          const jsonString = text.substring(jsonStart, jsonEnd + 1);
          // Standardize fields to match new Grant interface
          const rawGrants = JSON.parse(jsonString);
          if (!Array.isArray(rawGrants)) return [];
          return rawGrants.map((g: any) => ({
              grantTitle: g.name, // Map name to grantTitle
              fundingBody: g.issuingAgency, // Map issuingAgency to fundingBody
              summary: g.description, // Map description to summary
              link: g.link,
              eligibility: g.eligibility,
              ...g
          }));
        }
        return [];
    } catch (e) {
        console.error("Failed to parse JSON from findGrants:", response.text);
        return [];
    }
};

export interface GrantResult {
    text: string;
}

export const findGrantsRaw = async (prompt: string): Promise<GrantResult> => {
    const ai = getAI();
    // This uses the prompt constructed by the component, which asks for a Markdown table.
    // We do NOT set responseMimeType to JSON here.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: prompt }] },
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    return { text: response.text || '' };
};

export const analyzeGrant = async (grant: Grant, context: string, language: Language): Promise<GrantSummary> => {
    const ai = getAI();
    const schema = {
        type: Type.OBJECT,
        properties: {
            grantTitle: { type: Type.STRING },
            relevancePercentage: { type: Type.NUMBER },
            fundingBody: { type: Type.STRING },
            deadline: { type: Type.STRING },
            amount: { type: Type.STRING },
            duration: { type: Type.STRING },
            geography: { type: Type.STRING },
            eligibility: { type: Type.STRING },
            scope: { type: Type.STRING },
            howToApply: { type: Type.STRING },
            contact: { type: Type.STRING },
        },
        required: ['grantTitle', 'relevancePercentage', 'fundingBody', 'deadline', 'amount', 'eligibility', 'scope', 'howToApply']
    };

    const prompt = `Analyze this grant opportunity based on the following details and context.
    
    Grant Details:
    Title: ${grant.grantTitle || grant.name}
    URL: ${grant.link}
    Summary: ${grant.summary || grant.description}
    
    User Context/Project: ${context || 'General waste management and recycling project.'}
    
    Provide a structured summary evaluating its relevance, key requirements, and details.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: prompt }] },
        config: {
            responseMimeType: 'application/json',
            responseSchema: schema,
            tools: [{ googleSearch: {} }], // Enable search to get more details about the grant from the link
        },
    });

    return JSON.parse(response.text);
};

export const findSuppliers = async (query: string, language: Language): Promise<Supplier[]> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: `Find suppliers for: ${query}` }] },
        config: {
            systemInstruction: PROMPTS.supplierFinder(language).systemInstruction,
            tools: [{ googleSearch: {} }],
        },
    });

    try {
        const text = response.text;
        const jsonStart = text.indexOf('[');
        const jsonEnd = text.lastIndexOf(']');
         if (jsonStart !== -1 && jsonEnd !== -1) {
          const jsonString = text.substring(jsonStart, jsonEnd + 1);
          const results = JSON.parse(jsonString);
          if (!Array.isArray(results)) return [];
          return results;
        }
        return [];
    } catch (e) {
        console.error("Failed to parse JSON from findSuppliers:", response.text);
        return [];
    }
};

export const generateApplicationDraft = async (projectDescription: string, grant: Grant, language: Language): Promise<ApplicationDraft> => {
    const ai = getAI();
    const schema = {
        type: Type.OBJECT,
        properties: {
            businessPlanOutline: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        section: { type: Type.STRING },
                        content: { type: Type.STRING },
                    },
                    required: ['section', 'content'],
                },
            },
            applicationSections: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        sectionTitle: { type: Type.STRING },
                        draftedContent: { type: Type.STRING },
                    },
                    required: ['sectionTitle', 'draftedContent'],
                },
            },
            nextSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
            },
        },
        required: ['businessPlanOutline', 'applicationSections', 'nextSteps'],
    };

    const prompt = `
        Project Description: "${projectDescription}"
        
        Target Grant Details:
        - Name: ${grant.grantTitle || grant.name}
        - Agency: ${grant.fundingBody || grant.issuingAgency}
        - Description: ${grant.summary || grant.description}
        - Eligibility: ${grant.eligibility}
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: prompt }] },
        config: {
            systemInstruction: PROMPTS.applicationDrafter(language).systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: schema,
        },
    });

    return JSON.parse(response.text);
};

export const generateImpactReport = async (description: string, language: Language): Promise<EnvironmentalReport> => {
  const ai = getAI();
  const schema = {
    type: Type.OBJECT,
    properties: {
      executiveSummary: { type: Type.STRING },
      positiveImpacts: { type: Type.ARRAY, items: { type: Type.STRING } },
      potentialRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
      mitigationStrategies: { type: Type.ARRAY, items: { type: Type.STRING } },
      sustainabilityScore: { type: Type.NUMBER },
    },
    required: ['executiveSummary', 'positiveImpacts', 'potentialRisks', 'mitigationStrategies', 'sustainabilityScore']
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ text: description }] },
    config: {
      systemInstruction: PROMPTS.impactReportGenerator(language).systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text);
};


export const summarizeNews = async (query: string, language: Language): Promise<NewsSummaryResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: { parts: [{ text: query }] },
    config: {
      systemInstruction: PROMPTS.newsSummarizer(language).systemInstruction,
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text;
  
  const summaryMatch = text.split(/suggested topics:|related topics:|suggested queries:/i);
  const summary = summaryMatch[0].trim();
  const suggestedQueries = summaryMatch[1] ? summaryMatch[1].split('\n').map(q => q.replace(/^- /, '').trim()).filter(Boolean) : [];

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map(chunk => chunk.web)
    .filter((web): web is { uri: string; title?: string } => !!web?.uri)
    .filter((web, index, self) => self.findIndex(w => w.uri === web.uri) === index)
    .map(web => ({
      uri: web.uri,
      title: web.title || web.uri,
    })) || [];
  
  return { summary, sources, suggestedQueries };
};

export const conductDeepResearch = async (query: string, language: Language): Promise<ResearchReport> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: { parts: [{ text: query }] },
    config: {
      systemInstruction: PROMPTS.aiResearcher(language).systemInstruction,
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text;
  
  let parsedJson;
  try {
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
          const jsonString = text.substring(jsonStart, jsonEnd + 1);
          parsedJson = JSON.parse(jsonString);
      } else {
          throw new Error("Could not find a valid JSON object in the response.");
      }
  } catch (e) {
      console.error("Failed to parse JSON from conductDeepResearch:", text);
      throw new Error("The research model returned an invalid format.");
  }
  
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map(chunk => chunk.web)
    .filter((web): web is { uri: string; title?: string } => !!web?.uri)
    .filter((web, index, self) => self.findIndex(w => w.uri === web.uri) === index)
    .map(web => ({
      uri: web.uri,
      title: web.title || web.uri,
    })) || [];
  
  return { ...parsedJson, sources };
};

export const calculateRecyclingValue = async (monthlyWasteTonnes: number, language: Language): Promise<RecyclingCalculatorResult> => {
    const ai = getAI();
    const schema = {
        type: Type.OBJECT,
        properties: {
            annualLandfillFeeSavings: { type: Type.NUMBER },
            annualRecyclingRevenue: { type: Type.NUMBER },
            totalAnnualBenefit: { type: Type.NUMBER },
            notes: { type: Type.STRING },
        },
        required: ['annualLandfillFeeSavings', 'annualRecyclingRevenue', 'totalAnnualBenefit', 'notes']
    };

    const prompt = `Calculate the financial benefits of recycling for a user with an average monthly waste volume of ${monthlyWasteTonnes} tonnes.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: prompt }] },
        config: {
            systemInstruction: PROMPTS.recyclingCalculator(language).systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: schema,
        },
    });

    return JSON.parse(response.text);
};


// --- Zero Waste Page Functions ---

export const getZeroWasteAdvice = async (
  question: string,
  language: Language
): Promise<ZeroWasteAdviceOutput> => {
  const ai = getAI();
  const schema = {
    type: Type.OBJECT,
    properties: {
      summary: { type: Type.STRING },
      tips: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ["very-easy", "easy", "medium", "hard"] },
            estimatedCost: { type: Type.STRING, enum: ["no-cost", "low", "medium", "high"] }
          },
          required: ["title", "description", "difficulty", "estimatedCost"]
        }
      }
    },
    required: ["summary", "tips"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ text: question }] },
    config: {
      systemInstruction: PROMPTS.zeroWasteCoach(language).systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text);
};


export const generateEcoContent = async (
  topic: string,
  format: 'YouTube' | 'Book',
  language: Language
): Promise<ContentGenerationResult> => {
  const ai = getAI();
  const schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      platform: { type: Type.STRING, enum: ["YouTube", "Book"] },
      content: { type: Type.STRING },
      monetizationTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["title", "platform", "content", "monetizationTips"]
  };

  const prompt = `Topic: "${topic}". Desired Format: "${format}".`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ text: prompt }] },
    config: {
      systemInstruction: PROMPTS.ecoContentCreator(language).systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text);
};
