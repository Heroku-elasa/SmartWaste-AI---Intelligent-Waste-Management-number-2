
import { Language, Project, Partner } from './types';

export const PROMPTS = {
  aiAssistant: (language: Language) => ({
    systemInstruction: language === 'fa' 
      ? 'شما یک دستیار هوش مصنوعی متخصص در زمینه مدیریت پسماند و محیط زیست هستید. به سوالات کاربران با دقت و لحنی دوستانه پاسخ دهید.'
      : 'You are an AI assistant specialized in waste management and environment. Answer user questions accurately with a friendly tone.'
  }),
  wasteReportProcessor: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما مسئول پردازش گزارش‌های پسماند هستید. گزارش کاربر را تحلیل کنید و یک پیام تایید مودبانه و خلاصه وضعیت ارائه دهید.'
      : 'You are responsible for processing waste reports. Analyze the user report and provide a polite confirmation message and status summary.'
  }),
  wastePredictor: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما یک مدل پیش‌بینی حجم پسماند هستید. بر اساس موقعیت مکانی، یک پیش‌بینی واقع‌گرایانه ارائه دهید. خروجی باید JSON باشد.'
      : 'You are a waste volume prediction model. Provide a realistic prediction based on location. Output must be JSON.'
  }),
  dashboardAnalyticsGenerator: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما تحلیلگر داده‌های داشبورد هستید. خلاصه‌ای از عملکرد سیستم بر اساس معیارهای ارائه شده بنویسید. خروجی باید JSON باشد.'
      : 'You are a dashboard data analyst. Write a summary of system performance based on provided metrics. Output must be JSON.'
  }),
  wasteAnalyzer: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما یک سیستم بینایی ماشین برای تحلیل پسماند هستید. تصویر را تحلیل کنید، آیتم‌ها را شناسایی کنید و توصیه‌های بازیافت ارائه دهید. خروجی باید JSON باشد.'
      : 'You are a computer vision system for waste analysis. Analyze the image, identify items, and provide recycling recommendations. Output must be JSON.'
  }),
  wasteSiteAnalysisGenerator: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما مشاور مدیریت پسماند شهری هستید. پتانسیل سایت را برای مدیریت پسماند تحلیل کنید. خروجی باید JSON باشد.'
      : 'You are an urban waste management consultant. Analyze the site potential for waste management. Output must be JSON.'
  }),
  grantFinder: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما موتور جستجوی گرنت‌های زیست‌محیطی هستید. کمک‌های مالی مرتبط را پیدا کنید. خروجی باید آرایه‌ای از اشیاء JSON باشد.'
      : 'You are an environmental grant search engine. Find relevant grants. Output must be an array of JSON objects.'
  }),
  supplierFinder: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما موتور جستجوی تامین‌کنندگان تجهیزات بازیافت هستید. تامین‌کنندگان مرتبط را پیدا کنید. خروجی باید آرایه‌ای از اشیاء JSON باشد.'
      : 'You are a recycling equipment supplier search engine. Find relevant suppliers. Output must be an array of JSON objects.'
  }),
  applicationDrafter: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما نویسنده حرفه‌ای پروپوزال هستید. پیش‌نویس درخواست گرنت را آماده کنید. خروجی باید JSON باشد.'
      : 'You are a professional proposal writer. Prepare the grant application draft. Output must be JSON.'
  }),
  impactReportGenerator: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما متخصص ارزیابی اثرات زیست‌محیطی هستید. گزارش اثرات را تولید کنید. خروجی باید JSON باشد.'
      : 'You are an environmental impact assessment expert. Generate the impact report. Output must be JSON.'
  }),
  newsSummarizer: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما خلاصه‌کننده اخبار محیط زیست هستید. اخبار را جستجو و خلاصه کنید.'
      : 'You are an environmental news summarizer. Search and summarize news.'
  }),
  aiResearcher: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما پژوهشگر ارشد محیط زیست هستید. تحقیق عمیق انجام دهید و گزارش ساختاریافته ارائه دهید. خروجی باید JSON باشد.'
      : 'You are a senior environmental researcher. Conduct deep research and provide a structured report. Output must be JSON.'
  }),
  recyclingCalculator: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما محاسبه‌گر سود بازیافت هستید. تخمین‌های مالی ارائه دهید. خروجی باید JSON باشد.'
      : 'You are a recycling profit calculator. Provide financial estimates. Output must be JSON.'
  }),
  zeroWasteCoach: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما مربی سبک زندگی پسماند صفر هستید. راهنمایی‌های کاربردی ارائه دهید. خروجی باید JSON باشد.'
      : 'You are a zero-waste lifestyle coach. Provide practical guidance. Output must be JSON.'
  }),
  ecoContentCreator: (language: Language) => ({
    systemInstruction: language === 'fa'
      ? 'شما تولیدکننده محتوای خلاق محیط زیستی هستید. ایده‌ها و متون جذاب تولید کنید. خروجی باید JSON باشد.'
      : 'You are a creative eco-content creator. Generate engaging ideas and text. Output must be JSON.'
  }),
};

