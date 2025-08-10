export type SupportedLanguage = "en" | "id";

type TranslationDictionary = {
  header: {
    home: string;
    web: string;
    mobile: string;
    digital: string;
    tech: string;
    contact: string;
    language: string;
  };
  hero: {
    build: string;
    innovate: string;
    transform: string;
    emailPlaceholder: string;
    cards: {
      webDesc: string;
      mobileDesc: string;
      digitalDesc: string;
    };
    features: {
      aiTop: string;
      aiBottom: string;
      smartTop: string;
      smartBottom: string;
      futureTop: string;
      futureBottom: string;
    };
  };
  web: {
    pill: string;
    title: string;
    desc: string;
    features: {
      customTitle: string;
      customDesc: string;
      seoTitle: string;
      seoDesc: string;
      uiTitle: string;
      uiDesc: string;
    };
  };
  mobile: {
    pill: string;
    title: string;
    desc: string;
    caps: {
      offlineTitle: string;
      offlineDesc: string;
      pushTitle: string;
      pushDesc: string;
      securityTitle: string;
      securityDesc: string;
      biometricTitle: string;
      biometricDesc: string;
      perfTitle: string;
      perfDesc: string;
      releaseTitle: string;
      releaseDesc: string;
    };
    checkout: string;
    contentTitle: string;
    contentDesc: string;
  };
  digital: {
    pill: string;
    title: string;
    desc: string;
    features: {
      automationTitle: string;
      automationDesc: string;
      aiAssistTitle: string;
      aiAssistDesc: string;
      integrationTitle: string;
      integrationDesc: string;
      analyticsTitle: string;
      analyticsDesc: string;
    };
    steps: {
      mapTitle: string;
      mapDesc: string;
      designTitle: string;
      designDesc: string;
      automateTitle: string;
      automateDesc: string;
      orchestrateTitle: string;
      orchestrateDesc: string;
    };
  };
  tech: {
    pill: string;
    title: string;
    desc: string;
  };
  footer: {
    companyDesc: string;
    newsletterTitle: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    send: string;
    success: string;
    error: string;
    contact: string;
    social: string;
    followUs: string;
    privacy: string;
    terms: string;
    cookie: string;
  };
};

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    header: {
      home: "Home",
      web: "Web",
      mobile: "Mobile",
      digital: "Digital",
      tech: "Tech",
      contact: "Contact Us",
      language: "Language",
    },
    hero: {
      build: "Build.",
      innovate: "Innovate.",
      transform: "Transform.",
      emailPlaceholder: "Enter your email...",
      cards: {
        webDesc: "Website & Web App Development",
        mobileDesc: "iOS & Android App Development",
        digitalDesc: "Digital Transformation Solutions",
      },
      features: {
        aiTop: "AI",
        aiBottom: "Powered",
        smartTop: "Smart",
        smartBottom: "Solutions",
        futureTop: "Future",
        futureBottom: "Ready",
      },
    },
    web: {
      pill: "Web Development",
      title: "Fast, secure, and easy to scale websites.",
      desc: "We build websites and web apps optimized for performance, accessibility, and your business growth.",
      features: {
        customTitle: "Custom Web App",
        customDesc: "Fast, secure, and scalable web apps.",
        seoTitle: "SEO & Performance",
        seoDesc: "High Lighthouse scores and modern SEO practices.",
        uiTitle: "Modern UI",
        uiDesc: "Clean, minimal design focused on conversion.",
      },
    },
    mobile: {
      pill: "Mobile Apps",
      title: "Modern, lightweight, and scalable mobile experiences.",
      desc: "From MVP to enterprise: high performance, device features access, and clean release processes.",
      caps: {
        offlineTitle: "Offline Mode",
        offlineDesc: "Keep working even without a connection.",
        pushTitle: "Push Notification",
        pushDesc: "Boost retention with real-time notifications.",
        securityTitle: "Data Security",
        securityDesc: "Encryption and protection by best practices.",
        biometricTitle: "Biometric",
        biometricDesc: "Fast login via Face/Touch ID.",
        perfTitle: "High Performance",
        perfDesc: "Smooth UX, 60fps, battery-friendly.",
        releaseTitle: "Release to Store",
        releaseDesc: "Publish to App Store & Play Store.",
      },
      checkout: "Checkout",
      contentTitle: "Focus on experience, not technical complexity.",
      contentDesc:
        "We craft apps that are lightweight, modern, and ready to grow. A tidy release pipeline accelerates iteration and reduces risk.",
    },
    digital: {
      pill: "Digital Transformation",
      title: "Effective digital transformation",
      desc: "Simplify processes, automate tasks, and integrate systems—powered by AI and analytics.",
      features: {
        automationTitle: "Automation",
        automationDesc: "Workflow, rules, SLA.",
        aiAssistTitle: "AI Assist",
        aiAssistDesc: "Validation & recommendations.",
        integrationTitle: "Integration",
        integrationDesc: "API & webhook.",
        analyticsTitle: "Analytics",
        analyticsDesc: "Dashboard & KPIs.",
      },
      steps: {
        mapTitle: "Process mapping",
        mapDesc: "Identify flows & roles.",
        designTitle: "Flow design",
        designDesc: "E‑forms, approvals, SLAs.",
        automateTitle: "Automation",
        automateDesc: "Rules, triggers, notifications.",
        orchestrateTitle: "Integration & orchestration",
        orchestrateDesc: "APIs, webhooks, events.",
      },
    },
    tech: {
      pill: "Tech Stack",
      title: "Modern technologies we use",
      desc: "A modern, simple, and fast stack for maximum results.",
    },
    footer: {
      companyDesc:
        "Technology partner for modern solutions: web, mobile, digital transformation, and secure architecture.",
      newsletterTitle: "Subscribe for updates",
      newsletterDesc:
        "Get feature updates and case studies straight to your email.",
      emailPlaceholder: "Your email",
      send: "Send",
      success: "Thank you! Your email has been recorded.",
      error: "Please enter a valid email.",
      contact: "Contact",
      social: "Social",
      followUs: "Follow us for the latest updates.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookie: "Cookie",
    },
  },
  id: {
    header: {
      home: "Beranda",
      web: "Web",
      mobile: "Seluler",
      digital: "Digital",
      tech: "Teknologi",
      contact: "Hubungi Kami",
      language: "Bahasa",
    },
    hero: {
      build: "Build.",
      innovate: "Innovate.",
      transform: "Transform.",
      emailPlaceholder: "Masukkan email Anda...",
      cards: {
        webDesc: "Pengembangan Website & Web App",
        mobileDesc: "Pengembangan Aplikasi iOS & Android",
        digitalDesc: "Solusi Transformasi Digital",
      },
      features: {
        aiTop: "AI",
        aiBottom: "Powered",
        smartTop: "Smart",
        smartBottom: "Solutions",
        futureTop: "Future",
        futureBottom: "Ready",
      },
    },
    web: {
      pill: "Pengembangan Web",
      title: "Website cepat, aman, dan mudah dikembangkan.",
      desc: "Kami membangun website dan web app yang dioptimalkan untuk performa, aksesibilitas, dan pertumbuhan bisnis Anda.",
      features: {
        customTitle: "Aplikasi Web Kustom",
        customDesc: "Aplikasi web cepat, aman, dan scalable.",
        seoTitle: "SEO & Performa",
        seoDesc: "Skor Lighthouse tinggi dan praktik SEO modern.",
        uiTitle: "UI Modern",
        uiDesc: "Desain ringkas, bersih, fokus pada konversi.",
      },
    },
    mobile: {
      pill: "Aplikasi Mobile",
      title: "Pengalaman mobile yang modern, ringan, dan siap scale.",
      desc: "Dari MVP hingga enterprise: performa tinggi, akses fitur perangkat, dan proses rilis yang rapi.",
      caps: {
        offlineTitle: "Mode Offline",
        offlineDesc: "Akses tetap jalan walau tanpa koneksi.",
        pushTitle: "Push Notification", // jargon tetap Inggris
        pushDesc: "Dorong retensi dengan notifikasi real-time.",
        securityTitle: "Keamanan Data",
        securityDesc: "Enkripsi & proteksi sesuai praktik terbaik.",
        biometricTitle: "Biometrik",
        biometricDesc: "Login cepat via Face/Touch ID.",
        perfTitle: "Performa Tinggi",
        perfDesc: "UX halus, 60fps, hemat baterai.",
        releaseTitle: "Rilis ke Store",
        releaseDesc: "Publikasi ke App Store & Play Store.",
      },
      checkout: "Checkout", // jargon tetap Inggris
      contentTitle: "Fokus pada pengalaman, bukan kompleksitas teknis.",
      contentDesc:
        "Kami merancang aplikasi yang ringan, modern, dan siap tumbuh. Infrastruktur rilis yang rapi membantu Anda mempercepat iterasi dan menurunkan risiko.",
    },
    digital: {
      pill: "Transformasi Digital",
      title: "Transformasi digital yang efektif",
      desc: "Sederhanakan proses, otomasi tugas, dan integrasi sistem—didukung AI dan analitik.",
      features: {
        automationTitle: "Automation", // jargon tetap Inggris
        automationDesc: "Workflow, rules, SLA.",
        aiAssistTitle: "AI Assist", // jargon tetap Inggris
        aiAssistDesc: "Validasi & rekomendasi.",
        integrationTitle: "Integrasi",
        integrationDesc: "API & webhook.",
        analyticsTitle: "Analytics", // jargon tetap Inggris
        analyticsDesc: "Dashboard & KPI.",
      },
      steps: {
        mapTitle: "Pemetaan proses",
        mapDesc: "Identifikasi alur & peran.",
        designTitle: "Desain alur",
        designDesc: "E‑form, approval, SLA.",
        automateTitle: "Otomasi",
        automateDesc: "Rule, trigger, notifikasi.",
        orchestrateTitle: "Integrasi & orkestrasi",
        orchestrateDesc: "API, webhook, event.",
      },
    },
    tech: {
      pill: "Tech Stack", // jargon tetap Inggris
      title: "Teknologi modern yang kami gunakan",
      desc: "Pilihan stack modern, sederhana, dan cepat untuk hasil maksimal.",
    },
    footer: {
      companyDesc:
        "Mitra teknologi untuk solusi modern: web, mobile, transformasi digital, dan arsitektur yang aman.",
      newsletterTitle: "Berlangganan update",
      newsletterDesc:
        "Dapatkan info fitur dan studi kasus terbaru langsung ke email Anda.",
      emailPlaceholder: "Email Anda",
      send: "Kirim",
      success: "Terima kasih! Email Anda telah tercatat.",
      error: "Mohon isi email dengan benar.",
      contact: "Kontak",
      social: "Sosial",
      followUs: "Ikuti kami untuk update terbaru.",
      privacy: "Kebijakan Privasi",
      terms: "Syarat Layanan",
      cookie: "Cookie",
    },
  },
};

export function getFromPath<T extends object>(obj: T, path: string): string {
  const parts = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return path; // fallback to key when missing
    }
  }
  return typeof current === "string" ? current : path;
}
