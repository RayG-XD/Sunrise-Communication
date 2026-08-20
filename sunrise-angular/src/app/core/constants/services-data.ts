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
    tagline: 'Reliable HD IP, Analog HD, and Turnkey Surveillance Solutions',
    directAnswerAeo: 'Sunrise Communication provides professional CCTV camera installation, NVR/DVR setup, and customized Annual Maintenance Contracts (AMC) across Thane, Mumbai, and Navi Mumbai. We supply CP Plus, Hikvision, and Dahua systems with prompt on-call technical support.',
    categoryIcon: 'flaticon-cctv',
    shortDescription: 'Protect your residential society, commercial office, or warehouse with high-definition surveillance, night vision, and remote mobile viewing capabilities.',
    authorizedBrands: ['CP Plus', 'Hikvision', 'Dahua', 'Matrix', 'Seagate SkyHawk', 'WD Purple'],
    offerings: [
      {
        title: 'Housing Society CCTV Surveillance',
        description: 'Perimeter, lobby, parking, and lift cabin camera installations designed for residential housing societies.',
        icon: 'fa-building',
        features: [
          'Full HD & Ultra-HD Network Cameras',
          'Vandal-resistant Dome cameras for lobbies & lifts',
          'Multi-week Continuous Video Retention',
          'Mobile App Access for Authorized Committee Members'
        ]
      },
      {
        title: 'Commercial & Office Security',
        description: 'Tailored surveillance setups for corporate offices, retail spaces, and commercial facilities.',
        icon: 'fa-briefcase',
        features: [
          'Motion Detection & Human/Vehicle Filtering',
          'Audio-enabled Recording Cameras',
          'Centralized Multi-Location Monitoring Room Setup',
          'Integration with Access Control Systems'
        ]
      },
      {
        title: 'Industrial & Warehouse Monitoring',
        description: 'Long-range bullet cameras, PTZ tracking, and optical fiber options for large industrial yards.',
        icon: 'fa-industry',
        features: [
          'Long-Range Smart IR / Night Vision Cameras',
          'Weather-resistant IP66/IP67 Metal Enclosures',
          'Optical Fiber Network Cabling for Extended Distances',
          'PoE (Power over Ethernet) Switch Infrastructure'
        ]
      },
      {
        title: 'CCTV Annual Maintenance Contracts (AMC)',
        description: 'Preventive maintenance checkups, lens cleaning, wiring inspection, and breakdown troubleshooting support.',
        icon: 'fa-shield',
        features: [
          'Comprehensive & Non-Comprehensive AMC Options',
          'Quarterly Cable & Power Supply Testing',
          'Storage & Recording Health Inspections',
          'Dedicated On-Call Technician Support in Thane'
        ]
      }
    ],
    caseStudies: [
      {
        title: 'Compound Surveillance Setup for High-Rise Society',
        location: 'Hiranandani Estate, Thane (West)',
        premiseType: 'Residential Cooperative Housing Society (CHS)',
        challenge: 'A multi-story residential society required surveillance for main vehicular gates, visitor parking, and unlit perimeter areas.',
        solution: 'Installed an IP camera network utilizing CP Plus high-definition bullet cameras, multi-channel NVR, and armored cabling.',
        hardwareDeployed: ['CP Plus IP Cameras', '32-Ch H.265+ NVR', 'Surveillance-grade HDDs', 'Gigabit PoE Switches'],
        resultMetrics: 'Comprehensive perimeter monitoring with clear night vision and reliable multi-week video backup.'
      },
      {
        title: 'Commercial Warehouse Facility Surveillance',
        location: 'Wagle Industrial Estate, Thane',
        premiseType: 'Manufacturing Plant & Logistics Hub',
        challenge: 'A large logistics facility required centralized monitoring across loading bays, machinery floors, and entry points.',
        solution: 'Deployed long-range smart IR bullet cameras connected via dedicated data cabling to a central control room setup.',
        hardwareDeployed: ['Hikvision IP Bullet Cameras', 'Enterprise NVR', 'PoE Switches', 'Rack Organization'],
        resultMetrics: 'Smooth multi-screen monitoring across storage and dispatch areas with centralized recording.'
      }
    ],
    comparisonMatrix: {
      title: 'IP Camera Systems vs Analog HD Systems',
      subtitle: 'A standard comparison matrix to help societies and businesses choose the right setup.',
      headers: ['Feature / Architecture', 'IP Network Surveillance (Recommended)', 'Analog HD Surveillance'],
      rows: [
        {
          feature: 'Resolution & Clarity',
          col1: 'High-definition (2MP up to 4K) with clear digital zoom',
          col2: 'Standard 2MP (1080p) to 5MP resolution',
          verdict: 'IP systems provide higher clarity for facial and vehicle detail.'
        },
        {
          feature: 'Cabling & Infrastructure',
          col1: 'Single Cat6 Ethernet cable for both power and video (PoE)',
          col2: 'Separate 3+1 coaxial cable + dedicated power adapter',
          verdict: 'Cat6 reduces cable clutter and simplifies maintenance.'
        },
        {
          feature: 'Transmission Range',
          col1: 'Up to 100m on Cat6; expandable with switches or fiber links',
          col2: 'Standard copper transmission over coaxial runs',
          verdict: 'IP is well suited for multi-wing buildings and large premises.'
        },
        {
          feature: 'Storage Efficiency',
          col1: 'H.265+ smart video compression to optimize hard drive space',
          col2: 'Standard H.264 compression',
          verdict: 'H.265+ delivers longer recording retention on the same HDD size.'
        },
        {
          feature: 'Scalability',
          col1: 'Modular addition of cameras via network PoE switches',
          col2: 'Direct physical port connection to DVR recorder required',
          verdict: 'IP architecture offers convenient future expansion.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Non-Comprehensive AMC',
        priceHint: 'Standard maintenance for existing working setups',
        description: 'Covers scheduled preventive checkups, routine servicing visits, and camera health inspections.',
        features: [
          '4 Scheduled Quarterly Preventive Visits',
          'On-Call Breakdown Troubleshooting Support',
          'Lens Cleaning & Camera Angle Alignment',
          'NVR/DVR Recording & Storage Checks',
          'Prompt Technician Support as per AMC Terms'
        ],
        sla: 'Prompt On-Call'
      },
      {
        title: 'Comprehensive AMC',
        badge: 'Popular for Societies',
        priceHint: 'Extended coverage including parts as per contract',
        description: 'Full maintenance coverage including routine labour, service visits, and parts repair/replacement assistance per agreed terms.',
        features: [
          'Everything in Non-Comprehensive Plan',
          'Parts Repair / Replacement covered as per AMC terms',
          'Routine Power Supply & Connector Checks',
          'Standby Replacement Support during Major Repairs',
          'Priority Response for Active Maintenance Clients'
        ],
        sla: 'Priority Service'
      }
    ],
    faqs: [
      {
        question: 'How many CCTV cameras are typically needed for a 7-story housing society in Thane?',
        answer: 'A standard 7-story single-wing housing society typically installs 10 to 16 cameras covering main entrance/exit gates, parking areas, the ground lobby, elevator cabins, and common compound sections. Exact requirements are finalized during a site survey.'
      },
      {
        question: 'How many days of video recording backup will a CCTV system store?',
        answer: 'Recording duration depends on the number of cameras, resolution, frame rate, and compression (such as H.265+). A 4TB surveillance hard drive typically provides 20 to 30 days of continuous recording for an 8-camera setup, and approximately 12 to 16 days for a 16-camera setup.'
      },
      {
        question: 'How do we reset forgotten admin passwords on CP Plus or Hikvision DVR/NVR?',
        answer: 'Password reset for CP Plus and Hikvision recorders is performed through authorized tools, security question verification, or manufacturer QR code reset procedures handled by an authorized technician.'
      },
      {
        question: 'What are the general recommendations for installing lift cabin CCTV cameras in housing societies?',
        answer: 'Housing societies generally pass a managing committee resolution prior to installing lift cameras. Specialized elevator-rated flexible travelling cables are used to prevent wear during lift movement, along with standard notice signage informing residents of surveillance.'
      },
      {
        question: 'What is the response time for CCTV service in Thane, Mumbai, and Navi Mumbai?',
        answer: 'Sunrise Communication provides prompt on-call technician support for active AMC clients across Thane West, Mulund, Bhandup, Ghatkopar, Vashi, and surrounding areas.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Hiranandani Estate', 'Wagle Industrial Estate', 'Kalwa', 'Kalyan', 'Dombivli'],
    serviceAreasMumbai: ['Mulund (W & E)', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri (E & W)', 'Bandra Kurla Complex (BKC)', 'Goregaon', 'Malad', 'Borivali'],
    serviceAreasNaviMumbai: ['Vashi', 'Mahape (TTC MIDC)', 'Airoli Knowledge Park', 'Kopar Khairane', 'Ghansoli', 'Nerul', 'Belapur', 'Panvel'],
    seo: {
      title: 'CCTV Camera Installation & AMC in Thane, Mumbai | Sunrise Communication',
      description: 'Professional CCTV installation, IP camera systems, and AMC maintenance for housing societies, offices, and warehouses in Thane, Mumbai, and Navi Mumbai. Call +91 93238 48622.',
      keywords: 'CCTV Installation Thane, CCTV AMC Mumbai, Housing Society CCTV Thane West, CP Plus Camera Dealer, Hikvision IP Camera Thane, Security Camera Repair Charai'
    }
  },

  'epabx-intercom-solutions': {
    slug: 'epabx-intercom-solutions',
    name: 'EPABX & Society Intercom Solutions',
    heroTitle: 'Housing Society Intercom & Corporate EPABX Systems in Thane & Mumbai',
    tagline: 'Reliable Multi-Line Society Intercoms, PBX Systems, and Voice Cabling',
    directAnswerAeo: 'Sunrise Communication installs, repairs, and maintains EPABX and housing society intercom networks across Thane, Mumbai, and Navi Mumbai. We supply Matrix Telecom and Beetel systems, multi-pair copper cabling, security gatekeeper phones, and society telecom AMC.',
    categoryIcon: 'flaticon-telephone',
    shortDescription: 'Reliable flat-to-gate, flat-to-flat, and corporate internal communication with clear audio, durable copper cabling, and PBX switching.',
    authorizedBrands: ['Matrix Telecom', 'Syntel', 'Beetel', 'Panasonic', 'D-Link', 'Finolex'],
    offerings: [
      {
        title: 'Residential Society Intercom Systems',
        description: 'Complete multi-flat intercom infrastructure connecting security guard cabins, individual flats, and secretary offices.',
        icon: 'fa-phone-square',
        features: [
          'Scalable from 16 to 500+ Flat Extensions',
          'Security Gatekeeper Console with Direct Calling',
          'Flat-to-Flat & Flat-to-Gate Communication',
          'Concealed Armoured Telecom Cable Laying'
        ]
      },
      {
        title: 'Corporate EPABX & IP-PBX Systems',
        description: 'Feature-rich office PBX systems supporting multi-line trunks, auto-attendant IVR, and call routing.',
        icon: 'fa-sitemap',
        features: [
          'Interactive Voice Response (IVR) Auto-Attendant',
          'Call Forwarding, Transfer, and Conferencing',
          'VoIP & IP-PBX Integration for Remote Offices',
          'Direct Inward Dialing (DID) Extensions'
        ]
      },
      {
        title: 'Intercom Wiring & DP Box Dressing',
        description: 'Rewiring degraded building telephone cables, floor junction box jumpering, and tag-block organization.',
        icon: 'fa-random',
        features: [
          'High-grade 0.5mm Solid Copper Telephone Cable',
          'Krone Distribution Frame (MDF / DP) Tagging',
          'Shaft Cable Relaying & Moisture Protection',
          'Noise & Hum Reduction Troubleshooting'
        ]
      },
      {
        title: 'Society Telecom AMC & On-Call Repair',
        description: 'Annual Maintenance Contracts ensuring flat extension fault resolution, wiring repairs, and gatekeeper maintenance.',
        icon: 'fa-wrench',
        features: [
          'Quarterly Building Main DP Box Checks',
          'Extension Line Testing & Fault Jumpering',
          'Gatekeeper Unit & Power Supply Servicing',
          'Prompt On-Call Assistance for Society Complaints'
        ]
      }
    ],
    caseStudies: [
      {
        title: 'Multi-Wing Society Intercom Modernization',
        location: 'Charai, Thane (West)',
        premiseType: 'Residential Cooperative Housing Society',
        challenge: 'An older housing society suffered from line static, dead extensions, and unlabelled wiring junction boxes across its wings.',
        solution: 'Replaced corroded floor distribution boxes with Krone modules, re-tagged all flat pairs, and installed a Matrix PBX system.',
        hardwareDeployed: ['Matrix Intercom System', 'Krone Tag Blocks', 'Multi-Pair Armoured Cable', 'Guard Intercom Console'],
        resultMetrics: 'Clear voice audio across all resident extensions and reliable flat-to-gate security verification.'
      },
      {
        title: 'Corporate Office EPABX & Call Routing Setup',
        location: 'Wagle Industrial Estate, Thane',
        premiseType: 'Corporate Headquarters',
        challenge: 'A multi-department enterprise needed auto-attendant call routing and extension transfers between sales and accounts.',
        solution: 'Deployed a hybrid PBX system with multi-trunk support, welcome IVR greetings, and digital operator consoles.',
        hardwareDeployed: ['Hybrid EPABX System', 'Digital Key Telephones', 'Structured Voice Cabling', 'MDF Panel'],
        resultMetrics: 'Streamlined incoming client call transfers with smooth departmental routing.'
      }
    ],
    comparisonMatrix: {
      title: 'Traditional Copper Intercom vs IP-PBX Systems',
      subtitle: 'Choosing the right intercom technology for your residential building or enterprise.',
      headers: ['Feature', 'Dedicated Copper Intercom (Traditional)', 'IP-PBX / Cloud Intercom'],
      rows: [
        {
          feature: 'Installation Cost',
          col1: 'Cost-effective per-flat hardware and wiring',
          col2: 'Higher initial investment for IP handsets/switches',
          verdict: 'Traditional copper is ideal for standard housing society budgets.'
        },
        {
          feature: 'Audio Reliability',
          col1: 'Direct dedicated copper lines with zero reliance on internet',
          col2: 'Dependent on internal network / internet stability',
          verdict: 'Copper intercoms provide consistent voice audio independent of Wi-Fi.'
        },
        {
          feature: 'Maintenance Simplicity',
          col1: 'Straightforward hardware maintenance via standard tag blocks',
          col2: 'Requires IT network administration and IP configuration',
          verdict: 'Copper intercom maintenance is simple and widely supported.'
        },
        {
          feature: 'Feature Richness',
          col1: 'Basic flat-to-gate calling, flat-to-flat dialing, and panic alerts',
          col2: 'Video calling, smartphone integration, and voicemail',
          verdict: 'IP-PBX is best suited for corporate offices and luxury complexes.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Society Intercom Non-Comprehensive AMC',
        priceHint: 'Quarterly maintenance for residential societies',
        description: 'Covers routine technician visits for extension line faults, gatekeeper checkups, and DP box jumpering.',
        features: [
          'Scheduled Preventive Checks for Society DP Boxes',
          'Technician Support for Extension Faults',
          'Gatekeeper Handset Servicing & Jumper Checks',
          'Wire Continuity Testing & Labeling Assistance'
        ],
        sla: 'Prompt On-Call'
      },
      {
        title: 'Comprehensive Intercom AMC',
        badge: 'Recommended for 50+ Flats',
        priceHint: 'Extended coverage including PBX system components',
        description: 'Comprehensive protection covering routine servicing, line fault rectifications, and PBX component repair/replacement as per agreed terms.',
        features: [
          'Everything in Non-Comprehensive Plan',
          'PBX Component Servicing / Replacement per agreed terms',
          'Main Power Supply Unit (SMPS) Check & Maintenance',
          'Tag Block Module Replacements as Needed',
          'Priority Support for Society Management Committees'
        ],
        sla: 'Priority Service'
      }
    ],
    faqs: [
      {
        question: 'How is static or humming noise fixed in housing society intercom lines?',
        answer: 'Static or humming noise is typically caused by moisture inside floor junction (DP) boxes, cable deterioration, or wiring placed too close to electrical lines. Technicians resolve this by cleaning contacts, installing protective Krone modules, and separating audio wiring from high-voltage cables.'
      },
      {
        question: 'Can an older intercom system be upgraded without tearing down building walls?',
        answer: 'In most cases, existing conduit pipes can be used to pull fresh cables. Modern hybrid systems also allow societies to retain existing internal flat wiring while upgrading the central exchange.'
      },
      {
        question: 'How does an intercom system operate during electricity power cuts?',
        answer: 'Intercom systems are typically connected to dedicated SMPS battery backup units (UPS) to ensure flat-to-gate communication remains functional during temporary power outages.'
      },
      {
        question: 'What is the cost of intercom wiring per flat in Thane and Mumbai?',
        answer: 'Installation costs depend on building height, number of wings, cable meterage, and whether conduits are pre-existing. Indicative pricing is provided following a brief site survey.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Hiranandani Estate', 'Wagle Industrial Estate', 'Kalwa', 'Kalyan', 'Dombivli'],
    serviceAreasMumbai: ['Mulund (W & E)', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri (E & W)', 'BKC', 'Goregaon', 'Dadar'],
    serviceAreasNaviMumbai: ['Vashi', 'Mahape (TTC MIDC)', 'Airoli Knowledge Park', 'Kopar Khairane', 'Nerul', 'Belapur', 'Panvel'],
    seo: {
      title: 'Housing Society Intercom & EPABX Systems in Thane, Mumbai | Sunrise Communication',
      description: 'Reliable housing society intercom wiring, Matrix EPABX systems, and telecom AMC across Thane, Mumbai, and Navi Mumbai. Call +91 93238 48622.',
      keywords: 'Society Intercom Thane, EPABX Installation Mumbai, Matrix PBX Dealer Thane, Housing Society Intercom Repair Charai, Intercom AMC Naupada, CHS Intercom Cabling'
    }
  },

  'biometric-access-control': {
    slug: 'biometric-access-control',
    name: 'Biometric Access Control & Time-Attendance',
    heroTitle: 'Biometric Attendance Machines & Access Control Systems in Thane & Mumbai',
    tagline: 'AI Face Recognition, Optical Fingerprint, RFID Cards, and Reliable EM Door Locks',
    directAnswerAeo: 'Sunrise Communication supplies and installs biometric attendance systems, facial recognition terminals, and electromagnetic (EM) door lock access systems in Thane, Mumbai, and Navi Mumbai. We supply Essl, Matrix, and Hikvision systems for office and society access management.',
    categoryIcon: 'flaticon-biometrics',
    shortDescription: 'Manage staff attendance tracking, secure restricted entry points, and streamline access control with modern biometric readers.',
    authorizedBrands: ['Essl Security', 'Matrix COSEC', 'Hikvision', 'Realtime', 'e-Survey', 'CP Plus'],
    offerings: [
      {
        title: 'Facial Recognition Attendance Terminals',
        description: 'Contactless facial recognition terminals for fast, hygienic employee attendance recording.',
        icon: 'fa-id-badge',
        features: [
          '3D Live Anti-Spoofing Technology',
          'Capacity options from 500 to 10,000+ templates',
          'Contactless High-Speed Scanning',
          'Wi-Fi, LAN Ethernet & USB Data Export'
        ]
      },
      {
        title: 'Fingerprint & RFID Card Time-Attendance',
        description: 'Durable optical fingerprint readers and card punch terminals for offices, workshops, and retail stores.',
        icon: 'fa-id-card-o',
        features: [
          'High-precision Optical Fingerprint Sensors',
          'RFID Proximity / Smart Card Integration',
          'Battery Backup options for uninterrupted use',
          'Clear Display & Audio Voice Confirmation'
        ]
      },
      {
        title: 'Electromagnetic (EM) Door Lock Systems',
        description: 'Reliable magnetic door locks for glass doors, wooden doors, metal doors, and server room access.',
        icon: 'fa-lock',
        features: [
          '600 lbs / 1200 lbs Holding Force Fail-Safe EM Locks',
          'U-Brackets for Frameless Glass & L-Z Brackets',
          'Push-to-Exit Buttons & Emergency Break-Glass Units',
          'Integration with Fire Alarm System Release'
        ]
      },
      {
        title: 'Attendance Software & Report Setup',
        description: 'Software configuration for tracking work hours, late marks, shift rosters, and monthly attendance summaries.',
        icon: 'fa-cogs',
        features: [
          'Cloud & Local Network Database Sync',
          'Export to Excel, CSV, and standard payroll formats',
          'Shift Roster & Overtime Calculation Setup',
          'Remote Employee Management Options'
        ]
      }
    ],
    caseStudies: [
      {
        title: 'Access Control & Attendance Setup for Corporate Office',
        location: 'Mahape IT Park (TTC MIDC), Navi Mumbai',
        premiseType: 'Corporate Office Facility',
        challenge: 'A growing company required controlled entry across glass doors and automated attendance logs for HR reporting.',
        solution: 'Installed facial recognition terminals paired with 600lbs EM locks, glass U-brackets, exit switches, and attendance software.',
        hardwareDeployed: ['Essl Face Recognition Terminals', '600lbs EM Locks', 'Glass U-Brackets', 'Push-to-Exit Switches'],
        resultMetrics: 'Convenient contactless employee entry with automated attendance summary reports.'
      },
      {
        title: 'Gated Amenity Access for Society Clubhouse',
        location: 'Ghodbunder Road, Thane (West)',
        premiseType: 'Residential Society Clubhouse & Gym',
        challenge: 'A residential society needed to restrict clubhouse and fitness room entry to registered residents.',
        solution: 'Installed RFID card readers with EM locks and registered resident access cards.',
        hardwareDeployed: ['RFID Readers', 'Heavy-Duty EM Locks', 'Proximity Cards', 'Access Controller'],
        resultMetrics: 'Secure, organized entry for society residents with simplified access management.'
      }
    ],
    comparisonMatrix: {
      title: 'Facial Recognition vs Optical Fingerprint Systems',
      subtitle: 'A practical comparison of modern biometric authentication methods.',
      headers: ['Feature', 'Facial Recognition (Contactless)', 'Optical Fingerprint Reader'],
      rows: [
        {
          feature: 'Hygiene & Contact',
          col1: 'Contactless recognition from a comfortable distance',
          col2: 'Requires physical finger touch on sensor surface',
          verdict: 'Facial recognition provides a touch-free entry experience.'
        },
        {
          feature: 'Scanning Speed',
          col1: 'Fast, smooth walk-through authentication',
          col2: '1 to 2 seconds per user touch',
          verdict: 'Facial recognition reduces entry bottlenecks during shift changes.'
        },
        {
          feature: 'Worn / Dry Fingerprints',
          col1: 'Unaffected by dry, wet, or worn finger ridges',
          col2: 'May occasionally require multiple attempts with worn skin',
          verdict: 'Facial recognition is dependable across all employee profiles.'
        },
        {
          feature: 'Security',
          col1: '3D live anti-spoofing technology',
          col2: 'Standard optical verification',
          verdict: 'Both systems provide reliable access security.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Software Support AMC',
        priceHint: 'Basic support for standard attendance setups',
        description: 'Covers software assistance, database maintenance, report configuration, and remote troubleshooting.',
        features: [
          'Database Maintenance & Backup Support',
          'Shift Roster & Report Configuration Assistance',
          'Remote Desktop & Phone Technical Support',
          'Device Firmware Updates & Diagnostics'
        ],
        sla: 'Prompt On-Call'
      },
      {
        title: 'Comprehensive Hardware & Lock AMC',
        badge: 'Recommended for Access Setups',
        priceHint: 'Hardware maintenance for readers and EM locks',
        description: 'Complete support covering biometric readers, power controllers, exit switches, and EM lock servicing per agreed terms.',
        features: [
          'Everything in Software Support Plan',
          'EM Lock & Exit Switch Servicing/Repair per agreed terms',
          'Power Supply Unit Maintenance',
          'On-Site Technician Assistance as per AMC Schedule'
        ],
        sla: 'Priority Service'
      }
    ],
    faqs: [
      {
        question: 'How does biometric attendance data export to payroll software?',
        answer: 'Biometric terminals store punch logs (in-time, out-time, overtime) which are synced to attendance software and exported directly to Excel, CSV, or standard payroll formats.'
      },
      {
        question: 'What happens to electromagnetic (EM) door locks during a power failure?',
        answer: 'EM lock systems are typically connected to battery backup units (UPS) to maintain door locking during temporary power cuts. Fail-safe locks are also integrated with emergency push buttons or fire systems for safe exit.'
      },
      {
        question: 'Can employee attendance be tracked across multiple branch locations?',
        answer: 'Yes. Multi-location biometric systems connect over the internet to a central server, allowing centralized HR management across different branch offices.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Hiranandani Estate', 'Wagle Industrial Estate'],
    serviceAreasMumbai: ['Mulund', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri (E & W)', 'BKC', 'Lower Parel', 'Malad'],
    serviceAreasNaviMumbai: ['Vashi', 'Mahape (TTC MIDC)', 'Airoli Knowledge Park', 'Kopar Khairane', 'Ghansoli', 'Nerul', 'Belapur'],
    seo: {
      title: 'Biometric Attendance & Access Control in Thane, Mumbai | Sunrise Communication',
      description: 'Authorized dealer & installer for Essl, Matrix, and Hikvision biometric attendance machines & EM door locks in Thane, Mumbai, and Navi Mumbai. Call +91 93238 48622.',
      keywords: 'Biometric Attendance Thane, Access Control System Mumbai, Essl Dealer Thane, Face Recognition Attendance Mahape, EM Lock Installation BKC, Time Attendance AMC'
    }
  },

  'structured-networking-cabling': {
    slug: 'structured-networking-cabling',
    name: 'Security & Telecom Structured Cabling',
    heroTitle: 'CCTV, Intercom, EPABX & Biometric Structured Cabling in Thane & Mumbai',
    tagline: 'End-to-End Cat6, Multi-Pair Copper, and Security Rack Dressing for Surveillance & Telecom',
    directAnswerAeo: 'Sunrise Communication provides structured Cat6 and multi-pair copper cabling specifically for CCTV surveillance cameras, DVR/NVR setups, EPABX society intercoms, biometric access controllers, and Video Door Phones across Thane, Mumbai, and Navi Mumbai. We supply trusted D-Link, Finolex, and Schneider components.',
    categoryIcon: 'flaticon-cables',
    shortDescription: 'Reliable, concealed, and neatly organized cabling infrastructure designed specifically for CCTV security cameras, housing society intercoms, access control, and telecom exchanges.',
    authorizedBrands: ['D-Link', 'Finolex', 'Schneider Electric (Digilink)', 'Polycab', 'Matrix', 'CP Plus'],
    offerings: [
      {
        title: 'CCTV Camera & Surveillance Network Cabling',
        description: 'Quality Cat6 PoE network cabling for IP cameras and 3+1 coaxial wiring for analog HD surveillance systems.',
        icon: 'fa-video-camera',
        features: [
          'Cat6 Solid Copper Cable Laying for IP PoE Cameras',
          'Heavy-Duty 3+1 Coaxial Cabling for Analog HD Systems',
          'Elevator Travelling Cable for Lift Cabin Cameras',
          'Concealed PVC Casing-Capping & Armoured Outdoor Runs'
        ]
      },
      {
        title: 'EPABX & Society Intercom Multi-Pair Cabling',
        description: 'Multi-pair telephone cable infrastructure connecting security gatekeeper phones, floor DP boxes, and individual flats.',
        icon: 'fa-phone',
        features: [
          '0.5mm High-Grade Solid Copper Multi-Pair Cables',
          'Floor Junction (DP) Box Dressing & Krone Tag Blocks',
          'Shaft Cable Relaying & Moisture Protection',
          'Extension Line Tracing, Jumpering & Number Tagging'
        ]
      },
      {
        title: 'Biometrics, Access Control & VDP Wiring',
        description: 'Dedicated low-voltage wiring for biometric terminals, EM magnetic door locks, push buttons, and Video Door Phones.',
        icon: 'fa-id-badge',
        features: [
          'Shielded Multi-Core Wiring for Biometric Readers',
          'Heavy-Duty Power Lines for 600lbs/1200lbs EM Locks',
          'Multi-Apartment Video Door Phone (VDP) Cabling',
          'Exit Switch & Emergency Break-Glass Cable Integration'
        ]
      },
      {
        title: 'Security Equipment Rack Dressing & Cable Management',
        description: 'Organize DVRs, NVRs, EPABX main exchanges, PoE switches, and power supplies into neat, secure rack enclosures.',
        icon: 'fa-server',
        features: [
          '4U, 6U, 9U & 12U Wall-Mount Security Racks',
          'Keystone Patch Panel Termination & Cable Tracing',
          'Horizontal Wire Managers for Tangle-Free Maintenance',
          'Power Distribution & Battery Backup (UPS) Organization'
        ]
      }
    ],
    caseStudies: [
      {
        title: 'Society Intercom Multi-Pair Cabling & DP Box Overhaul',
        location: 'Charai, Thane (West)',
        premiseType: 'Residential Cooperative Housing Society',
        challenge: 'A residential society suffered from damaged telephone wiring, open junction boxes, and static noise on flat intercom extensions.',
        solution: 'Re-laid multi-pair copper telephone cables through protective PVC conduits, installed clean Krone DP boxes, and re-tagged all flat pairs.',
        hardwareDeployed: ['Multi-Pair Copper Cable', 'Krone DP Tag Blocks', 'PVC Casing-Capping', 'MDF Panel Dressing'],
        resultMetrics: 'Restored clear intercom voice communication with neatly labeled, protected junction boxes across all floors.'
      },
      {
        title: 'Security Camera Cabling & NVR Rack Setup',
        location: 'Wagle Industrial Estate, Thane',
        premiseType: 'Commercial Office & Warehouse Facility',
        challenge: 'Unorganized CCTV wires and exposed power adapters were creating maintenance issues and intermittent camera video loss.',
        solution: 'Re-routed all camera lines through structured Cat6 cables into a central wall-mount security rack with PoE switches and patch panels.',
        hardwareDeployed: ['Cat6 Solid Copper Cabling', '9U Wall-Mount Security Rack', 'Gigabit PoE Switch', 'Patch Panel Dressing'],
        resultMetrics: 'Organized central security closet with labeled camera ports and easy maintenance access.'
      }
    ],
    comparisonMatrix: {
      title: 'Cat6 PoE Network Cabling vs Multi-Pair Intercom Wiring',
      subtitle: 'Understanding the right cabling types for CCTV, Intercom, and Security systems.',
      headers: ['Feature / Aspect', 'Cat6 PoE Network Cabling (IP CCTV & Access)', 'Multi-Pair Telephone & Coaxial Cable (Intercom & Analog)'],
      rows: [
        {
          feature: 'Primary Application',
          col1: 'IP CCTV Cameras, NVRs, Network Switches, and Biometric Readers',
          col2: 'EPABX Systems, Society Intercoms, and HD Analog Cameras',
          verdict: 'Cat6 provides high-speed digital data and Power over Ethernet (PoE) in a single cable.'
        },
        {
          feature: 'Signal Transmission',
          col1: 'High-definition digital video stream + DC power up to 100m',
          col2: 'Multi-line dedicated analog voice audio or coaxial video signal',
          verdict: 'Multi-pair copper delivers dedicated, interference-free audio for building intercoms.'
        },
        {
          feature: 'Physical Protection',
          col1: 'Laid inside heavy-duty PVC casing-capping, conduits & lift travelling cables',
          col2: 'Enclosed within floor DP junction boxes with Krone tag blocks',
          verdict: 'Concealed conduits and sealed DP boxes prevent weathering and rodent damage.'
        },
        {
          feature: 'Maintenance & Expansion',
          col1: 'Modular addition of cameras and readers via PoE network switches',
          col2: 'Simple line testing and jumpering on floor distribution frames',
          verdict: 'Both architectures offer easy maintenance when lines are properly tagged.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Cabling & Infrastructure Maintenance',
        priceHint: 'Maintenance support for existing security wiring',
        description: 'Covers periodic cable continuity checks, junction box inspections, and port re-termination.',
        features: [
          'Periodic DP Box & Patch Panel Inspections',
          'Cable Continuity Testing & Fault Jumpering',
          'Connector Replacements & Line Relabeling Assistance',
          'On-Call Technician Support for Line Breakdown Calls'
        ],
        sla: 'Prompt On-Call'
      },
      {
        title: 'Comprehensive Security Rack & Cable AMC',
        badge: 'Recommended for Societies & Offices',
        priceHint: 'Extended support for racks, switches, and wiring',
        description: 'Complete maintenance covering security rack dressing, PoE switch health checks, and wiring maintenance per agreed terms.',
        features: [
          'Everything in Cabling Maintenance Plan',
          'PoE Switch Port Diagnostics & Maintenance',
          'Security Rack Cable Organization Checkups',
          'Hardware Servicing & Assistance per agreed terms',
          'Priority Support for Society and Office Security Setups'
        ],
        sla: 'Priority Service'
      }
    ],
    faqs: [
      {
        question: 'What types of cabling are used for CCTV and Intercom installations?',
        answer: 'We use high-grade Cat6 solid copper cabling for IP CCTV and PoE systems, multi-pair copper telephone cables with Krone tag blocks for society intercom and EPABX systems, and heavy-duty 3+1 coaxial cable for analog HD cameras.'
      },
      {
        question: 'How are CCTV and intercom cables protected in residential societies?',
        answer: 'All cables are laid inside rigid PVC casing-capping, conduit pipes, or flexible metal conduits in shafts to protect against weathering, moisture, and rodent damage. Outdoor building-to-building lines use armoured cables.'
      },
      {
        question: 'Why is a dedicated security rack recommended for CCTV NVR and Intercom EPABX systems?',
        answer: 'A wall-mounted or floor security rack keeps recorders, PoE switches, EPABX exchanges, and power backup units securely enclosed, preventing unauthorized tampering, reducing wire clutter, and ensuring adequate ventilation.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Wagle Industrial Estate', 'Hiranandani Estate'],
    serviceAreasMumbai: ['Mulund', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri', 'BKC', 'Lower Parel', 'Worli', 'Malad', 'Borivali'],
    serviceAreasNaviMumbai: ['Vashi', 'Mahape (TTC MIDC)', 'Airoli Knowledge Park', 'Kopar Khairane', 'Ghansoli', 'Nerul', 'Belapur'],
    seo: {
      title: 'CCTV, Intercom & Security Cabling in Thane, Mumbai | Sunrise Communication',
      description: 'Professional Cat6 network cabling, society intercom multi-pair telephone wiring, and security rack dressing in Thane, Mumbai, and Navi Mumbai. Call +91 93238 48622.',
      keywords: 'CCTV Cabling Thane, Society Intercom Wiring Mumbai, EPABX Cable Dressing Thane, Security Rack Setup Mahape, Biometric Wiring BKC, Cat6 PoE Cabling Wagle Estate'
    }
  }
};
