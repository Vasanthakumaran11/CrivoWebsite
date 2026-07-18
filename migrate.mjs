// migrate.mjs
//
// One-time content migration: pushes every hardcoded string currently living in
// src/**/*.jsx (the fallback copy used by each Sanity-wired component) into Sanity
// as real documents, using the same GROQ-queried shapes the components expect.
//
// Usage:  node migrate.mjs
//
// Every document uses a fixed _id + client.createOrReplace(), so running this
// script multiple times is safe — it will never create duplicates, it will just
// overwrite the same documents with the same content.

import 'dotenv/config'
import { createClient } from '@sanity/client'

// --- Environment -----------------------------------------------------------
// Per the task spec we only read VITE_SANITY_PROJECT_ID and VITE_SANITY_TOKEN.
// VITE_SANITY_DATASET is also read because @sanity/client cannot address a
// dataset without it (src/lib/sanityClient.jsx already depends on the same
// variable) — it is a non-secret config value (e.g. "production"), not a
// credential, so including it does not violate the "don't touch other secrets"
// intent. No other env vars are read anywhere in this file.
const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET
const token = process.env.VITE_SANITY_TOKEN

if (!projectId || !token) {
  console.error('Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_TOKEN in .env')
  process.exit(1)
}
if (!dataset) {
  console.error('Missing VITE_SANITY_DATASET in .env (required to target a dataset)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// --- Helpers -----------------------------------------------------------------
// Sanity requires a unique _key on every item of an array-of-objects field
// (not needed for arrays of plain strings/numbers).
function keyed(items) {
  return items.map((item, i) => ({ _key: `k${i}`, ...item }))
}

// Blog "sections" is a union array (textSection | dualCardSection | codePlayground | widgetPlaceholder)
// so each item needs both _key and _type.
function section(_type, key, fields) {
  return { _key: key, _type, ...fields }
}

// --- Documents ---------------------------------------------------------------
const documents = [

  // ===========================================================================
  // banner  (Home hero — src/components/Home/major.jsx via useBanner)
  // ===========================================================================
  {
    _id: 'banner-main',
    _type: 'banner',
    title: "Technology Built For What's Next.",
    subtitle: 'Precision-crafted products for smart infrastructure, intelligent mobility and the brands that lead tomorrow.',
    ctaText: 'BOOK A MEET',
    ctaLink: '/book-meet',
  },

  // ===========================================================================
  // homePage  (src/components/Home/WhatWeDo.jsx, Client.jsx, partners.jsx)
  // Note: the `header` block below is not currently rendered by major.jsx
  // (the hero reads from the `banner` document above instead) — it is seeded
  // here for schema completeness only.
  // ===========================================================================
  {
    _id: 'home-page',
    _type: 'homePage',
    title: 'Home Page Content',
    header: {
      bannerTitle: "Technology Built For What's Next.",
      bannerSubtitle: 'Precision-crafted products for smart infrastructure, intelligent mobility and the brands that lead tomorrow.',
      meetButtonText: 'BOOK A MEET',
      productButtonText: 'EXPLORE OUR PRODUCTS',
    },
    whyChooseUs: {
      box1: {
        title: 'Innovation-Driven Solutions',
        description: 'We focus on creating forward-thinking digital experiences that adapt to the latest technologies by embracing cutting-edge tools and strategies.',
      },
      box2: {
        title: 'Holistic Approach',
        description: 'We seamlessly integrate every aspect of your digital presence — from web development and mobile apps to marketing strategies — under one roof.',
      },
      box3: {
        title: 'Data-Backed Results',
        description: 'Every strategy implemented is driven by precise insights and analytics to optimize performance and maximize ROI for your business.',
      },
    },
    process: {
      box1: { stepNumber: '01', title: 'Discovery', description: 'We deep-dive into your business, goals, and competition to build a solid foundation.' },
      box2: { stepNumber: '02', title: 'Strategy', description: 'A tailored roadmap covering tech stack, timeline, milestones, and success metrics.' },
      box3: { stepNumber: '03', title: 'Build', description: 'Design and development sprints with weekly demos so you always see progress.' },
      box4: { stepNumber: '04', title: 'Launch', description: 'Rigorous testing, staging review, and a seamless go-live with zero downtime.' },
      box5: { stepNumber: '05', title: 'Grow', description: 'Post-launch support, analytics reviews, and iteration cycles to keep you ahead.' },
    },
    trustedTechnologies: ['Shopify', 'Razorpay', 'AWS', 'Vercel', 'Firebase', 'Stripe', 'HubSpot', 'Figma', 'MongoDB', 'Cloudflare'],
    ourClients: keyed([
      {
        name: 'Kumaravel',
        role: 'National Chair – Innovation, CII Young Indians',
        quote: 'Crivo transformed our outdated platform into a blazing-fast web app. The team delivered beyond our expectations — on time and with zero compromises on quality.',
        initial: 'K',
      },
      {
        name: 'Kannan P.S.',
        role: 'Executive Director, KonguTBI',
        quote: 'From branding to deployment, Crivo handled everything seamlessly. Our app downloads tripled within two months of launch. Truly a world-class team.',
        initial: 'K',
      },
      {
        name: 'Harris',
        role: 'Twincord Technologies Private Limited',
        quote: "Their digital marketing campaigns didn't just bring traffic — they brought the right traffic. Our conversion rate jumped 4x in under 90 days.",
        initial: 'H',
      },
      {
        name: 'Kavin Kumaar',
        role: 'Corporate Affairs, Zeon Electric Pvt Ltd',
        quote: 'We had a tight deadline for our product launch. Crivo stepped in, built the entire platform, and had us live in 6 weeks. Remarkable execution.',
        initial: 'K',
      },
    ]),
  },

  // ===========================================================================
  // siteFooter  (src/components/Home/footer.jsx)
  // youtubeLink omitted: the original hardcoded value was "#" which is not a
  // valid URL, so there is nothing real to migrate — the component already
  // falls back to "#" automatically when this field is unset.
  // ===========================================================================
  {
    _id: 'site-footer',
    _type: 'siteFooter',
    title: 'Footer Content',
    bannerTitle: 'Get Ready to Grow Your Business',
    email: 'info@crivo.in',
    phone: '+91 96007 60063',
    instagramLink: 'https://www.instagram.com/crivo_tech_?igsh=bnB6ZTVua3RuZ2dk',
    xLink: 'https://x.com/Crivo_Tech',
    linkedinLink: 'https://www.linkedin.com/company/crivo-tech/',
    copyrightText: '© 2026 Crivo. All Rights Reserved.',
    madeByText: 'Made by Crivo',
  },

  // ===========================================================================
  // aboutPage  (AboutUs.jsx, StatsSection.jsx, MissionVision.jsx, Leaders.jsx, CoreTeam.jsx)
  // Leader/member `image` fields are omitted — local files in /public would
  // need to be uploaded as Sanity assets first; this script only migrates text.
  // ===========================================================================
  {
    _id: 'about-page',
    _type: 'aboutPage',
    title: 'About Us Page Content',
    hero: {
      eyebrow: 'Our Story',
      titleLine1: 'ABOUT',
      titleLine2: 'CRIVO.',
      description: 'Seamlessly blending technology with unparalleled business vision to craft intelligent, innovative solutions for unmatched transformation success.',
    },
    statsSection: {
      eyebrow: 'Who We Are',
      title: 'Elevate your Brand with CRIVO',
      description1: 'Crivo Tech is a modern product tech company built for the digital era. We build robust, scalable platforms for businesses of all sizes — from ambitious startups to established enterprises — to power and grow their digital presence.',
      description2: "Our team combines deep technical expertise with strategic thinking to engineer premium products across web platforms, mobile apps, IoT systems, and automated pipelines. We don't just deliver software — we build long-term value rooted in product excellence.",
      ctaButtonText: 'BUILD WITH US',
      statsList: keyed([
        { value: '50+', label: 'Supported Platforms' },
        { value: '10+', label: 'Customers' },
        { value: '20+', label: 'Employees' },
        { value: '10K+', label: 'Daily Active Users' },
      ]),
    },
    missionVision: {
      mission: {
        title: 'OUR MISSION',
        description: 'To democratize technology by offering accessible and affordable solutions while nurturing the next generation of innovators through practical education. We strive to bridge the gap between complex digital challenges and intuitive, human-centric solutions.',
      },
      vision: {
        title: 'OUR VISION',
        description: 'To create a world where technology is affordable, accessible, and backed by a workforce skilled through real-world experience. We envision a future where high-quality engineering and enterprise-grade tools are accessible to every builder and organization.',
      },
    },
    leadersSection: {
      title: 'LEADERS',
      leaders: keyed([
        { name: 'Bharanidharan R N', role: 'Co-Founder & CEO', email: 'founder@crivo.in', linkedin: 'https://www.linkedin.com/in/bharanidharanrn/' },
        { name: 'Gokulnath Sundaramurthi', role: 'Co-Founder & CTO', email: 'cto@crivo.in', linkedin: 'https://www.linkedin.com/in/gokulnath-bs/' },
        { name: 'Hareeni S', role: 'Co-Founder & COO', email: 'coo@crivo.in', linkedin: 'https://www.linkedin.com/in/hareenis?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
      ]),
    },
    coreTeamSection: {
      title: 'CORE TEAM',
      members: keyed([
        { name: 'Vasantha Kumar A', role: 'Data Engineer & Frontend Developer', email: 'vasanthakumaran0011@gmail.com', github: 'https://github.com/Vasanthakumaran11', linkedin: 'https://www.linkedin.com/in/vasanthakumaran11/', initial: 'V' },
        { name: 'Darshan T P', role: 'Product Lead', email: 'darshantp13@gmail.com', github: 'https://github.com/Darshan-T-P', linkedin: 'https://www.linkedin.com/in/darshantp13/', initial: 'D' },
        { name: 'Bharat Kumar J', role: 'Flutter Developer', email: 'bharathkumar037@gmail.com', linkedin: 'https://www.linkedin.com/in/bharathkumar-j-373598386/', github: 'https://github.com/Bharathkumar2024', initial: 'B' },
        { name: 'Praneesh S', role: 'Backend Developer', email: 'spraneesh2007@gmail.com', github: 'https://github.com/SelvaPraneesh', linkedin: 'https://www.linkedin.com/in/praneeshs', initial: 'P' },
        { name: 'Thirumalai Kumar C', role: 'ML Developer', email: 'thirumalai@crivo.in', github: 'https://github.com/thirumalaikumar07', linkedin: 'https://www.linkedin.com/in/thirumalaikumar-c-62b158365', initial: 'T' },
        { name: 'Anthoni Milton R', role: 'ML Developer', email: 'miltonanthonimilton@gmail.com', github: 'https://github.com/anthonimilton07', linkedin: 'https://www.linkedin.com/in/anthoni-milton-993169331', initial: 'A' },
      ]),
    },
    cta: {
      eyebrow: 'Work With Us',
      titleLine1: 'GET STARTED WITH',
      titleLine2: 'CRIVO TODAY.',
      ctaBookText: 'BOOK A MEET',
      ctaEmailText: 'EMAIL US',
    },
  },

  // ===========================================================================
  // reachPage  (ReachUs.jsx, ContactInfo.jsx, EmergencyDesk.jsx, DirectoryCards.jsx)
  // ===========================================================================
  {
    _id: 'reach-page',
    _type: 'reachPage',
    title: 'Reach Us Page Content',
    hero: {
      eyebrow: 'Get In Touch',
      titleLine1: 'REACH',
      titleLine2: 'US.',
      description: "Have a project in mind, a question, or just want to say hello? We'd love to hear from you.",
    },
    contactDetails: {
      email: 'info@crivo.in',
      phone: '+91 96007 60063',
      address: '221 R.K Building, Uthukuli, Tiruppur - 638751',
    },
    partnerSection: {
      eyebrow: "Let's Work Together",
      titleLine1: "LET'S WORK",
      titleLine2: 'TOGETHER.',
      cpoColumn: {
        tag: 'NETWORK CPO INTEGRATION // NODE 01',
        title: 'Network Interoperability Integration',
        description: 'Are you an Indian CPO looking to eliminate payment friction? Connect your charging hardware and wallet API layer to our unified infrastructure to immediately access thousands of multi-network EV drivers.',
        buttonText: 'Request API Documentation Handshake',
      },
      amenityColumn: {
        tag: 'AMENITY DISCOVERY // NODE 02',
        title: 'Strategic Amenity Mapping',
        description: 'Do you own a hotel, restaurant, or highway rest plaza with EV charging facilities? List your location on our AI recommendation engine to attract long-distance travelers looking for comfort-first charging stops.',
        buttonText: 'Register Your Commercial Space',
      },
    },
    customerAssistance: {
      bannerTitle: 'CUSTOMER ASSISTANCE.',
      supportEmailBox: {
        title: 'Direct Support Email',
        description: 'Have general queries, partnership proposals, or detailed logs to send? Connect directly with our core email support gateway.',
        email: 'support@crivo.in',
      },
      urgentSupportBox: {
        title: 'Urgent Support Line',
        description: 'Currently stranded on a live trip or facing critical charger wallet lockouts? Contact our 24/7 hotline for priority emergency support.',
        phone: '+91 96007 60063',
      },
      getHelpConsole: {
        title: 'Get Help Console',
        description: 'Experiencing trip planner anomalies or charging wallet issues? Send an instant alert directly to our active engineering queue.',
        buttonText: 'Open Help Console',
      },
    },
    directory: {
      eyebrow: 'Quick Access',
      titleLine1: 'OFFICE',
      titleLine2: 'DIRECTORY.',
      cards: keyed([
        {
          title: 'Contact',
          address: '221 R.K Building, Uthukuli, Tiruppur - 638751',
          phone: '+91 96007 60063',
          email: 'info@crivo.in',
        },
        {
          title: 'Office Hours',
          hoursMonSat: '[9:00 am - 5:00 pm]',
          hoursSun: '[9:00 am - 5:00 pm]',
        },
        {
          title: 'Location',
          description: 'Easily find us on map services to schedule an in-person meeting or office tour.',
          mapLink: 'https://www.google.com/maps/search/?api=1&query=221+R.K+Building+Uthukuli+Tiruppur+638751',
        },
        {
          title: 'Support Option',
          description: 'Get dedicated support for all our web, app, and system platforms directly from our core engineering team.',
          email: 'support@crivo.in',
        },
        {
          title: 'Apply to join',
          description: 'We are always looking for passionate builders, designers, and innovators to shape the future of tech.',
          email: 'hr@crivo.in',
        },
      ]),
    },
  },

  // ===========================================================================
  // bookMeetPage  (src/pages/BookMeet.jsx)
  // ===========================================================================
  {
    _id: 'book-meet-page',
    _type: 'bookMeetPage',
    title: 'Book A Meet Page Content',
    leftSideContent: {
      eyebrow: 'Book a Meet',
      titleLine1: 'GET STARTED',
      titleLine2: 'TODAY',
      description: "Elevate your vision with our expert guidance. Let's discuss how we can transform your ideas into reality.",
    },
  },

  // ===========================================================================
  // productCsms  (src/components/Product/CSMS.jsx)
  // ===========================================================================
  {
    _id: 'product-csms',
    _type: 'productCsms',
    title: 'CSMS Page Content',
    hero: {
      title: 'CONNECT THROUGH CRIVO',
      subtitle: 'CONNECT, MONITOR, CONTROL, AND SCALE YOUR EV CHARGING INFRASTRUCTURE WITH PRECISION.',
      description: 'Crivo CSMS (Charging Station Management System) is an intelligent, cloud-based platform built to power the future of electric vehicle charging networks. Enable seamless monitoring, diagnostics, and control of your chargers from a single centralized hub.',
    },
    indicators: {
      uptime: '99.98%',
    },
    intro: {
      titleLine1: 'A Cloud-Native Operating System',
      titleLine2: 'For EV Charging Infrastructure',
      description: 'Crivo CSMS is built to connect, monitor, control, and optimize EV charging operations at scale. From charger connectivity and remote diagnostic runs to session analytics, billing management, and intelligent power distribution — manage your entire charging ecosystem from one centralized platform.',
    },
    demo: {
      eyebrow: 'Interactive Live Demo',
      titleLine1: 'EXPERIENCE THE',
      titleLine2: 'LIVE OPERATOR HUB',
      description: 'Simulate actual charging station workflows, trigger OCPP requests, control connectors remotely, and see protocol transactions update in real-time.',
    },
    architecture: {
      eyebrow: 'System Architecture',
      title: 'CONNECTING EV CHARGERS TO A SMART CENTRAL SYSTEM',
      description: 'Every charger connects securely to the Crivo CSMS platform through OCPP. Real-time charger data, session activity, health monitoring, alerts, and remote operations are managed from a centralized cloud dashboard.',
    },
    bentoFeatures: {
      eyebrow: 'Core Infrastructure Capabilities',
      titleLine1: 'COMPLETE CONTROL.',
      titleLine2: 'ANY NETWORK SIZE.',
      description: 'We translate raw charger telemetry into automated optimization algorithms, helping operators cut maintenance overheads by up to 40%.',
    },
    standards: {
      eyebrow: 'Technical Standards',
      titleLine1: 'BUILT ON INDUSTRY',
      titleLine2: 'OPEN STANDARD PROTOCOLS',
      description: 'We design our systems for maximum interoperability. By building natively on Open Charge Alliance protocols, Crivo ensures you are never locked into a single hardware vendor.',
      standardsList: [
        'Natively supports OCPP 1.6J (JSON over WebSockets)',
        'Compatible with OCPP 2.0.1 core features & security profiles',
        'Industry-standard security (TLS 1.3, basic auth profiles)',
        'Custom REST APIs for third-party billing & CRM integrations',
        'Support for OpenADR 2.0b for smart grid dynamic demand response',
      ],
    },
    specifications: {
      title: 'CSMS Core Architecture Specifications',
      specsList: keyed([
        { label: 'Deployment Modes', val: 'Cloud hosting (AWS Serverless) / On-premise local server options' },
        { label: 'Charger Interoperability', val: 'Any OCPP compliant hardware (Tritium, ABB, Delta, Alpitronic, EVBox, etc.)' },
        { label: 'Real-time Notifications', val: 'WebSocket message relays, Webhook alerts, email triggers, Slack/Telegram bot alerts' },
        { label: 'Smart Power Distribution', val: 'Dynamic load limits updates, daisy-chained charging prioritizations, local grid peak-shaving overrides' },
        { label: 'User Authentication', val: 'RFID card authorization, Mobile app QR scanner start, local pinpad unlock, Autocharge (Plug & Charge ISO 15118)' },
      ]),
    },
    cta: {
      eyebrow: 'Scale Smarter, Operate Faster',
      titleLine1: 'READY TO RUN',
      titleLine2: 'YOUR CHARGING NETWORK?',
      description: 'Configure, manage, and scale your EV charging assets seamlessly with Crivo CSMS. Schedule a demo session with our operations team today.',
      buttonText: 'BOOK A MEET',
    },
  },

  // ===========================================================================
  // productPlanner  (src/components/Product/Planner.jsx)
  // ===========================================================================
  {
    _id: 'product-ev-planner',
    _type: 'productPlanner',
    title: 'Planner Page Content',
    hero: {
      titleLine1: 'AI SMART TRIP',
      titleLine2: 'PLANNER SYSTEM',
      subtitle: 'PREDICT RANGE, OPTIMIZE ROUTE STOPS, AND TRANSACT VIA UNIFIED WALLET BALANCES SEAMLESSLY.',
      description: 'An intelligent route intelligence platform designed for the Indian EV ecosystem. Crivo Smart EV Trip Planner predicts realistic ranges based on AC loads, terrain variations, weather drag, and speed profiles, routing drivers to charging stops while linking all CPO wallets natively.',
    },
    intro: {
      titleLine1: 'Predictive Trip Intelligence',
      titleLine2: 'Designed for the Indian Terrain',
      description: "Crivo's predictive Trip Planner leverages advanced machine learning to eliminate range anxiety. Our platform dynamically calculates battery health and range degradation using real-world factors like weather wind drag, elevation gradients, passenger loads, and AC cabin draw.",
    },
    simulator: {
      eyebrow: 'Route Intelligence Simulator',
      titleLine1: 'EXPERIENCE THE AI',
      titleLine2: 'ROUTE ADVISER',
      routeName: 'Mumbai ➔ Pune ➔ Kolhapur',
      description: 'Simulate route telemetry on the Mumbai ➔ Pune ➔ Kolhapur corridor. Adjust trip variables and see dynamic charger suggestions update instantly.',
    },
    wallet: {
      eyebrow: 'Unified EV Wallet',
      titleLine1: 'ONE WALLET.',
      titleLine2: 'EVERY CHARGER.',
      description: "No more switching apps. No more separate logins. Connect all your CPO wallets into a single unified balance and charge seamlessly across India's entire EV network. Crivo consolidates accounts from Zeon, ChargeZone, Statiq, Jio-bp, and more.",
    },
    capabilities: {
      eyebrow: 'Core Capabilities',
      titleLine1: 'EVERYTHING YOUR',
      titleLine2: 'EV JOURNEY NEEDS.',
      countText: '06 MODULES COMPLETE',
      modulesList: keyed([
        { title: 'AI Range Prediction', desc: 'Real-world range estimation using battery %, speed, terrain, weather, AC load, passenger count, and driving environment.' },
        { title: 'Intelligent Route Planning', desc: 'Multi-stop trip optimization with automatic charging point insertion and minimal travel time routing.' },
        { title: 'Smart Charging Stops', desc: 'Ranks stations by charger compatibility, speed, availability, cost, deviation, wait time, ratings, and nearby amenities.' },
        { title: 'Unified EV Wallet', desc: 'Single wallet integrating Zeon, ChargeZone, Statiq, ChargeMOD, Jio-bp pulse and more — pay once, charge anywhere.' },
        { title: 'Emergency Low-Battery Mode', desc: 'Detects critical battery levels and instantly routes to the nearest compatible chargers with real-time availability.' },
        { title: 'Flutter Mobile App', desc: 'Seamless cross-platform app for EV users paired with a web-based admin dashboard for operators and managers.' },
      ]),
    },
    aiEngine: {
      eyebrow: 'AI Engine Architecture',
      titleLine1: 'PREDICTIVE ENGINE',
      titleLine2: 'SPECIFICATIONS',
      description: 'We integrate elevation curves, weather profiles, real-time charger statuses, and battery telemetry into a high-performance optimization grid.',
    },
    specifications: {
      title: 'Core Planner Specifications',
      specsList: keyed([
        { label: 'Supported Vehicles', val: 'All major Indian EVs (Tata Nexon EV, Tiago EV, Punch EV, MG ZS EV, BYD Atto 3, Hyundai Ioniq 5, Mahindra XUV400, etc.)' },
        { label: 'Predictive Variables', val: 'AC settings, speed profile, weather drag, ambient temperature, elevation ratio, vehicle cargo load' },
        { label: 'Consolidated CPOs', val: 'Zeon, ChargeZone, Statiq, Jio-bp pulse, ChargeMOD, EVRE, and other OCPP-connected networks' },
        { label: 'Application Handshakes', val: 'Flutter-based Android/iOS mobile clients, React Admin Dashboard, secure REST APIs' },
        { label: 'Smart Routing Core', val: 'Automatic charging station recommendation, amenities filtering, waiting time predictions' },
      ]),
    },
    cta: {
      eyebrow: 'Experience Smart Mobility',
      titleLine1: 'PLAN YOUR TRIP',
      titleLine2: 'WITHOUT RANGE ANXIETY.',
      description: 'Consolidate your charging payments and optimize your long-distance routes. Schedule a demo session with our EV engineering team today.',
    },
  },

  // ===========================================================================
  // productsPage  (Product.jsx hero/CTA, ProductShowcase.jsx productsList)
  // Showcase `image` fields omitted (see aboutPage note above re: local assets).
  // ===========================================================================
  {
    _id: 'products-page',
    _type: 'productsPage',
    title: 'Products Index Page Content',
    hero: {
      eyebrow: 'STANDALONE PRODUCTS INDEX',
      titleLine1: 'OUR',
      titleLine2: 'PRODUCTS.',
      description: 'Building specialized modular systems. Natively compliant charging management, range-anxiety-solving predictive routing, and optimized cargo logistics grids.',
    },
    productsList: keyed([
      {
        title: 'CRIVO CSMS',
        number: '01',
        status: 'Active',
        route: '/product/csms',
        description: 'CRIVO CSMS is an intelligent, cloud-based platform built to power the future of electric vehicle charging networks. Monitor, control, and manage your chargers seamlessly from a single centralized operations console.',
        features: [
          'Natively OCPP 1.6J and 2.0.1 compliant protocols',
          'Real-time charger status monitoring and alerts telemetry',
          'Automated billing cycles and dynamic grid load-balancing',
        ],
      },
      {
        title: 'Smart EV Trip Planner',
        number: '02',
        status: 'Active',
        route: '/product/planner',
        description: 'An AI-powered trip planner that optimizes EV routes by predicting precise state-of-charge degradation based on speed profiles, cabin AC draws, terrain slopes, and ambient temperatures.',
        features: [
          'Multi-factor predictive range calculation algorithm',
          'Single consolidated CPO wallet balance payment gateway',
          'Live charging station occupant mapping along corridors',
        ],
      },
      {
        title: 'Sector Logistics',
        number: '03',
        status: 'Upcoming',
        description: 'An upcoming enterprise logistics route and dispatch optimizer specifically tailored for Indian supply chain markets, fully integrated with electric vehicle charging infrastructures.',
        features: [
          'AI-driven automated dispatch queue allocation',
          'Tailored routing intelligence for Indian road constraints',
          'Direct integration with CSMS charging network reservations',
        ],
      },
    ]),
    cta: {
      eyebrow: 'SCALING SOLUTIONS',
      titleLine1: 'INTEGRATE',
      titleLine2: 'CRIVO TECHNOLOGY.',
      description: 'Contact our engineering integration desk to design, deploy, and scale custom instances of our products.',
      buttonText: 'Book A Technical Meet',
    },
  },

  // ===========================================================================
  // applyPage  (src/pages/ApplyToJoin.jsx)
  // ===========================================================================
  {
    _id: 'apply-page',
    _type: 'applyPage',
    title: 'Apply To Join Page Content',
    hero: {
      eyebrow: 'Careers at Crivo',
      titleLine1: 'JOIN',
      titleLine2: 'CRIVO.',
      description: "We're building EV infrastructure for India. If you want to work on products that matter, drop your details below — we'll take it from there.",
    },
    formIntro: {
      eyebrow: 'Apply Now',
      titleLine1: 'DROP YOUR',
      titleLine2: 'APPLICATION.',
      description: "No lengthy HR process. Tell us who you are and what you've built.",
    },
    ctaStrip: {
      title: 'Have questions before applying?',
      description: "Reach out directly — we're happy to talk.",
      buttonText: 'Contact Us',
    },
  },

  // ===========================================================================
  // privacyPolicy  (src/pages/PrivacyPolicy.jsx)
  // ===========================================================================
  {
    _id: 'privacy-policy',
    _type: 'privacyPolicy',
    title: 'Privacy Policy Page Content',
    hero: {
      eyebrow: 'Legal',
      titleLine1: 'PRIVACY',
      titleLine2: 'POLICY.',
      lastUpdated: 'Last updated: June 2026',
    },
    intro: 'Crivo is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights in relation to it. By using our website at crivo.in, you agree to the practices described below.',
    sections: keyed([
      {
        _type: 'legalSection',
        title: 'Information We Collect',
        body: [
          'We collect information you provide directly when you fill out contact forms, book a meeting, or apply to join our team. This includes your name, email address, phone number, and any message or details you submit.',
          'We may also collect basic usage data automatically, such as pages visited, time spent, and device type, to help us understand how our website is being used and improve the experience.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'How We Use Your Information',
        body: [
          'Information you submit through our forms is used solely to respond to your inquiry, schedule a meeting, or process your application. We do not sell, rent, or trade your personal information to third parties.',
          'Usage data is used in aggregate and anonymised form to improve our website performance and content. It is never linked to identifiable individuals.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Third-Party Services',
        body: [
          'Our platform and infrastructure use trusted third-party services, including Amazon Web Services (AWS), Firebase, Vercel, and Razorpay. These providers have their own privacy policies and security standards. We only share data with them to the extent necessary to operate our services.',
          'Our website may use analytics tools. These tools may set cookies or collect browsing data in accordance with their own terms.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Cookies',
        body: [
          'We use minimal, functional cookies to remember your theme preference (light/dark mode) and improve your browsing experience. We do not use advertising or tracking cookies.',
          'You can disable cookies through your browser settings at any time. Disabling cookies may affect certain preferences on the site.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Data Retention',
        body: [
          'Form submissions and contact data are retained only as long as necessary to fulfil the purpose for which they were collected, or as required by applicable law.',
          'You may request deletion of your personal data at any time by contacting us at the address below.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Your Rights',
        body: [
          'You have the right to access, correct, or delete the personal information we hold about you. You may also request that we stop processing your data for specific purposes.',
          'To exercise any of these rights, please contact us at info@crivo.in. We will respond within a reasonable timeframe.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Contact',
        body: [
          'If you have any questions about this Privacy Policy or how we handle your data, please reach out to us at info@crivo.in or through the contact form on our Reach Us page.',
        ],
      },
    ]),
  },

  // ===========================================================================
  // termsConditions  (src/pages/TermsConditions.jsx)
  // ===========================================================================
  {
    _id: 'terms-conditions',
    _type: 'termsConditions',
    title: 'Terms & Conditions Page Content',
    hero: {
      eyebrow: 'Legal',
      titleLine1: 'TERMS &',
      titleLine2: 'CONDITIONS.',
      lastUpdated: 'Last updated: June 2026',
    },
    intro: 'These Terms & Conditions govern your use of the Crivo website and any services or products described on it. Please read them carefully before using our site.',
    sections: keyed([
      {
        _type: 'legalSection',
        title: 'Acceptance of Terms',
        body: [
          'By accessing or using the Crivo website (crivo.in), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.',
          'We reserve the right to update or modify these terms at any time. Continued use of the site following any changes constitutes your acceptance of the updated terms.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Use of the Website',
        body: [
          'You may use this website for lawful purposes only. You agree not to use the site in any way that violates applicable laws, infringes on the rights of others, or disrupts the normal operation of the website.',
          'You may not attempt to gain unauthorised access to any part of the website or its underlying infrastructure. Scraping, crawling, or automated data collection without prior written consent is prohibited.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Intellectual Property',
        body: [
          'All content on this website, including text, graphics, logos, product names, and code, is the property of Crivo and is protected by applicable intellectual property laws.',
          'You may not reproduce, distribute, modify, or create derivative works from any content on this site without prior written permission from Crivo.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Products and Services',
        body: [
          "Information about Crivo's products (including Crivo CSMS and the AI Trip Planner) is provided for general informational purposes. Product features, pricing, and availability may change without notice.",
          'Nothing on this website constitutes a binding offer or guarantee of service unless confirmed in a separate written agreement between you and Crivo.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Limitation of Liability',
        body: [
          'To the fullest extent permitted by applicable law, Crivo shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, this website or its content.',
          'We do not warrant that the website will be available at all times, free of errors, or free from viruses or other harmful components. Use of the site is at your own risk.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Third-Party Links',
        body: [
          'Our website may contain links to third-party websites. These links are provided for convenience only. Crivo does not endorse and is not responsible for the content, privacy practices, or terms of any third-party site.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Governing Law',
        body: [
          'These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Tamil Nadu, India.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Contact',
        body: [
          'For questions regarding these Terms & Conditions, please contact us at info@crivo.in.',
        ],
      },
    ]),
  },

  // ===========================================================================
  // accessibilityStatement  (src/pages/AccessibilityStatement.jsx)
  // intro omitted: the original page has no intro paragraph before the sections.
  // ===========================================================================
  {
    _id: 'accessibility-statement',
    _type: 'accessibilityStatement',
    title: 'Accessibility Statement Page Content',
    hero: {
      eyebrow: 'Legal',
      titleLine1: 'ACCESSIBILITY',
      titleLine2: 'STATEMENT.',
      lastUpdated: 'Last updated: June 2026',
    },
    sections: keyed([
      {
        _type: 'legalSection',
        title: 'Our Commitment',
        body: [
          'Crivo is committed to ensuring our website is accessible to all users, including those with disabilities. We believe that everyone should be able to access information about our products and services without barriers.',
          'We are continuously working to improve the accessibility of crivo.in and align with internationally recognised accessibility standards.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Standards We Follow',
        body: [
          'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including visual, auditory, motor, and cognitive impairments.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Measures We Have Taken',
        isList: true,
        body: [
          'Sufficient colour contrast between text and background elements across both light and dark modes.',
          'Semantic HTML structure with appropriate heading hierarchy to support screen readers and assistive technologies.',
          'All interactive elements (buttons, links, form fields) are keyboard-navigable and include accessible labels.',
          'Images and icons that convey meaning include descriptive alt text or aria-labels.',
          'Forms include clearly associated labels and error states to assist users completing them.',
          'The site supports both light and dark themes, respecting user preference where possible.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Known Limitations',
        body: [
          'While we strive for full accessibility, some areas of the site may still present challenges. In particular, certain animated and interactive components such as the testimonial scroll area and the live simulator sections may not be fully optimised for all assistive technologies.',
          'We are actively working to address these limitations in future updates.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Feedback and Assistance',
        body: [
          'If you encounter any accessibility barriers on our website, or if you need information in an alternative format, please contact us at info@crivo.in. We welcome your feedback and will do our best to accommodate your needs.',
          'We aim to respond to accessibility-related requests within 5 business days.',
        ],
      },
      {
        _type: 'legalSection',
        title: 'Enforcement',
        body: [
          'If you are not satisfied with our response to an accessibility concern, you may contact the relevant regulatory body in your jurisdiction. In India, matters relating to digital accessibility may be referred to the Ministry of Electronics and Information Technology (MeitY).',
        ],
      },
    ]),
  },

  // ===========================================================================
  // faq  (src/components/Product/Faqs.jsx)
  // ===========================================================================
  {
    _id: 'faq-1',
    _type: 'faq',
    question: 'What is CRIVO CSMS and how does it connect with hardware?',
    answer: 'CRIVO CSMS is an intelligent, cloud-based platform built to manage EV charging networks. It communicates with chargers using standard OCPP 1.6J and 2.0.1 protocols over WebSockets, allowing network operators to monitor statuses, run remote diagnostics, and control grid load distributions.',
  },
  {
    _id: 'faq-2',
    _type: 'faq',
    question: 'How does the Smart EV Trip Planner predict vehicle range?',
    answer: 'Our AI Trip Planner uses multi-factor machine learning models that process real-world telemetry parameters: battery state of charge (SOC), cabin air conditioning loads, weather wind drag, elevation gradients (slopes), speed profiles, and traffic densities to estimate range precisely.',
  },
  {
    _id: 'faq-3',
    _type: 'faq',
    question: 'What is the Unified EV Wallet and how does it benefit users?',
    answer: 'The Unified EV Wallet aggregates balances across multiple Charge Point Operators (CPOs) such as Zeon, Statiq, and ChargeZone into a single active balance. EV drivers can initiate charging sessions and settle payments automatically across any network using their unified pool.',
  },
  {
    _id: 'faq-4',
    _type: 'faq',
    question: 'Are there APIs and SDKs available for custom integrations?',
    answer: 'Yes. CRIVO provides comprehensive REST APIs, WebSocket gateways, and mobile Flutter SDKs for both CSMS and the Trip Planner. Enterprise customers can integrate real-time telemetry, payment triggers, and route algorithms into their own applications.',
  },

  // ===========================================================================
  // team  (src/components/AboutUs/Leaders.jsx + CoreTeam.jsx — name/role only;
  // the `team` schema has no email/linkedin/github fields, those live on the
  // aboutPage document above, which is what the live About page actually renders)
  // ===========================================================================
  { _id: 'team-1', _type: 'team', name: 'Bharanidharan R N', role: 'Co-Founder & CEO' },
  { _id: 'team-2', _type: 'team', name: 'Gokulnath Sundaramurthi', role: 'Co-Founder & CTO' },
  { _id: 'team-3', _type: 'team', name: 'Hareeni S', role: 'Co-Founder & COO' },
  { _id: 'team-4', _type: 'team', name: 'Vasantha Kumar A', role: 'Data Engineer & Frontend Developer' },
  { _id: 'team-5', _type: 'team', name: 'Darshan T P', role: 'Product Lead' },
  { _id: 'team-6', _type: 'team', name: 'Bharat Kumar J', role: 'Flutter Developer' },
  { _id: 'team-7', _type: 'team', name: 'Praneesh S', role: 'Backend Developer' },
  { _id: 'team-8', _type: 'team', name: 'Thirumalai Kumar C', role: 'ML Developer' },
  { _id: 'team-9', _type: 'team', name: 'Anthoni Milton R', role: 'ML Developer' },

  // ===========================================================================
  // product  (hardware cards — extracted from src/components/Admin/AdminDashboard.jsx
  // INITIAL_PRODUCTS mock. Not wired to any live public page today, migrated
  // for schema completeness since it's real hardcoded content in a .jsx file.
  // Note: fixed an obvious typo in the source price "₹12,50_000" -> "₹12,50,000".
  // ===========================================================================
  { _id: 'product-1', _type: 'product', name: 'C-Smart 22', type: 'AC Charging Station', power: '22 kW', connectors: 'Type-2 Cable', price: '₹55,000' },
  { _id: 'product-2', _type: 'product', name: 'C-Fast 120', type: 'DC Fast Charger', power: '120 kW', connectors: 'Dual CCS-2', price: '₹12,50,000' },
  { _id: 'product-3', _type: 'product', name: 'C-Home 7', type: 'Residential Charger', power: '7.4 kW', connectors: 'Type-2 Socket', price: '₹32,000' },

  // ===========================================================================
  // blog  (src/components/Blog/blog.jsx, FeaturedPost.jsx, ArticlesGrid.jsx)
  // blog-1 is the one post with a real detail route (/blogs/ev-charging-control-systems);
  // its `sections` are a full extraction of blog.jsx's article body. blog-2..7 are
  // list-only stub posts (ArticlesGrid) with no detail page yet, so no `sections`.
  // ===========================================================================
  {
    _id: 'blog-1',
    _type: 'blog',
    title: 'Smart Charging Infrastructure: Demystifying EV Chargers & Their Cloud Management Systems',
    slug: { _type: 'slug', current: 'ev-charging-control-systems' },
    readTime: '8 min read',
    author: 'Crivo Power Lab',
    category: 'IoT & Smart Infrastructure',
    excerpt: 'Behind every electric vehicle charger is a complex, distributed network of edge microcontrollers, power electronics, and cloud software communicating in real-time. Here is how modern CSMS platforms orchestrate charging loads, handle grid constraints, and communicate using OCPP.',
    publishedAt: '2026-06-13T00:00:00.000Z',
    sections: [
      section('textSection', 'sec1', {
        body: 'The transition to electric vehicles (EVs) represents one of the largest grid updates in human history. Millions of vehicles, each carrying a battery pack ranging from 40 kWh to over 100 kWh, represent massive shifting electricity demands.\n\nAn EV charger (properly called an EVSE—Electric Vehicle Supply Equipment) is not just a high-power outlet. It is a smart edge computer that negotiates safety metrics with the car, verifies driver permissions, monitors thermal metrics, and communicates with central grid control software.',
      }),
      section('textSection', 'sec2', {
        heading: '1. The Hardware Spectrum: AC vs. DC Infrastructure',
        body: 'From a software and control perspective, charging is split into two primary architectures based on where the conversion from grid Alternating Current (AC) to battery Direct Current (DC) takes place:',
      }),
      section('dualCardSection', 'sec3', {
        cards: keyed([
          { title: 'AC Charging (Level 1 & 2)', desc: "The charger feeds raw AC grid power directly to the vehicle. The conversion to DC is handled by the vehicle's Onboard Charger (OBC). AC speeds are generally limited by the OBC's capacity—commonly 7 kW to 22 kW." },
          { title: 'DC Fast Charging (Level 3 / High Power)', desc: "The converting rectifier is built directly into the charging station cabinet itself. Power is converted to DC external to the vehicle and supplied directly to the battery's BMS. This enables rates from 50 kW to a blazing 350 kW+ (Megawatt charging for logistics rigs)." },
        ]),
      }),
      section('textSection', 'sec4', {
        heading: '2. The Brain in the Cloud: The CSMS',
        body: 'A standalone charger is a commercial liability. To make infrastructure viable, it must be monitored, monetized, and regulated in real-time. This is accomplished by a CSMS (Charging Station Management System).\n\nA CSMS acts as the orchestration layer: communicating via persistent WebSockets to monitor charge point telemetry, authenticate user RFID cards or mobile apps, calculate usage costs, and dynamically push maximum power limits to avoid overloading electrical transformers.',
      }),
      section('widgetPlaceholder', 'sec5', {
        widgetName: 'OCPP 2.0.1 Protocol Simulator',
      }),
      section('textSection', 'sec6', {
        heading: '3. The Standards Interface: OCPP, OCPI, and ISO 15118',
        body: 'To avoid walled ecosystems, the global EV charging market relies on three primary open-source specifications that handle communication at different stages:',
      }),
      section('dualCardSection', 'sec7', {
        cards: keyed([
          { title: 'OCPP (Open Charge Point Protocol)', desc: 'Governs client-server communication between the charging post and the central backend (CSMS). Version 1.6J (JSON over WebSockets) is widely deployed, while OCPP 2.0.1 introduces secure device management, improved smart charging profiles, and rich diagnostic logs.' },
          { title: 'OCPI (Open Charge Point Interface)', desc: 'Regulates peer-to-peer communication between different network operators (e.g. Charge Point Operators or CPOs) and mobility service providers (e-MSPs). This allows cross-network roaming—so a user with a Shell Recharge card can activate a ChargePoint station seamlessly.' },
          { title: 'ISO 15118', desc: 'Governs the vehicle-to-charger physical communication. It defines the digital handshake that enables Plug & Charge—allowing the car to negotiate billing credentials automatically upon plugging, completely removing mobile apps, cards, and SMS logins from the user flow.' },
        ]),
      }),
      section('textSection', 'sec8', {
        heading: '4. Smart Grid Management: Dynamic Load Balancing (DLB)',
        body: "Charging cars consumes high power. A single dual-connector AC station pulls 44 kW. If ten stations are added to a corporate parking garage, they could call for 440 kW—far exceeding the average building's excess transformer capacity.\n\nTo prevent grid upgrades costing hundreds of thousands of dollars, software developers use Dynamic Load Balancing (DLB). By monitoring total building energy consumption, the CSMS dynamically recalculates maximum current allowances and transmits throttling signals to charging posts in sub-second loops.",
      }),
      section('widgetPlaceholder', 'sec9', {
        widgetName: 'Dynamic Load Balancing (DLB) Controller',
      }),
      section('textSection', 'sec10', {
        heading: '5. Architecting the Future: V2G and AI Dispatch',
        body: "The future of control systems is bi-directional. Vehicle-to-Grid (V2G) capability transforms EVs from simple loads into battery storage banks on wheels. During peak summer grid constraints, a fleet of connected vehicles can dump power back to utility substations, earning money for the drivers.\n\nBuilding software for EV fleets requires deep knowledge of concurrent edge connections, network resiliency in underground concrete garages, and highly performant telemetry ingestion engines. It's a gold mine for engineers excited by the intersection of physical hardware, network logic, and clean energy.",
      }),
    ],
  },
  {
    _id: 'blog-2',
    _type: 'blog',
    title: "From Freelance Studio to Product Company: Crivo's Journey into EV Tech",
    slug: { _type: 'slug', current: 'freelance-studio-to-product-company' },
    readTime: '6 min read',
    author: 'Crivo Team',
    category: 'Company',
    excerpt: "We spent years building websites, apps, and marketing campaigns for clients across industries. Here's the story of how that work gave us the tools — and the conviction — to build products that actually matter.",
    publishedAt: '2026-06-10T00:00:00.000Z',
  },
  {
    _id: 'blog-3',
    _type: 'blog',
    title: 'OCPP Explained: The Open Protocol Powering Smart EV Charging Networks',
    slug: { _type: 'slug', current: 'ocpp-explained' },
    readTime: '8 min read',
    author: 'Crivo Team',
    category: 'IoT & Infrastructure',
    excerpt: 'OCPP 1.6J and 2.0.1 are the backbone of every cloud-managed EV charger. We break down how the protocol works, why it matters, and what operators need to understand before deploying infrastructure at scale.',
    publishedAt: '2026-06-05T00:00:00.000Z',
  },
  {
    _id: 'blog-4',
    _type: 'blog',
    title: 'Range Anxiety Is a Data Problem — Not a Battery Problem',
    slug: { _type: 'slug', current: 'range-anxiety-is-a-data-problem' },
    readTime: '5 min read',
    author: 'Crivo Team',
    category: 'EV Tech',
    excerpt: 'Most EV owners overestimate how quickly their batteries drain. We explain why real-world range differs from rated specs, and how AI-powered trip planning finally closes the gap using terrain, weather, speed, and AC load data.',
    publishedAt: '2026-05-28T00:00:00.000Z',
  },
  {
    _id: 'blog-5',
    _type: 'blog',
    title: 'Why India Needs a Unified EV Charging Wallet — And How We Built One',
    slug: { _type: 'slug', current: 'unified-ev-charging-wallet' },
    readTime: '7 min read',
    author: 'Crivo Team',
    category: 'Product',
    excerpt: "Indian EV drivers juggle 4–6 different apps just to charge their vehicles. Crivo's unified CPO wallet integrates Zeon, ChargeZone, Statiq, Jio-bp, and more into one seamless balance — no switching apps, no separate logins.",
    publishedAt: '2026-05-20T00:00:00.000Z',
  },
  {
    _id: 'blog-6',
    _type: 'blog',
    title: 'What 50+ Client Projects Taught Us About Building a Digital Brand',
    slug: { _type: 'slug', current: '50-client-projects-lessons' },
    readTime: '6 min read',
    author: 'Crivo Team',
    category: 'Business',
    excerpt: 'Before Crivo built products, we built brands. From e-commerce platforms to mobile apps and performance marketing campaigns, here are the lessons that now drive every product decision we make.',
    publishedAt: '2026-05-12T00:00:00.000Z',
  },
  {
    _id: 'blog-7',
    _type: 'blog',
    title: 'Cloud-Native EV Infrastructure: How We Architect for Scale',
    slug: { _type: 'slug', current: 'cloud-native-ev-infrastructure' },
    readTime: '9 min read',
    author: 'Crivo Team',
    category: 'IoT & Infrastructure',
    excerpt: "Running a CSMS at scale means managing thousands of concurrent WebSocket connections, real-time charger telemetry, and billing cycles simultaneously. Here's how we built a serverless architecture on AWS that handles it.",
    publishedAt: '2026-05-03T00:00:00.000Z',
  },
]

// --- Migration -----------------------------------------------------------------
async function migrate() {
  console.log(`Starting migration of ${documents.length} documents to dataset "${dataset}"...\n`)

  let success = 0
  let failed = 0

  for (const doc of documents) {
    try {
      await client.createOrReplace(doc)
      console.log(`✔ Pushed ${doc._type} -> ${doc._id}`)
      success++
    } catch (err) {
      console.error(`✘ Failed ${doc._type} -> ${doc._id}:`, err.message)
      failed++
    }
  }

  console.log(`\nMigration complete: ${success} succeeded, ${failed} failed (of ${documents.length}).`)
  if (failed > 0) process.exit(1)
}

migrate().catch((err) => {
  console.error('Migration aborted:', err.message)
  process.exit(1)
})
