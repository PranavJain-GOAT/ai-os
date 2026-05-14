export const MOCK_PRODUCTS = [
  {
    id: "p1",
    title: "AI Customer Support Bot",
    plain_english: "A bot that answers your customers' questions 24/7 — so you don't have to. It reads your FAQs and replies instantly.",
    description: "An autonomous, enterprise-grade support agent that seamlessly integrates with your existing helpdesk. It reads your entire knowledge base, past support tickets, and website content to instantly resolve Tier 1 and Tier 2 tickets. If a customer has a complex issue, the bot automatically escalates the conversation to a human agent along with a summary of the issue.",
    price: 149,
    category: "chatbot",
    rating: "4.9",
    reviews_count: 842,
    installs_count: 12000,
    setup_time: "Under 5 min",
    status: "active",
    badge: "Best Seller",
    image_url: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80", "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"],
    demo_url: "https://example.com/demo/support",
    features: ["GPT-4o Powered Architecture", "Native Zendesk & Intercom webhooks", "Smart Auto-escalation to human staff", "Real-time Multi-language translation"],
    what_it_does: "This AI ingests your entire help center, FAQs, and product manuals. When a customer reaches out via chat, email, or WhatsApp, it instantly analyzes their question and provides a perfectly accurate, human-like response. It can handle order tracking, refund requests, and general troubleshooting completely on its own without any human intervention.",
    who_its_for: ["Fast-growing SaaS companies needing 24/7 technical support coverage", "High-volume E-commerce stores dealing with repetitive 'where is my order' questions", "Service businesses looking to reduce their customer support payroll costs"],
    whats_included: [
      "Complete Knowledge Base Integration: We automatically ingest up to 10,000 pages of your existing documentation, PDFs, and past support tickets so the AI knows your business inside and out.",
      "Embeddable Chat Widget: You get a lightweight, ultra-fast chat widget that you can drop into any website using a single line of code, fully customized to match your brand colors and logo.",
      "Analytics & Dashboard Access: A comprehensive real-time dashboard showing exactly how many tickets the AI resolved, customer satisfaction scores, and areas where the AI needs more training.",
      "Multi-Channel Support: Out-of-the-box integrations to connect the bot to your website, WhatsApp Business account, and Instagram Direct Messages.",
      "Human Handoff Protocols: Pre-configured fallback rules that immediately route frustrated customers or complex billing issues to a live human agent via Slack or Zendesk."
    ],
    whats_not_included: [
      "OpenAI API Token Costs: You are responsible for paying the API usage costs directly to OpenAI. We simply provide the optimized infrastructure and routing.",
      "Custom Legacy System Integration: Connecting to proprietary, on-premise backend databases or deeply custom-built CRMs requires a separate 'Custom Solution' scope."
    ],
    how_it_works: [
      { title: "Step 1: Connect your Knowledge Base", desc: "Log into the dashboard and paste the URL to your Help Center, Zendesk FAQ, or upload your PDF training manuals. The AI instantly reads and categorizes everything." },
      { title: "Step 2: Brand the Widget", desc: "Use our visual editor to change the colors, chat icon, and welcome message to perfectly match your company's aesthetic." },
      { title: "Step 3: Test and Deploy", desc: "Chat with the bot in a secure sandbox environment to verify its accuracy. Once you're satisfied, copy the 1-line script tag and paste it into your website." },
      { title: "Step 4: Monitor & Refine", desc: "Watch the dashboard as the bot handles real customer interactions. If it gets a question wrong, simply correct it in the dashboard and it learns instantly." }
    ],
    prerequisites: ["An active website or web application where you can paste a Javascript tag.", "An OpenAI developer account to generate your API keys for token usage."],
    support_policy: "Includes 30 days of free priority technical support. If the bot malfunctions or fails to load, our team will fix it within 24 hours. Lifetime free minor updates and bug patches.",
    delivery_info: "Instantly deployed to your workspace in under 5 minutes."
  },
  {
    id: "p2",
    title: "Restaurant Booking Assistant",
    plain_english: "Customers type 'Book a table for 4 on Friday' and it handles everything — no phone calls needed.",
    description: "A conversational reservation manager that eliminates the need for a human host to answer the phone. It handles bookings, sends automated reminders, and manages your waitlist across WhatsApp, SMS, and your website seamlessly. It integrates directly with your existing calendar to prevent double-booking.",
    price: 99,
    category: "chatbot",
    rating: "4.8",
    reviews_count: 412,
    installs_count: 3200,
    setup_time: "Under 5 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80", "https://images.unsplash.com/photo-1590846406792-0adc7f928a18?w=800&q=80", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"],
    demo_url: "https://example.com/demo/booking",
    features: ["Omnichannel WhatsApp & Web widget", "Live Google Calendar & Outlook sync", "Automated SMS/Email reminders", "Intelligent Waitlist management"],
    what_it_does: "Acts as a 24/7 digital host. When a customer messages you asking for a table, the bot checks real-time availability, negotiates times if the requested slot is full, secures the booking, and automatically syncs it to your restaurant's digital calendar.",
    who_its_for: ["Busy restaurants and diners losing customers to missed phone calls", "Trendy cafes and bars needing an automated waitlist system", "Hospitality businesses wanting to modernize their reservation flow"],
    whats_included: [
      "Omnichannel Booking Bot: A unified AI assistant capable of taking reservations concurrently on WhatsApp, Facebook Messenger, and an embeddable website widget.",
      "Real-time Calendar Synchronization: Instant 2-way syncing with Google Calendar, Outlook, or Apple Calendar to ensure double-bookings never occur.",
      "Automated Reminder Engine: A built-in system that automatically fires off SMS or WhatsApp reminders 24 hours before the reservation, drastically reducing costly no-shows.",
      "Intelligent Waitlist Management: If a specific time is fully booked, the AI naturally offers alternative times or adds the customer to a digital waitlist and notifies them if a table opens up.",
      "Customer CRM Dashboard: Every phone number, email, and booking history is saved into a simple dashboard so you can recognize returning VIP guests."
    ],
    whats_not_included: [
      "Per-message SMS Carrier Fees: You will need to connect your own Twilio or MessageBird account to handle the cost of sending SMS text messages.",
      "Point-of-Sale (POS) Hardware Integration: This system handles table booking, but it does not connect to your physical kitchen printers or cash registers."
    ],
    how_it_works: [
      { title: "Step 1: Set Availability", desc: "Define your restaurant's opening hours, maximum party sizes, and total table capacity in the visual dashboard." },
      { title: "Step 2: Connect your Calendar", desc: "Authenticate with your Google or Outlook account so the bot knows exactly when you are full." },
      { title: "Step 3: Link WhatsApp", desc: "Scan a QR code to link your business WhatsApp number to the bot engine." },
      { title: "Step 4: Go Live", desc: "Customers start messaging your number, and the bot handles all the back-and-forth scheduling instantly." }
    ],
    prerequisites: ["A dedicated smartphone or virtual number with WhatsApp Business installed.", "A digital calendar (Google/Outlook) that your staff currently uses to track reservations."],
    support_policy: "60-day setup guarantee. If the bot double-books a table due to a software error, our engineering team will provide emergency support within 1 hour. Standard email support available Mon-Fri.",
    delivery_info: "Ready to take bookings in under 5 minutes."
  },
  {
    id: "p3",
    title: "WhatsApp Order Automation",
    plain_english: "Customers send their order on WhatsApp, the bot confirms it, takes payment, and notifies your kitchen.",
    description: "A complete end-to-end WhatsApp sales funnel designed specifically for food delivery and retail. From menu browsing and answering product questions to taking the order, processing Razorpay payments, and sending a notification straight to your kitchen staff, this bot handles it all without a single human touch.",
    price: 199,
    category: "automation",
    rating: "4.9",
    reviews_count: 655,
    installs_count: 8100,
    setup_time: "Under 5 min",
    status: "active",
    badge: "Top Rated",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80", "https://images.unsplash.com/photo-1590846406792-0adc7f928a18?w=800&q=80", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"],
    demo_url: "https://example.com/demo/whatsapp",
    features: ["Official WhatsApp Business API integration", "Native Razorpay & PayPal payment links", "Instant Kitchen/Fulfillment notifications", "Conversational support in 50+ languages"],
    what_it_does: "Replaces a human order-taker completely. It showcases your digital menu inside WhatsApp, helps customers customize their orders (e.g., 'no onions, extra cheese'), calculates the total, sends a secure payment link, and routes the confirmed order to your staff's display.",
    who_its_for: ["Cloud kitchens and food delivery services operating on social media", "Local retail stores wanting to sell directly via chat", "Bakeries and custom order businesses"],
    whats_included: [
      "WhatsApp Business API Setup: Full onboarding to the official Meta API so your number doesn't get banned for automated messaging.",
      "Digital Menu ingestion: We convert your PDF menu or website into an interactive WhatsApp catalog that customers can browse with buttons.",
      "Conversational NLP Engine: The AI understands complex, natural language orders like 'I want the combo but swap the fries for salad and add a coke'.",
      "Razorpay Payment Gateway: Auto-generation of secure payment links inside the chat. The bot waits for payment confirmation before sending the order to the kitchen.",
      "Live Order Dashboard: A web-based screen for your kitchen or fulfillment team that pings loudly every time a new, paid order arrives."
    ],
    whats_not_included: [
      "Meta Conversation Fees: WhatsApp charges roughly $0.01 to $0.08 per conversation depending on your country. You pay this directly to Meta.",
      "Hardware: We provide the software dashboard, but you must provide the tablet or laptop for your kitchen staff to view the incoming orders."
    ],
    how_it_works: [
      { title: "Step 1: Upload Menu", desc: "Upload a CSV of your products or sync directly from your existing Shopify/Square account." },
      { title: "Step 2: Connect Payments", desc: "Link your Razorpay or PayPal account securely via OAuth." },
      { title: "Step 3: Define Kitchen Routing", desc: "Set up the email address or web-dashboard where your cooks will receive the finalized order tickets." },
      { title: "Step 4: Launch", desc: "Put your WhatsApp number on your Instagram bio. Customers message it, and the bot handles the rest." }
    ],
    prerequisites: ["An active Razorpay or PayPal business account to receive funds.", "A registered business entity (Meta requires this to grant official WhatsApp API access)."],
    support_policy: "Lifetime bug fixes for the core ordering logic. Dedicated onboarding specialist to help you get your WhatsApp API verified with Meta.",
    delivery_info: "Live and ready to take orders in 5 minutes."
  },
  {
    id: "p4",
    title: "Lead Generation Dashboard",
    plain_english: "Captures visitors' contact info from your site and automatically follows up via email and SMS until they buy or book.",
    description: "An AI-powered lead capture and multi-step nurture system. It doesn't just collect emails; it analyzes the visitor's behavior, segments them into the right audience, and triggers hyper-personalized email and SMS sequences that turn cold website traffic into warm, paying customers on autopilot.",
    price: 179,
    category: "marketing",
    rating: "4.8",
    reviews_count: 531,
    installs_count: 4200,
    setup_time: "Under 10 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"],
    demo_url: "https://example.com/demo/leads",
    features: ["Smart, high-converting lead capture popups", "AI-written personalized email sequences", "Real-time CRM synchronization", "Automated A/B testing for subject lines"],
    what_it_does: "Acts as a relentless digital sales rep. It captures contact information through beautiful forms, then systematically follows up with leads using AI-generated emails that reference their specific interests until they finally book a call or make a purchase.",
    who_its_for: ["Marketing agencies looking to guarantee ROI for clients", "High-ticket coaches and consultants needing steady calendar bookings", "E-commerce brands building their long-term email lists"],
    whats_included: [
      "Drag-and-drop popup builder: Create exit-intent, timed, or scroll-triggered lead capture forms without any coding.",
      "Pre-trained AI sequence generator: Tell the AI your product, and it instantly writes a 5-day email sequence optimized for open rates and conversions.",
      "Advanced Audience Segmentation: Automatically tags users based on what page they signed up on, allowing for hyper-targeted marketing.",
      "Webhooks & Zapier Integration: Instantly push new leads directly into Salesforce, HubSpot, or a Google Sheet in real-time.",
      "Performance Analytics: Beautiful graphs showing conversion rates, open rates, click-through rates, and estimated revenue generated."
    ],
    whats_not_included: [
      "SMTP Sending Costs: You must connect your own SendGrid, Mailgun, or AWS SES account to actually deliver the emails.",
      "Traffic Generation: This system converts traffic, but you must run your own ads or SEO to get visitors to your site in the first place."
    ],
    how_it_works: [
      { title: "Step 1: Design Form", desc: "Select a high-converting popup template and customize it with your brand colors and offer." },
      { title: "Step 2: Generate Emails", desc: "Click 'Generate Sequence', tell the AI what you are selling, and review the drafted 5-day email campaign." },
      { title: "Step 3: Connect Sender", desc: "Paste your SendGrid API key so the system can send emails on your behalf." },
      { title: "Step 4: Install Pixel", desc: "Paste a small snippet of Javascript onto your website to activate the popups and track conversions." }
    ],
    prerequisites: ["An active website.", "An email sending provider like SendGrid or Mailchimp transactional."],
    support_policy: "Includes full technical support for setting up DNS records (SPF, DKIM) to ensure your emails actually land in the inbox, not spam.",
    delivery_info: "Setup and ready to capture leads in under 10 minutes."
  },
  {
    id: "p5",
    title: "Salon Appointment System",
    plain_english: "Clients book, reschedule or cancel their appointments online anytime — and get automatic reminders so they never forget.",
    description: "A smart, fully automated booking system tailored specifically for salons, spas, and wellness centers. It features AI-powered scheduling that optimizes your calendar to avoid empty gaps, automatic reminders to drastically reduce no-shows, and a comprehensive client management database.",
    price: 89,
    category: "automation",
    rating: "4.9",
    reviews_count: 328,
    installs_count: 2900,
    setup_time: "Under 5 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80", "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80", "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80"],
    demo_url: "https://example.com/demo/salon",
    features: ["Beautiful client-facing online booking portal", "Automated SMS & email reminder workflows", "Staff calendar sync & shift management", "Credit card holds for no-show protection"],
    what_it_does: "Takes over the receptionist desk. Clients can view your services, see which stylists are available, book a slot, and securely leave a card on file. The system automatically texts them 24 hours before, allowing them to confirm or reschedule without calling in.",
    who_its_for: ["Hair salons and barbershops needing streamlined scheduling", "Massage spas and wellness centers", "Independent beauty therapists and nail technicians"],
    whats_included: [
      "Custom Branded Booking Portal: A standalone, mobile-optimized webpage where clients can view services, prices, and available staff.",
      "Intelligent Staff Rostering: Allows each stylist or therapist to set their own hours, breaks, and specific services they offer.",
      "No-Show Protection Engine: Securely requires clients to put a credit card on file when booking, automatically charging a fee if they fail to show up.",
      "Automated Reminders & Follow-ups: Sends an SMS reminder 24 hours before, and a 'Please leave a review' email 2 hours after the appointment.",
      "Client History CRM: Keeps a digital file for every client, storing notes like 'allergic to bleach' or 'prefers quiet appointments'."
    ],
    whats_not_included: [
      "Payment Processing Fees: Razorpay takes their standard 2.9% + 30c fee on any upfront deposits or no-show charges.",
      "Custom Domain Hosting: The booking portal lives on a secure sub-domain (e.g., yoursalon.deployra.com) unless you configure custom DNS."
    ],
    how_it_works: [
      { title: "Step 1: Add Services", desc: "Input your haircuts, massages, or treatments, including duration and pricing." },
      { title: "Step 2: Add Staff", desc: "Invite your team members so they can connect their personal Google Calendars." },
      { title: "Step 3: Configure Policies", desc: "Set your deposit requirements and cancellation fee percentages." },
      { title: "Step 4: Share Link", desc: "Put the 'Book Now' link in your Instagram bio and on your website." }
    ],
    prerequisites: ["A Razorpay account to securely handle credit card holds.", "A list of your services, durations, and prices ready to input."],
    support_policy: "Includes priority email support. Any critical booking bugs are treated with P1 severity and patched within 2 hours.",
    delivery_info: "Configured and ready in 5 minutes."
  },
  {
    id: "p6",
    title: "E-commerce AI Sales Assistant",
    plain_english: "A shopping assistant on your store that recommends products, answers questions, and helps customers checkout faster.",
    description: "A highly conversational product recommender and cart recovery agent designed to increase your store's average order value by up to 40%. It acts like an in-store associate, asking shoppers what they are looking for and guiding them to the exact right product in your catalog.",
    price: 129,
    category: "chatbot",
    rating: "4.7",
    reviews_count: 219,
    installs_count: 5600,
    setup_time: "Under 5 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"],
    demo_url: "https://example.com/demo/ecom",
    features: ["Intelligent product recommendations", "Automated cart abandonment recovery", "Native Shopify & WooCommerce integration", "Smart upsell and cross-sell automation"],
    what_it_does: "Syncs with your product catalog automatically. If a customer asks 'Do you have red running shoes under $100?', the AI instantly presents a carousel of matching products with add-to-cart buttons directly in the chat interface.",
    who_its_for: ["Shopify and WooCommerce store owners", "Direct-to-consumer (DTC) fashion and lifestyle brands", "Stores with large catalogs where customers get overwhelmed"],
    whats_included: [
      "Real-time Catalog Synchronization: The AI automatically connects to Shopify or WooCommerce API, learning your live inventory, prices, and descriptions.",
      "Conversational Product Discovery: Customers can describe what they want naturally, and the bot responds with visual product carousels.",
      "Automated Cart Recovery: If a customer leaves items in their cart, the bot can proactively pop up offering a 10% discount code to close the sale.",
      "Order Tracking Integration: Customers can ask 'Where is my order?' and the bot pulls the tracking status directly from your shipping provider.",
      "Conversion Analytics: See exactly how much revenue the bot directly generated through chat-assisted sales."
    ],
    whats_not_included: [
      "Custom Widget Design: You can change colors and logos, but deeply modifying the CSS structure of the chat UI is not supported in the standard product.",
      "Platform Fees: The AI token costs for extreme-volume stores (100k+ visits/mo) may incur a small overage fee."
    ],
    how_it_works: [
      { title: "Step 1: Sync Store", desc: "Install the app or paste your Shopify API key. The AI reads your entire product catalog in seconds." },
      { title: "Step 2: Train Assistant", desc: "Give the AI a persona. Do you want it to be professional? Quirky? Informative?" },
      { title: "Step 3: Define Upsells", desc: "Set rules like: 'If they buy shoes, always recommend socks'." },
      { title: "Step 4: Go Live", desc: "Enable the chat bubble on your storefront and watch it talk to customers." }
    ],
    prerequisites: ["An active Shopify or WooCommerce store.", "Products with well-written descriptions so the AI understands what it is selling."],
    support_policy: "Includes comprehensive technical support to ensure your product catalog syncs perfectly. Free lifetime platform updates.",
    delivery_info: "Instant setup and catalog sync."
  },
  {
    id: "p7",
    title: "HR Recruitment Screener",
    plain_english: "Paste a job description and it automatically screens CVs, scores candidates and books interviews — saving you hours.",
    description: "An advanced AI recruitment pipeline that takes the manual labor out of hiring. It ingests thousands of resumes, intelligently screens them against your specific job requirements, ranks candidates objectively, and automatically emails top candidates to schedule first-round interviews.",
    price: 249,
    category: "automation",
    rating: "4.8",
    reviews_count: 144,
    installs_count: 1800,
    setup_time: "Under 15 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"],
    demo_url: "https://example.com/demo/hr",
    features: ["Unbiased AI CV scoring and ranking", "Automated interview calendar scheduling", "Instant Slack notifications for top-tier applicants", "Seamless integration with popular ATS platforms"],
    what_it_does: "Automates the most tedious parts of hiring. Instead of reading 500 resumes, HR simply logs into the dashboard to see the top 10 candidates already scored out of 100, with interviews already booked on the hiring manager's calendar.",
    who_its_for: ["Overwhelmed HR teams and internal recruiters", "Fast-scaling startups hiring multiple roles", "Recruitment agencies wanting to process talent faster"],
    whats_included: [
      "Advanced Resume Parser: Accurately extracts skills, experience, and education from any PDF, Word Doc, or LinkedIn export.",
      "Intelligent Scoring Algorithm: Ranks candidates from 0-100 based on how perfectly they match the job description you provided.",
      "Automated Outreach Emails: Automatically sends rejection emails to unqualified candidates, and Calendly/booking links to top matches.",
      "Slack/Teams Notifications: Instantly pings the hiring manager when a 'unicorn' candidate applies.",
      "Bias-Reduction Filters: Option to anonymize names and photos during the initial screening phase to promote diverse hiring."
    ],
    whats_not_included: [
      "Criminal Background Checks: This system does not perform legal background or credit checks.",
      "Deep ATS Integrations: While it exports CSVs, deep 2-way sync with legacy ATS systems like Taleo requires custom development."
    ],
    how_it_works: [
      { title: "Step 1: Create Job", desc: "Paste your job description, required skills, and deal-breakers into the dashboard." },
      { title: "Step 2: Collect Resumes", desc: "Use our provided application portal link, or upload a ZIP file of resumes you've collected from Indeed." },
      { title: "Step 3: AI Screening", desc: "The AI reads 500 resumes in seconds and generates a ranked leaderboard with brief summaries of why they matched." },
      { title: "Step 4: Auto-Schedule", desc: "Click 'Invite Top 5', and the system handles the back-and-forth email logistics to get them on your calendar." }
    ],
    prerequisites: ["Job descriptions detailing exactly what you are looking for.", "A Calendly or Google Calendar link for scheduling interviews."],
    support_policy: "Includes 30 days of onboarding support to help you calibrate the AI scoring model to your specific company standards.",
    delivery_info: "Live and ready to screen in 15 minutes."
  },
  {
    id: "p8",
    title: "Real Estate Lead Qualifier",
    plain_english: "Website visitors answer a few questions and the AI figures out if they're serious buyers — and books a call automatically.",
    description: "An intelligent property inquiry handler that works around the clock. It greets visitors, qualifies them based on budget, timeline, and pre-approval status, answers detailed questions about specific property listings, and books viewings directly into the agent's calendar.",
    price: 159,
    category: "chatbot",
    rating: "4.9",
    reviews_count: 187,
    installs_count: 2100,
    setup_time: "Under 5 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"],
    demo_url: "https://example.com/demo/realestate",
    features: ["Dynamic lead qualification question flows", "Property-specific Q&A bot (reads MLS data)", "Direct calendar booking for viewings", "Instant lead export to real estate CRMs"],
    what_it_does: "Separates the window-shoppers from the serious buyers. By having a natural conversation, it gathers exactly what the buyer is looking for. If they meet your criteria, it instantly offers them available times to tour the property.",
    who_its_for: ["Busy estate agents who can't answer the phone 24/7", "Property developers launching new housing projects", "Letting agencies dealing with high-volume rental inquiries"],
    whats_included: [
      "Customizable Qualification Flow: Set rules so the bot asks about mortgage pre-approval, budget ranges, and timeline to move.",
      "Property Q&A Knowledge Base: Upload your brochures or Zillow links. The bot can answer questions like 'Is the garden south-facing?' or 'What are the HOA fees?'.",
      "Automated Calendar Booking: Syncs with the agent's Google Calendar to immediately schedule in-person tours for highly qualified leads.",
      "CRM Integration: Automatically pushes names, phone numbers, and conversation transcripts into HubSpot, Follow Up Boss, or Salesforce.",
      "Agent Hand-off Protocol: Instantly texts the real estate agent if a high-net-worth lead lands on the website requesting a call."
    ],
    whats_not_included: [
      "Direct MLS API Integration: The standard bot reads links and PDFs you provide. Live syncing with proprietary MLS databases requires custom scoping.",
      "Legal Contract Generation: The bot qualifies leads and books meetings, but cannot legally generate or sign property contracts."
    ],
    how_it_works: [
      { title: "Step 1: Define Criteria", desc: "Tell the bot what makes a 'Good Lead' (e.g., budget over $500k, pre-approved)." },
      { title: "Step 2: Upload Listings", desc: "Paste links to your active properties so the bot knows the specs, prices, and locations." },
      { title: "Step 3: Connect Calendar", desc: "Link your schedule so the bot knows when you are available for property tours." },
      { title: "Step 4: Install Widget", desc: "Place the chat code on your website. Watch as it filters out bad leads and books the good ones." }
    ],
    prerequisites: ["An active real estate website.", "Digital brochures, Zillow links, or PDFs containing the details of your current listings."],
    support_policy: "Includes free setup assistance to ensure your qualification questions are optimized for maximum conversion. Lifetime email support.",
    delivery_info: "Instant deployment."
  },
  {
    id: "p9",
    title: "Social Media Auto-Poster",
    plain_english: "Tell it your brand and it writes and posts content to Instagram, LinkedIn and Twitter — every single day, automatically.",
    description: "A complete AI content engine that puts your social media on autopilot. It learns your brand voice, generates engaging, context-aware text posts, creates relevant hashtags, and publishes them across all major platforms based on an algorithmically optimized schedule.",
    price: 79,
    category: "marketing",
    rating: "4.6",
    reviews_count: 402,
    installs_count: 9800,
    setup_time: "Under 5 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"],
    demo_url: "https://example.com/demo/social",
    features: ["Simultaneous multi-platform publishing", "AI-driven caption and hook writer", "Automated hashtag optimization", "Predictive best-time-to-post scheduling"],
    what_it_does: "Eliminates the need for a junior social media manager. You simply input a few topics or URLs, and the AI drafts a month's worth of highly engaging LinkedIn posts, tweets, and Instagram captions, queues them up, and posts them for you.",
    who_its_for: ["Small business owners with no time for marketing", "Content creators looking to maintain consistency", "Marketing teams needing to scale their organic reach"],
    whats_included: [
      "Brand Voice Training: The AI analyzes your past posts to perfectly mimic your specific tone, whether that's highly professional or witty and casual.",
      "Multi-Platform Publishing: Automatically formats and distributes posts to LinkedIn, Twitter/X, Instagram, and Facebook Pages simultaneously.",
      "Smart Content Calendar: A visual drag-and-drop calendar that shows you exactly what the AI has planned to post for the next 30 days.",
      "Hashtag & Hook Optimization: Automatically generates click-worthy first sentences and appends algorithmically relevant hashtags.",
      "Engagement Analytics: Tracks likes, comments, retweets, and shares across all platforms in one simple dashboard."
    ],
    whats_not_included: [
      "AI Image Generation: This specific product focuses on copywriting and scheduling. If you need it to generate graphics or videos, you'll need the 'Content Agency Bot' custom solution.",
      "Community Management: It publishes the posts, but does not reply to comments or DMs from your followers."
    ],
    how_it_works: [
      { title: "Step 1: Connect Accounts", desc: "Authenticate with LinkedIn, Twitter, and Instagram securely via official APIs." },
      { title: "Step 2: Train the AI", desc: "Provide a brief description of your business and upload examples of your favorite posts to calibrate the tone." },
      { title: "Step 3: Provide Topics", desc: "Input links to your blogs, industry news, or general ideas you want to talk about this month." },
      { title: "Step 4: Approve & Auto-Post", desc: "Review the drafted content calendar. Make edits if needed, click approve, and the AI handles all the posting." }
    ],
    prerequisites: ["Active business accounts on LinkedIn, Twitter/X, or Instagram.", "A clear understanding of what topics your audience cares about."],
    support_policy: "Lifetime bug fixes. If a social platform changes its API and breaks the connection, we update the integration within 48 hours for free.",
    delivery_info: "Connect your accounts and start posting in minutes."
  },
  {
    id: "p10",
    title: "Inventory Demand Forecaster",
    plain_english: "It looks at your past sales and tells you exactly what to reorder and when — so you never run out or overstock.",
    description: "A highly sophisticated neural forecasting engine that analyzes historical sales data, seasonality, and market trends to predict future product demand with up to 96% accuracy. It automatically generates purchase orders exactly when you need them.",
    price: 299,
    category: "analytics",
    rating: "4.9",
    reviews_count: 98,
    installs_count: 780,
    setup_time: "Under 20 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"],
    demo_url: "https://example.com/demo/inventory",
    features: ["Machine-learning demand forecasting", "Automated Purchase Order (PO) generation", "Native Shopify & WooCommerce sync", "Low-stock supplier SMS/Email alerts"],
    what_it_does: "Stops you from losing money on dead stock or stockouts. It continuously monitors your sell-through rate. When it calculates that you will run out of 'Blue T-shirts (Size M)' in 14 days, it automatically drafts an email to your supplier to reorder the exact optimal quantity.",
    who_its_for: ["Rapidly growing E-commerce brands", "Traditional brick-and-mortar retailers", "Wholesale distributors managing hundreds of SKUs"],
    whats_included: [
      "Predictive Machine Learning Model: An algorithm that analyzes your past 12-24 months of sales data to find hidden seasonal patterns and trends.",
      "Live Shopify/WooCommerce Sync: Connects securely to your store to pull real-time stock levels and daily sales velocity.",
      "Automated PO Generation: Automatically drafts formatted Purchase Orders when stock hits a critical threshold, ready for your approval.",
      "Capital Optimization Dashboard: Shows you exactly how much cash is tied up in 'dead stock' versus highly profitable fast-moving inventory.",
      "Multi-Warehouse Support: Can forecast demand separately for different geographical fulfillment centers or retail locations."
    ],
    whats_not_included: [
      "Legacy ERP Integration: Integrating closely with older, on-premise systems like SAP or Oracle requires bespoke engineering.",
      "Supplier Negotiations: The AI tells you what to order and drafts the email, but it does not haggle over prices with your manufacturers."
    ],
    how_it_works: [
      { title: "Step 1: Connect Store", desc: "Authorize the app to read your Shopify/WooCommerce inventory and past order data." },
      { title: "Step 2: Input Lead Times", desc: "Tell the system how many days it typically takes for your suppliers to manufacture and ship products." },
      { title: "Step 3: Let AI Calculate", desc: "The AI processes your historical data and generates a 30, 60, and 90-day demand forecast." },
      { title: "Step 4: Automate POs", desc: "Approve the AI's reorder suggestions and let it automatically dispatch the orders to your suppliers." }
    ],
    prerequisites: ["At least 6 months of historical sales data (the more data, the more accurate the AI).", "A Shopify, WooCommerce, or Magento store."],
    support_policy: "Includes an onboarding call with a data specialist to ensure your lead times and safety stock levels are configured correctly.",
    delivery_info: "Connected and analyzing your data in 20 minutes."
  },
  {
    id: "p11",
    title: "SEO Content Generator",
    plain_english: "Give it a keyword and it writes a full SEO-optimised blog post that ranks on Google — no writer needed.",
    description: "A GPT-4o powered content engine built specifically for organic search growth. It doesn't just write text; it researches the top-ranking competitors for your keyword, structures a perfect outline, and produces long-form, rank-ready content complete with proper HTML tags and schema markup.",
    price: 59,
    category: "marketing",
    rating: "4.7",
    reviews_count: 712,
    installs_count: 14000,
    setup_time: "Under 5 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"],
    demo_url: "https://example.com/demo/seo",
    features: ["Long-form comprehensive blog generation", "Automatic FAQ & Schema markup creation", "Smart internal link suggestions", "1-click WordPress publishing integration"],
    what_it_does: "Acts as your in-house SEO agency. You type in 'Best running shoes 2024', and within two minutes, it delivers a 2,000-word, highly engaging, fully formatted article that is scientifically structured to satisfy Google's search algorithms.",
    who_its_for: ["Affiliate bloggers scaling content production", "SEO agencies managing multiple client sites", "SaaS companies building out their inbound marketing engines"],
    whats_included: [
      "Competitor SERP Analysis: The AI automatically scans the top 10 Google results for your keyword to understand what subtopics must be covered.",
      "Long-Form Writer: Capable of generating highly coherent, hallucination-free articles up to 3,000 words in length.",
      "Automatic HTML Formatting: Properly structures the article with H1, H2, and H3 tags, bullet points, and bolded keywords for maximum readability.",
      "Built-in Plagiarism Checker: Ensures that every piece of content generated is 100% unique and safe from Google penalties.",
      "1-Click CMS Publishing: Integrates directly with WordPress, Webflow, and Ghost to publish the drafts straight to your live site."
    ],
    whats_not_included: [
      "Off-Page SEO: This tool creates the content, but it does not build backlinks from other websites to increase your domain authority.",
      "Custom Image Generation: It generates the text and formatting, but you will need to add your own relevant photos or diagrams to the post."
    ],
    how_it_works: [
      { title: "Step 1: Enter Keyword", desc: "Type in the primary search term you want your website to rank for on Google." },
      { title: "Step 2: Review Outline", desc: "The AI researches competitors and proposes a detailed outline of headings. You can approve or edit it." },
      { title: "Step 3: Generate Draft", desc: "Watch as the AI writes a comprehensive, expert-level article in under 2 minutes." },
      { title: "Step 4: Publish", desc: "Click 'Push to WordPress' and the article is instantly live on your blog." }
    ],
    prerequisites: ["A blog or website hosted on WordPress, Webflow, Ghost, or Shopify.", "Basic knowledge of what keywords your target audience is searching for."],
    support_policy: "Lifetime access to the software platform with free updates to the underlying AI models as newer, smarter versions are released.",
    delivery_info: "Generate your first ranking post in under 2 minutes."
  },
  {
    id: "p12",
    title: "Analytics & Reports AI",
    plain_english: "Connect your store or app and get a plain-English weekly report: what's working, what's not, and what to fix.",
    description: "A business intelligence agent that takes the confusion out of data. Instead of staring at complex graphs, this AI monitors your critical KPIs daily and delivers simple, actionable weekly insights directly to your inbox or Slack channel, explaining exactly what is happening in your business.",
    price: 119,
    category: "analytics",
    rating: "4.8",
    reviews_count: 231,
    installs_count: 3400,
    setup_time: "Under 10 min",
    status: "active",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    preview_images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"],
    demo_url: "https://example.com/demo/analytics",
    features: ["24/7 automated KPI monitoring", "Weekly plain-English executive reports", "Instant anomaly and drop-off alerts", "Direct Slack, Teams, & email delivery"],
    what_it_does: "Turns data into decisions. If your website conversion rate drops by 15% on a Tuesday, the AI immediately messages you on Slack saying: 'Heads up, conversions are down 15% today, likely due to increased bounce rates on mobile devices. Consider checking your mobile checkout page.'",
    who_its_for: ["Non-technical Founders and CEOs", "Marketing managers needing to prove ROI", "Operations teams tracking daily performance"],
    whats_included: [
      "Multi-Source Integration: Connects seamlessly to Google Analytics 4, Razorpay, Shopify, Meta Ads, and Google Ads all at once.",
      "Natural Language Summaries: Replaces complex charts with simple sentences like 'Revenue grew 10% this week mainly due to a spike in organic traffic'.",
      "Real-Time Anomaly Alerts: Instantly pings you on Slack or Email if something breaks, like ad spend spiking or server traffic dropping to zero.",
      "Custom Automated PDFs: Generates beautiful, board-ready PDF reports every Monday morning so you can forward them to investors or clients.",
      "Interactive Chat Interface: Allows you to literally chat with your data, asking questions like 'What was our best selling product last Tuesday?'"
    ],
    whats_not_included: [
      "Data Warehouse Setup: This tool sits on top of your existing tools. It does not build or maintain complex SQL databases (like Snowflake or BigQuery).",
      "Custom Graphic Design: The PDF reports use a clean, standard template and cannot be heavily modified visually beyond adding your logo."
    ],
    how_it_works: [
      { title: "Step 1: Connect Tools", desc: "Use 1-click OAuth to connect your Google Analytics, Razorpay, and Ad accounts." },
      { title: "Step 2: Set KPIs", desc: "Tell the AI what matters to you (e.g., 'Track my Customer Acquisition Cost and Lifetime Value')." },
      { title: "Step 3: Define Schedule", desc: "Choose whether you want reports delivered daily, weekly, or monthly, and via Slack or Email." },
      { title: "Step 4: Receive Insights", desc: "Stop digging through spreadsheets and start receiving clear, actionable advice in your inbox." }
    ],
    prerequisites: ["Admin access to your business tools (Google Analytics, Razorpay, Shopify, etc.) to authorize the connection.", "A Slack or Microsoft Teams workspace (optional, for real-time alerts)."],
    support_policy: "Includes dedicated support to ensure all your data sources are syncing correctly without discrepancies. Lifetime platform access.",
    delivery_info: "Connect your apps and get your first report in 10 minutes."
  }
];

