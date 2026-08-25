export interface LocalLandingData {
  slug: string;
  regionName: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  overviewHeading: string;
  overviewText: string;
  keyLandmarks: string[];
  localMicroMarkets: string[];
  featuredServices: {
    title: string;
    description: string;
    icon: string;
    route: string;
  }[];
  localCaseStudy: {
    title: string;
    societyOrClient: string;
    challenge: string;
    solution: string;
    hardwareInstalled: string[];
    result: string;
  };
  localFaqs: {
    question: string;
    answer: string;
  }[];
}

export const LOCAL_LANDING_DATA: Record<string, LocalLandingData> = {
  'cctv-installation-thane-west': {
    slug: 'cctv-installation-thane-west',
    regionName: 'Thane (West)',
    heroTitle: 'CCTV Camera Sales, Installation & AMC in Thane (West)',
    heroSubtitle: 'Headquartered in Charai, Thane West since 1999. Turnkey CP Plus, Hikvision & Dahua surveillance for housing societies, retail showrooms & commercial offices.',
    metaTitle: 'CCTV Camera Installation & AMC in Thane West | Sunrise Communication',
    metaDescription: 'Trusted CCTV camera installation, HD IP cameras, and 24/7 AMC across Thane West (Charai, Naupada, Panchpakhadi, Ghodbunder Rd). 25+ years experience. Call +91 93238 48622.',
    metaKeywords: 'CCTV Installation Thane West, CCTV AMC Charai, Housing Society CCTV Naupada, Security Camera Repair Panchpakhadi, Hikvision Dealer Thane West, CP Plus Camera Ghodbunder Road',
    overviewHeading: 'Local CCTV Installation & Maintenance Authority in Thane (West)',
    overviewText: 'Headquartered at Amar Building in Charai, Thane (West), Sunrise Communication has served over 500+ Cooperative Housing Societies and commercial establishments across Thane for more than 25 years. We provide complete turnkey surveillance installations with concealed Cat6/coaxial cabling, 24/7 ColorVu night vision, 30-day police-compliant storage recording, and on-call technician dispatch for routine maintenance and emergency repairs.',
    keyLandmarks: [
      'Charai & Jyoti Book Center',
      'Naupada & Gokhale Road',
      'Panchpakhadi & Service Road',
      'Majiwada Junction & Viviana Mall',
      'Ghodbunder Road & Hiranandani Estate',
      'Vartak Nagar & Pokhran Road 1 & 2',
      'Thane Railway Station West & Teen Hath Naka'
    ],
    localMicroMarkets: [
      'Charai', 'Naupada', 'Panchpakhadi', 'Majiwada', 'Vasant Vihar',
      'Hiranandani Estate', 'Ghodbunder Road', 'Kolshet Road', 'Vartak Nagar',
      'Pokhran Road No. 1 & 2', 'Bhakti Park', 'Balkum', 'Dhokali'
    ],
    featuredServices: [
      {
        title: 'Housing Society CCTV Surveillance',
        description: 'Complete perimeter, main gate, lift cabin, and lobby HD camera networks with 30-day continuous HDD backup.',
        icon: 'fa-video-camera',
        route: '/services/cctv-surveillance-systems'
      },
      {
        title: 'Cooperative Society Intercom Cabling',
        description: 'Multi-pair copper telephone cabling, gatekeeper phones, and Matrix EPABX systems for residential buildings.',
        icon: 'fa-phone',
        route: '/services/epabx-intercom-solutions'
      },
      {
        title: 'Biometric Access & EM Door Locks',
        description: 'Essl AI facial recognition readers and 600lbs electromagnetic door locks for society offices and clubhouses.',
        icon: 'fa-id-card-o',
        route: '/services/biometric-access-control'
      },
      {
        title: 'Annual Maintenance Contracts (AMC)',
        description: 'Comprehensive & Non-Comprehensive AMC with 4 quarterly preventive maintenance visits and priority breakdown dispatch.',
        icon: 'fa-shield',
        route: '/services/cctv-surveillance-systems'
      }
    ],
    localCaseStudy: {
      title: '32-Camera 4K Surveillance & Lift Cabling Modernization',
      societyOrClient: 'Prem Kunj Cooperative Housing Society, Panchpakhadi, Thane (West)',
      challenge: 'Existing 8-year-old analog cameras had blind spots in parking basements and frequent cable cuts due to rodent damage.',
      solution: 'Replaced legacy cabling with heavy-duty conduit Cat6 PoE infrastructure, installed 32 CP Plus 4MP Smart Warm-Light cameras, and configured 16TB WD Purple storage.',
      hardwareInstalled: ['32x CP Plus 4MP IP Dome/Bullet', '1x 32-Ch 4K NVR', '2x 8TB WD Purple Surveillance HDDs', '2x 16-Port Gigabit PoE Switches'],
      result: '100% blind spot elimination, crystal-clear license plate recognition at entry gates, and 35 days of continuous recorded history.'
    },
    localFaqs: [
      {
        question: 'How quickly can your technician visit for a site survey in Thane West?',
        answer: 'Because our central office is in Charai, Thane (West), our senior engineers can conduct a physical site survey within 2 to 4 hours of your inquiry anywhere in Thane West.'
      },
      {
        question: 'Do you provide CCTV AMC for existing setups installed by other vendors in Thane?',
        answer: 'Yes! We offer Non-Comprehensive and Comprehensive Annual Maintenance Contracts (AMC) for existing CCTV and Intercom systems in Thane after conducting a one-time technical health audit.'
      },
      {
        question: 'What permissions does a housing society in Thane need to install CCTV cameras in lifts?',
        answer: 'CCTV in lifts requires approval from the society General Body / Managing Committee. We use heavy-duty flexible travelling elevator cables to ensure zero disruption to lift mechanics.'
      }
    ]
  },

  'society-intercom-wagle-estate': {
    slug: 'society-intercom-wagle-estate',
    regionName: 'Wagle Industrial Estate & Thane Commercial Corridor',
    heroTitle: 'EPABX, Society Intercom & Structured Cabling in Wagle Estate, Thane',
    heroSubtitle: 'Enterprise telecom, Matrix Hybrid IP-PBX, multi-pair intercom wiring, and Cat6 server rack infrastructure across Wagle Estate and Thane industrial IT zones.',
    metaTitle: 'EPABX Intercom & Structured Cabling in Wagle Estate Thane | Sunrise Communication',
    metaDescription: 'Expert EPABX systems, Matrix IP-PBX, society intercom repair, and Cat6 server rack dressing in Wagle Estate, Thane. 25+ years industry leadership. Call +91 93238 48622.',
    metaKeywords: 'EPABX Wagle Estate, Matrix PBX Dealer Thane, Society Intercom Repair Wagle Estate, Cat6 Cabling Wagle Industrial Estate, IT Server Rack Setup Thane, Intercom AMC Wagle Estate',
    overviewHeading: 'Enterprise Telecommunications & Intercom Solutions in Wagle Estate',
    overviewText: 'Wagle Industrial Estate is the commercial and technology hub of Thane MMR. Sunrise Communication delivers robust Matrix IP-PBX phone exchanges, multi-line auto-attendants, voice loggers, structured Cat6/Cat6A server rack organization, and residential society intercom networks for the expanding commercial and residential sectors of Wagle Estate and Road No. 16 to 34.',
    keyLandmarks: [
      'Wagle Estate Road No. 16 & 22 IT Corridors',
      'Passport Seva Kendra & Mulund Check Naka',
      'Ashar IT Park & Ambica Nagar',
      'Kisan Nagar & Shree Nagar Residential Clusters',
      'Louiswadi & Nitin Casting Junction'
    ],
    localMicroMarkets: [
      'Wagle Estate Road 16 to 34', 'Ashar IT Park', 'Ambica Nagar',
      'Kisan Nagar 1 & 2', 'Shree Nagar', 'Louiswadi', 'Panchpakhadi Border',
      'Mulund Check Naka Area'
    ],
    featuredServices: [
      {
        title: 'Matrix Hybrid IP-PBX & EPABX Exchanges',
        description: 'Scalable telecom switches supporting analog, digital, and SIP trunk extensions for commercial offices and towers.',
        icon: 'fa-phone',
        route: '/services/epabx-intercom-solutions'
      },
      {
        title: 'Multi-Pair Telephone Intercom Wiring',
        description: '0.5mm armoured copper riser cabling with Krone DP boxes for multi-wing residential and corporate complexes.',
        icon: 'fa-sitemap',
        route: '/services/structured-networking-cabling'
      },
      {
        title: 'Server Rack Dressing & Patch Panels',
        description: '4U to 24U network rack dressing, keystone jack termination, cable management, and Fluke certified speed testing.',
        icon: 'fa-server',
        route: '/services/structured-networking-cabling'
      },
      {
        title: 'Biometric Attendance & Turnstile Integration',
        description: 'Essl and Matrix biometric attendance systems integrated with electromagnetic door locks and payroll software.',
        icon: 'fa-id-card-o',
        route: '/services/biometric-access-control'
      }
    ],
    localCaseStudy: {
      title: '120-Extension Matrix IP-PBX & 48-Port Network Cabling',
      societyOrClient: 'Corporate Logistics & Tech Park, Road No. 22, Wagle Estate, Thane',
      challenge: 'Frequent intercom line cross-talk, unorganized cable bundles in server rooms, and lack of gatekeeper communication.',
      solution: 'Re-dressed 9U server racks with Schneider Digilink patch panels and installed Matrix ETERNITY Hybrid PBX with dedicated gatekeeper operator consoles.',
      hardwareInstalled: ['Matrix ETERNITY PBX (128 Ports)', 'SPARSH Digital Operator Console', '48x Cat6 Gigabit I/O Drops', '9U Wall Mount Server Rack'],
      result: 'Zero voice cross-talk, clean documented patch panel schematics, and instantaneous one-touch security dispatch.'
    },
    localFaqs: [
      {
        question: 'Can you upgrade our old society intercom wiring without disturbing existing home interiors?',
        answer: 'Yes. We utilize external conduit shafts and floor DP distribution boxes, running fresh multi-pair telephone wires into flats through existing conduit pathways without damaging walls.'
      },
      {
        question: 'Do you supply Matrix EPABX spare parts and expansion cards in Wagle Estate?',
        answer: 'Yes, as an authorized partner for Matrix Telecom, we supply original line cards, power supply units, operator consoles, and replacement parts with prompt on-site replacement.'
      }
    ]
  },

  'security-systems-navi-mumbai': {
    slug: 'security-systems-navi-mumbai',
    regionName: 'Navi Mumbai (Vashi, Mahape, Airoli, Belapur)',
    heroTitle: 'CCTV Surveillance, Access Control & Society Intercom in Navi Mumbai',
    heroSubtitle: 'Complete turnkey security systems, Essl AI biometric face attendance, ColorVu CCTV cameras, and society telecom AMC across Vashi, Mahape MIDC, Airoli & Belapur.',
    metaTitle: 'CCTV Camera, Biometrics & Intercom Systems in Navi Mumbai | Sunrise Communication',
    metaDescription: 'Leading security systems integrator in Navi Mumbai. CCTV installation, Essl biometric access, Matrix EPABX, and society AMC in Vashi, Mahape, Airoli, Belapur. Call +91 93238 48622.',
    metaKeywords: 'CCTV Installation Navi Mumbai, Biometric Attendance Mahape MIDC, Access Control Vashi, Society Intercom Airoli, Security Systems Belapur, CCTV AMC Navi Mumbai',
    overviewHeading: 'Turnkey Surveillance & Security Integration Across Navi Mumbai',
    overviewText: 'Serving the planned nodes and industrial corridors of Navi Mumbai — from Vashi Sector 17 and Airoli Knowledge Park to Mahape TTC MIDC and CBD Belapur — Sunrise Communication delivers commercial-grade video surveillance, Essl facial recognition attendance, turnstiles with EM locks, and housing society intercom networks with guaranteed 24-hour service SLAs.',
    keyLandmarks: [
      'Vashi Sector 17 & APMC Market',
      'Mahape TTC Industrial Corridor & Millennium Business Park',
      'Airoli Mindspace & Knowledge Park',
      'Kopar Khairane & Ghansoli Corporate Zones',
      'CBD Belapur & Seawoods Residential Clusters',
      'Kharghar & Panvel Real Estate Hubs'
    ],
    localMicroMarkets: [
      'Vashi', 'Sanpada', 'Nerul', 'Seawoods', 'CBD Belapur',
      'Kharghar', 'Panvel', 'Kopar Khairane', 'Ghansoli', 'Airoli',
      'Mahape MIDC', 'Rabale', 'Turbhe'
    ],
    featuredServices: [
      {
        title: 'Commercial AI Face Attendance & EM Locks',
        description: 'Touchless 3D facial recognition terminals, 1200lbs electromagnetic glass door locks, and cloud attendance apps.',
        icon: 'fa-id-card-o',
        route: '/services/biometric-access-control'
      },
      {
        title: 'Industrial CCTV & Perimeter Security',
        description: 'Long-range IP bullet cameras, optical fiber video backbones, and smart perimeter intrusion detection for warehouses.',
        icon: 'fa-video-camera',
        route: '/services/cctv-surveillance-systems'
      },
      {
        title: 'Multi-Wing Society Intercom Networks',
        description: 'Large-scale residential intercom systems linking 500+ flats across multiple towers via fiber optic backbone.',
        icon: 'fa-phone',
        route: '/services/epabx-intercom-solutions'
      },
      {
        title: 'Structured Network Cabling & Server Racks',
        description: 'Cat6A 10-Gigabit certified network drops, server rack dressing, and optical fiber OTDR testing.',
        icon: 'fa-sitemap',
        route: '/services/structured-networking-cabling'
      }
    ],
    localCaseStudy: {
      title: '64-Camera IP Surveillance & Touchless Biometric Access',
      societyOrClient: 'IT Software Campus, Millennium Business Park, Mahape, Navi Mumbai',
      challenge: 'Multi-floor facility requiring integrated access control across 14 glass doors and 24/7 parking surveillance.',
      solution: 'Deployed Essl AI Facial Recognition controllers with fail-safe EM locks, alongside 64 Hikvision 4K AcuSense cameras and dual redundant 32-Ch NVRs.',
      hardwareInstalled: ['14x Essl MultiBio Face Readers', '14x 600lbs EM Locks with Z-Brackets', '64x Hikvision 4K AcuSense IP Cameras', '2x 32-Ch NVRs with 32TB Storage'],
      result: 'Automated touchless employee entry, seamless payroll integration, and comprehensive 24/7 security recording.'
    },
    localFaqs: [
      {
        question: 'Do you cover residential housing societies across Vashi, Airoli, and Kharghar?',
        answer: 'Yes! Our mobile engineering teams service housing societies, commercial towers, and industrial units across the entire Navi Mumbai corridor with regular maintenance visits.'
      },
      {
        question: 'Can you integrate biometric access systems with our existing employee payroll software?',
        answer: 'Yes. Our Essl and Matrix biometric terminals support automatic real-time push data and export attendance logs directly to standard HR/payroll ERP systems.'
      }
    ]
  }
};
