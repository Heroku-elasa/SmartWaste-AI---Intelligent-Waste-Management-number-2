
import { 
    Language,
    WasteReport, 
    WastePrediction, 
    DashboardAnalytics, 
    WasteAnalysisResult, 
    WasteSiteAnalysisInput, 
    WasteSiteAnalysisResult,
    Grant,
    GrantSummary,
    Supplier,
    ApplicationDraft,
    EnvironmentalReport,
    NewsSummaryResult,
    ResearchReport,
    RecyclingCalculatorResult,
    ZeroWasteAdviceOutput,
    ContentGenerationResult,
    Message
} from '../types';
import { PROMPTS } from '../constants';

let openRouterApiKey: string | null = null;
const SITE_URL = window.location.origin;
const SITE_NAME = "Satlineh Smart Waste";

export const setApiKey = (key: string) => {
    openRouterApiKey = key;
};

const callOpenRouter = async (
    messages: any[], 
    model: string = 'google/gemini-2.0-flash-001',
    responseFormat?: any
) => {
    if (!openRouterApiKey) {
        throw new Error("OpenRouter API Key not set.");
    }

    const headers = {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
    };

    const body: any = {
        model,
        messages,
    };

    if (responseFormat) {
        body.response_format = responseFormat;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenRouter Error ${response.status}: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
};

// --- Chat ---
export const startChat = (language: Language) => {
    // OpenRouter doesn't support stateful chat objects like Google SDK. 
    // We return a mock object that mimics the interface used in App.tsx
    return {
        sendMessageStream: async ({ message }: { message: string }) => {
            // NOTE: For simplicity in this fallback, we won't implement actual streaming 
            // but return an async generator that yields the full response once.
            // App.tsx expects: for await (const chunk of stream) { chunk.text }
            
            const system = PROMPTS.aiAssistant(language).systemInstruction;
            const messages = [
                { role: 'system', content: system },
                { role: 'user', content: message } // Note: Real chat history needs to be managed in App.tsx for this to work perfectly stateless
            ];

            const text = await callOpenRouter(messages);
            
            async function* generator() {
                yield { text };
            }
            return generator();
        }
    };
};

// --- Helpers to force JSON ---
const getJsonPrompt = (schema: any) => `\n\nIMPORTANT: Respond strictly with valid JSON matching this schema: ${JSON.stringify(schema)}. Do not include Markdown formatting like \`\`\`json.`;

// --- Service Functions ---

export const submitWasteReport = async (report: WasteReport, language: Language): Promise<string> => {
    const system = PROMPTS.wasteReportProcessor(language).systemInstruction;
    const prompt = `Location: ${report.location}, Type: ${report.wasteType}, Volume: ${report.volume}, Desc: ${report.description || 'N/A'}`;
    return callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);
};

export const predictWasteVolume = async (location: string, language: Language): Promise<WastePrediction> => {
    const system = PROMPTS.wastePredictor(language).systemInstruction;
    const schema = { predictionText: "string" };
    const prompt = `Generate prediction for: ${location}. ${getJsonPrompt(schema)}`;
    
    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ], 'google/gemini-2.0-flash-001', { type: "json_object" });
    
    return JSON.parse(text);
};

export const getDashboardAnalytics = async (analytics: any, language: Language): Promise<DashboardAnalytics> => {
    const system = PROMPTS.dashboardAnalyticsGenerator(language).systemInstruction;
    const schema = { summary: "string" };
    const prompt = `Metrics: AI Accuracy ${analytics.aiAccuracy}%, Reports ${analytics.todayReports}, Routing ${analytics.routingImprovement}%. ${getJsonPrompt(schema)}`;
    
    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ], 'google/gemini-2.0-flash-001', { type: "json_object" });
    
    const res = JSON.parse(text);
    return { ...analytics, summary: res.summary };
};