// prettier-ignore
export const translations = {
  en: {
    // ... existing translations ...
    header: {
      home: 'Home',
      requestWastePickup: 'Request Pickup',
      smartDashboard: 'Dashboard',
      sustainabilitySuite: 'Services',
      wasteSiteAnalysis: 'Waste Site Analysis',
      grantFinder: 'Grant Finder',
      supplierFinder: 'Supplier Finder',
      impactReporter: 'Impact Reporter',
      wasteNews: 'Waste & Recycling News',
      aiResearcher: 'AI Researcher',
      aiAssistant: 'AI Assistant',
      recyclingCalculator: 'Recycling Calculator',
      zeroWaste: 'Zero Waste Coach',
      realTimeDashboard: 'Live ML Ops',
      dashboardLesson: 'Lesson: Dashboard Overview',
      wpDashboard: 'Admin Panel',
      blockchain: 'RecycleChain Protocol'
    },
    blockchainPage: {
        title: 'RecycleChain Protocol',
        subtitle: 'The "Dark Web" of Recycling - Unstoppable, Decentralized, Rewarding.',
        heroBadge: 'Web3 Ecology',
        paradigmTitle: 'A Paradigm Shift',
        oldParadigm: {
            year: '2015',
            title: 'Centralized & Fragile',
            desc: 'Requires: Large Teams, VC Capital, Physical Offices. Result: High Failure Rate.'
        },
        newParadigm: {
            year: '2025',
            title: 'Decentralized & Autonomous',
            desc: 'Requires: 1 Idea + 1 Person + AI. Result: Code preserves itself forever.'
        },
        stats: {
            users: { label: 'Active Users', value: '4' },
            waste: { label: 'Waste Recycled', value: '14.0 kg' },
            tokens: { label: 'ECO Tokens Issued', value: '182' },
            transactions: { label: 'Transactions', value: '6' }
        },
        howItWorks: {
            title: 'How It Works?',
            steps: [
                { title: '1. Scan', desc: 'Scan your waste with your phone to register type and weight.', icon: '📱' },
                { title: '2. Deliver', desc: 'Deliver waste to a collection point.', icon: '♻️' },
                { title: '3. Earn', desc: 'Automatically receive ECO Tokens!', icon: '🪙' }
            ]
        },
        bitcoinInspiration: {
            title: 'Inspired by Bitcoin 🪙',
            desc: 'No central point of failure • Full transparency • Intrinsic economic incentives • Self-preserving code',
            badges: [
                { icon: '🔗', label: 'Decentralized' },
                { icon: '🔒', label: 'Secure' },
                { icon: '🌍', label: 'Global' },
                { icon: '💎', label: 'Transparent' }
            ]
        },
        footer: {
            line1: '🌱 RecycleChain - Built with ❤️ for a sustainable future',
            line2: 'New Solitude: 1 Person + AI + Open Source + Internet = Limitless'
        },
        architecture: {
            title: 'Protocol Architecture',
            collector: 'Collector',
            processor: 'Processor',
            buyer: 'Buyer',
            smartContract: 'Smart Contract',
            token: 'ECO Token'
        },
        roadmap: {
            title: 'Roadmap to Decentralization',
            steps: [
                { phase: 'Now', title: 'Prototyping', desc: 'Building with AI, learning structures.' },
                { phase: '6 Months', title: 'Testnet MVP', desc: 'Proof of concept with 10 beta testers.' },
                { phase: 'Future', title: 'DAO Launch', desc: 'Open source release. Community governance.' }
            ]
        },
        cta: 'Join the Network'
    },
    // ... rest of translations
    hero: {
      title: 'The Future of Urban Waste, <br/> <span class="text-primary-500">On-Demand.</span>',
      subtitle: 'Satlineh combines smart technology with on-demand service to make waste collection efficient, clean, and simple. Like Uber, but for your recycling.',
      button1: 'Request Pickup',
      button2: 'View Dashboard',
    },
    aiModules: {
        title: "Powered by Advanced Gemini AI",
        modules: [
            { title: "Waste Vision", desc: "Identify waste types instantly with computer vision.", icon: "camera" },
            { title: "Smart Prediction", desc: "Forecast waste volumes to optimize collection routes.", icon: "chart" },
            { title: "Grant Agent", desc: "Autonomous agent finding funding opportunities.", icon: "search" },
            { title: "RecycleChain", desc: "Immutable ledger for waste tracking & rewards.", icon: "cube" }
        ]
    },
    homeServices: {
        title: "One App for All Needs",
        subtitle: "From on-demand collection to AI-powered analytics, everything in one place.",
        categories: [
            { 
                name: "Core Services",
                services: [
                    { page: "waste_collection", name: "AI Waste Collection", description: "Request on-demand pickup using AI waste analysis from your camera." },
                    { page: "smart_dashboard", name: "Smart Dashboard", description: "Monitor live requests, predict waste volume, and analyze system performance." },
                    { page: "real_time_dashboard", name: "Live ML Operations", description: "Real-time infrastructure monitoring powered by Kafka + RisingWave + Grafana." },
                ]
            },
            {
                name: "Planning & Analysis",
                services: [
                    { page: "waste_site_analysis", name: "Waste Site Analysis", description: "Get an AI-generated report on waste management potential for any location." },
                    { page: "impact_reporter", name: "Impact Reporter", description: "Generate detailed environmental impact reports for your waste stream." },
                    { page: "recycling_calculator", name: "Recycling Calculator", description: "Estimate the financial benefits of implementing a recycling program." },
                ]
            },
            {
                name: "Growth & Research",
                services: [
                    { page: "grant_finder", name: "Grant Finder", description: "Find funding opportunities for your sustainability and recycling projects." },
                    { page: "supplier_finder", name: "Supplier Finder", description: "Discover suppliers for recycling bins, compactors, and other equipment." },
                    { page: "waste_news", name: "Waste & Recycling News", description: "Get AI-powered summaries of the latest trends and research in the industry." },
                    { page: "ai_researcher", name: "AI Researcher", description: "Conduct in-depth research on any topic with a structured AI report." },
                ]
            },
            {
                name: "Lifestyle & Empowerment",
                services: [
                    { page: "zero_waste", name: "Zero Waste & Creator Studio", description: "Learn zero-waste habits and generate monetizable content (Videos/Books) from your eco-journey." },
                    { page: "dashboard_lesson", name: "Learn the Dashboard", description: "A comprehensive lesson plan on how to navigate and use the SmartWaste dashboard." },
                    { page: "blockchain", name: "RecycleChain Protocol", description: "Decentralized waste tracking and token rewards on the blockchain." },
                ]
            }
        ]
    },
    smartWasteDashboard: {
        title: 'Smart Waste Management',
        backButton: 'Back',
        tutorial: 'Tutorial / Help',
        tabReport: 'Live Feed',
        tabPredict: 'Smart Prediction',
        tabAnalytics: 'Analysis & Stats',
        tabTuning: 'Fine Tuning',
        tabSpecialGrants: 'Special Grants',
        tabRecycleChain: 'RecycleChain',
        liveFeed: {
            title: 'Live Collection Requests',
            subtitle: 'Monitor and dispatch incoming waste collection requests.',
            location: 'Location',
            wasteType: 'Type',
            volume: 'Volume',
            status: 'Status',
            actions: 'Actions',
            statuses: { pending: 'Pending', enRoute: 'En Route', completed: 'Completed'},
            dispatch: 'Dispatch',
            details: 'Details'
        },
        prediction: {
            title: 'Smart Prediction',
            subtitle: 'Predict waste volume and plan with AI.',
            locationLabel: 'Location',
            locationPlaceholder: 'e.g., "Tehran, Narmak District"',
            button: 'Predict Waste Volume',
            predicting: 'Predicting...',
            placeholder: 'Enter a location and click predict to get an AI-powered waste volume prediction.',
        },
        analytics: {
            title: 'System Analysis & Stats',
            aiAccuracy: 'AI Accuracy',
            todayReports: 'Today\'s Reports',
            routingImprovement: 'Routing Improvement',
            performanceReport: 'Performance Report',
            summaryPlaceholder: 'Generating AI analysis of system performance...',
        },
        tuning: {
            title: 'Model Fine Tuning',
            subtitle: 'Upload a dataset to train a custom Gemini model for improved waste classification.',
            uploadTitle: 'Upload Dataset',
            uploadPlaceholder: 'Drag & Drop CSV or JSONL file here',
            paramsTitle: 'Hyperparameters',
            epochs: 'Epochs',
            batchSize: 'Batch Size',
            learningRate: 'Learning Rate',
            startTraining: 'Start Tuning',
            training: 'Training...',
            logsTitle: 'Training Logs',
            status: {
                idle: 'Idle',
                uploading: 'Uploading dataset...',
                training: 'Training model...',
                completed: 'Training Completed Successfully'
            },
            modelId: 'New Model ID'
        },
        recycleChain: {
            title: 'RecycleChain Protocol',
            subtitle: 'Decentralized Waste Management Ledger (Proof-of-Recycle)',
            connectWallet: 'Connect Wallet',
            walletConnected: 'Wallet Connected',
            balance: 'ECO Balance',
            stats: {
                marketCap: 'Market Cap',
                circulatingSupply: 'Circulating Supply',
                blocks: 'Blocks Verified'
            },
            transactions: 'Recent Transactions',
            headers: {
                hash: 'Tx Hash',
                block: 'Block',
                type: 'Type',
                amount: 'Amount'
            },
            rcDashboard: {
                title: "RecycleChain Protocol | Dashboard",
                networkStatus: "Network Status: Synced",
                blockHeight: "Block Height",
                mempool: "Mempool Txs",
                hashrate: "Network Hashrate",
                price: "PSC Price",
                distribution: "PSC Token Distribution",
                minersReward: "Miner Rewards",
                liquidity: "Liquidity Pool",
                team: "Dev Team",
                burn: "Token Burn",
                dao: "DAO Treasury",
                nodeStatus: "Node Status",
                mining: "Mining (Active)",
                syncing: "Syncing",
                offline: "Offline",
                recentTxs: "Recent Transactions",
                walletTitle: "PSC Wallet",
                yourBalance: "Your Balance",
                walletAddress: "Wallet Address",
                sendTx: "Send Transaction",
                recipient: "Recipient Address",
                amount: "Amount (PSC)",
                wasteType: "Waste Type (Optional)",
                weight: "Weight (kg) (Optional)",
                sendBtn: "Send Transaction",
                sender: "Sender",
                receiver: "Receiver",
                type: "Type",
                timestamp: "Timestamp",
                sidebar: { dashboard: "Dashboard", wallet: "Wallet", mining: "Mining", classification: "Classification", chat: "AI Chat" }
            }
        },
        specialGrants: {
            title: 'Strategic Grant Opportunities',
            subtitle: 'Curated list of federal funding aligned with waste-to-carbon removal technologies.',
            viewFullReport: 'Read Full Strategic Report',
            cifia: {
                title: 'Carbon Dioxide Transportation (CIFIA)',
                amount: '$500,000,000',
                deadline: 'Jan 2, 2026',
                desc: 'Supports infrastructure for CO2 transport systems, critical for scaling waste-to-carbon removal.'
            },
            swifr: {
                title: 'Solid Waste Infrastructure (SWIFR)',
                amount: '$20,000,000',
                deadline: 'Jan 23, 2026',
                desc: 'Funding for waste management systems and recycling infrastructure with circular economy focus.'
            },
            viewDetails: 'View Details'
        }
    },
    grantDetailPage: {
        title: 'Grant Details',
        back: 'Back to Dashboard',
        grantNumber: 'Grant Number',
        agency: 'Agency',
        funding: 'Funding Available',
        deadline: 'Application Deadline',
        status: 'Status',
        overview: 'Program Overview',
        features: 'Key Features',
        eligibility: 'Eligibility',
        whyThisFits: 'Why This Fits',
        contact: 'Contact Information',
        materials: 'Application Materials',
    },
    // ... existing ...
    grantOpportunitiesPage: {
        back: 'Back to Dashboard',
    },
    grantAnalyzer: {
        title: 'Grant Analysis',
        close: 'Close',
        loadingTitle: 'Analyzing Grant...',
        loadingSubtitle: 'Our AI is reading the details and assessing relevance to your project.',
        relevance: 'Match',
        viewOriginal: 'View Source',
        exportDOCX: 'Download Report (DOCX)',
        printPDF: 'Print Report',
        deadline: 'Deadline',
        amount: 'Funding Amount',
        duration: 'Project Duration',
        geography: 'Target Region',
        eligibility: 'Eligibility Criteria',
        scope: 'Project Scope',
        howToApply: 'Application Process',
        contact: 'Contact Info',
        useForProposal: 'Use This Grant for Proposal Draft',
        export: {
            summaryTitle: 'Grant Analysis Summary',
            officialLink: 'Official Link',
            relevance: 'Relevance Score',
            details: 'Key Details',
            fundingBody: 'Funding Body',
            deadline: 'Deadline',
            amount: 'Amount',
            duration: 'Duration',
            geography: 'Geography',
            eligibility: 'Eligibility',
            scope: 'Scope',
            applicationProcess: 'How to Apply',
            contact: 'Contact',
            fileName: 'Grant_Analysis'
        }
    },
    grantFinder: {
        title: 'Grant Finder',
        subtitle: 'Find relevant grants based on your project documents or keywords.',
        uploadLabel: 'Upload Project Document (Optional)',
        selectFile: 'Select File',
        removeFile: 'Remove File',
        fileTypes: 'Supports .docx, .txt, .md',
        or: 'OR',
        keywordsLabel: 'Search Keywords / Description',
        keywordsPlaceholder: 'e.g., "community composting", "plastic recycling innovation"',
        maxResults: 'Max Results',
        findButton: 'Find Grants',
        finding: 'Searching...',
        readingFile: 'Reading File...',
        validationError: 'Please enter keywords or upload a file.',
        fileTypeError: 'Invalid file type. Please upload .docx, .txt, or .md.',
        fileReadError: 'Error reading file.',
        savedTitle: 'Saved Grants',
        clearAll: 'Clear All',
        from: 'From',
        deadlineLabel: 'Deadline',
        summaryLabel: 'Summary',
        notesLabel: 'My Notes',
        notesPlaceholder: 'Add notes here...',
        remove: 'Remove',
        useForProposal: 'Use for Proposal',
        analyze: 'Analyze',
        crateTitle: 'Grant Crate',
        crateSubtitle: 'Results from your current search.',
        clearCrate: 'Clear Results',
        loadingTitle: 'Searching Grants...',
        loadingSubtitle: 'AI is scanning databases and web sources.',
        sortBy: 'Sort by',
        saved: 'Saved',
        save: 'Save',
        crateEmpty: 'No grants found yet. Try searching above.',
        documents: 'Relevant Documents',
        relevance: 'Relevance',
        parseErrorTitle: 'Raw Output',
        parseErrorSubtitle: 'The AI response could not be parsed into a table, but here is the text:',
        sort: {
            relevance: 'Relevance',
            deadline: 'Deadline',
            amount: 'Amount',
            geography: 'Location'
        },
        prompt: {
            common: 'You are an expert grant finder. Output a Markdown table with columns: Grant Title, Funding Body, Summary, Deadline, Link, Requirement Documents, Relevance Score (0-100), Amount, Geography. Be precise.',
            supplementalKeywords: 'Prioritize grants related to: {keywords}.',
            noSupplementalKeywords: '',
            fileBased: '{common} Analyze this project description and find {maxResults} matching grants. {keywordInstruction} Project Text: {documentText}',
            keywordBased: '{common} Find {maxResults} grants matching these queries: {queries}.'
        }
    },
    realTimeDashboard: {
        title: 'Real-Time ML Operations',
        subtitle: 'Monitoring waste sensor data streams & ML Inference with Apache Kafka, RisingWave, and Grafana.',
        stat1: 'Ingestion Rate',
        stat2: 'End-to-End Latency',
        stat3: 'Active IoT Sensors',
        stat4: 'Drift Anomalies',
        chart1: 'Metric Volatility (Candlestick)',
        chart2: 'ML Model Confidence',
        log: 'Pipeline Logs (Kafka/RisingWave)',
        back: 'Back to Home'
    },
    wasteCollectorPage: {
        title: 'AI Waste Analysis & Pickup',
        subtitle: 'Use your camera to identify waste, learn how to sort it, and schedule an on-demand pickup.',
        startCamera: 'Start Camera',
        stopCamera: 'Stop Camera',
        capture: 'Capture',
        upload: 'Upload a Photo',
        analyzing: 'Analyzing Waste...',
        analysisResults: 'Analysis Results',
        instructions: 'Scan your waste to begin.',
        identifiedItems: 'Identified Items',
        category: 'Category',
        recycling: 'Recycling',
        landfill: 'Landfill',
        compost: 'Compost',
        special: 'Special',
        pickupQuote: 'Pickup Quote',
        estimatedWeight: 'Estimated Weight',
        recyclingPotential: 'Recycling Potential',
        requestPickup: 'Request Pickup for {price}',
        cameraError: 'Could not access camera. Please check permissions.',
    },
    wasteSiteAnalysisPage: {
      title: 'AI Waste Site Analysis',
      formTitle: 'Analyze Your Location',
      locationLabel: 'Location (Address or Coordinates)',
      locationPlaceholder: 'e.g., "123 Main St, Anytown, USA"',
      descriptionLabel: 'Describe project goals or site characteristics (Optional)',
      descriptionPlaceholder: 'e.g., "A 50-unit apartment complex looking to optimize our recycling program." or "A commercial warehouse with high cardboard output."',
      uploadPhoto: 'Upload Site Image (Optional)',
      photoUploaded: 'Image uploaded successfully!',
      removePhoto: 'Remove Image',
      buttonText: 'Run Analysis',
      generating: 'Analyzing...',
      validationError: 'Please provide a location to start the analysis.',
      resultsTitle: 'Analysis Results',
      placeholder: 'Your waste management analysis will appear here. Enter a location to begin.',
      siteSuitability: 'Waste Management Suitability',
      estimatedDiversion: 'Estimated Monthly Waste Diversion',
      potentialSavings: 'Potential Annual Savings (from Diversion)',
      recommendations: 'Bin & Equipment Recommendations',
      logistics: 'Logistics Considerations',
    },
    grantFinderPage: {
      title: 'Recycling Grant & Funding Finder',
      subtitle: 'Our AI searches for the latest recycling, composting, and waste reduction grants to support your project.',
      searchPlaceholder: 'e.g., "Grants for community composting in Oregon" or "Federal funding for plastic recycling innovation"',
      searchButton: 'Search Grants',
      searching: 'Searching for grants...',
      error: 'An unexpected error occurred while searching.',
      placeholder: 'Grant opportunities will appear here.',
      resultsTitle: 'Grant Opportunities Found',
      issuingAgency: 'Issuing Agency',
      eligibility: 'Eligibility',
      applyNow: 'More Info / Apply',
      prepareApplication: 'Prepare Application',
      applicationAssistant: 'Application Assistant for: {grantName}',
      backToResults: 'Back to Grant Results',
      projectDescriptionLabel: 'Describe your project, goals, and team.',
      projectDescriptionPlaceholder: 'e.g., "Our project aims to start a curbside compost pickup service for 500 homes. We are a team of 2 environmental scientists..."',
      generateDraftButton: 'Generate Application Draft',
      generatingDraft: 'Generating Draft...',
      draftResultsTitle: 'Your Application Draft',
      businessPlanOutline: 'Business Plan Outline',
      applicationSections: 'Drafted Application Sections',
      nextSteps: 'Recommended Next Steps',
    },
    supplierFinderPage: {
      title: 'Equipment Supplier Finder',
      subtitle: 'Find suppliers for recycling bins, composters, compactors, and other waste management equipment.',
      searchPlaceholder: 'e.g., "commercial recycling bins supplier in California" or "industrial cardboard balers"',
      searchButton: 'Search Suppliers',
      searching: 'Searching for suppliers...',
      error: 'An unexpected error occurred while searching for suppliers.',
      placeholder: 'Supplier information will appear here.',
      resultsTitle: 'Equipment Suppliers Found',
      visitWebsite: 'Visit Website',
    },
    impactReporterPage: {
      title: 'Waste Stream Impact Reporter',
      subtitle: 'Generate detailed environmental impact reports for your organization\'s waste stream in minutes.',
      descriptionLabel: 'Describe your project or organization\'s waste for impact analysis.',
      descriptionPlaceholder: 'e.g., "A medium-sized restaurant producing 5 tons of food waste per month." or "An office building with 200 employees aiming for zero-waste certification."',
      buttonText: 'Generate Impact Report',
      generating: 'Generating Report...',
      validationError: 'Please provide a description.',
      placeholder: 'Your environmental impact report will appear here.',
      resultsTitle: 'Environmental Impact Report',
      executiveSummary: 'Executive Summary',
      positiveImpacts: 'Positive Impacts',
      potentialRisks: 'Potential Risks & Concerns',
      mitigationStrategies: 'Mitigation Strategies',
      sustainabilityScore: 'Overall Sustainability Score',
    },
    wasteNewsPage: {
        title: 'Waste & Recycling News',
        subtitle: 'Research any topic to get an AI-powered summary of current trends in the circular economy and waste management, backed by Google Search.',
        searchPlaceholder: 'e.g., "advancements in chemical recycling" or "extended producer responsibility laws"',
        searchButton: 'Research',
        searching: 'Researching...',
        error: 'An error occurred during research. Please try again.',
        placeholder: 'Your research summary will appear here.',
        sources: 'Sources',
        relatedTopics: 'Related Topics',
    },
    aiResearcherPage: {
      title: 'Deep Research Assistant',
      subtitle: 'Leverage AI to conduct in-depth research on any topic, synthesizing information from across the web into a structured report.',
      searchPlaceholder: 'e.g., "microplastics in the ocean" or "the economics of aluminum recycling"',
      searchButton: 'Conduct Research',
      searching: 'Researching...',
      error: 'An error occurred during deep research. Please try again.',
      placeholder: 'Your detailed research report will appear here.',
      resultsTitle: 'Deep Research Report',
      keyFindings: 'Key Findings',
      detailedSummary: 'Detailed Summary',
      keyConcepts: 'Key Concepts & Entities',
      futureOutlook: 'Future Outlook',
      sources: 'Sources',
    },
    recyclingCalculatorPage: {
        title: 'Recycling Value Calculator',
        subtitle: 'Get a quick, AI-powered estimate of the financial benefits of recycling for your business.',
        billLabel: 'Average Monthly Waste Volume (tons)',
        billPlaceholder: 'e.g., 5',
        buttonText: 'Calculate Savings',
        calculating: 'Calculating...',
        validationError: 'Please enter a valid monthly waste volume.',
        resultsTitle: 'Your Estimated Annual Benefit',
        annualSavings: 'Annual Landfill Fee Savings',
        annualRevenue: 'Annual Recycling Revenue',
        totalBenefit: 'Total Annual Benefit',
        notes: 'Notes & Assumptions',
        placeholder: 'Your calculation results will be displayed here.',
    },
    zeroWastePage: {
        title: 'Zero-Waste Coach & Creator Studio',
        subtitle: 'Learn eco-friendly habits from an expert coach, and turn your journey into monetizable content (Videos/Books) to empower yourself.',
        tabCoach: 'Ask the Coach',
        tabCreator: 'Eco-Creator Studio',
        tabToolkit: 'Toolkit & Amazon Kits',
        coach: {
            title: 'Zero-Waste Coach',
            description: 'Inspired by Ayeh Hamdavi. Get practical, culturally relevant advice for minimizing waste at home.',
            placeholder: 'e.g., "How can I reduce waste in my kitchen?" or "What should I do with old clothes?"',
            button: 'Get Advice',
            difficulty: 'Difficulty',
            cost: 'Cost',
            findKit: 'Find Kit on Amazon',
        },
        creator: {
            title: 'Turn Actions into Impact & Income',
            intro: 'Even small zero-waste actions matter: drying kitchen scraps, refilling detergents, reusing old fabrics. Now you can turn these real experiences into content that inspires others—and creates income.',
            howItWorksTitle: 'How It Works',
            steps: [
                { title: 'Tell your story', desc: 'Share your zero-waste habits: how you reduce waste, shop, reuse, or repair.' },
                { title: 'Choose your path', desc: 'Select: YouTube video, Ebook guide, or Children’s comic.' },
                { title: 'AI builds your plan', desc: 'The AI generates scripts, chapters, or storyboards with monetization tips.' }
            ],
            optionsTitle: 'Creation Options',
            options: [
                { title: 'YouTube Channel', desc: 'Get catchy titles, full scripts, and thumbnail ideas for tutorials or vlogs.' },
                { title: 'Ebook / Guide', desc: 'Create structured chapters and step-by-step tips for Amazon KDP.' },
                { title: 'Children’s Comic', desc: 'Generate storylines and illustration prompts for kids’ books (like HuggingFace comic projects).' }
            ],
            whyTitle: 'Why This Matters',
            benefits: [
                'Environmental Impact: Teach others to reduce waste.',
                'Economic Empowerment: Earn income from your content.',
                'Social Change: Make zero-waste a shared culture.',
                'Inspiration: Show real examples from a real home.'
            ],
            ctaTitle: 'Start Your Zero-Waste Creator Journey',
            topicLabel: 'What is your eco-tip or story idea?',
            topicPlaceholder: 'e.g., "How to make soap from leftover oil" or "A story about a plastic bottle that wanted to be a flower pot"',
            formatLabel: 'Content Format',
            formatYouTube: 'YouTube Video Script',
            formatBook: 'Children\'s Book / Comic Story',
            button: 'Generate Content Plan',
            monetizationTitle: 'Monetization Tips',
        },
        toolkit: {
            title: 'Zero Waste Management Toolkit',
            subtitle: 'Essential starter kits and packages found on Amazon to fulfill every part of your Zero Waste Management Project.',
            findOnAmazon: 'Find on Amazon',
            products: [
                {
                    part: 'Part 1: Rot (Organic Waste)',
                    category: 'Composting System',
                    name: 'Stainless Steel Countertop Compost Bin with Charcoal Filters',
                    description: 'A 1.3-gallon bin for kitchen scraps. Includes charcoal filters to block odors. Essential for managing food waste without throwing it in the trash.',
                    price: '$22.00 - $30.00',
                    goal: 'Diverts food waste from landfills; creates soil nutrient.',
                    searchTerm: 'Stainless Steel Countertop Compost Bin'
                },
                {
                    part: 'Part 2: Reduce (Kitchen)',
                    category: 'Plastic Wrap Alternative',
                    name: 'Beeswax Wrap Assorted 3-Pack',
                    description: 'A set of cotton fabrics coated in beeswax, jojoba oil, and resin. Used to cover bowls or wrap food instead of single-use plastic cling film.',
                    price: '$14.00 - $18.00',
                    goal: 'Eliminates single-use plastic wrap usage.',
                    searchTerm: 'Beeswax Wrap Assorted 3-Pack'
                },
                {
                    part: 'Part 3: Refuse (Shopping)',
                    category: 'Shopping Management',
                    name: 'Reusable Mesh Produce Bags (Set of 9)',
                    description: 'Cotton mesh bags with drawstrings in various sizes (S, M, L). Used for fruits and vegetables at the grocery store to avoid plastic roll bags.',
                    price: '$10.00 - $15.00',
                    goal: 'Stops plastic waste at the source (the store).',
                    searchTerm: 'Reusable Mesh Produce Bags'
                },
                {
                    part: 'Part 4: Reuse (Bathroom)',
                    category: 'Personal Care Kit',
                    name: 'Zero Waste Bathroom Starter Kit',
                    description: 'Usually contains: Bamboo toothbrushes, biodegradable dental floss, and reusable cotton rounds for makeup removal.',
                    price: '$18.00 - $25.00',
                    goal: 'Replaces non-recyclable plastic brushes and throw-away cotton balls.',
                    searchTerm: 'Zero Waste Bathroom Starter Kit'
                },
                {
                    part: 'Part 5: Cleaning',
                    category: 'Eco-Cleaning Package',
                    name: 'Biodegradable Kitchen Sponge & Brush Set',
                    description: 'Includes plant-based loofah sponges and coconut fiber bottle brushes. These decompose naturally unlike plastic sponges.',
                    price: '$15.00 - $20.00',
                    goal: 'Reduces microplastics entering the water system.',
                    searchTerm: 'Biodegradable Kitchen Sponge'
                },
                {
                    part: 'Part 6: Sorting',
                    category: 'Waste Organization',
                    name: 'Recycle Trash Can Sticker Labels (Set of 6)',
                    description: 'Large, waterproof decals for bins labeled: "Trash," "Recycle," "Compost." Visual cues are vital for effective waste management.',
                    price: '$8.00 - $12.00',
                    goal: 'Ensures proper separation of waste streams.',
                    searchTerm: 'Recycle Trash Can Sticker Labels'
                }
            ],
            implementation: {
                title: 'How to Implement (Step-by-Step)',
                steps: [
                    { phase: 'Phase 1: Audit', desc: 'Buy Sorting Labels (Part 6). Label your current bins to immediately organize waste.' },
                    { phase: 'Phase 2: The Big Switch', desc: 'Buy the Compost Bin (Part 1). Separating heavy food waste makes the biggest impact.' },
                    { phase: 'Phase 3: Refinement', desc: 'Buy Reusable Bags (Part 3) and Beeswax Wraps (Part 2) to reduce daily plastic use.' },
                    { phase: 'Phase 4: Lifestyle', desc: 'Introduce Bathroom (Part 4) and Cleaning (Part 5) when old plastic items wear out.' }
                ]
            },
            searchTips: {
                title: 'Search Tips for Amazon',
                description: 'To find the best deals, use these exact search terms:',
                tips: [
                    'Zero waste starter kit kitchen',
                    'Biodegradable compost bags',
                    'Plastic free bathroom set',
                    'Recycling sorting bins for home'
                ]
            }
        }
    },
    aiAssistantPage: {
      title: 'Satlineh AI Assistant',
      subtitle: 'Your personal AI expert for waste management. Ask about sorting, recycling, or sustainability.',
      placeholder: 'Ask a question...',
      welcomeMessage: 'Hello! I am the Satlineh AI Assistant. How can I help you today?',
    },
    footer: {
      description: 'Satlineh provides intelligent solutions for on-demand waste management in modern cities.',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      address: '123 Smart City Ave, Tehran, 12345',
      copyright: '© 2024 Satlineh. All Rights Reserved.',
    },
    quotaErrorModal: {
      title: 'API Quota Exceeded',
      body: 'You have exceeded your daily limit for the Gemini API. Please check your billing settings or try again tomorrow.',
      cta: 'Check Billing',
      close: 'Close',
    },
    confirmationModal: {
      title: 'Confirm Your Pickup',
      estimatedWeight: 'Estimated Weight:',
      pickupQuote: 'Pickup Quote:',
      cancel: 'Cancel',
      confirm: 'Confirm Pickup',
      successTitle: 'Collector Dispatched!',
      successBody: 'A collection vehicle has been dispatched. You can track its arrival in a real app.',
      done: 'Done',
    },
    examplePrompts: {
        try: 'Try:',
        smartPrediction: ['Tehran, Narmak District', 'Arak Industrial Zone', 'Isfahan, Jolfa neighborhood'],
        wasteSiteAnalysisLocation: ['123 Main St, Anytown, USA', '45.4215° N, 75.6972° W', 'Industrial park near city airport'],
        wasteSiteAnalysisDescription: [
            'A 50-unit apartment complex looking to optimize our recycling program.',
            'A commercial warehouse with high cardboard output.',
            'New restaurant opening downtown, planning for food waste composting.'
        ],
        grantFinder: [
            'Grants for community composting',
            'Funding for plastic recycling innovation',
            'Startup grants for circular economy'
        ],
        grantApplication: [
          'Our project aims to start a curbside compost pickup service for 500 homes.',
          'We are developing a new technology to sort mixed plastics more efficiently.',
          'This is a community garden project that needs funding for composting bins.'
        ],
        supplierFinder: [
            'commercial recycling bins supplier',
            'industrial cardboard balers',
            'smart waste sensors for dumpsters'
        ],
        impactReporter: [
            'A medium-sized restaurant producing 5 tons of food waste per month.',
            'An office building with 200 employees aiming for zero-waste.',
            'A small manufacturing facility producing plastic off-cuts.'
        ],
        wasteNews: [
            'advancements in chemical recycling',
            'extended producer responsibility laws',
            'impact of single-use plastic bans'
        ],
        aiResearcher: [
            'microplastics in the ocean',
            'the economics of aluminum recycling',
            'bioplastics and their environmental impact'
        ],
        recyclingCalculator: ['5', '20', '150'],
        aiAssistant: [
            'How do I recycle pizza boxes?',
            'What are the benefits of composting?',
            'Tell me about the circular economy.'
        ],
        zeroWaste: [
            'How do I reduce food waste in the kitchen?',
            'Ideas for reusing old glass jars',
            'Zero waste cleaning products'
        ],
        ecoCreator: [
            'Video script: 5 ways to reuse lemon peels',
            'Story: A lonely plastic bag finds a new purpose',
            'Video script: How to make a compost bin at home'
        ]
    }
  },
  fa: {
    header: {
      home: 'خانه',
      requestWastePickup: 'درخواست جمع‌آوری',
      smartDashboard: 'داشبورد',
      sustainabilitySuite: 'خدمات',
      wasteSiteAnalysis: 'تحلیل سایت پسماند',
      grantFinder: 'کمک هزینه یاب',
      supplierFinder: 'تامین‌کننده یاب',
      impactReporter: 'گزارشگر اثرات',
      wasteNews: 'اخبار پسماند و بازیافت',
      aiResearcher: 'پژوهشگر هوش مصنوعی',
      aiAssistant: 'دستیار هوش مصنوعی',
      recyclingCalculator: 'محاسبه‌گر بازیافت',
      zeroWaste: 'مربی پسماند صفر',
      realTimeDashboard: 'مانیتور زنده ML',
      dashboardLesson: 'درس: مرور کلی داشبورد',
      wpDashboard: 'پنل مدیریت',
      blockchain: 'پروتکل ری‌سایکل‌چین'
    },
    blockchainPage: {
        title: 'پروتکل ری‌سایکل‌چین',
        subtitle: 'دارک وب بازیافت - غیرقابل توقف، غیرمتمرکز، سودآور.',
        heroBadge: 'اکولوژی وب ۳',
        paradigmTitle: 'تغییر پارادایم',
        oldParadigm: {
            year: '۲۰۱۵',
            title: 'متمرکز و شکننده',
            desc: 'نیاز به: تیم‌های بزرگ، سرمایه VC، دفاتر فیزیکی. نتیجه: نرخ شکست بالا.'
        },
        newParadigm: {
            year: '۲۰۲۵',
            title: 'غیرمتمرکز و خودمختار',
            desc: 'نیاز به: ۱ ایده + ۱ نفر + هوش مصنوعی. نتیجه: کد خودش را حفظ می‌کند.'
        },
        stats: {
            users: { label: 'کاربران فعال', value: '4' },
            waste: { label: 'زباله بازیافت شده', value: '14.0 kg' },
            tokens: { label: 'ECO Token صادر شده', value: '182' },
            transactions: { label: 'تراکنش‌ها', value: '6' }
        },
        howItWorks: {
            title: 'چگونه کار می‌کند؟',
            steps: [
                { title: '۱. اسکن کنید', desc: 'زباله خود را با گوشی اسکن کرده و نوع و وزن آن را ثبت کنید.', icon: '📱' },
                { title: '۲. تحویل دهید', desc: 'زباله را به نقطه جمع‌آوری تحویل دهید.', icon: '♻️' },
                { title: '۳. پاداش بگیرید', desc: 'به صورت خودکار ECO Token دریافت کنید!', icon: '🪙' }
            ]
        },
        bitcoinInspiration: {
            title: 'الهام‌گرفته از Bitcoin 🪙',
            desc: 'بدون نقطه مرکزی شکست • شفافیت کامل • مشوق اقتصادی داخلی • خودش از خودش محافظت می‌کند',
            badges: [
                { icon: '🔗', label: 'غیرمتمرکز' },
                { icon: '🔒', label: 'امن' },
                { icon: '🌍', label: 'جهانی' },
                { icon: '💎', label: 'شفاف' }
            ]
        },
        footer: {
            line1: '🌱 RecycleChain - ساخته شده با ❤️ برای آینده‌ای پایدار',
            line2: 'تنهایی جدید: ۱ نفر + AI + Open Source + Internet = نامحدود'
        },
        whyDarkWeb: {
            title: 'چرا مدل "دارک وب"؟',
            desc: 'نه برای فعالیت غیرقانونی، بلکه برای پایداری.',
            features: [
                { title: 'بدون نقطه شکست مرکزی', desc: 'هیچ دولت یا شرکتی نمی‌تواند آن را متوقف کند.' },
                { title: 'کد خود-نگهدار', desc: 'سیستم حتی اگر سازنده برود، به حیات خود ادامه می‌دهد.' },
                { title: 'مشوق‌های درونی', desc: 'مردم مستقیماً از مشارکت سود می‌برند.' },
                { title: 'شفافیت رادیکال', desc: 'همه می‌بینند منابع کجا می‌رود.' }
            ]
        },
        architecture: {
            title: 'معماری پروتکل',
            collector: 'جمع‌کننده',
            processor: 'پردازشگر',
            buyer: 'خریدار',
            smartContract: 'قرارداد هوشمند',
            token: 'توکن ECO'
        },
        philosophy: {
            title: 'فلسفه پول',
            text: 'پول هدف نیست؛ ابزاری برای هماهنگی است. در این سیستم، سود محصول جانبی اثر زیست‌محیطی است.',
            comparison: [
                { label: 'سنتی', val: 'کمیابی و رقابت' },
                { label: 'ری‌سایکل‌چین', val: 'فراوانی و همکاری' }
            ]
        },
        roadmap: {
            title: 'نقشه راه غیرمتمرکزسازی',
            steps: [
                { phase: 'الان', title: 'ساخت پروتوتایپ', desc: 'ساخت با هوش مصنوعی، یادگیری ساختارها.' },
                { phase: '۶ ماه', title: 'تست‌نت MVP', desc: 'اثبات مفهوم با ۱۰ تست‌کننده بتا.' },
                { phase: 'آینده', title: 'راه‌اندازی DAO', desc: 'انتشار متن‌باز. حاکمیت جامعه.' }
            ]
        },
        cta: 'به شبکه بپیوندید'
    },
    // ... rest of translations
    hero: {
      title: 'آینده پسماند شهری، <br/> <span class="text-primary-500">در لحظه.</span>',
      subtitle: 'Satlineh تکنولوژی هوشمند را با خدمات درخواستی ترکیب می‌کند تا جمع‌آوری پسماند را کارآمد، پاک و ساده سازد. مانند اسنپ، اما برای بازیافت شما.',
      button1: 'درخواست جمع‌آوری',
      button2: 'مشاهده داشبورد',
    },
    aiModules: {
        title: "قدرت گرفته از هوش مصنوعی پیشرفته جمنای",
        modules: [
            { title: "بینایی ماشین", desc: "شناسایی نوع پسماند به صورت آنی با دوربین.", icon: "camera" },
            { title: "پیش‌بینی هوشمند", desc: "پیش‌بینی حجم پسماند برای بهینه‌سازی مسیرها.", icon: "chart" },
            { title: "عامل گرنت‌یاب", desc: "عامل هوشمند برای یافتن فرصت‌های مالی.", icon: "search" },
            { title: "ری‌سایکل‌چین", desc: "دفتر کل تغییرناپذیر برای ردیابی پسماند و پاداش.", icon: "cube" }
        ]
    },
    homeServices: {
        title: "یک اپلیکیشن برای تمام نیازها",
        subtitle: "از جمع‌آوری درخواستی تا تحلیل‌های هوشمند، همه چیز در یک جا.",
        categories: [
            { 
                name: "خدمات اصلی",
                services: [
                    { page: "waste_collection", name: "جمع‌آوری هوشمند پسماند", description: "درخواست جمع‌آوری با تحلیل تصویر هوش مصنوعی." },
                    { page: "smart_dashboard", name: "داشبورد هوشمند", description: "مانیتورینگ زنده، پیش‌بینی حجم و تحلیل عملکرد." },
                    { page: "real_time_dashboard", name: "عملیات زنده ML", description: "مانیتورینگ زیرساخت با Kafka و Grafana." },
                ]
            },
            {
                name: "برنامه‌ریزی و تحلیل",
                services: [
                    { page: "waste_site_analysis", name: "تحلیل سایت پسماند", description: "گزارش پتانسیل مدیریت پسماند برای هر مکان." },
                    { page: "impact_reporter", name: "گزارشگر اثرات", description: "تولید گزارش‌های دقیق اثرات زیست‌محیطی." },
                    { page: "recycling_calculator", name: "محاسبه‌گر بازیافت", description: "تخمین سود مالی اجرای برنامه بازیافت." },
                ]
            },
            {
                name: "رشد و تحقیق",
                services: [
                    { page: "grant_finder", name: "یابنده گرنت", description: "یافتن فرصت‌های مالی برای پروژه‌های بازیافت." },
                    { page: "supplier_finder", name: "یابنده تامین‌کننده", description: "کشف تامین‌کنندگان تجهیزات بازیافت." },
                    { page: "waste_news", name: "اخبار پسماند", description: "خلاصه هوشمند آخرین روندها و اخبار صنعت." },
                    { page: "ai_researcher", name: "پژوهشگر هوش مصنوعی", description: "تحقیق عمیق در هر موضوع با گزارش ساختاریافته." },
                ]
            },
            {
                name: "سبک زندگی و توانمندسازی",
                services: [
                    { page: "zero_waste", name: "مربی پسماند صفر", description: "یادگیری عادات سبز و تولید محتوای درآمدزا." },
                    { page: "dashboard_lesson", name: "آموزش داشبورد", description: "درس جامع نحوه استفاده از داشبورد SmartWaste." },
                    { page: "blockchain", name: "پروتکل ری‌سایکل‌چین", description: "ردیابی پسماند غیرمتمرکز و پاداش توکن روی بلاکچین." },
                ]
            }
        ]
    },
    smartWasteDashboard: {
        title: 'مدیریت پسماند هوشمند',
        backButton: 'بازگشت',
        tutorial: 'آموزش / راهنما',
        tabReport: 'فید زنده',
        tabPredict: 'پیش‌بینی هوشمند',
        tabAnalytics: 'آنالیز و آمار',
        tabTuning: 'تنظیم دقیق مدل',
        tabSpecialGrants: 'گرنت‌های ویژه',
        tabRecycleChain: 'ری‌سایکل‌چین',
        liveFeed: {
            title: 'درخواست‌های جمع‌آوری زنده',
            subtitle: 'نظارت و اعزام درخواست‌های جمع‌آوری ورودی.',
            location: 'موقعیت',
            wasteType: 'نوع',
            volume: 'حجم',
            status: 'وضعیت',
            actions: 'عملیات',
            statuses: { pending: 'در انتظار', enRoute: 'در مسیر', completed: 'تکمیل شده'},
            dispatch: 'اعزام',
            details: 'جزئیات'
        },
        prediction: {
            title: 'پیش‌بینی هوشمند',
            subtitle: 'حجم زباله را پیش‌بینی کرده و با هوش مصنوعی برنامه‌ریزی کنید.',
            locationLabel: 'موقعیت',
            locationPlaceholder: 'مثال: "تهران، محله نارمک"',
            button: 'پیش‌بینی حجم زباله',
            predicting: 'در حال پیش‌بینی...',
            placeholder: 'یک مکان را وارد کرده و برای دریافت پیش‌بینی حجم زباله کلیک کنید.',
        },
        analytics: {
            title: 'آنالیز و آمار سیستم',
            aiAccuracy: 'دقت هوش مصنوعی',
            todayReports: 'گزارش امروز',
            routingImprovement: 'بهبود مسیریابی',
            performanceReport: 'گزارش عملکرد',
            summaryPlaceholder: 'در حال تولید تحلیل هوش مصنوعی از عملکرد سیستم...',
        },
        tuning: {
            title: 'تنظیم دقیق مدل',
            subtitle: 'آپلود دیتاست برای آموزش مدل جمنای سفارشی جهت بهبود طبقه‌بندی پسماند.',
            uploadTitle: 'آپلود دیتاست',
            uploadPlaceholder: 'فایل CSV یا JSONL را اینجا بکشید و رها کنید',
            paramsTitle: 'هایپرپارامترها',
            epochs: 'تعداد Epoch',
            batchSize: 'اندازه دسته (Batch Size)',
            learningRate: 'نرخ یادگیری',
            startTraining: 'شروع تنظیم',
            training: 'در حال آموزش...',
            logsTitle: 'لاگ‌های آموزش',
            status: {
                idle: 'آماده',
                uploading: 'در حال آپلود دیتاست...',
                training: 'در حال آموزش مدل...',
                completed: 'آموزش با موفقیت تکمیل شد'
            },
            modelId: 'شناسه مدل جدید'
        },
        recycleChain: {
            title: 'پروتکل ری‌سایکل‌چین',
            subtitle: 'دفتر کل غیرمتمرکز مدیریت پسماند (اثبات بازیافت)',
            connectWallet: 'اتصال کیف پول',
            walletConnected: 'کیف پول متصل شد',
            balance: 'موجودی ECO',
            stats: {
                marketCap: 'ارزش بازار',
                circulatingSupply: 'عرضه در گردش',
                blocks: 'بلوک‌های تایید شده'
            },
            transactions: 'تراکنش‌های اخیر',
            headers: {
                hash: 'هش تراکنش',
                block: 'بلوک',
                type: 'نوع',
                amount: 'مقدار'
            },
            rcDashboard: {
                title: "RecycleChain Protocol | Dashboard",
                networkStatus: "وضعیت شبکه: Sync شده",
                blockHeight: "ارتفاع بلاک",
                mempool: "تراکنش ممپول",
                hashrate: "هش‌ریت شبکه",
                price: "قیمت PSC",
                distribution: "توزیع توکن PSC",
                minersReward: "پاداش ماینرها",
                liquidity: "استخر نقدینگی",
                team: "تیم توسعه",
                burn: "سوزاندن توکن",
                dao: "خزانه‌داری DAO",
                nodeStatus: "وضعیت نودها",
                mining: "Mining (فعال)",
                syncing: "Syncing (توقف)",
                offline: "Offline (خراب)",
                recentTxs: "تراکنش‌های اخیر",
                walletTitle: "کیف پول PSC",
                yourBalance: "موجودی شما",
                walletAddress: "آدرس کیف پول",
                sendTx: "ارسال تراکنش",
                recipient: "آدرس گیرنده",
                amount: "مقدار (PSC)",
                wasteType: "نوع پسماند (اختیاری)",
                weight: "وزن (kg) (اختیاری)",
                sendBtn: "ارسال تراکنش",
                sender: "فرستنده",
                receiver: "گیرنده",
                type: "نوع",
                timestamp: "زمان",
                sidebar: { dashboard: "داشبورد", wallet: "کیف پول", mining: "استخراج", classification: "طبقه‌بندی", chat: "چت AI" }
            }
        },
        specialGrants: {
            title: 'فرصت‌های گرنت استراتژیک',
            subtitle: 'لیست منتخب بودجه‌های فدرال همسو با فناوری‌های تبدیل پسماند به حذف کربن.',
            viewFullReport: 'مشاهده گزارش کامل استراتژیک',
            cifia: {
                title: 'تامین مالی زیرساخت حمل و نقل دی‌اکسید کربن (CIFIA)',
                amount: '۵۰۰,۰۰۰,۰۰۰ دلار',
                deadline: '۲ ژانویه ۲۰۲۶',
                desc: 'حمایت از زیرساخت‌های سیستم‌های حمل و نقل CO2، حیاتی برای مقیاس‌دهی حذف کربن از پسماند.'
            },
            swifr: {
                title: 'زیرساخت پسماند جامد برای بازیافت (SWIFR)',
                amount: '۲۰,۰۰۰,۰۰۰ دلار',
                deadline: '۲۳ ژانویه ۲۰۲۶',
                desc: 'بودجه برای سیستم‌های مدیریت پسماند و زیرساخت بازیافت با تمرکز بر اقتصاد چرخشی.'
            },
            viewDetails: 'مشاهده جزئیات'
        }
    },
    grantDetailPage: {
        title: 'جزئیات گرنت',
        back: 'بازگشت به داشبورد',
        grantNumber: 'شماره گرنت',
        agency: 'آژانس',
        funding: 'بودجه موجود',
        deadline: 'مهلت درخواست',
        status: 'وضعیت',
        overview: 'مرور کلی برنامه',
        features: 'ویژگی‌های کلیدی',
        eligibility: 'واجد شرایط بودن',
        whyThisFits: 'چرا این مناسب است',
        contact: 'اطلاعات تماس',
        materials: 'مواد درخواست',
    },
    grantAnalyzer: {
        title: 'تحلیل گرنت',
        close: 'بستن',
        loadingTitle: 'در حال تحلیل گرنت...',
        loadingSubtitle: 'هوش مصنوعی در حال خواندن جزئیات و ارزیابی ارتباط با پروژه شما است.',
        relevance: 'تطابق',
        viewOriginal: 'مشاهده منبع',
        exportDOCX: 'دانلود گزارش (DOCX)',
        printPDF: 'چاپ گزارش',
        deadline: 'مهلت',
        amount: 'مبلغ بودجه',
        duration: 'مدت پروژه',
        geography: 'منطقه هدف',
        eligibility: 'شرایط واجد شرایط بودن',
        scope: 'محدوده پروژه',
        howToApply: 'فرایند درخواست',
        contact: 'اطلاعات تماس',
        useForProposal: 'استفاده برای پیش‌نویس پروپوزال',
        export: {
            summaryTitle: 'خلاصه تحلیل گرنت',
            officialLink: 'لینک رسمی',
            relevance: 'امتیاز ارتباط',
            details: 'جزئیات کلیدی',
            fundingBody: 'نهاد تأمین مالی',
            deadline: 'مهلت',
            amount: 'مبلغ',
            duration: 'مدت',
            geography: 'جغرافیا',
            eligibility: 'واجد شرایط بودن',
            scope: 'محدوده',
            applicationProcess: 'نحوه درخواست',
            contact: 'تماس',
            fileName: 'تحلیل_گرنت'
        }
    },
    grantFinder: {
        title: 'یابنده گرنت',
        subtitle: 'یافتن گرنت‌های مرتبط بر اساس اسناد پروژه یا کلمات کلیدی.',
        uploadLabel: 'آپلود سند پروژه (اختیاری)',
        selectFile: 'انتخاب فایل',
        removeFile: 'حذف فایل',
        fileTypes: 'پشتیبانی از .docx, .txt, .md',
        or: 'یا',
        keywordsLabel: 'کلمات کلیدی / توضیحات جستجو',
        keywordsPlaceholder: 'مثال: "کمپوست اجتماعی"، "نوآوری بازیافت پلاستیک"',
        maxResults: 'حداکثر نتایج',
        findButton: 'یافتن گرنت‌ها',
        finding: 'در حال جستجو...',
        readingFile: 'خواندن فایل...',
        validationError: 'لطفاً کلمات کلیدی وارد کنید یا فایلی آپلود کنید.',
        fileTypeError: 'نوع فایل نامعتبر است. لطفاً .docx, .txt یا .md آپلود کنید.',
        fileReadError: 'خطا در خواندن فایل.',
        savedTitle: 'گرنت‌های ذخیره شده',
        clearAll: 'پاک کردن همه',
        from: 'از',
        deadlineLabel: 'مهلت',
        summaryLabel: 'خلاصه',
        notesLabel: 'یادداشت‌های من',
        notesPlaceholder: 'یادداشت اضافه کنید...',
        remove: 'حذف',
        useForProposal: 'استفاده برای پروپوزال',
        analyze: 'تحلیل',
        crateTitle: 'جعبه گرنت',
        crateSubtitle: 'نتایج جستجوی فعلی شما.',
        clearCrate: 'پاک کردن نتایج',
        loadingTitle: 'در حال جستجوی گرنت...',
        loadingSubtitle: 'هوش مصنوعی در حال اسکن پایگاه داده‌ها و منابع وب است.',
        sortBy: 'مرتب‌سازی بر اساس',
        saved: 'ذخیره شد',
        save: 'ذخیره',
        crateEmpty: 'هنوز گرنتی پیدا نشده است. در بالا جستجو کنید.',
        documents: 'اسناد مرتبط',
        relevance: 'ارتباط',
        parseErrorTitle: 'خروجی خام',
        parseErrorSubtitle: 'پاسخ هوش مصنوعی به جدول تبدیل نشد، اما متن آن اینجاست:',
        sort: {
            relevance: 'ارتباط',
            deadline: 'مهلت',
            amount: 'مبلغ',
            geography: 'مکان'
        },
        prompt: {
            common: 'شما یک یابنده گرنت متخصص هستید. یک جدول Markdown با ستون‌های: Grant Title, Funding Body, Summary, Deadline, Link, Requirement Documents, Relevance Score (0-100), Amount, Geography خروجی دهید. دقیق باشید.',
            supplementalKeywords: 'گرنت‌های مرتبط با این موارد را در اولویت قرار دهید: {keywords}.',
            noSupplementalKeywords: '',
            fileBased: '{common} این توضیحات پروژه را تحلیل کنید و {maxResults} گرنت منطبق پیدا کنید. {keywordInstruction} متن پروژه: {documentText}',
            keywordBased: '{common} {maxResults} گرنت منطبق با این جستجوها پیدا کنید: {queries}.'
        }
    },
    footer: {
      description: 'Satlineh راه‌حل‌های هوشمند برای مدیریت پسماند درخواستی در شهرهای مدرن ارائه می‌دهد.',
      quickLinks: 'لینک‌های سریع',
      contact: 'تماس با ما',
      address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
      copyright: '© ۲۰۲۴ Satlineh. تمامی حقوق محفوظ است.',
    },
    quotaErrorModal: {
      title: 'محدودیت API',
      body: 'شما از حد مجاز روزانه خود برای API جمنای فراتر رفته‌اید. لطفاً تنظیمات صورتحساب خود را بررسی کنید یا فردا دوباره تلاش کنید.',
      cta: 'بررسی صورتحساب',
      close: 'بستن',
    },
    confirmationModal: {
      title: 'تایید جمع‌آوری',
      estimatedWeight: 'وزن تخمینی:',
      pickupQuote: 'هزینه تخمینی:',
      cancel: 'لغو',
      confirm: 'تایید درخواست',
      successTitle: 'خودرو اعزام شد!',
      successBody: 'یک خودرو جمع‌آوری اعزام شد. شما می‌توانید ورود آن را در اپلیکیشن واقعی پیگیری کنید.',
      done: 'انجام شد',
    },
    examplePrompts: {
        try: 'امتحان کنید:',
        smartPrediction: ['تهران، نارمک', 'شهرک صنعتی اراک', 'اصفهان، جلفا'],
        wasteSiteAnalysisLocation: ['تهران، خیابان ولیعصر', 'شهرک صنعتی شمس‌آباد', 'مجتمع مسکونی اکباتان'],
        wasteSiteAnalysisDescription: [
            'یک مجتمع مسکونی ۵۰ واحدی که به دنبال بهینه‌سازی بازیافت است.',
            'یک انبار تجاری با خروجی کارتن بالا.',
            'رستوران جدید در مرکز شهر با برنامه کمپوست پسماند غذا.'
        ],
        grantFinder: [
            'گرنت‌های کمپوست اجتماعی',
            'بودجه برای نوآوری بازیافت پلاستیک',
            'گرنت استارتاپی اقتصاد چرخشی'
        ],
        grantApplication: [
          'پروژه ما راه‌اندازی سرویس جمع‌آوری کمپوست برای ۵۰۰ خانه است.',
          'ما در حال توسعه فناوری جدیدی برای جداسازی پلاستیک‌های مخلوط هستیم.',
          'این پروژه باغ اجتماعی برای سطل‌های کمپوست نیاز به بودجه دارد.'
        ],
        supplierFinder: [
            'تامین‌کننده سطل بازیافت تجاری',
            'تراکم‌ساز کارتن صنعتی',
            'سنسورهای هوشمند پسماند برای مخازن'
        ],
        impactReporter: [
            'رستورانی با تولید ۵ تن پسماند غذا در ماه.',
            'ساختمان اداری با ۲۰۰ کارمند با هدف پسماند صفر.',
            'کارخانه تولیدی کوچک با ضایعات پلاستیک.'
        ],
        wasteNews: [
            'پیشرفت‌های بازیافت شیمیایی',
            'قوانین مسئولیت تولیدکننده',
            'تاثیر ممنوعیت پلاستیک‌های یکبار مصرف'
        ],
        aiResearcher: [
            'میکروپلاستیک‌ها در اقیانوس',
            'اقتصاد بازیافت آلومینیوم',
            'بیوپلاستیک‌ها و اثرات زیست‌محیطی آنها'
        ],
        recyclingCalculator: ['5', '20', '150'],
        aiAssistant: [
            'چطور جعبه پیتزا را بازیافت کنم؟',
            'مزایای کمپوست چیست؟',
            'درباره اقتصاد چرخشی بگو.'
        ],
        zeroWaste: [
            'چطور پسماند غذا را در آشپزخانه کاهش دهم؟',
            'ایده‌هایی برای استفاده مجدد از شیشه‌های مربا',
            'محصولات نظافت بدون پسماند'
        ],
        ecoCreator: [
            'سناریو ویدیو: ۵ روش استفاده از پوست لیمو',
            'داستان: کیسه پلاستیکی که می‌خواست گلدان شود',
            'سناریو ویدیو: ساخت سطل کمپوست در خانه'
        ]
    }
  },
};