export const MOCK_CUSTOM_SOLUTIONS = [
  {
    "id": "c1",
    "title": "AI-Powered Business Website",
    "plain_english": "We build you a beautiful, fast website that has a chatbot built in. Visitors can ask questions and even book or buy — all from one page.",
    "description": "A completely custom, conversion-optimised web presence built from the ground up with an embedded AI assistant. We handle the design, the coding, the copywriting, and the training of a custom AI model that lives natively on the site, allowing visitors to instantly get answers, book meetings, or make purchases without leaving the page.",
    "category": "website",
    "status": "active",
    "price_min": 299,
    "price_max": 799,
    "rating": "4.9",
    "installs_count": "342",
    "delivery_days": 3,
    "developer_name": "WebMind AI Lab",
    "image_url": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/custom-web",
    "what_it_does": "Replaces an outdated, static website with a dynamic, highly interactive AI-powered machine. We don't just build the site; we train an AI on your specific business rules so it acts as your best salesperson, actively converting visitors into revenue.",
    "who_its_for": [
      "Small businesses needing a modern digital overhaul",
      "Freelancers and consultants wanting to automate bookings",
      "Startups looking for a high-tech, premium brand image"
    ],
    "whats_included": [
      "Custom Next.js/React Development: We code a lightning-fast, highly secure website from scratch based on modern web standards.",
      "Bespoke UI/UX Design: A completely custom design tailored to your brand identity, including premium animations and responsive layouts.",
      "Embedded AI Assistant: A custom-trained AI bot natively integrated into the site, capable of answering FAQs, capturing leads, or routing support tickets.",
      "Technical SEO Foundation: We implement perfect Lighthouse scores, optimized meta tags, schema markup, and fast-loading image pipelines.",
      "Content Management System (CMS): A simple, headless CMS dashboard allowing you to easily edit text, images, or blog posts without touching code."
    ],
    "whats_not_included": [
      "Ongoing Monthly Hosting: The initial build is covered, but you will be responsible for the $10-$20/month hosting fees (e.g., Vercel, AWS).",
      "Custom Brand Identity Design: We need you to provide your logo and brand colors. Full logo design and branding exercises are out of scope."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Scoping Call",
        "desc": "We jump on a 30-minute call to understand your business goals, target audience, and required website features."
      },
      {
        "title": "Step 2: Design Approval",
        "desc": "Our team creates a high-fidelity Figma mockup of the website. You review and request unlimited revisions until you love it."
      },
      {
        "title": "Step 3: Development & AI Training",
        "desc": "We code the site and simultaneously train the AI assistant on your provided business documents."
      },
      {
        "title": "Step 4: Handoff & Launch",
        "desc": "We deploy the site to your custom domain, provide a training video on how to use the CMS, and hand over the keys."
      }
    ],
    "prerequisites": [
      "A purchased domain name (e.g., yourcompany.com).",
      "Your company logo and any specific brand assets or photography you want used on the site."
    ],
    "support_policy": "Includes 60 days of post-launch bug fixing and technical support. If anything breaks, we fix it immediately. Lifetime access to the CMS.",
    "customization_options": [
      "Brand colors and typography",
      "Custom multi-step forms",
      "Direct calendar booking integration"
    ],
    "features": [
      "Embedded AI Chat",
      "Ultra-Fast Loading",
      "SEO Optimized",
      "Mobile First Design"
    ]
  },
  {
    "id": "c2",
    "title": "WhatsApp Business Automation",
    "plain_english": "We set up a WhatsApp number for your business that automatically handles orders, bookings and customer queries — 24/7.",
    "description": "A completely bespoke WhatsApp automation setup tailored to your exact operational workflows. Our engineers map out your customer journey and build custom conversational flows, integrating secure payment gateways, databases, and notifications so your business can operate entirely via chat.",
    "category": "automation",
    "status": "active",
    "price_min": 199,
    "price_max": 499,
    "rating": "4.9",
    "installs_count": "521",
    "delivery_days": 2,
    "developer_name": "FlowBot Studio",
    "image_url": "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/custom-wa",
    "what_it_does": "Turns WhatsApp into an automated storefront or customer service center. We build custom logic so that if a customer asks for a refund, books a specific service, or orders a complex custom product, the bot handles the entire transaction flawlessly.",
    "who_its_for": [
      "Restaurants and cloud kitchens relying on chat orders",
      "Retailers selling directly to consumers on social media",
      "Service businesses needing an easy way for clients to book"
    ],
    "whats_included": [
      "Official Meta API Verification: We handle the complex bureaucratic process of getting your business verified by Meta for official API access.",
      "Custom Workflow Engineering: We design complex decision trees—handling everything from FAQs and product catalogs to live human handoffs.",
      "Payment Gateway Integration: Securely integrate Razorpay or local payment gateways directly inside the WhatsApp chat interface.",
      "Database Synchronization: Ensure that every order or booking made on WhatsApp is instantly reflected in your Google Sheets or CRM.",
      "Omnichannel Dashboard: Provide your staff with a unified inbox to oversee all bot conversations and intervene when necessary."
    ],
    "whats_not_included": [
      "Meta Conversation Fees: You will need to pay Meta's standard per-conversation API fees (usually pennies per chat).",
      "Mass Marketing Broadcasts: This setup is designed for inbound automation. Sending spam blasts to 10,000 users requires a separate compliance process."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Workflow Mapping",
        "desc": "We map out exactly how you want the bot to behave, including what happens when a customer says 'I want to speak to a human'."
      },
      {
        "title": "Step 2: API Approval",
        "desc": "We submit your business documents to Meta to get your official WhatsApp Business API token approved."
      },
      {
        "title": "Step 3: Bot Engineering",
        "desc": "Our team codes the logic, integrates the NLP (AI) engine, and connects it to your Razorpay account."
      },
      {
        "title": "Step 4: Testing & Handoff",
        "desc": "We run rigorous sandbox testing. Once perfect, we push it to your live number and train your staff on the dashboard."
      }
    ],
    "prerequisites": [
      "A clean phone number not currently registered to a standard WhatsApp consumer app.",
      "Official business registration documents (required by Meta)."
    ],
    "support_policy": "Includes 30 days of hyper-care support to tweak conversation flows based on real customer usage data.",
    "customization_options": [
      "Digital menu or service list upload",
      "Complex conditional booking rules",
      "Specific payment gateway connections"
    ],
    "features": [
      "24/7 Operations",
      "In-Chat Payments",
      "Bespoke Logic Flows",
      "Multi-agent Dashboard"
    ]
  },
  {
    "id": "c7",
    "title": "Private Company Knowledge Bot",
    "plain_english": "Upload all your company documents and your team can ask it any question — and it answers instantly with the right information.",
    "description": "A highly secure, bespoke private AI assistant built specifically for your enterprise. We ingest your proprietary company documents, standard operating procedures, manuals, and HR policies into an isolated, secure vector database, creating a custom AI that serves as an instant 'second brain' for your entire workforce.",
    "category": "chatbot",
    "status": "active",
    "price_min": 799,
    "price_max": 1999,
    "rating": "5.0",
    "installs_count": "41",
    "delivery_days": 5,
    "developer_name": "Neural Nexus Enterprise",
    "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/custom-knowledge",
    "what_it_does": "Eliminates hours wasted searching for files. An employee can simply type: 'What is our policy on remote work expenses?' and the AI instantly generates a summary, providing a direct link to page 14 of the official HR handbook. We build strict access controls so only authorized roles see sensitive data.",
    "who_its_for": [
      "Law firms with massive case document archives",
      "Corporate HR departments handling repetitive policy questions",
      "Large enterprises with complex internal wikis"
    ],
    "whats_included": [
      "Custom Vector Database Setup: We build a secure, isolated database (Pinecone/Weaviate) to store your sensitive company data embeddings.",
      "Automated Document Pipeline: Connects to your Google Drive, Notion, or SharePoint to automatically update the AI when a document is changed.",
      "Enterprise-Grade Security: SOC2 compliant infrastructure ensuring your proprietary data is never used to train public OpenAI models.",
      "Role-Based Access Control (RBAC): Ensures that junior employees cannot ask the AI questions about confidential executive financial documents.",
      "Custom Slack/Teams Integration: Your employees can query the 'Company Brain' directly inside their existing chat applications."
    ],
    "whats_not_included": [
      "On-Premise Server Deployment: This solution utilizes secure cloud infrastructure (AWS/Azure). Fully air-gapped on-premise installation requires a massive enterprise contract.",
      "Document Digitization: We ingest digital files (PDF, Docx, Text). We do not scan or OCR physical paper documents for you."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Security Audit",
        "desc": "We review your data storage methods and establish strict security and privacy protocols."
      },
      {
        "title": "Step 2: Data Ingestion",
        "desc": "We securely connect to your data sources and process thousands of documents into readable AI vectors."
      },
      {
        "title": "Step 3: Interface Build",
        "desc": "We deploy a custom web portal and install the Slack/Teams integrations for your staff to use."
      },
      {
        "title": "Step 4: Calibration",
        "desc": "We run test queries to ensure the AI provides accurate source citations and respects access permissions."
      }
    ],
    "prerequisites": [
      "Your company documents organized in a digital format (Drive, Notion, Confluence).",
      "A designated IT admin on your team to authorize integrations."
    ],
    "support_policy": "Includes a Service Level Agreement (SLA) with 99.9% uptime guarantees and dedicated account management for ongoing fine-tuning.",
    "customization_options": [
      "Detailed access roles and permissions",
      "Custom data source connections (Google Drive, Notion)",
      "Internal UI branding and naming"
    ],
    "features": [
      "100% Private & Secure",
      "Accurate Source Citations",
      "Strict Access Controls",
      "Supports Any Document Type"
    ]
  },
  {
    "id": "c3",
    "title": "Custom CRM Development",
    "plain_english": "A completely bespoke database built just for your company, so you stop using messy spreadsheets.",
    "description": "We build a fully customized Customer Relationship Management (CRM) system that perfectly matches your unique business logic. Say goodbye to off-the-shelf software that forces you to change how you work. We map your exact sales pipelines, automated email triggers, and client management workflows into a single, lightning-fast web application.",
    "category": "custom-software",
    "status": "active",
    "price_min": 1999,
    "price_max": 4999,
    "rating": "5.0",
    "installs_count": "18",
    "delivery_days": 14,
    "developer_name": "SysLogic Pro",
    "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/crm",
    "what_it_does": "Replaces all your scattered Google Sheets, Airtables, and legacy tools with one unified dashboard. It tracks every lead, logs every email, and automates your specific follow-up tasks.",
    "who_its_for": [
      "Sales agencies with complex commission structures",
      "Real estate brokerages needing custom deal tracking",
      "Service businesses outgrowing standard tools like Pipedrive"
    ],
    "whats_included": [
      "Custom Database Architecture: We design a PostgreSQL database tailored exactly to your data structures.",
      "Role-Based Access: Dedicated dashboards for Admins, Managers, and Sales Reps with strict data visibility rules.",
      "Automated Workflows: Custom logic like \"When deal hits Stage 3, auto-email the client and ping the manager on Slack\".",
      "Data Migration: We will securely import all your messy historical data from Excel or legacy CRMs into the new system.",
      "API Integrations: Native connections to your existing tools like Razorpay, DocuSign, or Twilio."
    ],
    "whats_not_included": [
      "Mobile App Development: This is a responsive web application. A dedicated iOS/Android app is a separate scope.",
      "Third-Party Subscription Costs: You will still need to pay for any third-party APIs used (e.g., Twilio for SMS)."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Discovery",
        "desc": "We spend 2 days mapping your exact operational workflows and bottlenecks."
      },
      {
        "title": "Step 2: Prototyping",
        "desc": "We deliver an interactive Figma prototype of your new CRM for your approval."
      },
      {
        "title": "Step 3: Engineering",
        "desc": "Our team builds the backend and frontend simultaneously over 2 weeks."
      },
      {
        "title": "Step 4: Migration & Training",
        "desc": "We import your old data and conduct a live training session with your staff."
      }
    ],
    "prerequisites": [
      "A clear understanding of your current sales and operational workflows.",
      "Access to your current data for migration."
    ],
    "support_policy": "6 months of priority bug fixing and SLA-backed uptime guarantees. Ongoing retainer options available for continuous feature development.",
    "customization_options": [
      "Custom reporting and charts",
      "Automated document generation",
      "Third-party API hooks"
    ],
    "features": [
      "Fully Bespoke Logic",
      "Bank-Grade Security",
      "Lightning Fast UI",
      "Unlimited Users"
    ]
  },
  {
    "id": "c4",
    "title": "Automated Invoice Processing Engine",
    "plain_english": "An AI tool that reads PDFs and receipts from your inbox and types them into your accounting software automatically.",
    "description": "We deploy a custom Optical Character Recognition (OCR) pipeline trained on your specific vendor invoices. It automatically scans incoming emails, extracts line items, validates tax totals, and pushes the structured data directly into Xero, QuickBooks, or your ERP.",
    "category": "automation",
    "status": "active",
    "price_min": 899,
    "price_max": 2499,
    "rating": "4.8",
    "installs_count": "65",
    "delivery_days": 7,
    "developer_name": "DataExtract AI",
    "image_url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/ocr",
    "what_it_does": "Saves your finance team hundreds of hours of manual data entry. It monitors a dedicated email inbox (e.g., invoices@yourcompany.com), downloads attachments, reads the data using AI, and generates draft bills in your accounting software.",
    "who_its_for": [
      "Accounting firms processing high-volume client receipts",
      "Construction companies dealing with complex supplier invoices",
      "Logistics companies with massive paper trails"
    ],
    "whats_included": [
      "Custom OCR Model Training: We train the AI to recognize the specific layouts of your most common vendors.",
      "Email Integration: Automated webhooks that listen to your Gmail or Outlook inbox for new attachments.",
      "Accounting Sync: Native API integration to push approved invoices straight to QuickBooks, Xero, or Sage.",
      "Human-in-the-Loop Dashboard: A simple interface for your team to quickly review and approve any invoices the AI is unsure about.",
      "Line-Item Extraction: It doesn't just pull the total; it extracts every single item, quantity, and unit price."
    ],
    "whats_not_included": [
      "Payment Execution: The system drafts the bills in your accounting software, but it does not automatically wire money to vendors.",
      "Physical Mail Scanning: You must provide digital PDFs or scans. We do not process physical paper."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Provide Samples",
        "desc": "You send us 100 past invoices so we can train the extraction models."
      },
      {
        "title": "Step 2: Pipeline Build",
        "desc": "We build the cloud infrastructure to parse emails and run the OCR engine securely."
      },
      {
        "title": "Step 3: Accounting Connect",
        "desc": "We link the pipeline to your specific Xero/QuickBooks account."
      },
      {
        "title": "Step 4: Go Live",
        "desc": "You start forwarding invoices to the bot, and watch them appear in your ledger."
      }
    ],
    "prerequisites": [
      "Digital invoices (PDF, JPG, PNG).",
      "Admin access to your accounting software."
    ],
    "support_policy": "Includes ongoing model retraining. If a vendor changes their invoice layout and the AI fails to read it, we fix it within 24 hours.",
    "customization_options": [
      "Multi-currency support",
      "Custom approval workflows",
      "PO matching logic"
    ],
    "features": [
      "99% Extraction Accuracy",
      "Line-item Detail",
      "Native ERP Sync",
      "Automated Inbox Listening"
    ]
  },
  {
    "id": "c5",
    "title": "E-commerce Custom Mobile App",
    "plain_english": "We turn your online store into a premium iOS and Android app so your best customers can shop natively on their phones.",
    "description": "A fully custom iOS and Android application synced in real-time with your existing Shopify or WooCommerce backend. We build a high-performance native shopping experience with push notifications, Apple Pay, and bespoke loyalty features to massively increase your customer retention.",
    "category": "mobile",
    "status": "active",
    "price_min": 3500,
    "price_max": 9900,
    "rating": "5.0",
    "installs_count": "24",
    "delivery_days": 30,
    "developer_name": "Native Commerce Labs",
    "image_url": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/app",
    "what_it_does": "Provides a native, lightning-fast shopping experience. Customers can browse your catalog instantly, save items to their wishlist, checkout in 1-click using Apple Pay/Google Pay, and receive rich push notifications about flash sales directly to their lock screens.",
    "who_its_for": [
      "Fashion and beauty brands with high repeat-purchase rates",
      "Subscription box companies",
      "High-volume DTC brands looking to escape rising ad costs"
    ],
    "whats_included": [
      "Native iOS & Android Apps: Developed using React Native for a perfectly smooth 60fps experience on all devices.",
      "Real-Time Store Sync: 100% sync with your Shopify/WooCommerce catalog, inventory, and pricing. No duplicate data entry.",
      "Push Notification Engine: A dashboard to send segmented push notifications (e.g., \"Hey VIPs, early access to the new drop starts now\").",
      "Native Checkout Integration: Seamless Apple Pay and Google Pay integration to reduce cart abandonment.",
      "App Store Publishing: We handle the entire bureaucratic process of getting your app approved and live on the Apple App Store and Google Play."
    ],
    "whats_not_included": [
      "Apple Developer Account Fees: You must pay Apple the standard $99/year fee to host the app under your own company name.",
      "Ongoing Marketing: We build the app, but you are responsible for convincing your customers to download it."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Design UI",
        "desc": "We design a bespoke, brand-aligned mobile UI and present it for your approval."
      },
      {
        "title": "Step 2: API Connection",
        "desc": "We hook the mobile frontend into your existing e-commerce backend."
      },
      {
        "title": "Step 3: App Build",
        "desc": "We develop the app, implementing native features like push notifications and haptics."
      },
      {
        "title": "Step 4: App Store Launch",
        "desc": "We manage the strict review processes for both Apple and Google until the app is live."
      }
    ],
    "prerequisites": [
      "An established Shopify or WooCommerce store with clean product data.",
      "High-resolution lifestyle and product photography."
    ],
    "support_policy": "3 months of post-launch bug fixing included. Annual maintenance contracts available to ensure compatibility with new iOS/Android updates.",
    "customization_options": [
      "Custom loyalty programs",
      "Augmented Reality (AR) try-ons",
      "Exclusive in-app only products"
    ],
    "features": [
      "React Native Architecture",
      "Apple/Google Pay",
      "Push Notifications",
      "Real-time Sync"
    ]
  },
  {
    "id": "c6",
    "title": "Healthcare Patient Portal",
    "plain_english": "A secure, HIPAA-compliant website where patients can view their lab results, book appointments, and message their doctor safely.",
    "description": "We develop highly secure, fully compliant patient management portals for clinics and healthcare providers. Features include encrypted messaging, secure document delivery (lab results), telemedicine video links, and integrated appointment scheduling.",
    "category": "healthcare",
    "status": "active",
    "price_min": 4500,
    "price_max": 12000,
    "rating": "4.9",
    "installs_count": "12",
    "delivery_days": 45,
    "developer_name": "MedTech Security",
    "image_url": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/health",
    "what_it_does": "Provides a digital front door for your clinic. Patients log in securely with 2FA to see their upcoming appointments, securely message staff, and view their medical history without waiting on hold on the phone.",
    "who_its_for": [
      "Private clinics and boutique practices",
      "Therapists and psychologists needing secure messaging",
      "Specialist doctors managing chronic care patients"
    ],
    "whats_included": [
      "HIPAA/GDPR Compliant Infrastructure: Fully encrypted databases at rest and in transit, complete with audit logs.",
      "Secure Messaging Module: End-to-end encrypted chat between patients and clinical staff.",
      "Document Vault: A secure area where staff can upload PDF lab results or prescriptions for patients to download.",
      "Scheduling Integration: Custom calendars allowing patients to book or cancel appointments based on complex provider availability rules.",
      "Telehealth Links: Automated generation and sharing of secure Zoom/Teams links for virtual consultations."
    ],
    "whats_not_included": [
      "Deep EMR/EHR Integration: Integrating natively with massive hospital systems like Epic or Cerner is a massive enterprise scope not included here.",
      "Medical Advice AI: For extreme liability reasons, this portal facilitates human-to-human communication. It does not provide AI medical diagnoses."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Compliance Review",
        "desc": "We establish a Business Associate Agreement (BAA) and review your data security requirements."
      },
      {
        "title": "Step 2: Architecture Design",
        "desc": "We design the secure database schema and user flows."
      },
      {
        "title": "Step 3: Development",
        "desc": "We build the portal using strict security best practices and conduct penetration testing."
      },
      {
        "title": "Step 4: Staff Training",
        "desc": "We safely migrate any existing patient accounts and train your staff on the new system."
      }
    ],
    "prerequisites": [
      "A clear understanding of your local healthcare data regulations (HIPAA, GDPR, PIPEDA).",
      "A dedicated privacy officer on your team to oversee the project."
    ],
    "support_policy": "Includes strict SLA-backed emergency support and regular security audits. Lifetime patching for critical security vulnerabilities.",
    "customization_options": [
      "Custom intake forms",
      "Family/Dependent account linking",
      "Integrated billing/payments"
    ],
    "features": [
      "HIPAA Compliant",
      "End-to-end Encryption",
      "Audit Logging",
      "Secure Document Vault"
    ]
  },
  {
    "id": "c8",
    "title": "Automated Logistics Dispatcher",
    "plain_english": "An AI brain that looks at all your deliveries for the day and figures out the absolute fastest routes for your drivers.",
    "description": "A custom-built routing and dispatch engine for delivery fleets. We integrate with your order management system to automatically group orders, calculate the most fuel-efficient routes, and dispatch them to a custom driver mobile app.",
    "category": "logistics",
    "status": "active",
    "price_min": 2500,
    "price_max": 7500,
    "rating": "4.8",
    "installs_count": "34",
    "delivery_days": 21,
    "developer_name": "RouteOptima",
    "image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/logistics",
    "what_it_does": "Replaces manual map routing. It takes 500 addresses, considers traffic, vehicle capacity, and delivery time windows, and instantly spits out the perfect turn-by-turn route for your 10 drivers. It saves massive amounts of fuel and time.",
    "who_its_for": [
      "Local courier and delivery businesses",
      "Furniture and large-appliance delivery fleets",
      "Food distributors routing daily trucks"
    ],
    "whats_included": [
      "Algorithmic Route Optimization: We implement the Google OR-Tools or Mapbox API to solve complex Traveling Salesperson Problems instantly.",
      "Dispatcher Web Dashboard: A live map showing exactly where every truck is, allowing dispatchers to drag-and-drop emergency orders into active routes.",
      "Driver Mobile Web App: A simple interface for drivers to see their stops, get Google Maps directions, and collect digital signatures (Proof of Delivery).",
      "Automated Customer SMS: Sends automated text messages (e.g., \"Your driver is 10 minutes away!\") based on live GPS tracking.",
      "Order API Sync: Automatically pulls daily delivery orders from your Shopify, WooCommerce, or custom ERP."
    ],
    "whats_not_included": [
      "Google Maps API Fees: You will need to pay Google Maps/Mapbox directly for the routing API calls (usually a few cents per optimized route).",
      "Physical GPS Trackers: This relies on the GPS of the driver's smartphone. We do not supply hardwired OBD-II vehicle trackers."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Constraint Mapping",
        "desc": "Tell us your rules: vehicle weight limits, driver shift times, and maximum stops per route."
      },
      {
        "title": "Step 2: Backend Integration",
        "desc": "We connect your order system so addresses flow into the dispatcher automatically."
      },
      {
        "title": "Step 3: Algorithm Tuning",
        "desc": "We test the routing algorithm against your historical data to prove fuel savings."
      },
      {
        "title": "Step 4: Driver Onboarding",
        "desc": "We deploy the system and train your dispatchers and drivers on the new workflow."
      }
    ],
    "prerequisites": [
      "A list of addresses in a clean digital format.",
      "Drivers with modern smartphones (iOS/Android)."
    ],
    "support_policy": "6 months of priority bug fixing. We continuously monitor the algorithm to ensure routes are calculating efficiently.",
    "customization_options": [
      "Cold-chain/Refrigeration tracking",
      "Barcode scanning integration",
      "Complex time-window restrictions"
    ],
    "features": [
      "Live GPS Tracking",
      "Automated Routing",
      "Proof of Delivery",
      "Customer SMS Alerts"
    ]
  },
  {
    "id": "c9",
    "title": "Custom E-Learning Platform (LMS)",
    "plain_english": "Your own private Netflix-style academy where you can sell courses, track student progress, and issue certificates.",
    "description": "We build a bespoke Learning Management System tailored to your exact curriculum. Unlike generic platforms like Teachable, we give you 100% control over the user experience, custom gamification, complex tiered access, and proprietary video hosting security.",
    "category": "education",
    "status": "active",
    "price_min": 2900,
    "price_max": 8500,
    "rating": "5.0",
    "installs_count": "42",
    "delivery_days": 25,
    "developer_name": "EduTech Builders",
    "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/lms",
    "what_it_does": "Provides a premium, branded environment for your students. It handles secure payment processing, unlocks content over time (drip feeds), tracks exact video watch-time, automatically grades quizzes, and issues PDF certificates upon completion.",
    "who_its_for": [
      "High-ticket course creators tired of generic platforms",
      "Corporations needing internal compliance training portals",
      "Universities looking for bespoke online degree interfaces"
    ],
    "whats_included": [
      "Bespoke Frontend Interface: A stunning, custom-designed learning environment that feels premium and perfectly matches your brand.",
      "Secure Video Hosting: Integration with Mux or AWS to ensure your videos load instantly globally and cannot be easily downloaded or pirated.",
      "Complex Access Logic: Build custom subscription tiers, one-time purchases, or drip-feed schedules that unlock modules weekly.",
      "Gamification & Quizzes: Custom-built interactive quizzes, progress bars, and achievement badges to keep students engaged.",
      "Admin Analytics: A dashboard showing exactly where students drop off in your videos so you can improve your content."
    ],
    "whats_not_included": [
      "Video Production: We build the platform, but you must record and edit the actual educational video content.",
      "Streaming Bandwidth Costs: You will be responsible for the video streaming bandwidth costs via Mux or AWS (usually very affordable)."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Curriculum Planning",
        "desc": "We map out your course structure, modules, quizzes, and access tiers."
      },
      {
        "title": "Step 2: Platform Design",
        "desc": "We design the student dashboard and admin backend for your approval."
      },
      {
        "title": "Step 3: Build & Upload",
        "desc": "We build the code while you upload your videos to our secure staging environment."
      },
      {
        "title": "Step 4: Launch",
        "desc": "Connect your Razorpay account and start enrolling students."
      }
    ],
    "prerequisites": [
      "Your course content (videos, PDFs, quizzes) ready to be uploaded.",
      "A Razorpay account to process student payments."
    ],
    "support_policy": "Includes 6 months of comprehensive bug fixes and technical support to ensure smooth video playback for all students.",
    "customization_options": [
      "Community forums integration",
      "Live Zoom scheduling",
      "Custom PDF certificate generation"
    ],
    "features": [
      "Secure Video Hosting",
      "Custom Gamification",
      "Advanced Analytics",
      "Razorpay Integration"
    ]
  },
  {
    "id": "c10",
    "title": "AI Cold Email Infrastructure",
    "plain_english": "We build a technical setup that sends thousands of personalized emails a day without landing in the spam folder.",
    "description": "A hardcore, highly technical outbound email infrastructure built for B2B sales teams. We handle the complex domain warmups, DNS configurations (SPF, DKIM, DMARC), and deploy custom AI scripts that scrape lead data and write hyper-personalized first lines for every single prospect at scale.",
    "category": "marketing",
    "status": "active",
    "price_min": 1500,
    "price_max": 3500,
    "rating": "4.8",
    "installs_count": "88",
    "delivery_days": 10,
    "developer_name": "Outbound Architects",
    "image_url": "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80",
    "preview_images": [
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    ],
    "demo_url": "https://example.com/demo/coldemail",
    "what_it_does": "Turns cold outreach into a science. Instead of sending generic spam that gets blocked, this infrastructure uses dozens of secondary domains to safely send thousands of emails. The AI reads the prospect's LinkedIn and company website to write a custom opening sentence, guaranteeing high open and reply rates.",
    "who_its_for": [
      "B2B SaaS companies trying to book enterprise demos",
      "Marketing agencies doing outreach for clients",
      "High-ticket consultants looking for new clients"
    ],
    "whats_included": [
      "Bulletproof DNS Infrastructure: We purchase 5-10 secondary domains, configure Google Workspace/Microsoft 365, and set up flawless SPF, DKIM, and DMARC records.",
      "Automated Domain Warmup: We connect your new inboxes to a warmup network that automatically sends and replies to emails for 2 weeks to build sender reputation.",
      "AI Personalization Script: A custom Python script that takes your list of leads, scrapes their company website, and uses GPT-4 to write a highly relevant, personal first sentence for the email.",
      "Outreach Platform Configuration: We setup Instantly, Lemlist, or Smartlead with optimal sending schedules and follow-up sequences.",
      "Master Inbox Setup: A single unified dashboard where your sales team can reply to all leads across all the different sending domains."
    ],
    "whats_not_included": [
      "Lead Scraping: You must provide the CSV list of leads (names, emails, company domains). We do not scrape Apollo or ZoomInfo for you.",
      "Software Subscriptions: You will pay for the Google Workspace inboxes, the domains, and the sending platform (e.g., Instantly) directly."
    ],
    "how_it_works": [
      {
        "title": "Step 1: Domain Setup",
        "desc": "We purchase lookalike domains and configure the complex backend DNS records."
      },
      {
        "title": "Step 2: Warmup Phase",
        "desc": "We let the domains age and warm up automatically for 14 days to ensure high deliverability."
      },
      {
        "title": "Step 3: Script Engineering",
        "desc": "We build the custom AI prompt that will write your personalized email copy."
      },
      {
        "title": "Step 4: Sequence Launch",
        "desc": "We load your leads, activate the campaigns, and monitor the initial open rates."
      }
    ],
    "prerequisites": [
      "A clear offer and understanding of your target B2B audience.",
      "A CSV list of at least 1,000 valid B2B leads to start the campaign."
    ],
    "support_policy": "30 days of deliverability monitoring. If your domains hit spam traps, we will pause campaigns and re-warm the infrastructure.",
    "customization_options": [
      "Multi-channel logic (LinkedIn + Email)",
      "Custom AI scraping targets (e.g. recent news)",
      "Automated CRM syncing"
    ],
    "features": [
      "Bulletproof Deliverability",
      "AI Personalization at Scale",
      "Unified Master Inbox",
      "Automated Follow-ups"
    ]
  }
];
