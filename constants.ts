
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
      wpDashboard: 'Admin Panel'
    },
    // ... existing translations ...
    hero: {
      title: 'The Future of Urban Waste, <br/> <span class="text-primary-500">On-Demand.</span>',
      subtitle: 'EcoRide combines smart technology with on-demand service to make waste collection efficient, clean, and simple. Like Uber, but for your recycling.',
      button1: 'Request Pickup',
      button2: 'View Dashboard',
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
                ]
            }
        ]
    },
    dashboardLesson: {
        title: 'Dashboard Overview',
        breadcrumb: 'Home / Lesson Plans / Dashboard Overview',
        intro: 'In this lesson, you will learn that the SmartWaste Dashboard is the central command center for managing waste collection and analysis. On the Dashboard, you will find both real-time status information and tools for predictive analysis. This lesson will show you how the Dashboard is organized and how to navigate it to access the various features of the EcoRide platform.',
        objectivesTitle: 'Objectives',
        objectives: [
            'Access the Smart Dashboard.',
            'Identify Dashboard components including Live Feed, Smart Prediction, and Analytics.',
            'Switch between List and Map views for waste requests.',
            'Use AI tools to predict waste volume.',
            'Interpret system analytics and performance metrics.'
        ],
        prerequisitesTitle: 'Prerequisite Skills',
        prerequisites: [
            'Familiarity with web browser navigation.',
            'Understanding of basic waste management concepts (e.g., waste types).',
            'Access to the EcoRide platform.'
        ],
        walkthroughTitle: 'Hands-on Walk-through',
        accessSection: {
            title: 'Accessing the Dashboard',
            content: 'To access the dashboard, simply click on the "Dashboard" button in the main navigation bar. This serves as your primary entry point for operational tasks.'
        },
        componentsSection: {
            title: 'Dashboard Components',
            content: 'The Dashboard is divided into three main tabs, which you can toggle between using the navigation pill at the top:',
            items: [
                { title: 'Live Feed', desc: 'This is the default view. It shows a list of incoming waste collection requests. You can see the location, waste type, volume, and status (Pending, En Route, Completed). Use the "Dispatch" button to assign vehicles.' },
                { title: 'Smart Prediction', desc: 'This tab leverages AI to forecast waste volumes. Enter a location (e.g., "Tehran, Narmak") to get a prediction on waste generation for that area.' },
                { title: 'Analysis & Stats', desc: 'This tab provides a high-level overview of system performance, including AI accuracy, daily report counts, and routing efficiency improvements.' }
            ]
        },
        viewSection: {
            title: 'List vs. Map View',
            content: 'In the Live Feed tab, you will notice a toggle in the top right corner. This allows you to switch between a tabular "List View" and a geospatial "Map View". The Map View provides a visual representation of pending requests (yellow), en-route vehicles (blue), and completed pickups (green) on an interactive map.'
        },
        exercisesTitle: 'Exercises',
        exercises: [
            { title: 'Customize View', desc: 'Try switching between List View and Map View to see how the data presentation changes.' },
            { title: 'Run a Prediction', desc: 'Go to the Smart Prediction tab and run a prediction for "Tehran, Azadi Square".' }
        ],
        quizTitle: 'Quiz',
        quiz: [
            { question: 'What is the default tab on the Dashboard?', options: ['Analysis', 'Live Feed', 'Settings'], answer: 'Live Feed' },
            { question: 'Which feature helps you see waste trucks on a map?', options: ['List View', 'Map View', 'Analytics'], answer: 'Map View' },
            { question: 'What does the AI Prediction tool do?', options: ['Sorts waste', 'Predicts waste volume', 'Finds grants'], answer: 'Predicts waste volume' }
        ],
        sidebarTitle: 'Lesson Details',
        sidebar: {
            duration: 'Duration: 15 mins',
            audience: 'Audience: Admins, Operators',
            level: 'Level: Beginner',
            type: 'Type: Demonstration',
            version: 'Version: 2.0.0'
        }
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
            }
        }
    },
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
    // ... existing translations ...
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
      title: 'EcoRide AI Assistant',
      subtitle: 'Your personal AI expert for waste management. Ask about sorting, recycling, or sustainability.',
      placeholder: 'Ask a question...',
      welcomeMessage: 'Hello! I am the EcoRide AI Assistant. How can I help you today?',
    },
    footer: {
      description: 'EcoRide provides intelligent solutions for on-demand waste management in modern cities.',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      address: '123 Smart City Ave, Tehran, 12345',
      copyright: '© 2024 EcoRide. All Rights Reserved.',
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
      wpDashboard: 'پنل مدیریت'
    },
    // ... existing FA translations ...
    // Note: I will only add the NEW keys here for brevity in the response, 
    // assuming I can append or merge. But the instruction says "Full content of file".
    // So I will replicate structure.
    hero: {
      title: 'آینده پسماند شهری، <br/> <span class="text-primary-500">در لحظه.</span>',
      subtitle: 'EcoRide تکنولوژی هوشمند را با خدمات درخواستی ترکیب می‌کند تا جمع‌آوری پسماند را کارآمد، پاک و ساده سازد. مانند اسنپ، اما برای بازیافت شما.',
      button1: 'درخواست جمع‌آوری',
      button2: 'مشاهده داشبورد',
    },
    homeServices: {
        title: "یک اپلیکیشن برای تمام نیازها",
        subtitle: "از جمع‌آوری درخواستی تا تحلیل‌های هوشمند، همه چیز در یک جا.",
        categories: [
            { 
                name: "خدمات اصلی",
                services: [
                    { page: "waste_collection", name: "جمع‌آوری هوشمند پسماند", description: "با تحلیل هوشمند پسماند از طریق دوربین، درخواست جمع‌آوری فوری دهید." },
                    { page: "smart_dashboard", name: "داشبورد هوشمند", description: "درخواست‌های زنده را نظارت کنید، حجم پسماند را پیش‌بینی کنید و عملکرد سیستم را تحلیل کنید." },
                    { page: "real_time_dashboard", name: "عملیات زنده ML", description: "نظارت بر زیرساخت‌های در لحظه، با قدرت Kafka + RisingWave + Grafana." },
                ]
            },
            {
                name: "برنامه‌ریزی و تحلیل",
                services: [
                    { page: "waste_site_analysis", name: "تحلیل سایت پسماند", description: "گزارشی مبتنی بر هوش مصنوعی از پتانسیل مدیریت پسماند برای هر مکان دریافت کنید." },
                    { page: "impact_reporter", name: "گزارشگر اثرات", description: "گزارش‌های دقیق اثرات زیست‌محیطی برای جریان پسماند خود تولید کنید." },
                    { page: "recycling_calculator", name: "محاسبه‌گر بازیافت", description: "مزایای مالی اجرای یک برنامه بازیافت را تخمین بزنید." },
                ]
            },
            {
                name: "رشد و پژوهش",
                services: [
                    { page: "grant_finder", name: "کمک هزینه یاب", description: "فرصت‌های تأمین مالی برای پروژه‌های پایداری و بازیافت خود را پیدا کنید." },
                    { page: "supplier_finder", name: "تامین‌کننده یاب", description: "تامین‌کنندگان سطل‌های بازیافت، کمپوسترها و سایر تجهیزات را کشف کنید." },
                    { page: "waste_news", name: "اخبار پسماند و بازیافت", description: "خلاصه‌های هوشمند از آخرین روندها و تحقیقات در این صنعت دریافت کنید." },
                    { page: "ai_researcher", name: "پژوهشگر هوش مصنوعی", description: "با یک گزارش ساختاریافته هوش مصنوعی، تحقیقات عمیق در مورد هر موضوعی انجام دهید." },
                ]
            },
            {
                name: "سبک زندگی و توانمندسازی",
                services: [
                    { page: "zero_waste", name: "پسماند صفر و استودیوی خلاق", description: "عادات پسماند صفر را بیاموزید و از سفر سبز خود محتوای پولساز (ویدیو/کتاب) تولید کنید." },
                    { page: "dashboard_lesson", name: "آموزش داشبورد", description: "یک برنامه درسی جامع در مورد نحوه ناوبری و استفاده از داشبورد SmartWaste." },
                ]
            }
        ]
    },
    dashboardLesson: {
        title: 'مرور کلی داشبورد',
        breadcrumb: 'خانه / طرح درس / مرور کلی داشبورد',
        intro: 'در این درس، یاد خواهید گرفت که داشبورد SmartWaste مرکز فرماندهی اصلی برای مدیریت جمع‌آوری و تحلیل پسماند است. در داشبورد، هم اطلاعات وضعیت در لحظه و هم ابزارهای تحلیل پیش‌بینی‌کننده را خواهید یافت. این درس به شما نشان می‌دهد که داشبورد چگونه سازماندهی شده و چگونه می‌توان برای دسترسی به ویژگی‌های مختلف پلتفرم EcoRide در آن پیمایش کرد.',
        objectivesTitle: 'اهداف',
        objectives: [
            'دسترسی به داشبورد هوشمند.',
            'شناسایی اجزای داشبورد از جمله فید زنده، پیش‌بینی هوشمند و تحلیل‌ها.',
            'جابجایی بین نمای لیست و نقشه برای درخواست‌های پسماند.',
            'استفاده از ابزارهای هوش مصنوعی برای پیش‌بینی حجم پسماند.',
            'تفسیر معیارهای تحلیلی و عملکرد سیستم.'
        ],
        prerequisitesTitle: 'مهارت‌های پیش‌نیاز',
        prerequisites: [
            'آشنایی با پیمایش در مرورگر وب.',
            'درک مفاهیم اولیه مدیریت پسماند (مانند انواع پسماند).',
            'دسترسی به پلتفرم EcoRide.'
        ],
        walkthroughTitle: 'راهنمای عملی',
        accessSection: {
            title: 'دسترسی به داشبورد',
            content: 'برای دسترسی به داشبورد، کافیست روی دکمه "داشبورد" در نوار ناوبری اصلی کلیک کنید. این به عنوان نقطه ورود اصلی شما برای وظایف عملیاتی عمل می‌کند.'
        },
        componentsSection: {
            title: 'اجزای داشبورد',
            content: 'داشبورد به سه زبانه اصلی تقسیم شده است که می‌توانید با استفاده از نوار بالایی بین آنها جابجا شوید:',
            items: [
                { title: 'فید زنده', desc: 'این نمای پیش‌فرض است. لیستی از درخواست‌های جمع‌آوری پسماند ورودی را نشان می‌دهد. می‌توانید مکان، نوع پسماند، حجم و وضعیت (در انتظار، در مسیر، تکمیل شده) را مشاهده کنید. از دکمه "اعزام" برای اختصاص خودروها استفاده کنید.' },
                { title: 'پیش‌بینی هوشمند', desc: 'این زبانه از هوش مصنوعی برای پیش‌بینی حجم پسماند استفاده می‌کند. یک مکان (مثلاً "تهران، نارمک") وارد کنید تا پیش‌بینی تولید پسماند برای آن منطقه را دریافت کنید.' },
                { title: 'تحلیل و آمار', desc: 'این زبانه یک نمای کلی سطح بالا از عملکرد سیستم، از جمله دقت هوش مصنوعی، تعداد گزارش‌های روزانه و بهبود کارایی مسیریابی ارائه می‌دهد.' }
            ]
        },
        viewSection: {
            title: 'نمای لیست در مقابل نقشه',
            content: 'در زبانه فید زنده، یک دکمه تغییر وضعیت در گوشه بالا سمت راست مشاهده خواهید کرد. این به شما امکان می‌دهد بین "نمای لیست" جدولی و "نمای نقشه" جغرافیایی جابجا شوید. نمای نقشه نمایش بصری درخواست‌های در انتظار (زرد)، خودروهای در مسیر (آبی) و جمع‌آوری‌های تکمیل شده (سبز) را روی نقشه تعاملی ارائه می‌دهد.'
        },
        exercisesTitle: 'تمرین‌ها',
        exercises: [
            { title: 'شخصی‌سازی نما', desc: 'سعی کنید بین نمای لیست و نمای نقشه جابجا شوید تا ببینید ارائه داده‌ها چگونه تغییر می‌کند.' },
            { title: 'اجرای یک پیش‌بینی', desc: 'به زبانه پیش‌بینی هوشمند بروید و یک پیش‌بینی برای "تهران، میدان آزادی" اجرا کنید.' }
        ],
        quizTitle: 'آزمون',
        quiz: [
            { question: 'زبانه پیش‌فرض در داشبورد چیست؟', options: ['تحلیل', 'فید زنده', 'تنظیمات'], answer: 'فید زنده' },
            { question: 'کدام ویژگی به شما کمک می‌کند کامیون‌های پسماند را روی نقشه ببینید؟', options: ['نمای لیست', 'نمای نقشه', 'تحلیل‌ها'], answer: 'نمای نقشه' },
            { question: 'ابزار پیش‌بینی هوش مصنوعی چه کاری انجام می‌دهد؟', options: ['تفکیک پسماند', 'پیش‌بینی حجم پسماند', 'یافتن کمک‌های مالی'], answer: 'پیش‌بینی حجم پسماند' }
        ],
        sidebarTitle: 'جزئیات درس',
        sidebar: {
            duration: 'مدت زمان: ۱۵ دقیقه',
            audience: 'مخاطب: مدیران، اپراتورها',
            level: 'سطح: مبتدی',
            type: 'نوع: نمایشی',
            version: 'نسخه: ۲.۰.۰'
        }
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
            }
        }
    },
    grantOpportunitiesPage: {
        back: 'بازگشت به داشبورد',
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
    realTimeDashboard: {
        title: 'مرکز عملیات زنده یادگیری ماشین',
        subtitle: 'نظارت در لحظه بر داده‌های سنسور و پیش‌بینی‌های هوش مصنوعی، با قدرت Apache Kafka، RisingWave و Grafana.',
        stat1: 'نرخ دریافت داده',
        stat2: 'تاخیر میانگین',
        stat3: 'سنسورهای فعال',
        stat4: 'ناهمجاری‌ها',
        chart1: 'نوسانات متریک (کندل‌استیک)',
        chart2: 'اطمینان پیش‌بینی مدل ML',
        log: 'لاگ‌های پایپ‌لاین (Kafka/RisingWave)',
        back: 'بازگشت به خانه'
    },
    wasteCollectorPage: {
        title: 'تحلیل پسماند و درخواست جمع‌آوری با هوش مصنوعی',
        subtitle: 'از دوربین خود برای شناسایی پسماند، یادگیری نحوه تفکیک و ثبت درخواست جمع‌آوری فوری استفاده کنید.',
        startCamera: 'شروع دوربین',
        stopCamera: 'توقف دوربین',
        capture: 'عکس گرفتن',
        upload: 'آپلود عکس',
        analyzing: 'در حال تحلیل پسماند...',
        analysisResults: 'نتایج تحلیل',
        instructions: 'برای شروع، پسماند خود را اسکن کنید.',
        identifiedItems: 'موارد شناسایی‌شده',
        category: 'دسته‌بندی',
        recycling: 'بازیافت',
        landfill: 'دفن',
        compost: 'کمپوست',
        special: 'ویژه',
        pickupQuote: 'هزینه جمع‌آوری',
        estimatedWeight: 'وزن تخمینی',
        recyclingPotential: 'پتانسیل بازیافت',
        requestPickup: 'درخواست جمع‌آوری با هزینه {price}',
        cameraError: 'دسترسی به دوربین ممکن نیست. لطفاً مجوزها را بررسی کنید.',
    },
    wasteSiteAnalysisPage: {
      title: 'تحلیل سایت پسماند با هوش مصنوعی',
      formTitle: 'مکان خود را تحلیل کنید',
      locationLabel: 'مکان (آدرس یا مختصات)',
      locationPlaceholder: 'مثال: "خیابان اصلی ۱۲۳، تهران"',
      descriptionLabel: 'اهداف پروژه یا مشخصات سایت را توصیف کنید (اختیاری)',
      descriptionPlaceholder: 'مثال: «یک مجتمع آپارتمانی ۵۰ واحدی که به دنبال بهینه‌سازی برنامه بازیافت است.»',
      uploadPhoto: 'آپلود تصویر مکان (اختیاری)',
      photoUploaded: 'تصویر با موفقیت آپلود شد!',
      removePhoto: 'حذف تصویر',
      buttonText: 'اجرای تحلیل',
      generating: 'در حال تحلیل...',
      validationError: 'لطفا برای شروع تحلیل، یک مکان ارائه دهید.',
      resultsTitle: 'نتایج تحلیل',
      placeholder: 'تحلیل مدیریت پسماند شما در اینجا ظاهر می‌شود.',
      siteSuitability: 'مناسب بودن سایت برای مدیریت پسماند',
      estimatedDiversion: 'تخمین انحراف ماهانه پسماند از دفن',
      potentialSavings: 'صرفه‌جویی بالقوه سالانه (از انحراف)',
      recommendations: 'توصیه‌های سطل و تجهیزات',
      logistics: 'ملاحظات لجستیکی',
    },
    grantFinderPage: {
      title: 'یابنده کمک هزینه و بودجه بازیافت',
      subtitle: 'هوش مصنوعی ما آخرین کمک‌های مالی بازیافت، کمپوست و کاهش پسماند را برای حمایت از پروژه شما جستجو می‌کند.',
      searchPlaceholder: 'مثال: «کمک‌های مالی برای کمپوست اجتماعی در تهران»',
      searchButton: 'جستجوی کمک‌های مالی',
      searching: 'در حال جستجو...',
      error: 'خطایی غیرمنتظره هنگام جستجو رخ داد.',
      placeholder: 'فرصت‌های کمک مالی در اینجا نمایش داده خواهد شد.',
      resultsTitle: 'فرصت‌های کمک مالی یافت‌شده',
      issuingAgency: 'آژانس صادرکننده',
      eligibility: 'شرایط لازم',
      applyNow: 'اطلاعات بیشتر / درخواست',
      prepareApplication: 'آماده‌سازی درخواست',
      applicationAssistant: 'دستیار درخواست برای: {grantName}',
      backToResults: 'بازگشت به نتایج',
      projectDescriptionLabel: 'پروژه، اهداف و تیم خود را توصیف کنید.',
      projectDescriptionPlaceholder: 'مثال: «پروژه ما قصد دارد سرویس جمع‌آوری کمپوست خانگی را برای ۵۰۰ خانه راه‌اندازی کند...»',
      generateDraftButton: 'تولید پیش‌نویس درخواست',
      generatingDraft: 'در حال تولید پیش‌نویس...',
      draftResultsTitle: 'پیش‌نویس درخواست شما',
      businessPlanOutline: 'طرح کلی کسب‌وکار',
      applicationSections: 'بخش‌های پیش‌نویس شده درخواست',
      nextSteps: 'مراحل بعدی پیشنهادی',
    },
    supplierFinderPage: {
      title: 'جستجوگر تامین‌کنندگان تجهیزات',
      subtitle: 'تامین‌کنندگان سطل‌های بازیافت، کمپوسترها، فشرده‌سازها و سایر تجهیزات مدیریت پسماند را پیدا کنید.',
      searchPlaceholder: 'مثال: «تامین‌کننده سطل بازیافت تجاری در تهران»',
      searchButton: 'جستجوی تامین‌کنندگان',
      searching: 'در حال جستجو...',
      error: 'خطایی غیرمنتظره هنگام جستجو برای تامین‌کنندگان رخ داد.',
      placeholder: 'اطلاعات تامین‌کنندگان در اینجا نمایش داده خواهد شد.',
      resultsTitle: 'تامین‌کنندگان تجهیزات یافت‌شده',
      visitWebsite: 'بازدید از وب‌سایت',
    },
    impactReporterPage: {
      title: 'گزارشگر اثرات جریان پسماند',
      subtitle: 'گزارش‌های دقیق اثرات زیست‌محیطی برای جریان پسماند سازمان خود را در چند دقیقه تولید کنید.',
      descriptionLabel: 'پسماند پروژه یا سازمان خود را برای تحلیل اثرات توصیف کنید.',
      descriptionPlaceholder: 'مثال: «یک رستوران متوسط با تولید ۵ تن پسماند غذایی در ماه.»',
      buttonText: 'تولید گزارش اثرات',
      generating: 'در حال تولید گزارش...',
      validationError: 'لطفاً توضیحات را ارائه دهید.',
      placeholder: 'گزارش اثرات زیست‌محیطی شما در اینجا نمایش داده خواهد شد.',
      resultsTitle: 'گزارش اثرات زیست‌محیطی',
      executiveSummary: 'خلاصه اجرایی',
      positiveImpacts: 'اثرات مثبت',
      potentialRisks: 'ریسک‌ها و نگرانی‌های بالقوه',
      mitigationStrategies: 'راهبردهای کاهش ریسک',
      sustainabilityScore: 'امتیاز کلی پایداری',
    },
    wasteNewsPage: {
        title: 'اخبار پسماند و بازیافت',
        subtitle: 'هر موضوعی را برای دریافت خلاصه‌ای هوشمند از روندهای فعلی در اقتصاد چرخشی و مدیریت پسماند، با پشتیبانی جستجوی گوگل، تحقیق کنید.',
        searchPlaceholder: 'مثال: «پیشرفت‌ها در بازیافت شیمیایی»',
        searchButton: 'تحقیق',
        searching: 'در حال تحقیق...',
        error: 'خطایی در حین تحقیق رخ داد. لطفاً دوباره تلاش کنید.',
        placeholder: 'خلاصه تحقیق شما در اینجا نمایش داده خواهد شد.',
        sources: 'منابع',
        relatedTopics: 'موضوعات مرتبط',
    },
    aiResearcherPage: {
      title: 'دستیار پژوهش عمیق',
      subtitle: 'از هوش مصنوعی برای انجام تحقیقات عمیق در مورد هر موضوعی و ترکیب اطلاعات از سراسر وب در یک گزارش ساختاریافته استفاده کنید.',
      searchPlaceholder: 'مثال: «میکروپلاستیک‌ها در اقیانوس»',
      searchButton: 'انجام تحقیق',
      searching: 'در حال تحقیق...',
      error: 'خطایی در حین تحقیق عمیق رخ داد. لطفاً دوباره تلاش کنید.',
      placeholder: 'گزارش تحقیق دقیق شما در اینجا ظاهر می‌شود.',
      resultsTitle: 'گزارش تحقیق عمیق',
      keyFindings: 'یافته‌های کلیدی',
      detailedSummary: 'خلاصه تفصیلی',
      keyConcepts: 'مفاهیم و موجودیت‌های کلیدی',
      futureOutlook: 'چشم‌انداز آینده',
      sources: 'منابع',
    },
    recyclingCalculatorPage: {
        title: 'محاسبه‌گر ارزش بازیافت',
        subtitle: 'یک تخمین سریع و هوشمند از مزایای مالی بازیافت برای کسب‌وکار خود دریافت کنید.',
        billLabel: 'میانگین حجم ماهانه پسماند (تن)',
        billPlaceholder: 'مثال: ۵',
        buttonText: 'محاسبه صرفه‌جویی',
        calculating: 'در حال محاسبه...',
        validationError: 'لطفاً حجم معتبر پسماند ماهانه را وارد کنید.',
        resultsTitle: 'سود سالانه تخمینی شما',
        annualSavings: 'صرفه‌جویی سالانه در هزینه دفن',
        annualRevenue: 'درآمد سالانه از بازیافت',
        totalBenefit: 'کل سود سالانه',
        notes: 'یادداشت‌ها و مفروضات',
        placeholder: 'نتایج محاسبه شما در اینجا نمایش داده می‌شود.',
    },
    zeroWastePage: {
        title: 'مربی پسماند صفر و استودیوی خلاق',
        subtitle: 'عادات سازگار با محیط زیست را از یک مربی متخصص بیاموزید و سفر خود را به محتوای پولساز (ویدیو یا کتاب) تبدیل کنید تا خودتان را توانمند سازید.',
        tabCoach: 'سوال از مربی',
        tabCreator: 'استودیوی خلاقیت سبز',
        tabToolkit: 'کیت‌های پسماند صفر',
        coach: {
            title: 'مربی پسماند صفر',
            description: 'با الهام از آیه حمداوی. توصیه‌های عملی و متناسب با فرهنگ برای به حداقل رساندن پسماند در خانه دریافت کنید.',
            placeholder: 'مثال: «چطور می‌توانم زباله‌ها را در آشپزخانه کاهش دهم؟» یا «با لباس‌های کهنه چه کار کنم؟»',
            button: 'دریافت مشاوره',
            difficulty: 'سختی',
            cost: 'هزینه',
            findKit: 'جستجوی محصول',
        },
        creator: {
            title: 'تبدیل عادات سبز به درآمد و اثرگذاری',
            intro: 'حتی کارهای کوچک مانند خشک کردن زباله تر، پر کردن مجدد شوینده‌ها یا استفاده مجدد از پارچه‌ها مهم هستند. اکنون می‌توانید این تجربیات واقعی را به محتوایی تبدیل کنید که الهام‌بخش دیگران باشد و درآمدزایی کند.',
            howItWorksTitle: 'چگونه کار می‌کند',
            steps: [
                { title: 'داستان خود را بگویید', desc: 'عادات پسماند صفر خود را به اشتراک بگذارید: کاهش زباله، خرید، یا تعمیر.' },
                { title: 'مسیر خود را انتخاب کنید', desc: 'انتخاب کنید: ویدیوی یوتیوب، کتاب الکترونیکی، یا کمیک کودکان.' },
                { title: 'هوش مصنوعی برنامه را می‌سازد', desc: 'هوش مصنوعی فیلمنامه، فصل‌ها یا استوری‌برد را با نکات درآمدزایی تولید می‌کند.' }
            ],
            optionsTitle: 'گزینه‌های تولید محتوا',
            options: [
                { title: 'کانال یوتیوب', desc: 'عنوان‌های جذاب، فیلمنامه کامل و ایده‌های تامنیل برای آموزش یا ولاگ دریافت کنید.' },
                { title: 'کتاب / راهنما', desc: 'فصل‌بندی ساختاریافته و نکات گام‌به‌گام برای انتشار در آمازون KDP بسازید.' },
                { title: 'کمیک کودکان', desc: 'داستان و پرامپت‌های تصویرسازی برای کتاب‌های کودک (مانند پروژه‌های کمیک HuggingFace).' }
            ],
            whyTitle: 'چرا این مهم است',
            benefits: [
                'اثر زیست‌محیطی: به دیگران آموزش دهید زباله را کاهش دهند.',
                'توانمندسازی اقتصادی: از محتوای خود درآمد کسب کنید.',
                'تغییر اجتماعی: پسماند صفر را به یک فرهنگ مشترک تبدیل کنید.',
                'الهام‌بخشی: نمونه‌های واقعی از یک خانه واقعی را نشان دهید.'
            ],
            ctaTitle: 'سفر خلاقانه پسماند صفر خود را شروع کنید',
            topicLabel: 'نکته سبز یا ایده داستان شما چیست؟',
            topicPlaceholder: 'مثال: «چگونه از روغن مانده صابون درست کنیم» یا «داستان یک بطری پلاستیکی که می‌خواست گلدان شود»',
            formatLabel: 'فرمت محتوا',
            formatYouTube: 'فیلمنامه ویدیوی یوتیوب',
            formatBook: 'کتاب کودک / داستان کمیک',
            button: 'تولید برنامه محتوا',
            monetizationTitle: 'نکات درآمدزایی',
        },
        toolkit: {
            title: 'جعبه ابزار مدیریت پسماند صفر',
            subtitle: 'کیت‌های شروع و پکیج‌های ضروری برای تکمیل هر بخش از پروژه مدیریت پسماند صفر شما.',
            findOnAmazon: 'خرید از دیجی‌کالا و ترب',
            products: [
                {
                    part: 'بخش ۱: پوساندن (پسماند آلی)',
                    category: 'سیستم کمپوست',
                    name: 'سطل کمپوست رومیزی استیل ضد زنگ با فیلتر ذغال',
                    description: 'یک سطل ۱.۳ گالنی برای ضایعات آشپزخانه. شامل فیلتر ذغال برای جلوگیری از بو. ضروری برای مدیریت پسماند غذا بدون دور ریختن.',
                    price: '$22.00 - $30.00',
                    goal: 'پسماند غذایی را از دفن منحرف می‌کند و خاک مغذی می‌سازد.',
                    searchTerm: 'سطل کمپوست خانگی'
                },
                {
                    part: 'بخش ۲: کاهش (آشپزخانه)',
                    category: 'جایگزین سلفون پلاستیکی',
                    name: 'پک ۳ تایی پارچه مومی (Beeswax Wrap)',
                    description: 'مجموعه‌ای از پارچه‌های نخی پوشیده شده با موم زنبور عسل، روغن جوجوبا و رزین. برای پوشاندن کاسه‌ها یا بسته بندی غذا به جای سلفون پلاستیکی یکبار مصرف استفاده می‌شود.',
                    price: '$14.00 - $18.00',
                    goal: 'حذف پلاستیک یکبار مصرف آشپزخانه.',
                    searchTerm: 'پارچه مومی نگهداری غذا'
                },
                {
                    part: 'بخش ۳: امتناع (خرید)',
                    category: 'مدیریت خرید',
                    name: 'کیسه‌های توری خرید قابل شستشو (ست ۹ تایی)',
                    description: 'کیسه‌های توری نخی با بند کشی در اندازه‌های مختلف (کوچک، متوسط، بزرگ). برای میوه و سبزیجات در فروشگاه استفاده می‌شود تا از کیسه‌های پلاستیکی رولی اجتناب شود.',
                    price: '$10.00 - $15.00',
                    goal: 'توقف پسماند پلاستیکی در مبدا (فروشگاه).',
                    searchTerm: 'کیسه توری میوه و سبزیجات'
                },
                {
                    part: 'بخش ۴: استفاده مجدد (حمام)',
                    category: 'کیت بهداشت شخصی',
                    name: 'کیت شروع پسماند صفر حمام',
                    description: 'معمولاً شامل: ۴ مسواک بامبو، نخ دندان زیست‌تخریب‌پذیر (ابریشم/ذرت) و پدهای نخی قابل شستشو برای پاک کردن آرایش.',
                    price: '$18.00 - $25.00',
                    goal: 'جایگزینی برس‌های پلاستیکی غیرقابل بازیافت و پنبه‌های یکبار مصرف.',
                    searchTerm: 'مسواک بامبو'
                },
                {
                    part: 'بخش ۵: نظافت',
                    category: 'پکیج نظافت سبز',
                    name: 'ست اسفنج و برس آشپزخانه تجزیه‌پذیر',
                    description: 'شامل اسفنج‌های گیاهی (لوفا) و برس‌های بطری الیاف نارگیل. این‌ها برخلاف اسفنج‌های پلاستیکی زرد/سبز به طور طبیعی تجزیه می‌شوند.',
                    price: '$15.00 - $20.00',
                    goal: 'کاهش ورود میکروپلاستیک‌ها به سیستم آب.',
                    searchTerm: 'اسکاچ گیاهی لوفا'
                },
                {
                    part: 'بخش ۶: تفکیک',
                    category: 'سازماندهی پسماند',
                    name: 'برچسب‌های سطل بازیافت (ست ۶ تایی)',
                    description: 'برچسب‌های بزرگ و ضد آب برای سطل‌ها با عناوین: "زباله"، "بازیافت"، "کمپوست". نشانه‌های بصری برای مدیریت موثر پسماند حیاتی هستند.',
                    price: '$8.00 - $12.00',
                    goal: 'تضمین تفکیک صحیح جریان‌های پسماند.',
                    searchTerm: 'برچسب تفکیک زباله'
                }
            ],
            implementation: {
                title: 'نحوه اجرا (گام به گام)',
                steps: [
                    { phase: 'فاز ۱: ممیزی', desc: 'خرید برچسب‌های تفکیک (بخش ۶). سطل‌های فعلی را برچسب بزنید تا فوراً پسماند را سازماندهی کنید.' },
                    { phase: 'فاز ۲: تغییر بزرگ', desc: 'خرید سطل کمپوست (بخش ۱). پسماند غذایی معمولاً سنگین‌ترین بخش زباله است. تفکیک آن بیشترین تاثیر را دارد.' },
                    { phase: 'فاز ۳: بهینه‌سازی', desc: 'خرید کیسه‌های خرید (بخش ۳) و پارچه‌های مومی (بخش ۲). این‌ها عادات روزانه‌ای هستند که ورود پلاستیک را کاهش می‌دهند.' },
                    { phase: 'فاز ۴: سبک زندگی', desc: 'معرفی کیت‌های حمام (بخش ۴) و نظافت (بخش ۵) زمانی که نسخه‌های پلاستیکی قدیمی فرسوده شدند.' }
                ]
            },
            searchTips: {
                title: 'نکات جستجو',
                description: 'برای یافتن بهترین قیمت‌ها، از این عبارات دقیق در نوار جستجو استفاده کنید:',
                tips: [
                    'سطل کمپوست خانگی',
                    'کیسه خرید پارچه‌ای',
                    'مسواک بامبو',
                    'سطل زباله تفکیک'
                ]
            }
        }
    },
    aiAssistantPage: {
      title: 'دستیار هوش مصنوعی EcoRide',
      subtitle: 'کارشناس شخصی هوش مصنوعی شما برای مدیریت پسماند. در مورد تفکیک، بازیافت یا پایداری سوال بپرسید.',
      placeholder: 'یک سوال بپرسید...',
      welcomeMessage: 'سلام! من دستیار هوش مصنوعی EcoRide هستم. چطور می‌توانم امروز به شما کمک کنم؟',
    },
    footer: {
      description: 'EcoRide راهکارهای هوشمند برای مدیریت پسماند درخواستی در شهرهای مدرن ارائه می‌دهد.',
      quickLinks: 'لینک‌های سریع',
      contact: 'تماس با ما',
      address: 'خیابان شهر هوشمند ۱۲۳، تهران، ۱۲۳۴۵',
      copyright: '© ۲۰۲۴ EcoRide. تمامی حقوق محفوظ است.',
    },
    quotaErrorModal: {
      title: 'محدودیت API تمام شد',
      body: 'شما از محدودیت روزانه خود برای API جمنای فراتر رفته‌اید. لطفاً تنظیمات صورتحساب خود را بررسی کنید یا فردا دوباره تلاش کنید.',
      cta: 'بررسی صورتحساب',
      close: 'بستن',
    },
    confirmationModal: {
      title: 'تایید جمع‌آوری',
      estimatedWeight: 'وزن تخمینی:',
      pickupQuote: 'هزینه جمع‌آوری:',
      cancel: 'لغو',
      confirm: 'تایید جمع‌آوری',
      successTitle: 'جمع‌آوری‌کننده اعزام شد!',
      successBody: 'یک خودروی جمع‌آوری اعزام شده است. در یک برنامه واقعی می‌توانید ورود آن را پیگیری کنید.',
      done: 'انجام شد',
    },
    examplePrompts: {
        try: 'امتحان کنید:',
        smartPrediction: ['تهران، منطقه نارمک', 'شهرک صنعتی اراک', 'اصفهان، محله جلفا'],
        wasteSiteAnalysisLocation: ['خیابان اصلی ۱۲۳، تهران', 'شهرک صنعتی نزدیک فرودگاه', 'بازار بزرگ تهران'],
        wasteSiteAnalysisDescription: [
            'یک مجتمع آپارتمانی ۵۰ واحدی که به دنبال بهینه‌سازی برنامه بازیافت است.',
            'یک انبار تجاری با خروجی بالای مقوا.',
            'رستوران جدیدی که در مرکز شهر افتتاح می‌شود و برای کمپوست زباله‌های غذایی برنامه‌ریزی می‌کند.'
        ],
        grantFinder: [
            'کمک‌های مالی برای کمپوست اجتماعی',
            'تأمین مالی برای نوآوری در بازیافت پلاستیک',
            'کمک‌های مالی استارتاپی برای اقتصاد چرخشی'
        ],
        grantApplication: [
          'پروژه ما قصد دارد سرویس جمع‌آوری کمپوست خانگی را برای ۵۰۰ خانه راه‌اندازی کند.',
          'ما در حال توسعه فناوری جدیدی برای تفکیک کارآمدتر پلاستیک‌های مخلوط هستیم.',
          'این یک پروژه باغ اجتماعی است که برای سطل‌های کمپوست نیاز به بودجه دارد.'
        ],
        supplierFinder: [
            'تامین‌کننده سطل بازیافت تجاری',
            'فشرده‌سازهای مقوای صنعتی',
            'سنسورهای هوشمند پسماند برای مخازن'
        ],
        impactReporter: [
            'یک رستوران متوسط با تولید ۵ تن پسماند غذایی در ماه.',
            'یک ساختمان اداری با ۲۰۰ کارمند با هدف پسماند صفر.',
            'یک کارخانه تولیدی کوچک که ضایعات پلاستیکی تولید می‌کند.'
        ],
        wasteNews: [
            'پیشرفت‌ها در بازیافت شیمیایی',
            'قوانین مسئولیت توسعه‌یافته تولیدکننده',
            'تأثیر ممنوعیت پلاستیک‌های یکبار مصرف'
        ],
        aiResearcher: [
            'میکروپلاستیک‌ها در اقیانوس',
            'اقتصاد بازیافت آلومینیوم',
            'بیوپلاستیک‌ها و اثرات زیست‌محیطی آن‌ها'
        ],
        recyclingCalculator: ['۵', '۲۰', '۱۵۰'],
        aiAssistant: [
            'چطور جعبه پیتزا را بازیافت کنم؟',
            'مزایای کمپوست چیست؟',
            'درباره اقتصاد چرخشی به من بگو.'
        ],
        zeroWaste: [
            'چطور زباله مواد غذایی را در آشپزخانه کاهش دهم؟',
            'ایده‌هایی برای استفاده مجدد از شیشه‌های قدیمی',
            'محصولات تمیزکننده بدون پسماند'
        ],
        ecoCreator: [
            'سناریوی ویدیو: ۵ روش برای استفاده مجدد از پوست لیمو',
            'داستان: یک کیسه پلاستیکی تنها که هدف جدیدی پیدا می‌کند',
            'سناریوی ویدیو: چطور در خانه سطل کمپوست بسازیم'
        ]
    }
  },
};