export const analyzeWasteImage = async (image: { base64: string; mimeType: string; }, language: Language): Promise<WasteAnalysisResult> => {
    const system = PROMPTS.wasteAnalyzer(language).systemInstruction;
    const schema = {
        identifiedItems: [{ item: "string", category: "Recycling|Landfill|Compost|Special", instructions: "string" }],
        estimatedWeightKg: 0,
        pickupQuote: 0,
        recyclingPotential: "High|Medium|Low"
    };
    
    const content = [
        { type: "text", text: `Analyze waste. ${getJsonPrompt(schema)}` },
        { type: "image_url", image_url: { url: `data:${image.mimeType};base64,${image.base64}` } }
    ];

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content }
    ], 'openai/gpt-4o-mini'); // gpt-4o-mini is good for vision

    return JSON.parse(text.replace(/```json|```/g, '').trim());
};

export const generateWasteSiteAnalysis = async (inputs: WasteSiteAnalysisInput, language: Language): Promise<WasteSiteAnalysisResult> => {
    const system = PROMPTS.wasteSiteAnalysisGenerator(language).systemInstruction;
    const schema = {
        siteSuitability: "string",
        estimatedMonthlyDiversion: { total: "string", monthlyBreakdown: [{ month: "string", value: 0 }] },
        potentialAnnualSavings: { total: "string", monthlyBreakdown: [{ month: "string", value: 0 }] },
        recommendations: [{ binType: "string", binCount: 0, reasoning: "string" }],
        logisticsConsiderations: ["string"]
    };

    const userContent: any[] = [{ type: "text", text: `Location: ${inputs.locationText}. Desc: ${inputs.description}. ${getJsonPrompt(schema)}` }];
    
    if (inputs.locationImage) {
        userContent.push({ type: "image_url", image_url: { url: `data:${inputs.locationImage.mimeType};base64,${inputs.locationImage.base64}` } });
    }

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: userContent }
    ], 'openai/gpt-4o-mini');

    return JSON.parse(text.replace(/```json|```/g, '').trim());
};

export const findGrants = async (query: string, language: Language): Promise<Grant[]> => {
    // OpenRouter doesn't support Google Search grounding natively in the same way.
    // We will simulate a standard generation.
    const system = PROMPTS.grantFinder(language).systemInstruction;
    const schema = [{ grantTitle: "string", fundingBody: "string", summary: "string", link: "string", eligibility: "string", amount: "string", geography: "string" }];
    const prompt = `Find grants for: ${query}. ${getJsonPrompt(schema)}`;

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ], 'google/gemini-2.0-flash-001'); // Using gemini via openrouter might have up to date info

    try {
        return JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch {
        return [];
    }
};

export const findGrantsRaw = async (prompt: string): Promise<{ text: string }> => {
    const text = await callOpenRouter([
        { role: 'user', content: prompt }
    ]);
    return { text };
};

export const analyzeGrant = async (grant: Grant, context: string, language: Language): Promise<GrantSummary> => {
    const schema = {
        grantTitle: "string", relevancePercentage: 0, fundingBody: "string", deadline: "string", amount: "string", duration: "string", geography: "string", eligibility: "string", scope: "string", howToApply: "string", contact: "string"
    };
    const prompt = `Analyze grant: ${grant.grantTitle} (${grant.link}). Context: ${context}. ${getJsonPrompt(schema)}`;
    
    const text = await callOpenRouter([
        { role: 'user', content: prompt }
    ], 'google/gemini-2.0-flash-001');

    return JSON.parse(text.replace(/```json|```/g, '').trim());
};

export const findSuppliers = async (query: string, language: Language): Promise<Supplier[]> => {
    const system = PROMPTS.supplierFinder(language).systemInstruction;
    const schema = [{ name: "string", description: "string", websiteUrl: "string" }];
    const prompt = `Find suppliers for: ${query}. ${getJsonPrompt(schema)}`;

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);

    try {
        return JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch {
        return [];
    }
};

