const fs = require('fs');

let code = fs.readFileSync('src/api/mockData.js', 'utf8');

const newSolutions = [
  {
    id: 'c3',
    title: 'Custom CRM Development',
    plain_english: 'A completely bespoke database built just for your company, so you stop using messy spreadsheets.',
    description: 'We build a fully customized Customer Relationship Management (CRM) system that perfectly matches your unique business logic. Say goodbye to off-the-shelf software that forces you to change how you work. We map your exact sales pipelines, automated email triggers, and client management workflows into a single, lightning-fast web application.',
    category: 'custom-software',
    status: 'active',
    price_min: 1999,
    price_max: 4999,
    rating: '5.0',
    installs_count: '18',
    delivery_days: 14,
    developer_name: 'SysLogic Pro',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80'],
    demo_url: 'https://example.com/demo/crm',
    what_it_does: 'Replaces all your scattered Google Sheets, Airtables, and legacy tools with one unified dashboard. It tracks every lead, logs every email, and automates your specific follow-up tasks.',
    who_its_for: ['Sales agencies with complex commission structures', 'Real estate brokerages needing custom deal tracking', 'Service businesses outgrowing standard tools like Pipedrive'],
    whats_included: [
      'Custom Database Architecture: We design a PostgreSQL database tailored exactly to your data structures.',
      'Role-Based Access: Dedicated dashboards for Admins, Managers, and Sales Reps with strict data visibility rules.',
      'Automated Workflows: Custom logic like "When deal hits Stage 3, auto-email the client and ping the manager on Slack".',
      'Data Migration: We will securely import all your messy historical data from Excel or legacy CRMs into the new system.',
      'API Integrations: Native connections to your existing tools like Stripe, DocuSign, or Twilio.'
    ],
    whats_not_included: [
      'Mobile App Development: This is a responsive web application. A dedicated iOS/Android app is a separate scope.',
      'Third-Party Subscription Costs: You will still need to pay for any third-party APIs used (e.g., Twilio for SMS).'
    ],
    how_it_works: [
      { title: 'Step 1: Discovery', desc: 'We spend 2 days mapping your exact operational workflows and bottlenecks.' },
      { title: 'Step 2: Prototyping', desc: 'We deliver an interactive Figma prototype of your new CRM for your approval.' },
      { title: 'Step 3: Engineering', desc: 'Our team builds the backend and frontend simultaneously over 2 weeks.' },
      { title: 'Step 4: Migration & Training', desc: 'We import your old data and conduct a live training session with your staff.' }
    ],
    prerequisites: ['A clear understanding of your current sales and operational workflows.', 'Access to your current data for migration.'],
    support_policy: '6 months of priority bug fixing and SLA-backed uptime guarantees. Ongoing retainer options available for continuous feature development.',
    customization_options: ['Custom reporting and charts', 'Automated document generation', 'Third-party API hooks'],
    features: ['Fully Bespoke Logic', 'Bank-Grade Security', 'Lightning Fast UI', 'Unlimited Users']
  },
  {
    id: 'c4',
    title: 'Automated Invoice Processing Engine',
    plain_english: 'An AI tool that reads PDFs and receipts from your inbox and types them into your accounting software automatically.',
    description: 'We deploy a custom Optical Character Recognition (OCR) pipeline trained on your specific vendor invoices. It automatically scans incoming emails, extracts line items, validates tax totals, and pushes the structured data directly into Xero, QuickBooks, or your ERP.',
    category: 'automation',
    status: 'active',
    price_min: 899,
    price_max: 2499,
    rating: '4.8',
    installs_count: '65',
    delivery_days: 7,
    developer_name: 'DataExtract AI',
    image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'],
    demo_url: 'https://example.com/demo/ocr',
    what_it_does: 'Saves your finance team hundreds of hours of manual data entry. It monitors a dedicated email inbox (e.g., invoices@yourcompany.com), downloads attachments, reads the data using AI, and generates draft bills in your accounting software.',
    who_its_for: ['Accounting firms processing high-volume client receipts', 'Construction companies dealing with complex supplier invoices', 'Logistics companies with massive paper trails'],
    whats_included: [
      'Custom OCR Model Training: We train the AI to recognize the specific layouts of your most common vendors.',
      'Email Integration: Automated webhooks that listen to your Gmail or Outlook inbox for new attachments.',
      'Accounting Sync: Native API integration to push approved invoices straight to QuickBooks, Xero, or Sage.',
      'Human-in-the-Loop Dashboard: A simple interface for your team to quickly review and approve any invoices the AI is unsure about.',
      'Line-Item Extraction: It doesn\'t just pull the total; it extracts every single item, quantity, and unit price.'
    ],
    whats_not_included: [
      'Payment Execution: The system drafts the bills in your accounting software, but it does not automatically wire money to vendors.',
      'Physical Mail Scanning: You must provide digital PDFs or scans. We do not process physical paper.'
    ],
    how_it_works: [
      { title: 'Step 1: Provide Samples', desc: 'You send us 100 past invoices so we can train the extraction models.' },
      { title: 'Step 2: Pipeline Build', desc: 'We build the cloud infrastructure to parse emails and run the OCR engine securely.' },
      { title: 'Step 3: Accounting Connect', desc: 'We link the pipeline to your specific Xero/QuickBooks account.' },
      { title: 'Step 4: Go Live', desc: 'You start forwarding invoices to the bot, and watch them appear in your ledger.' }
    ],
    prerequisites: ['Digital invoices (PDF, JPG, PNG).', 'Admin access to your accounting software.'],
    support_policy: 'Includes ongoing model retraining. If a vendor changes their invoice layout and the AI fails to read it, we fix it within 24 hours.',
    customization_options: ['Multi-currency support', 'Custom approval workflows', 'PO matching logic'],
    features: ['99% Extraction Accuracy', 'Line-item Detail', 'Native ERP Sync', 'Automated Inbox Listening']
  },
  {
    id: 'c5',
    title: 'E-commerce Custom Mobile App',
    plain_english: 'We turn your online store into a premium iOS and Android app so your best customers can shop natively on their phones.',
    description: 'A fully custom iOS and Android application synced in real-time with your existing Shopify or WooCommerce backend. We build a high-performance native shopping experience with push notifications, Apple Pay, and bespoke loyalty features to massively increase your customer retention.',
    category: 'mobile',
    status: 'active',
    price_min: 3500,
    price_max: 9900,
    rating: '5.0',
    installs_count: '24',
    delivery_days: 30,
    developer_name: 'Native Commerce Labs',
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'],
    demo_url: 'https://example.com/demo/app',
    what_it_does: 'Provides a native, lightning-fast shopping experience. Customers can browse your catalog instantly, save items to their wishlist, checkout in 1-click using Apple Pay/Google Pay, and receive rich push notifications about flash sales directly to their lock screens.',
    who_its_for: ['Fashion and beauty brands with high repeat-purchase rates', 'Subscription box companies', 'High-volume DTC brands looking to escape rising ad costs'],
    whats_included: [
      'Native iOS & Android Apps: Developed using React Native for a perfectly smooth 60fps experience on all devices.',
      'Real-Time Store Sync: 100% sync with your Shopify/WooCommerce catalog, inventory, and pricing. No duplicate data entry.',
      'Push Notification Engine: A dashboard to send segmented push notifications (e.g., "Hey VIPs, early access to the new drop starts now").',
      'Native Checkout Integration: Seamless Apple Pay and Google Pay integration to reduce cart abandonment.',
      'App Store Publishing: We handle the entire bureaucratic process of getting your app approved and live on the Apple App Store and Google Play.'
    ],
    whats_not_included: [
      'Apple Developer Account Fees: You must pay Apple the standard $99/year fee to host the app under your own company name.',
      'Ongoing Marketing: We build the app, but you are responsible for convincing your customers to download it.'
    ],
    how_it_works: [
      { title: 'Step 1: Design UI', desc: 'We design a bespoke, brand-aligned mobile UI and present it for your approval.' },
      { title: 'Step 2: API Connection', desc: 'We hook the mobile frontend into your existing e-commerce backend.' },
      { title: 'Step 3: App Build', desc: 'We develop the app, implementing native features like push notifications and haptics.' },
      { title: 'Step 4: App Store Launch', desc: 'We manage the strict review processes for both Apple and Google until the app is live.' }
    ],
    prerequisites: ['An established Shopify or WooCommerce store with clean product data.', 'High-resolution lifestyle and product photography.'],
    support_policy: '3 months of post-launch bug fixing included. Annual maintenance contracts available to ensure compatibility with new iOS/Android updates.',
    customization_options: ['Custom loyalty programs', 'Augmented Reality (AR) try-ons', 'Exclusive in-app only products'],
    features: ['React Native Architecture', 'Apple/Google Pay', 'Push Notifications', 'Real-time Sync']
  },
  {
    id: 'c6',
    title: 'Healthcare Patient Portal',
    plain_english: 'A secure, HIPAA-compliant website where patients can view their lab results, book appointments, and message their doctor safely.',
    description: 'We develop highly secure, fully compliant patient management portals for clinics and healthcare providers. Features include encrypted messaging, secure document delivery (lab results), telemedicine video links, and integrated appointment scheduling.',
    category: 'healthcare',
    status: 'active',
    price_min: 4500,
    price_max: 12000,
    rating: '4.9',
    installs_count: '12',
    delivery_days: 45,
    developer_name: 'MedTech Security',
    image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'],
    demo_url: 'https://example.com/demo/health',
    what_it_does: 'Provides a digital front door for your clinic. Patients log in securely with 2FA to see their upcoming appointments, securely message staff, and view their medical history without waiting on hold on the phone.',
    who_its_for: ['Private clinics and boutique practices', 'Therapists and psychologists needing secure messaging', 'Specialist doctors managing chronic care patients'],
    whats_included: [
      'HIPAA/GDPR Compliant Infrastructure: Fully encrypted databases at rest and in transit, complete with audit logs.',
      'Secure Messaging Module: End-to-end encrypted chat between patients and clinical staff.',
      'Document Vault: A secure area where staff can upload PDF lab results or prescriptions for patients to download.',
      'Scheduling Integration: Custom calendars allowing patients to book or cancel appointments based on complex provider availability rules.',
      'Telehealth Links: Automated generation and sharing of secure Zoom/Teams links for virtual consultations.'
    ],
    whats_not_included: [
      'Deep EMR/EHR Integration: Integrating natively with massive hospital systems like Epic or Cerner is a massive enterprise scope not included here.',
      'Medical Advice AI: For extreme liability reasons, this portal facilitates human-to-human communication. It does not provide AI medical diagnoses.'
    ],
    how_it_works: [
      { title: 'Step 1: Compliance Review', desc: 'We establish a Business Associate Agreement (BAA) and review your data security requirements.' },
      { title: 'Step 2: Architecture Design', desc: 'We design the secure database schema and user flows.' },
      { title: 'Step 3: Development', desc: 'We build the portal using strict security best practices and conduct penetration testing.' },
      { title: 'Step 4: Staff Training', desc: 'We safely migrate any existing patient accounts and train your staff on the new system.' }
    ],
    prerequisites: ['A clear understanding of your local healthcare data regulations (HIPAA, GDPR, PIPEDA).', 'A dedicated privacy officer on your team to oversee the project.'],
    support_policy: 'Includes strict SLA-backed emergency support and regular security audits. Lifetime patching for critical security vulnerabilities.',
    customization_options: ['Custom intake forms', 'Family/Dependent account linking', 'Integrated billing/payments'],
    features: ['HIPAA Compliant', 'End-to-end Encryption', 'Audit Logging', 'Secure Document Vault']
  },
  {
    id: 'c8',
    title: 'Automated Logistics Dispatcher',
    plain_english: 'An AI brain that looks at all your deliveries for the day and figures out the absolute fastest routes for your drivers.',
    description: 'A custom-built routing and dispatch engine for delivery fleets. We integrate with your order management system to automatically group orders, calculate the most fuel-efficient routes, and dispatch them to a custom driver mobile app.',
    category: 'logistics',
    status: 'active',
    price_min: 2500,
    price_max: 7500,
    rating: '4.8',
    installs_count: '34',
    delivery_days: 21,
    developer_name: 'RouteOptima',
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'],
    demo_url: 'https://example.com/demo/logistics',
    what_it_does: 'Replaces manual map routing. It takes 500 addresses, considers traffic, vehicle capacity, and delivery time windows, and instantly spits out the perfect turn-by-turn route for your 10 drivers. It saves massive amounts of fuel and time.',
    who_its_for: ['Local courier and delivery businesses', 'Furniture and large-appliance delivery fleets', 'Food distributors routing daily trucks'],
    whats_included: [
      'Algorithmic Route Optimization: We implement the Google OR-Tools or Mapbox API to solve complex Traveling Salesperson Problems instantly.',
      'Dispatcher Web Dashboard: A live map showing exactly where every truck is, allowing dispatchers to drag-and-drop emergency orders into active routes.',
      'Driver Mobile Web App: A simple interface for drivers to see their stops, get Google Maps directions, and collect digital signatures (Proof of Delivery).',
      'Automated Customer SMS: Sends automated text messages (e.g., "Your driver is 10 minutes away!") based on live GPS tracking.',
      'Order API Sync: Automatically pulls daily delivery orders from your Shopify, WooCommerce, or custom ERP.'
    ],
    whats_not_included: [
      'Google Maps API Fees: You will need to pay Google Maps/Mapbox directly for the routing API calls (usually a few cents per optimized route).',
      'Physical GPS Trackers: This relies on the GPS of the driver\'s smartphone. We do not supply hardwired OBD-II vehicle trackers.'
    ],
    how_it_works: [
      { title: 'Step 1: Constraint Mapping', desc: 'Tell us your rules: vehicle weight limits, driver shift times, and maximum stops per route.' },
      { title: 'Step 2: Backend Integration', desc: 'We connect your order system so addresses flow into the dispatcher automatically.' },
      { title: 'Step 3: Algorithm Tuning', desc: 'We test the routing algorithm against your historical data to prove fuel savings.' },
      { title: 'Step 4: Driver Onboarding', desc: 'We deploy the system and train your dispatchers and drivers on the new workflow.' }
    ],
    prerequisites: ['A list of addresses in a clean digital format.', 'Drivers with modern smartphones (iOS/Android).'],
    support_policy: '6 months of priority bug fixing. We continuously monitor the algorithm to ensure routes are calculating efficiently.',
    customization_options: ['Cold-chain/Refrigeration tracking', 'Barcode scanning integration', 'Complex time-window restrictions'],
    features: ['Live GPS Tracking', 'Automated Routing', 'Proof of Delivery', 'Customer SMS Alerts']
  },
  {
    id: 'c9',
    title: 'Custom E-Learning Platform (LMS)',
    plain_english: 'Your own private Netflix-style academy where you can sell courses, track student progress, and issue certificates.',
    description: 'We build a bespoke Learning Management System tailored to your exact curriculum. Unlike generic platforms like Teachable, we give you 100% control over the user experience, custom gamification, complex tiered access, and proprietary video hosting security.',
    category: 'education',
    status: 'active',
    price_min: 2900,
    price_max: 8500,
    rating: '5.0',
    installs_count: '42',
    delivery_days: 25,
    developer_name: 'EduTech Builders',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'],
    demo_url: 'https://example.com/demo/lms',
    what_it_does: 'Provides a premium, branded environment for your students. It handles secure payment processing, unlocks content over time (drip feeds), tracks exact video watch-time, automatically grades quizzes, and issues PDF certificates upon completion.',
    who_its_for: ['High-ticket course creators tired of generic platforms', 'Corporations needing internal compliance training portals', 'Universities looking for bespoke online degree interfaces'],
    whats_included: [
      'Bespoke Frontend Interface: A stunning, custom-designed learning environment that feels premium and perfectly matches your brand.',
      'Secure Video Hosting: Integration with Mux or AWS to ensure your videos load instantly globally and cannot be easily downloaded or pirated.',
      'Complex Access Logic: Build custom subscription tiers, one-time purchases, or drip-feed schedules that unlock modules weekly.',
      'Gamification & Quizzes: Custom-built interactive quizzes, progress bars, and achievement badges to keep students engaged.',
      'Admin Analytics: A dashboard showing exactly where students drop off in your videos so you can improve your content.'
    ],
    whats_not_included: [
      'Video Production: We build the platform, but you must record and edit the actual educational video content.',
      'Streaming Bandwidth Costs: You will be responsible for the video streaming bandwidth costs via Mux or AWS (usually very affordable).'
    ],
    how_it_works: [
      { title: 'Step 1: Curriculum Planning', desc: 'We map out your course structure, modules, quizzes, and access tiers.' },
      { title: 'Step 2: Platform Design', desc: 'We design the student dashboard and admin backend for your approval.' },
      { title: 'Step 3: Build & Upload', desc: 'We build the code while you upload your videos to our secure staging environment.' },
      { title: 'Step 4: Launch', desc: 'Connect your Stripe account and start enrolling students.' }
    ],
    prerequisites: ['Your course content (videos, PDFs, quizzes) ready to be uploaded.', 'A Stripe account to process student payments.'],
    support_policy: 'Includes 6 months of comprehensive bug fixes and technical support to ensure smooth video playback for all students.',
    customization_options: ['Community forums integration', 'Live Zoom scheduling', 'Custom PDF certificate generation'],
    features: ['Secure Video Hosting', 'Custom Gamification', 'Advanced Analytics', 'Stripe Integration']
  },
  {
    id: 'c10',
    title: 'AI Cold Email Infrastructure',
    plain_english: 'We build a technical setup that sends thousands of personalized emails a day without landing in the spam folder.',
    description: 'A hardcore, highly technical outbound email infrastructure built for B2B sales teams. We handle the complex domain warmups, DNS configurations (SPF, DKIM, DMARC), and deploy custom AI scripts that scrape lead data and write hyper-personalized first lines for every single prospect at scale.',
    category: 'marketing',
    status: 'active',
    price_min: 1500,
    price_max: 3500,
    rating: '4.8',
    installs_count: '88',
    delivery_days: 10,
    developer_name: 'Outbound Architects',
    image_url: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'],
    demo_url: 'https://example.com/demo/coldemail',
    what_it_does: 'Turns cold outreach into a science. Instead of sending generic spam that gets blocked, this infrastructure uses dozens of secondary domains to safely send thousands of emails. The AI reads the prospect\'s LinkedIn and company website to write a custom opening sentence, guaranteeing high open and reply rates.',
    who_its_for: ['B2B SaaS companies trying to book enterprise demos', 'Marketing agencies doing outreach for clients', 'High-ticket consultants looking for new clients'],
    whats_included: [
      'Bulletproof DNS Infrastructure: We purchase 5-10 secondary domains, configure Google Workspace/Microsoft 365, and set up flawless SPF, DKIM, and DMARC records.',
      'Automated Domain Warmup: We connect your new inboxes to a warmup network that automatically sends and replies to emails for 2 weeks to build sender reputation.',
      'AI Personalization Script: A custom Python script that takes your list of leads, scrapes their company website, and uses GPT-4 to write a highly relevant, personal first sentence for the email.',
      'Outreach Platform Configuration: We setup Instantly, Lemlist, or Smartlead with optimal sending schedules and follow-up sequences.',
      'Master Inbox Setup: A single unified dashboard where your sales team can reply to all leads across all the different sending domains.'
    ],
    whats_not_included: [
      'Lead Scraping: You must provide the CSV list of leads (names, emails, company domains). We do not scrape Apollo or ZoomInfo for you.',
      'Software Subscriptions: You will pay for the Google Workspace inboxes, the domains, and the sending platform (e.g., Instantly) directly.'
    ],
    how_it_works: [
      { title: 'Step 1: Domain Setup', desc: 'We purchase lookalike domains and configure the complex backend DNS records.' },
      { title: 'Step 2: Warmup Phase', desc: 'We let the domains age and warm up automatically for 14 days to ensure high deliverability.' },
      { title: 'Step 3: Script Engineering', desc: 'We build the custom AI prompt that will write your personalized email copy.' },
      { title: 'Step 4: Sequence Launch', desc: 'We load your leads, activate the campaigns, and monitor the initial open rates.' }
    ],
    prerequisites: ['A clear offer and understanding of your target B2B audience.', 'A CSV list of at least 1,000 valid B2B leads to start the campaign.'],
    support_policy: '30 days of deliverability monitoring. If your domains hit spam traps, we will pause campaigns and re-warm the infrastructure.',
    customization_options: ['Multi-channel logic (LinkedIn + Email)', 'Custom AI scraping targets (e.g. recent news)', 'Automated CRM syncing'],
    features: ['Bulletproof Deliverability', 'AI Personalization at Scale', 'Unified Master Inbox', 'Automated Follow-ups']
  }
];

const startIdx = code.indexOf('export const MOCK_CUSTOM_SOLUTIONS = [');
if (startIdx !== -1) {
  // Extract existing array up to the closing bracket using a safe string approach
  // We can just execute the code to get the original objects
  const match = code.match(/export const MOCK_CUSTOM_SOLUTIONS = (\[[\s\S]*?\]);/);
  if (match) {
    let existingSolutions;
    try {
       // Since it's valid JS object structure but not strict JSON, eval is easiest
       existingSolutions = eval(match[1]);
    } catch(e) {
       console.log('Eval error', e);
    }
    
    if (existingSolutions) {
       const combined = [...existingSolutions, ...newSolutions];
       const newArrayStr = 'export const MOCK_CUSTOM_SOLUTIONS = ' + JSON.stringify(combined, null, 2) + ';';
       const updatedCode = code.replace(match[0], newArrayStr);
       fs.writeFileSync('src/api/mockData.js', updatedCode);
       console.log('Successfully updated MOCK_CUSTOM_SOLUTIONS');
    }
  }
} else {
  console.log('Could not find MOCK_CUSTOM_SOLUTIONS');
}
