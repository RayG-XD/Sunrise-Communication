export interface ServiceOfferingItem {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ComparisonMatrix {
  title: string;
  subtitle: string;
  headers: string[];
  rows: {
    feature: string;
    col1: string;
    col2: string;
    verdict?: string;
  }[];
}

export interface AmcPlanItem {
  title: string;
  badge?: string;
  priceHint: string;
  description: string;
  features: string[];
  sla: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface CaseStudyItem {
  title: string;
  location: string;
  premiseType: string;
  challenge: string;
  solution: string;
  hardwareDeployed: string[];
  resultMetrics: string;
}

export interface ServiceClusterData {
  slug: string;
  name: string;
  heroTitle: string;
  tagline: string;
  directAnswerAeo: string; // 40-word Inverted Pyramid Answer Box (AEO)
  categoryIcon: string;
  shortDescription: string;
  authorizedBrands: string[];
  offerings: ServiceOfferingItem[];
  caseStudies: CaseStudyItem[];
  comparisonMatrix: ComparisonMatrix;
  amcPlans: AmcPlanItem[];
  faqs: ServiceFaqItem[];
  serviceAreasThane: string[];
  serviceAreasMumbai: string[];
  serviceAreasNaviMumbai: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const SERVICE_CLUSTERS_DATA: Record<string, ServiceClusterData> = {
  'cctv-surveillance-systems': {
    slug: 'cctv-surveillance-systems',
    name: 'CCTV Surveillance Systems',
    heroTitle: 'CCTV Camera Sales, Installation & AMC Services in Thane & Mumbai',
    tagline: 'Enterprise-grade 4K IP, HD Analog, and Turnkey Surveillance Solutions',
    directAnswerAeo: 'Sunrise Communication provides professional CCTV camera installation, 4K NVR/DVR setup, and comprehensive Annual Maintenance Contracts (AMC) across Thane, Mumbai, and Navi Mumbai. We supply CP Plus, Hikvision, and Dahua systems with 24/7 emergency repair support.',
    categoryIcon: 'flaticon-cctv',
    shortDescription: 'Protect your residential society, corporate office, or industrial warehouse with high-definition surveillance, intelligent ColorVu night vision, and cloud remote viewing.',
    authorizedBrands: ['CP Plus', 'Hikvision', 'Dahua', 'Matrix', 'Seagate SkyHawk', 'WD Purple'],
    offerings: [
      {
        title: 'Housing Society CCTV Surveillance',
        description: 'Comprehensive perimeter, lobby, parking, and lift cabin camera installations designed for residential housing societies.',
        icon: 'fa-building',
        features: [
          'Full HD & 4K Ultra-HD Network Cameras',
          'Vandal-proof Dome cameras for lifts and staircases',
          '30 to 60 Days Continuous Video Retention',
          'Mobile App Access for Society Managing Committee'
        ]
      },
      {
        title: 'Commercial & Office Security',
        description: 'Tailored surveillance setups for corporate offices, IT parks, retail showrooms, and banks.',
        icon: 'fa-briefcase',
        features: [
          'AI-powered Human & Vehicle Detection',
          'Microphone Audio Recording cameras',
          'Centralized Multi-Location Monitoring Room Setup',
          'Integration with Access Control & Fire Alarms'
        ]
      },
      {
        title: 'Industrial & Warehouse Monitoring',
        description: 'Heavy-duty long-range bullet cameras, PTZ (Pan-Tilt-Zoom) tracking, and optical fiber backbone for large yards.',
        icon: 'fa-industry',
        features: [
          'Up to 150m Smart IR / ColorVu Night Vision',
          'Weatherproof IP67 Metal Enclosures',
          'Optical Fiber Network Cabling for Long Distances',
          'PoE (Power over Ethernet) Switch Infrastructure'
        ]
      },
      {
        title: 'CCTV Annual Maintenance Contracts (AMC)',
        description: 'Guaranteed 24-48h breakdown support, quarterly preventive maintenance, lens cleaning, and standby unit replacement.',
        icon: 'fa-shield',
        features: [
          'Comprehensive & Non-Comprehensive AMC Options',
          'Quarterly Cable & Power Voltage Testing',
          'Firmware Updates & Storage Health Checks',
          'Dedicated On-Call Technician in Thane'
        ]
      }
    ],
    caseStudies: [
      {
        title: '32-Camera 4K ColorVu Compound Surveillance',
        location: 'Hiranandani Estate, Thane (West)',
        premiseType: 'Residential Cooperative Housing Society (CHS)',
        challenge: 'A 24-story residential society had severe blind spots at vehicular gates, visitor parking, and unlit perimeter boundaries.',
        solution: 'Engineered a 32-camera IP network utilizing CP Plus 4K ColorVu bullet cameras, 32-channel NVR, and Cat6 armoured cabling.',
        hardwareDeployed: ['32x CP Plus 4K IP ColorVu Cameras', '1x 32-Ch 4K H.265+ NVR', '2x 8TB WD Purple HDDs', '4x D-Link Gigabit PoE Switches'],
        resultMetrics: '100% perimeter coverage with full-color night vision and 45 days continuous backup.'
      },
      {
        title: '24-Channel Industrial Warehouse Surveillance',
        location: 'Wagle Industrial Estate, Thane',
        premiseType: 'Manufacturing Plant & Logistics Hub',
        challenge: 'Large 40,000 sq.ft facility required centralized monitoring for loading bays, machinery floors, and inventory storage.',
        solution: 'Deployed long-range smart IR bullet cameras connected via an optical fiber backbone and centralized control room rack.',
        hardwareDeployed: ['24x Hikvision 5MP IP Bullet Cameras', '1x 32-Ch Enterprise NVR', 'Fiber Media Converters', 'Server Rack Dressing'],
        resultMetrics: 'Zero signal latency over 300m distances with 24/7 multi-screen control room monitoring.'
      }
    ],
    comparisonMatrix: {
      title: 'IP Camera Systems vs Analog HD Systems',
      subtitle: 'Technical decision matrix to help housing societies and businesses choose the right architecture.',
      headers: ['Feature / Architecture', 'IP Network Surveillance (Recommended)', 'Analog HD Surveillance (Legacy)'],
      rows: [
        {
          feature: 'Resolution & Clarity',
          col1: 'Up to 4K (8MP / 12MP) with digital zoom without pixelation',
          col2: 'Standard 2MP (1080p) to 5MP, blurred digital zoom',
          verdict: 'IP systems deliver 3x sharper license plate and facial detail.'
        },
        {
          feature: 'Cabling & Infrastructure',
          col1: 'Single Cat6 Ethernet cable for both power and video (PoE)',
          col2: 'Separate 3+1 coaxial cable + dedicated power adapter',
          verdict: 'Cat6 reduces cable clutter and simplifies maintenance.'
        },
        {
          feature: 'Transmission Range',
          col1: 'Up to 100m on Cat6; unlimited distance via Optical Fiber & PoE extenders',
          col2: 'Signal degrades beyond 70-80m on analog copper cable',
          verdict: 'IP is mandatory for multi-wing buildings and large premises.'
        },
        {
          feature: 'Storage Efficiency',
          col1: 'H.265+ smart video compression (50-70% less HDD space needed)',
          col2: 'Older H.264 compression requiring larger hard drives',
          verdict: 'H.265+ doubles recording retention days on the same HDD size.'
        },
        {
          feature: 'Future Expandability',
          col1: 'Easily add cameras by adding a PoE switch without rewiring NVR',
          col2: 'Requires dedicated physical port on DVR and new cable run to recorder',
          verdict: 'IP architecture is modular and future-proof for 10+ years.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Non-Comprehensive AMC',
        priceHint: 'Best for newer systems under manufacturer warranty',
        description: 'Covers routine servicing, unlimited emergency breakdown visits, and camera health checkups.',
        features: [
          '4 Scheduled Quarterly Preventive Visits',
          'Unlimited Emergency Breakdown Calls',
          'Lens Cleaning & Camera Angle Alignment',
          'NVR/DVR Firmware & Storage Optimization',
          'Guaranteed 24-48 Hour Technician Dispatch'
        ],
        sla: '24-48 Hours'
      },
      {
        title: 'Comprehensive AMC',
        badge: 'Most Popular for Societies',
        priceHint: 'Complete peace of mind with hardware parts included',
        description: 'Full coverage including labour, breakdown visits, and free replacement/repair of faulty cameras, power supplies, and switches.',
        features: [
          'Everything in Non-Comprehensive Plan',
          'Free Replacement of Faulty Power Supplies / SMPS',
          'Standby Replacement Camera during Repairs',
          'Free BNC / RJ45 Connector Replacements',
          'Priority Emergency 24-Hour Dispatch'
        ],
        sla: 'Within 24 Hours'
      }
    ],
    faqs: [
      {
        question: 'How many CCTV cameras are required for a typical 7-story housing society in Thane?',
        answer: 'A standard 7-story, single-wing cooperative housing society typically requires 12 to 16 cameras: 2 for main entrance/exit gates, 4 to 6 for ground compound/parking areas, 1 for the main lobby, 1 for each elevator cabin, and 1 for the terrace/water pump room.'
      },
      {
        question: 'How many days of video recording backup will an 8-camera or 16-camera system store?',
        answer: 'With modern H.265+ video compression at 1080p/2MP resolution, each camera consumes approximately 18-20 GB per day. A 4TB surveillance hard drive (WD Purple / Seagate SkyHawk) will store approximately 25 to 30 days of continuous recording for 8 cameras, and 14 to 16 days for 16 cameras.'
      },
      {
        question: 'How do we reset forgotten admin passwords on CP Plus or Hikvision DVR/NVR?',
        answer: 'For CP Plus and Hikvision recorders, password reset requires either: (1) Exporting the encrypted XML key file via SADP / Config Tool and submitting to authorized dealer Sunrise Communication for manufacturer unlock, (2) Answering predefined security questions, or (3) Dynamic QR code scanning linked to the registered recovery email.'
      },
      {
        question: 'What are the legal society bylaws for installing lift cabin CCTV cameras in Maharashtra?',
        answer: 'Under Maharashtra Co-operative Societies (MCS) guidelines, CCTV installation in lift cabins requires a General Body (GBM) or Managing Committee resolution. Lift cameras must use flexible travelling cables (flat lift CCTV cables) to prevent snapping during elevator movement, and notice boards informing residents of 24/7 CCTV surveillance must be displayed.'
      },
      {
        question: 'What is the response time for CCTV breakdown repair in Thane, Mumbai, and Navi Mumbai?',
        answer: 'Sunrise Communication provides guaranteed 24 to 48-hour technician on-site response for breakdown complaints under AMC across Thane West, Mulund, Bhandup, Ghatkopar, Vashi, and Mahape.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Hiranandani Estate', 'Wagle Industrial Estate', 'Kalwa', 'Kalyan', 'Dombivli'],
    serviceAreasMumbai: ['Mulund (W & E)', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri (E & W)', 'Bandra Kurla Complex (BKC)', 'Goregaon', 'Malad', 'Borivali'],
    serviceAreasNaviMumbai: ['Vashi', 'Mahape (TTC MIDC)', 'Airoli Knowledge Park', 'Kopar Khairane', 'Ghansoli', 'Nerul', 'Belapur', 'Panvel'],
    seo: {
      title: 'CCTV Camera Installation & AMC in Thane, Mumbai | Sunrise Communication',
      description: 'Expert CCTV installation, IP camera systems, and Comprehensive AMC for housing societies, offices, and warehouses across Thane, Mumbai, and Navi Mumbai. Call +91-9323848622.',
      keywords: 'CCTV Installation Thane, CCTV AMC Mumbai, Housing Society CCTV Thane West, CP Plus Camera Dealer, Hikvision IP Camera Thane, Security Camera Repair Charai'
    }
  },

  'epabx-intercom-solutions': {
    slug: 'epabx-intercom-solutions',
    name: 'EPABX & Society Intercom Solutions',
    heroTitle: 'Housing Society Intercom & Corporate EPABX Systems in Thane & Mumbai',
    tagline: 'Reliable Multi-Line Society Intercoms, IP-PBX, and Voice Cabling Infrastructure',
    directAnswerAeo: 'Sunrise Communication installs, repairs, and maintains EPABX and housing society intercom networks across Thane, Mumbai, and Navi Mumbai. We specialize in Matrix Telecom systems, multi-pair copper cabling, security gatekeeper phones, and society telecom AMC.',
    categoryIcon: 'flaticon-telephone',
    shortDescription: 'Seamless flat-to-gate, flat-to-flat, and corporate internal communication with crisp audio, robust copper cabling, and digital PBX switching.',
    authorizedBrands: ['Matrix Telecom', 'Syntel', 'Beetel', 'Panasonic', 'D-Link', 'Finolex'],
    offerings: [
      {
        title: 'Cooperative Housing Society (CHS) Intercoms',
        description: 'Complete intercom systems linking 20 to 1000+ residential flats with the security gatekeeper and management office.',
        icon: 'fa-phone',
        features: [
          'Security Gatekeeper Console with Caller ID',
          'Flat-to-Flat & Flat-to-Gate Calling Modes',
          'Jelly-Filled Armoured Copper Multi-Pair Cabling',
          'Krone Connector Tag Block Distribution Frames'
        ]
      },
      {
        title: 'Corporate EPABX & Hybrid IP-PBX Systems',
        description: 'Advanced telephony infrastructure for corporate offices, call centers, clinics, and educational institutions.',
        icon: 'fa-exchange',
        features: [
          'VoIP / SIP Trunk & Hybrid PRI Line Integration',
          'Auto-Attendant & Interactive Voice Response (IVR)',
          'Call Recording & Detailed Call Detail Records (CDR)',
          'Extension Mobility on Smartphones'
        ]
      },
      {
        title: 'Intercom Cable Splicing & Fault Finding',
        description: 'Rapid diagnostic and rectification of static noise, cross-talk, cut cables, and dead telephone extension lines.',
        icon: 'fa-wrench',
        features: [
          'Tone Generator & Cable Fault Locating',
          'Waterproof Joint Enclosure Splicing',
          'Junction Box (DP Box) Rewiring & Number Tagging',
          'Underground Armoured Cable Laying'
        ]
      },
      {
        title: 'Society Intercom Annual Maintenance (AMC)',
        description: 'Turnkey maintenance contract ensuring uninterrupted gatekeeper communication with quarterly line checkups.',
        icon: 'fa-shield',
        features: [
          'Unlimited Breakdown Visits for Line Faults',
          'Free Krone Tagging & Jumper Wire Replacements',
          'Annual PBX System Voltage & Battery Health Audit',
          '24-Hour Emergency Ticket Dispatch'
        ]
      }
    ],
    caseStudies: [
      {
        title: '480-Flat Multi-Wing Housing Society Intercom Migration',
        location: 'Charai / Naupada, Thane (West)',
        premiseType: 'Large Cooperative Housing Society (4 Wings)',
        challenge: 'Aging 15-year-old copper wiring caused severe humming noise, cross-talk, and failed calls between security gate and upper floors.',
        solution: 'Replaced corroded junction boxes with Krone tag blocks, laid jelly-filled armoured 50-pair cables, and installed a Matrix ETERNITY Hybrid PBX.',
        hardwareDeployed: ['1x Matrix ETERNITY Expandable IP-PBX', '12x 50-Pair Krone Distribution Boxes', '1,200m Armoured Telecom Cable', '2x Gatekeeper Consoles'],
        resultMetrics: '100% crystal-clear flat-to-gate audio across all 480 flats with zero cross-talk complaints.'
      },
      {
        title: '64-Line Corporate Hybrid IP-PBX Integration',
        location: 'Bandra Kurla Complex (BKC), Mumbai',
        premiseType: 'Corporate Financial Office',
        challenge: 'Multi-department firm needed automated call routing, IVR attendant, and mobile extension forwarding for hybrid remote staff.',
        solution: 'Deployed Matrix Hybrid IP-PBX with SIP trunk integration, digital operator console, and automated call recording software.',
        hardwareDeployed: ['Matrix ETERNITY IP-PBX', '24x Digital Key Telephones', 'Call Recording Server', 'SIP Trunk Gateway'],
        resultMetrics: 'Reduced telecom operational costs by 35% while enabling seamless extension mobility.'
      }
    ],
    comparisonMatrix: {
      title: 'Traditional Multi-Core Intercom vs Modern IP-PBX',
      subtitle: 'Compare traditional copper telecom infrastructure with modern VoIP/IP intercom systems.',
      headers: ['Capability', 'Traditional Copper EPABX (Matrix/Syntel)', 'Modern Hybrid IP-PBX Systems'],
      rows: [
        {
          feature: 'Best Suited For',
          col1: 'Residential Housing Societies (CHS) & mid-size offices',
          col2: 'Corporate offices, tech parks, and premium high-rises',
          verdict: 'Copper EPABX provides the lowest hardware & maintenance cost for societies.'
        },
        {
          feature: 'Wiring Infrastructure',
          col1: 'Multi-pair telephone copper cables (0.5mm / 0.6mm)',
          col2: 'Standard Cat6 Ethernet cable or Optical Fiber LAN',
          verdict: 'Copper is highly durable and immune to IP router crashes.'
        },
        {
          feature: 'Gatekeeper Integration',
          col1: 'Dedicated rugged gatekeeper handset with LCD display',
          col2: 'Touchscreen video guard console & mobile app calling',
          verdict: 'Both provide instant flat calling; IP adds video preview.'
        },
        {
          feature: 'Maintenance Simplicity',
          col1: 'Simple physical wire tracing with tone generator',
          col2: 'Requires IT network admin & router management',
          verdict: 'Traditional EPABX requires zero software maintenance by society staff.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Society Intercom Non-Comprehensive AMC',
        priceHint: 'Affordable per-flat quarterly maintenance',
        description: 'Covers unlimited technician visits for extension line faults, gatekeeper repair, and DP box jumpering.',
        features: [
          'Unlimited Technician Visits for Flat Complaints',
          'Gatekeeper Handset Servicing & Jumper Repair',
          'Quarterly Main DP Box & Power Supply Check',
          'Free Wire Testing & Number Relabeling'
        ],
        sla: '24-48 Hours'
      },
      {
        title: 'Comprehensive Intercom AMC',
        badge: 'Recommended for 50+ Flats',
        priceHint: 'All-inclusive coverage including main PBX system parts',
        description: 'Complete protection covering PBX motherboards, extension cards, power supply units, and labour.',
        features: [
          'Everything in Non-Comprehensive Plan',
          'Free Repair / Replacement of PBX Extension Cards',
          'Free Main Power Supply Unit (SMPS) Replacement',
          'Free Krone Tag Block Modules',
          'Guaranteed Priority 24-Hour Breakdown Support'
        ],
        sla: 'Within 24 Hours'
      }
    ],
    faqs: [
      {
        question: 'How do we fix static or humming noise in housing society intercom lines?',
        answer: 'Static or buzzing noise is usually caused by: (1) Moisture/corrosion inside floor junction (DP) boxes, (2) Parallel routing of telephone cables alongside high-voltage electrical mains, or (3) Deteriorated cable insulation. Sunrise Communication rectifies this by replacing damaged pairs, installing Krone waterproof tag modules, and separating audio lines from power cables.'
      },
      {
        question: 'Can an existing old analog intercom cabling be upgraded to IP Intercom without breaking society walls?',
        answer: 'Yes. If the existing copper conduit pipes are intact, new Cat6 or 2-wire IP converters can be pulled through existing shafts. Alternatively, modern Hybrid IP-PBX systems allow societies to retain their existing copper flat wiring while upgrading the central server to an IP backbone.'
      },
      {
        question: 'How does a housing society intercom system work during power cuts?',
        answer: 'All EPABX and intercom systems installed by Sunrise Communication include dedicated 12V/24V SMPS battery backup units (UPS) ensuring uninterrupted flat-to-gate communication for 4 to 8 hours during electricity outages.'
      },
      {
        question: 'What is the cost of intercom wiring per flat in Thane and Mumbai?',
        answer: 'Intercom installation costs depend on the number of wings, building height, cable meterage, and whether conduits are already available. On average, turnkey wiring including telephone instrument and PBX port ranges from ₹900 to ₹1,800 per flat.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Hiranandani Estate', 'Wagle Industrial Estate', 'Kalwa', 'Kalyan', 'Dombivli'],
    serviceAreasMumbai: ['Mulund (W & E)', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri (E & W)', 'BKC', 'Goregaon', 'Dadar'],
    serviceAreasNaviMumbai: ['Vashi', 'Mahape (TTC MIDC)', 'Airoli Knowledge Park', 'Kopar Khairane', 'Nerul', 'Belapur', 'Panvel'],
    seo: {
      title: 'Housing Society Intercom & EPABX Systems in Thane, Mumbai | Sunrise Communication',
      description: 'Reliable housing society intercom wiring, Matrix EPABX systems, and telecom AMC across Thane, Mumbai, and Navi Mumbai. Fast 24h repair service. Call +91-9323848622.',
      keywords: 'Society Intercom Thane, EPABX Installation Mumbai, Matrix PBX Dealer Thane, Housing Society Intercom Repair Charai, Intercom AMC Naupada, CHS Intercom Cabling'
    }
  },

  'biometric-access-control': {
    slug: 'biometric-access-control',
    name: 'Biometric Access Control & Time-Attendance',
    heroTitle: 'Biometric Attendance Machines & Access Control Systems in Thane & Mumbai',
    tagline: 'AI Face Recognition, Optical Fingerprint, RFID Cards, and Fail-Safe EM Door Locks',
    directAnswerAeo: 'Sunrise Communication supplies and installs biometric attendance systems, AI facial recognition terminals, and electromagnetic (EM) door lock access systems in Thane, Mumbai, and Navi Mumbai. We partner with Essl, Matrix, and Hikvision for seamless HR payroll sync.',
    categoryIcon: 'flaticon-biometrics',
    shortDescription: 'Streamline staff attendance tracking, eliminate proxy clock-ins, and secure sensitive premises with contactless biometric access control.',
    authorizedBrands: ['Essl Security', 'Matrix COSEC', 'Hikvision', 'Realtime', 'e-Survey', 'CP Plus'],
    offerings: [
      {
        title: 'AI Facial Recognition Attendance Terminals',
        description: 'Contactless high-speed facial recognition terminals capable of scanning users in <0.3 seconds even with masks.',
        icon: 'fa-id-badge',
        features: [
          'Anti-Spoofing 3D Live Face Detection',
          'Capacity from 500 to 50,000 Facial Templates',
          'Thermal & Mask Detection Capabilities',
          'Wi-Fi, LAN Ethernet & 4G SIM Connectivity'
        ]
      },
      {
        title: 'Fingerprint & RFID Card Time-Attendance',
        description: 'Rugged optical and capacitive fingerprint readers for offices, factories, schools, and hospitals.',
        icon: 'fa-id-card-o',
        features: [
          'High-precision 500 DPI Optical Sensor',
          'RFID 125kHz / Mifare 13.56MHz Card Integration',
          'Battery Backup for 4+ Hours Operation',
          'Built-in Voice Prompts & Color Display'
        ]
      },
      {
        title: 'Electromagnetic (EM) Door Lock Systems',
        description: 'Heavy-duty magnetic door locks for glass doors, wooden doors, metal fire doors, and server room access.',
        icon: 'fa-lock',
        features: [
          '600 lbs / 1200 lbs Holding Force Fail-Safe EM Locks',
          'U-Brackets for Frameless Glass Doors & L-Z Brackets',
          'Emergency Break-Glass & Push-to-Exit Buttons',
          'Fire Alarm Emergency Auto-Release Integration'
        ]
      },
      {
        title: 'Attendance & Payroll Software Integration',
        description: 'Automated software sync generating daily overtime, late-mark, shift roster, and monthly salary reports.',
        icon: 'fa-cogs',
        features: [
          'Real-time Cloud Push Data Architecture',
          'Integration with Tally, SAP, and HRMS Portals',
          'Mobile App for Remote Employee Geofence Punching',
          'Automated WhatsApp/SMS Alert Notifications'
        ]
      }
    ],
    caseStudies: [
      {
        title: 'Multi-Door AI Face Recognition Access & Payroll Sync',
        location: 'Mahape IT Park (TTC MIDC), Navi Mumbai',
        premiseType: 'Software Development & BPO Center (250 Staff)',
        challenge: 'Client needed contactless entry across 6 glass doors and automated attendance data sync into their Tally ERP software.',
        solution: 'Installed Essl AI Face Recognition readers paired with 600lbs EM locks, glass U-brackets, push-to-exit buttons, and cloud attendance software.',
        hardwareDeployed: ['6x Essl AI Face Terminals', '6x 600lbs Fail-Safe EM Locks', 'Glass U-Brackets', 'Push-to-Exit Buttons', 'Cloud Sync Gateway'],
        resultMetrics: 'Reduced morning queue check-in time by 75% with zero manual attendance entry errors.'
      },
      {
        title: 'Residential Society Clubhouse & Gym Smart RFID Entry',
        location: 'Ghodbunder Road, Thane (West)',
        premiseType: 'Residential Gated Community Clubhouse',
        challenge: 'Society needed to restrict gym, swimming pool, and clubhouse access exclusively to verified registered flat residents.',
        solution: 'Implemented RFID smart card readers with EM door locks and a centralized membership management database.',
        hardwareDeployed: ['4x RFID Proximity Readers', '4x Heavy-Duty EM Locks', '500x Mifare Smart Cards', 'Management Software'],
        resultMetrics: 'Eliminated unauthorized guest entry and simplified society amenity fee tracking.'
      }
    ],
    comparisonMatrix: {
      title: 'AI Facial Recognition vs Optical Fingerprint Systems',
      subtitle: 'Compare modern contactless biometric technologies with traditional fingerprint readers.',
      headers: ['Feature', 'AI Facial Recognition (Latest)', 'Optical Fingerprint Reader (Standard)'],
      rows: [
        {
          feature: 'Hygiene & Contact',
          col1: '100% Contactless — scans from 1 to 2 meters away',
          col2: 'Requires physical finger touch on sensor',
          verdict: 'Face recognition eliminates germ transmission in large workplaces.'
        },
        {
          feature: 'Recognition Speed',
          col1: 'Under 0.3 seconds per person (Walk-through speed)',
          col2: '1 to 2 seconds per person',
          verdict: 'Face recognition prevents morning lobby bottleneck queues.'
        },
        {
          feature: 'Dry / Worn Fingerprint Issues',
          col1: 'Unaffected by dirty, greasy, or wet hands',
          col2: 'Can fail on worn finger ridges (common in factory/kitchen workers)',
          verdict: 'Face recognition ensures 99.9% reliable recognition for all staff.'
        },
        {
          feature: 'Spoof Prevention',
          col1: '3D Live motion detection blocks photo and video spoofing',
          col2: 'Basic optical sensors can be vulnerable to fake latex prints',
          verdict: 'AI Face recognition delivers military-grade anti-spoofing security.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Biometric Software & Support AMC',
        priceHint: 'Best for standard office attendance setups',
        description: 'Covers software maintenance, database backups, payroll report configuration, and unlimited remote support.',
        features: [
          'Database Backup & Cloud Push Maintenance',
          'Shift Roster & Overtime Rules Customization',
          'Unlimited Remote Desktop & Phone Support',
          'Biometric Device Firmware Upgrades'
        ],
        sla: '24 Hours'
      },
      {
        title: 'Comprehensive Biometric & Lock AMC',
        badge: 'Best for High-Security Offices',
        priceHint: 'Full hardware + software + EM lock coverage',
        description: 'Complete protection covering biometric readers, power supply controllers, exit switches, and EM locks.',
        features: [
          'Everything in Software Support Plan',
          'Free Replacement of Faulty EM Locks & Exit Switches',
          'Power Supply Unit (SMPS) Repair / Replacement',
          'On-Site Physical Technician Visits within 24 Hours'
        ],
        sla: 'Within 24 Hours'
      }
    ],
    faqs: [
      {
        question: 'How does biometric attendance integrate with Tally and HR payroll software?',
        answer: 'Our Essl and Matrix biometric machines utilize automatic cloud push data or local SQL database syncing. Attendance punch logs (in-time, out-time, overtime, lunch breaks) are exported directly into Excel, CSV, or synced via API with Tally, SAP, Keka, and Darwinbox.'
      },
      {
        question: 'What happens to electromagnetic (EM) door locks during a power failure?',
        answer: 'Our installations utilize Fail-Safe EM Locks connected to a 12V battery backup unit (UPS). In the event of a power cut, the battery maintains door locking for 4 to 8 hours. In the event of an emergency fire alarm trigger, the power is cut automatically to unlock all emergency exit doors.'
      },
      {
        question: 'Can employee attendance be tracked across multiple branch offices in Mumbai?',
        answer: 'Yes. Multi-location biometric systems connect via internet to a centralized cloud attendance server, allowing HR to view live employee punches across Thane, Andheri, BKC, and Navi Mumbai branches on a single unified dashboard.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Hiranandani Estate', 'Wagle Industrial Estate'],
    serviceAreasMumbai: ['Mulund', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri (E & W)', 'BKC', 'Lower Parel', 'Malad'],
    serviceAreasNaviMumbai: ['Vashi', 'Mahape (TTC MIDC)', 'Airoli Knowledge Park', 'Kopar Khairane', 'Ghansoli', 'Nerul', 'Belapur'],
    seo: {
      title: 'Biometric Attendance & Access Control in Thane, Mumbai | Sunrise Communication',
      description: 'Authorized dealer & installer for Essl, Matrix, and Hikvision biometric attendance machines & EM door locks in Thane, Mumbai, and Navi Mumbai. Call +91-9323848622.',
      keywords: 'Biometric Attendance Thane, Access Control System Mumbai, Essl Dealer Thane, Face Recognition Attendance Mahape, EM Lock Installation BKC, Time Attendance AMC'
    }
  },

  'structured-networking-cabling': {
    slug: 'structured-networking-cabling',
    name: 'Structured Cabling & Server Networking',
    heroTitle: 'Structured Cat6/Cat6A LAN Cabling & Server Rack Dressing in Thane & Mumbai',
    tagline: 'High-Speed Gigabit LAN Cabling, Server Rack Cable Management & Optical Fiber Splicing',
    directAnswerAeo: 'Sunrise Communication designs, lays, and certifies structured Cat6/Cat6A network cabling and server rack dressing across Thane, Mumbai, and Navi Mumbai. We supply D-Link and Schneider Electric components with Fluke-tested gigabit performance.',
    categoryIcon: 'flaticon-cables',
    shortDescription: 'Build a high-performance network foundation for your corporate office, IT infrastructure, or residential building with certified copper and fiber cabling.',
    authorizedBrands: ['D-Link', 'Schneider Electric (Digilink)', 'CommScope (Systimax)', 'Molex', 'Finolex', 'Netgear'],
    offerings: [
      {
        title: 'Cat6 & Cat6A Structured LAN Cabling',
        description: 'Certified copper network cabling for office workstations, Wi-Fi access points, CCTV cameras, and IP telephones.',
        icon: 'fa-sitemap',
        features: [
          'Gigabit & 10-Gigabit Certified Speed Bandwidth',
          'High-grade 23/24 AWG Solid Bare Copper Conductors',
          'PVC Casing-Capping, Flexible Pipe & Underfloor Trunking',
          'Individual Node Number Tagging & Port Mapping'
        ]
      },
      {
        title: 'Server Rack Dressing & Cable Management',
        description: 'Transform tangled server racks into clean, organized, color-coded patch panel network distributions.',
        icon: 'fa-server',
        features: [
          '4U, 6U, 9U, 12U, 24U & 42U Server Rack Assemblies',
          '24-Port / 48-Port Keystone Patch Panel Termination',
          'Horizontal & Vertical Wire Managers with Velcro Ties',
          'Rack Power Distribution Units (PDU) & Fan Trays'
        ]
      },
      {
        title: 'Optical Fiber Splicing & Backbone Cabling',
        description: 'High-speed fiber optic backbone links connecting multiple building wings, floors, and remote CCTV cameras.',
        icon: 'fa-code-fork',
        features: [
          'Single-Mode & Multi-Mode Armoured Fiber Laying',
          'Fusion Splicing & Optical Loss (OTDR) Testing',
          'Fiber LIU (Light Interface Unit) Patching',
          'Industrial Media Converters & SFP Transceiver Modules'
        ]
      },
      {
        title: 'PoE Switch & Wi-Fi Network Deployment',
        description: 'Turnkey network active hardware supply and configuration ensuring seamless wireless and wired data speeds.',
        icon: 'fa-wifi',
        features: [
          '8, 16, 24 & 48-Port Gigabit PoE+ Managed Switches',
          'Dual-Band Wi-Fi 6 Enterprise Access Point Distribution',
          'VLAN Network Segmentation for CCTV & Guest Wi-Fi',
          'Annual Network Maintenance & Speed Troubleshooting'
        ]
      }
    ],
    caseStudies: [
      {
        title: '160-Node Cat6A Server Room Dressing & Gigabit Backbone',
        location: 'Vashi Sector 30A, Navi Mumbai',
        premiseType: 'Corporate Financial IT Services Office',
        challenge: 'A growing company had a tangled server closet causing network drops, overheating switches, and unmapped workstation ports.',
        solution: 'Installed a 42U server rack, re-terminated 160 workstation lines into Schneider patch panels with wire managers, and labeled all ports.',
        hardwareDeployed: ['1x 42U Server Rack', '4x 48-Port Cat6A Keystone Patch Panels', '4x D-Link 48-Port Gigabit Switches', 'Horizontal Wire Managers'],
        resultMetrics: 'Zero packet loss with Fluke-certified 10Gbps backbone throughput and clean port identification.'
      },
      {
        title: 'Multi-Wing Optical Fiber Inter-Building Backbone',
        location: 'Majiwada, Thane (West)',
        premiseType: 'Commercial Corporate Complex (3 Towers)',
        challenge: 'Interconnecting security control room with 3 distant commercial towers over 500m distance exceeded copper Cat6 limits.',
        solution: 'Laid 6-core armoured single-mode optical fiber in underground conduits with fusion splicing and LIU rack termination.',
        hardwareDeployed: ['1,500m 6-Core Armoured Fiber', '3x Fiber LIU Units', 'Gigabit SFP Optical Transceivers', 'OTDR Testing Report'],
        resultMetrics: 'Flawless zero-latency CCTV streaming and data transfer across all 3 towers.'
      }
    ],
    comparisonMatrix: {
      title: 'Cat6 vs Cat6A vs Optical Fiber Cable Specs',
      subtitle: 'Understand technical bandwidth and distance limitations for data infrastructure.',
      headers: ['Specification', 'Cat6 UTP Copper Cable', 'Cat6A Shielded (STP) Cable', 'Optical Fiber Cable (Single Mode)'],
      rows: [
        {
          feature: 'Maximum Bandwidth',
          col1: '250 MHz (Up to 1 Gbps Gigabit)',
          col2: '500 MHz (Up to 10 Gbps 10-Gigabit)',
          verdict: 'Cat6 is standard for offices; Cat6A is recommended for high-data IT servers.'
        },
        {
          feature: 'Max Distance Limit',
          col1: '100 meters (328 feet)',
          col2: '100 meters (Up to 100m for 10Gbps)',
          verdict: 'Optical Fiber is mandatory for distances exceeding 100 meters.'
        },
        {
          feature: 'Electromagnetic Interference (EMI)',
          col1: 'Moderate resistance; sensitive to high power cables',
          col2: 'High resistance due to individual foil shielding',
          verdict: 'Optical Fiber is 100% immune to all electrical and lightning noise.'
        },
        {
          feature: 'Typical Use Case',
          col1: 'Office workstation LAN, IP cameras, society intercoms',
          col2: 'Data centers, 4K video editing suites, server backbones',
          verdict: 'Optical Fiber is used for building-to-building interconnections.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Network Infrastructure AMC',
        priceHint: 'Affordable network support for small to mid offices',
        description: 'Covers routine patch panel testing, port re-termination, switch port health audits, and cable repair.',
        features: [
          'Quarterly Network Port & Cable Continuity Testing',
          'Patch Panel Re-Punching & Keystone Replacements',
          'PoE Switch Port Reboot & Health Audit',
          'Priority On-Site Technician Dispatch'
        ],
        sla: '24-48 Hours'
      },
      {
        title: 'Enterprise Server & Network AMC',
        badge: 'Recommended for Corporate IT',
        priceHint: 'All-inclusive active + passive network protection',
        description: 'Complete coverage including managed switches, Wi-Fi access points, server rack power, and fiber links.',
        features: [
          'Everything in Network Infrastructure Plan',
          'Managed Switch VLAN Configuration & Backup',
          'Wi-Fi Access Point Roaming & Channel Tuning',
          'Free Standby Gigabit Switch during Repairs',
          'Guaranteed Priority 24-Hour Emergency Dispatch'
        ],
        sla: 'Within 24 Hours'
      }
    ],
    faqs: [
      {
        question: 'What is the maximum cable run distance for Cat6 UTP before signal degradation occurs?',
        answer: 'The international TIA/EIA standard specifies a maximum length of 100 meters (90 meters of solid horizontal cabling + 10 meters of stranded patch cords) for Cat6 copper cable. For distances exceeding 100 meters, Sunrise Communication utilizes Optical Fiber backbone cabling or Gigabit PoE extenders.'
      },
      {
        question: 'When should an enterprise use Optical Fiber instead of Cat6 copper cabling?',
        answer: 'Optical Fiber is necessary when: (1) The distance between network points exceeds 100 meters (e.g. multi-building campuses, long compound yards), (2) Extremely high bandwidth is required (10Gbps to 100Gbps server links), or (3) Cabling passes through industrial areas with intense electromagnetic interference from motors and generators.'
      },
      {
        question: 'What is included in server rack dressing and cable reorganization service?',
        answer: 'Server rack dressing includes: (1) Tracing and labeling all active and inactive LAN ports, (2) Re-punching cables into organized keystone patch panels, (3) Installing horizontal and vertical cable wire managers, (4) Replacing mismatched cables with color-coded snagless patch cords, and (5) Optimizing airflow and power distribution units.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Wagle Industrial Estate'],
    serviceAreasMumbai: ['Mulund', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri', 'BKC', 'Lower Parel', 'Worli'],
    serviceAreasNaviMumbai: ['Vashi', 'Mahape (TTC MIDC)', 'Airoli Knowledge Park', 'Kopar Khairane', 'Ghansoli', 'Nerul', 'Belapur'],
    seo: {
      title: 'Structured Cat6 Cabling & Server Rack Dressing in Thane, Mumbai | Sunrise Communication',
      description: 'Certified Cat6 LAN cabling, server rack dressing, patch panel termination, and fiber splicing across Thane, Mumbai, and Navi Mumbai. Call +91-9323848622.',
      keywords: 'Structured Cabling Thane, Cat6 LAN Cabling Mumbai, Server Rack Dressing Mahape, Fiber Optic Splicing BKC, Network Cabling Wagle Estate, D-Link Network Dealer'
    }
  }
};