export const generateApplicationDraft = async (desc: string, grant: Grant, language: Language): Promise<ApplicationDraft> => {
    const system = PROMPTS.applicationDrafter(language).systemInstruction;
    const schema = {
        businessPlanOutline: [{ section: "string", content: "string" }],
        applicationSections: [{ sectionTitle: "string", draftedContent: "string" }],
        nextSteps: ["string"]
    };
    const prompt = `Project: ${desc}. Grant: ${grant.grantTitle}. ${getJsonPrompt(schema)}`;

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);

    return JSON.parse(text.replace(/```json|```/g, '').trim());
};

export const generateImpactReport = async (desc: string, language: Language): Promise<EnvironmentalReport> => {
    const system = PROMPTS.impactReportGenerator(language).systemInstruction;
    const schema = {
        executiveSummary: "string", positiveImpacts: ["string"], potentialRisks: ["string"], mitigationStrategies: ["string"], sustainabilityScore: 0
    };
    const prompt = `Report for: ${desc}. ${getJsonPrompt(schema)}`;

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);

    return JSON.parse(text.replace(/```json|```/g, '').trim());
};

export const summarizeNews = async (query: string, language: Language): Promise<NewsSummaryResult> => {
    const system = PROMPTS.newsSummarizer(language).systemInstruction;
    const prompt = `Summarize news about: ${query}. Format: "Summary... \n\n suggested topics: topic1, topic2"`;
    
    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);

    const parts = text.split(/suggested topics:|related topics:/i);
    return {
        summary: parts[0].trim(),
        suggestedQueries: parts[1] ? parts[1].split(',').map(s => s.trim()) : [],
        sources: [] // OpenRouter basic chat doesn't return grounding sources easily
    };
};

export const conductDeepResearch = async (query: string, language: Language): Promise<ResearchReport> => {
    const system = PROMPTS.aiResearcher(language).systemInstruction;
    const schema = {
        keyFindings: [{ finding: "string", explanation: "string" }],
        detailedSummary: "string",
        keyConcepts: [{ concept: "string", definition: "string" }],
        futureOutlook: "string"
    };
    const prompt = `Research: ${query}. ${getJsonPrompt(schema)}`;

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);

    const data = JSON.parse(text.replace(/```json|```/g, '').trim());
    return { ...data, sources: [] };
};

export const calculateRecyclingValue = async (tonnes: number, language: Language): Promise<RecyclingCalculatorResult> => {
    const system = PROMPTS.recyclingCalculator(language).systemInstruction;
    const schema = { annualLandfillFeeSavings: 0, annualRecyclingRevenue: 0, totalAnnualBenefit: 0, notes: "string" };
    const prompt = `Calculate for ${tonnes} tonnes/month. ${getJsonPrompt(schema)}`;

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);

    return JSON.parse(text.replace(/```json|```/g, '').trim());
};

export const getZeroWasteAdvice = async (question: string, language: Language): Promise<ZeroWasteAdviceOutput> => {
    const system = PROMPTS.zeroWasteCoach(language).systemInstruction;
    const schema = { summary: "string", tips: [{ title: "string", description: "string", difficulty: "easy", estimatedCost: "low" }] };
    const prompt = `Advice for: ${question}. ${getJsonPrompt(schema)}`;

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);

    return JSON.parse(text.replace(/```json|```/g, '').trim());
};

export const generateEcoContent = async (topic: string, format: 'YouTube' | 'Book', language: Language): Promise<ContentGenerationResult> => {
    const system = PROMPTS.ecoContentCreator(language).systemInstruction;
    const schema = { title: "string", platform: format, content: "string", monetizationTips: ["string"] };
    const prompt = `Create ${format} content about: ${topic}. ${getJsonPrompt(schema)}`;

    const text = await callOpenRouter([
        { role: 'system', content: system },
        { role: 'user', content: prompt }
    ]);

    return JSON.parse(text.replace(/```json|```/g, '').trim());
};
