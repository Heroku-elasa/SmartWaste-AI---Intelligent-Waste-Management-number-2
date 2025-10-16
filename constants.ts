

import { Language, Project, Partner } from './types';

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
      projects: 'Features',
      aiAssistant: 'AI Assistant',
      recyclingCalculator: 'Recycling Calculator',
    },
    hero: {
      title: 'The Future of Urban Waste, <br/> <span class="text-primary-500">On-Demand.</span>',
      subtitle: 'EcoRide combines smart technology with on-demand service to make waste collection efficient, clean, and simple. Like Uber, but for your recycling.',
      button1: 'Request Pickup',
      button2: 'View Dashboard',
    },
    smartWasteDashboard: {
        title: 'Smart Waste Management',
        backButton: 'Back',
        tabReport: 'Live Feed',
        tabPredict: 'Smart Prediction',
        tabAnalytics: 'Analysis & Stats',
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
        }
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
    projectsPage: {
      title: 'Our Core Features',
      subtitle: 'Integrated solutions for a smarter, cleaner urban environment.',
      projects: [
        { name: 'AI Waste Analysis', description: 'Use your camera to instantly identify, categorize, and get sorting instructions for any waste item.', image: 'https://images.pexels.com/photos/3850526/pexels-photo-3850526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'waste_collection' },
        { name: 'On-Demand Collection', description: 'Schedule a waste pickup with the tap of a button. Our smart routing ensures timely and efficient collection.', image: 'https://images.pexels.com/photos/8033237/pexels-photo-8033237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'waste_collection' },
        { name: 'Smart Analytics', description: 'Track waste streams, view diversion rates, and get AI-powered insights through our comprehensive dashboard.', image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'smart_dashboard' },
        { name: 'Route Optimization', description: 'Our system analyzes real-time data to create the most efficient collection routes, saving fuel and reducing emissions.', image: 'https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'smart_dashboard' },
      ] as Project[],
      heroProjects: [
        { name: 'On-Demand Pickups', description: 'Instant, hassle-free waste collection.', image: 'https://images.pexels.com/photos/8033237/pexels-photo-8033237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'waste_collection' },
        { name: 'Smart Bin Integration', description: 'Monitor fill levels and optimize schedules.', image: 'https://images.pexels.com/photos/763210/pexels-photo-763210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'smart_dashboard' },
        { name: 'AI-Powered Analytics', description: 'Gain insights to build a cleaner city.', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'smart_dashboard' },
      ]
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
      projects: 'ویژگی‌ها',
      aiAssistant: 'دستیار هوش مصنوعی',
      recyclingCalculator: 'محاسبه‌گر بازیافت',
    },
    hero: {
      title: 'آینده پسماند شهری، <br/> <span class="text-primary-500">در لحظه.</span>',
      subtitle: 'EcoRide تکنولوژی هوشمند را با خدمات درخواستی ترکیب می‌کند تا جمع‌آوری پسماند را کارآمد، پاک و ساده سازد. مانند اسنپ، اما برای بازیافت شما.',
      button1: 'درخواست جمع‌آوری',
      button2: 'مشاهده داشبورد',
    },
    smartWasteDashboard: {
        title: 'مدیریت پسماند هوشمند',
        backButton: 'بازگشت',
        tabReport: 'فید زنده',
        tabPredict: 'پیش‌بینی هوشمند',
        tabAnalytics: 'آنالیز و آمار',
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
        }
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
     projectsPage: {
      title: 'ویژگی‌های اصلی ما',
      subtitle: 'راهکارهای یکپارچه برای یک محیط شهری هوشمندتر و پاک‌تر.',
      projects: [
        { name: 'تحلیل پسماند با هوش مصنوعی', description: 'از دوربین خود برای شناسایی، دسته‌بندی و دریافت دستورالعمل‌های تفکیک برای هر نوع پسماند استفاده کنید.', image: 'https://images.pexels.com/photos/3850526/pexels-photo-3850526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'waste_collection' },
        { name: 'جمع‌آوری بر اساس تقاضا', description: 'جمع‌آوری پسماند را با یک دکمه برنامه‌ریزی کنید. مسیریابی هوشمند ما جمع‌آوری به موقع و کارآمد را تضمین می‌کند.', image: 'https://images.pexels.com/photos/8033237/pexels-photo-8033237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'waste_collection' },
        { name: 'تحلیل‌های هوشمند', description: 'جریان‌های پسماند را ردیابی کنید، نرخ‌های انحراف را مشاهده کنید و از طریق داشبورد جامع ما بینش‌های مبتنی بر هوش مصنوعی دریافت کنید.', image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'smart_dashboard' },
        { name: 'بهینه‌سازی مسیر', description: 'سیستم ما داده‌های لحظه‌ای را برای ایجاد کارآمدترین مسیرهای جمع‌آوری تحلیل می‌کند و باعث صرفه‌جویی در سوخت و کاهش انتشار گازهای گلخانه‌ای می‌شود.', image: 'https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'smart_dashboard' },
      ] as Project[],
      heroProjects: [
        { name: 'جمع‌آوری در لحظه', description: 'جمع‌آوری پسماند فوری و بدون دردسر.', image: 'https://images.pexels.com/photos/8033237/pexels-photo-8033237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'waste_collection' },
        { name: 'یکپارچه‌سازی با سطل هوشمند', description: 'نظارت بر سطح پر شدن و بهینه‌سازی برنامه‌ها.', image: 'https://images.pexels.com/photos/763210/pexels-photo-763210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'smart_dashboard' },
        { name: 'تحلیل‌های مبتنی بر هوش مصنوعی', description: 'برای ساختن شهری پاک‌تر، بینش کسب کنید.', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', link: 'smart_dashboard' },
      ]
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
    aiAssistantPage: {
      title: 'دستیار هوش مصنوعی EcoRide',
      subtitle: 'کارشناس هوش مصنوعی شخصی شما برای مدیریت پسماند. درباره تفکیک، بازیافت یا پایداری بپرسید.',
      placeholder: 'یک سوال بپرسید...',
      welcomeMessage: 'سلام! من دستیار هوش مصنوعی EcoRide هستم. امروز چگونه می‌توانم به شما کمک کنم؟',
    },
    footer: {
      description: 'EcoRide راهکارهای هوشمندی برای مدیریت پسماند بر اساس تقاضا در شهرهای مدرن ارائه می‌دهد.',
      quickLinks: 'لینک‌های سریع',
      contact: 'تماس با ما',
      address: 'خیابان شهر هوشمند ۱۲۳، تهران، ۱۲۳۴۵',
      copyright: '© ۲۰۲۴ EcoRide. تمام حقوق محفوظ است.',
    },
     quotaErrorModal: {
      title: 'محدودیت API تمام شد',
      body: 'شما از سقف استفاده روزانه خود از Gemini API فراتر رفته‌اید. لطفاً تنظیمات صورتحساب خود را بررسی کنید یا فردا دوباره امتحان کنید.',
      cta: 'بررسی صورتحساب',
      close: 'بستن',
    },
    confirmationModal: {
      title: 'تایید جمع‌آوری',
      estimatedWeight: 'وزن تخمینی:',
      pickupQuote: 'هزینه جمع‌آوری:',
      cancel: 'لغو',
      confirm: 'تایید جمع‌آوری',
      successTitle: 'جمع‌آورنده اعزام شد!',
      successBody: 'یک وسیله نقلیه برای جمع‌آوری اعزام شد. در یک برنامه واقعی می‌توانید رسیدن آن را ردیابی کنید.',
      done: 'تمام',
    },
    examplePrompts: {
        try: 'امتحان کنید:',
        smartPrediction: ['تهران، محله نارمک', 'منطقه صنعتی اراک', 'اصفهان، محله جلفا'],
        wasteSiteAnalysisLocation: ['خیابان اصلی ۱۲۳، تهران', 'عرض جغرافیایی ۴۵.۴۲، طول جغرافیایی ۷۵.۶۹', 'پارک صنعتی نزدیک فرودگاه شهر'],
        wasteSiteAnalysisDescription: [
            'مجتمع آپارتمانی ۵۰ واحدی برای بهینه‌سازی بازیافت.',
            'انبار تجاری با تولید مقوای بالا.',
            'رستوران جدیدی که برای کمپوست زباله غذایی برنامه‌ریزی می‌کند.'
        ],
        grantFinder: [
            'کمک هزینه برای کمپوست اجتماعی',
            'بودجه برای نوآوری در بازیافت پلاستیک',
            'گرنت استارتاپ برای اقتصاد چرخشی'
        ],
        grantApplication: [
          'پروژه ما قصد دارد سرویس جمع‌آوری کمپوست خانگی را برای ۵۰۰ خانه راه‌اندازی کند.',
          'ما در حال توسعه یک فناوری جدید برای تفکیک موثرتر پلاستیک‌های مخلوط هستیم.',
          'این یک پروژه باغ اجتماعی است که برای سطل‌های کمپوست نیاز به بودجه دارد.'
        ],
        supplierFinder: [
            'تامین‌کننده سطل بازیافت تجاری',
            'پرس‌های مقوای صنعتی',
            'سنسورهای هوشمند پسماند'
        ],
        impactReporter: [
            'رستوران متوسط با تولید ۵ تن پسماند غذایی در ماه.',
            'ساختمان اداری با ۲۰۰ کارمند با هدف زباله صفر.',
            'تاسیسات تولیدی کوچک با تولید ضایعات پلاستیکی.'
        ],
        wasteNews: [
            'پیشرفت‌ها در بازیافت شیمیایی',
            'قوانین مسئولیت تولیدکننده',
            'تاثیر ممنوعیت پلاستیک یکبار مصرف'
        ],
        aiResearcher: [
            'میکروپلاستیک‌ها در اقیانوس',
            'اقتصاد بازیافت آلومینیوم',
            'بیوپلاستیک‌ها و اثرات زیست‌محیطی آنها'
        ],
        recyclingCalculator: ['۵', '۲۰', '۱۵۰'],
        aiAssistant: [
            'چطور جعبه پیتزا را بازیافت کنم؟',
            'مزایای کمپوست چیست؟',
            'درباره اقتصاد چرخشی به من بگو.'
        ]
    }
  }
};


export const PROMPTS = {
  wasteReportProcessor: (language: Language) => ({
    systemInstruction: `You are an AI assistant for EcoRide, a smart city's waste management system. The user has submitted a waste report. Your task is to acknowledge the submission and provide a brief, helpful analysis.

    Based on the user's report (location, waste type, volume, description), generate a short, one-paragraph confirmation message.
    The message should:
    1. Confirm receipt of the report for the specified location.
    2. Mention that the report has been prioritized based on the waste type and volume.
    3. State that a collection team will be dispatched shortly.
    4. Provide a very brief suggestion related to the waste type (e.g., for 'Recyclable', suggest ensuring items are clean).
    
    Keep the tone professional and efficient. The entire response must be a single string of text. Do not use JSON or markdown.
    All text in the response MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  wastePredictor: (language: Language) => ({
    systemInstruction: `You are an AI data scientist for EcoRide. Your task is to generate a plausible, data-driven-sounding prediction for waste volume in a given area.

    You will receive a location. Generate a JSON response with a single key: "predictionText".
    The value should be a short paragraph (2-3 sentences) that:
    1. States a predicted percentage increase or decrease in waste volume for the upcoming week.
    2. Provides a plausible reason for the prediction (e.g., "due to a local event," "seasonal trends," "analysis of historical data").
    3. Mentions that collection routes will be adjusted accordingly to ensure efficiency.

    Your entire response MUST be a single, valid JSON object. Do not include any text outside the JSON object.
    All text in the response MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  dashboardAnalyticsGenerator: (language: Language) => ({
    systemInstruction: `You are an AI analytics engine for a smart waste management dashboard. Your task is to generate a concise summary of the system's performance based on provided key metrics.
    
    You will receive three metrics: AI Accuracy (%), Today's Reports (count), and Routing Improvement (%).
    Based on these metrics, generate a JSON response with a single key: "summary".
    The value should be a short paragraph (2-3 sentences) that interprets the data. For example:
    - If AI accuracy is high, mention the system's reliability.
    - If today's reports are high, mention increased citizen engagement or a busy day.
    - If routing improvement is high, praise the efficiency gains.
    - Conclude with a positive, forward-looking statement about optimizing city cleanliness.

    Your entire response MUST be a single, valid JSON object. Do not include any text outside the JSON object.
    All text in the response MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  wasteAnalyzer: (language: Language) => ({
    systemInstruction: `You are an expert AI assistant for waste management. Your task is to analyze an image of waste provided by a user and return a structured JSON response.

    You MUST analyze the image and provide:
    - **identifiedItems**: An array of objects. Each object should have:
      - **item**: The name of the identified item (e.g., "Plastic Bottle", "Apple Core").
      - **category**: One of four options: "Recycling", "Landfill", "Compost", or "Special" (for hazardous waste, electronics, etc.).
      - **instructions**: A brief, clear instruction for how to dispose of the item (e.g., "Rinse and remove cap before placing in recycling bin.").
    - **estimatedWeightKg**: A numerical estimate of the total weight of the waste in kilograms.
    - **pickupQuote**: A numerical price quote for picking up the waste. Assume a base fee of 5 plus 1.5 per kg.
    - **recyclingPotential**: A string assessment ("High", "Medium", "Low", or "None") based on the proportion of recyclable materials.

    Your entire response MUST be a single, valid JSON object. Strictly adhere to the provided schema. Do not include any text, markdown, or explanations outside of the JSON object.
    All text in the response MUST be in ${language === 'fa' ? 'Persian' : 'English'}. The currency for the quote should be Toman if the language is Persian.`
  }),
  wasteSiteAnalysisGenerator: (language: Language) => ({
    systemInstruction: `You are an expert AI assistant for sustainable waste management. Your task is to analyze a user's provided commercial or residential location and provide a concise waste management potential report.

    The user will provide a location and optional description/image. Using this information, you MUST perform a detailed analysis. Generate a report with:
    - **siteSuitability**: A summary of the location's suitability for an optimized waste management program.
    - **estimatedMonthlyDiversion**: An object for waste diversion (from landfill) containing:
      - **total**: A string for the total estimated monthly diversion in kilograms (e.g., "500 kg").
      - **monthlyBreakdown**: An array of 12 objects, one for each month, with 'month' (a 3-letter abbreviation) and 'value' (number, kg for that month).
    - **potentialAnnualSavings**: An object for financial savings containing:
      - **total**: A string for the total potential annual savings in local currency (e.g., "$1,200").
      - **monthlyBreakdown**: An array of 12 objects, one for each month, with 'month' (a 3-letter abbreviation) and 'value' (number, savings for that month).
    - **recommendations**: An array of 1-2 specific bin or equipment recommendations (e.g., number and type of recycling/compost bins).
    - **logisticsConsiderations**: An array of 2-3 key logistical points to consider (e.g., "Ensure clear access for collection trucks.").
    
    Your entire response MUST be a single, valid JSON object. Strictly adhere to the provided schema. Do not include any text or explanations outside of the JSON object.
    All text in the response, including month abbreviations, MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  grantFinder: (language: Language) => ({
    systemInstruction: `You are an AI assistant specialized in finding funding and grants for recycling, composting, and waste reduction projects. Use your search tool to find relevant, real, and current grant opportunities based on the user's query.

    For each grant you find (limit to a maximum of 5), provide:
    - **name**: The official name of the grant or funding program.
    - **issuingAgency**: The organization or government body offering the grant.
    - **description**: A brief summary of the grant's purpose.
    - **eligibility**: A short description of who is eligible to apply.
    - **link**: The direct URL to the grant's official page for more information or application.

    Your entire response MUST be a single, valid JSON object containing an array of grant objects. Do not include grants that are not verifiable or seem outdated. Do not include any text or explanations outside of the main JSON object.
    All text in the response MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  supplierFinder: (language: Language) => ({
    systemInstruction: `You are an AI assistant specialized in finding suppliers for waste management equipment. Use your search tool to find relevant, real companies based on the user's query.

    For each supplier you find (limit to a maximum of 6), provide:
    - **name**: The official name of the company.
    - **description**: A brief summary of what the company offers or specializes in.
    - **websiteUrl**: The direct URL to the company's homepage or relevant product page.

    Your entire response MUST be a single, valid JSON object containing an array of supplier objects. Do not include suppliers that are not verifiable. Do not include any text or explanations outside of the main JSON object.
    All text in the response MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  applicationDrafter: (language: Language) => ({
    systemInstruction: `You are an expert AI assistant specializing in writing grant proposals for waste reduction and recycling projects.
    The user will provide a project description and details about a specific grant they are targeting.
    Your task is to generate a structured draft to help them with their application.

    Based on the user's project description and the grant details, you MUST generate:
    - **businessPlanOutline**: A concise business plan outline relevant to the project. It should be an array of objects, each with 'section' and 'content'.
    - **applicationSections**: Drafted content for common grant application sections (e.g., Executive Summary, Project Goals, Impact Statement, Budget Narrative). It should be an array of objects, each with 'sectionTitle' and 'draftedContent'.
    - **nextSteps**: A list of 3-4 actionable next steps the user should take to complete their application.

    Your entire response MUST be a single, valid JSON object. Strictly adhere to the provided schema. Do not include any text or explanations outside of the JSON object.
    All text in the response, including section titles, MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  impactReportGenerator: (language: Language) => ({
    systemInstruction: `You are an environmental science expert specializing in sustainability assessments for waste streams. Analyze the user's project/organization description and generate a high-level environmental impact report related to its waste.

    The report must include:
    - **executiveSummary**: A brief overview of the project's environmental standing regarding waste.
    - **positiveImpacts**: A list of 3-4 key positive environmental impacts (e.g., from recycling efforts).
    - **potentialRisks**: A list of 2-3 potential negative impacts or risks from the waste stream.
    - **mitigationStrategies**: For each risk, suggest a corresponding mitigation strategy.
    - **sustainabilityScore**: An overall score from 0 to 100, where 100 represents a perfect circular/zero-waste system.

    Your entire response MUST be a single, valid JSON object. Strictly adhere to the provided schema. Do not include any text or explanations outside of the JSON object.
    All text in the response MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  newsSummarizer: (language: Language) => ({
    systemInstruction: `You are a research analyst specializing in the circular economy and waste management.
    Provide a concise, insightful summary of the user's query based on Google Search results.
    After the summary, suggest 3-5 related, follow-up queries that the user might find interesting.
    Your entire response should be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  aiResearcher: (language: Language) => ({
    systemInstruction: `You are a sophisticated AI Research Analyst. Your task is to perform a deep, comprehensive search on the user's query and synthesize the findings into a structured report. Use the Google Search tool extensively.

    You MUST structure your entire response as a single, valid JSON object. Do not include any text, explanations, or markdown outside of this JSON object.

    The JSON object must have the following structure:
    - **keyFindings**: An array of objects. Each object should have 'finding' (a concise, one-sentence summary of a key point) and 'explanation' (a few sentences elaborating on the finding).
    - **detailedSummary**: A comprehensive, multi-paragraph summary of the topic.
    - **keyConcepts**: An array of objects. Each object should have 'concept' (a key term, person, or organization) and 'definition' (a clear, brief explanation).
    - **futureOutlook**: A paragraph discussing the potential future developments or implications of the topic.

    All text in the response MUST be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
  recyclingCalculator: (language: Language) => ({
    systemInstruction: `You are an AI waste management calculator. Based on the user's average monthly waste volume in tons, provide an estimate of financial benefits from a robust recycling program. Assume average landfill fees and recycling commodity values.
    
    You will be given the average monthly waste volume in tons. You must respond with:
    - **annualLandfillFeeSavings**: The estimated annual savings from diverting recyclable materials from the landfill.
    - **annualRecyclingRevenue**: The estimated annual revenue from selling recyclable commodities.
    - **totalAnnualBenefit**: The sum of savings and revenue.
    - **notes**: A brief disclaimer about this being an estimate and factors that can influence the actual results (local market rates, contamination, etc.).
    
    Your entire response MUST be a single, valid JSON object. Do not include any text, markdown, or explanations outside of the JSON object.
    All text in the response must be in ${language === 'fa' ? 'Persian' : 'English'}. The currency for savings should be Toman if the language is Persian.`
  }),
  aiAssistant: (language: Language) => ({
    systemInstruction: `You are EcoRide AI, an expert assistant on waste management, recycling, and sustainability.
    You are knowledgeable, helpful, and professional. You can answer questions about:
    - How to recycle specific items.
    - Composting best practices.
    - Waste reduction strategies for homes and businesses.
    Keep your answers clear, concise, and factual. All responses must be in ${language === 'fa' ? 'Persian' : 'English'}.`
  }),
};

// Data for Partners (No longer used on Hero, but kept for potential use)
export const PARTNERS_DATA: Partner[] = [
    { name: 'Circular Corp', logo: 'Circular Corp' },
    { name: 'GreenBin Inc.', logo: 'GreenBin Inc.' },
    { name: 'TerraCycle', logo: 'TerraCycle' },
    { name: 'Eco Innovators', logo: 'Eco Innovators' },
    { name: 'CleanFuture', logo: 'CleanFuture' },
    { name: 'RecycleRight', logo: 'RecycleRight' },
    { name: 'WasteLess', logo: 'WasteLess' },
    { name: 'SustainaCo', logo: 'SustainaCo' },
];