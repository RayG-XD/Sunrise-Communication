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
    heroTitle: 'CCTV Camera Systems, Installation & AMC in Thane & Mumbai',
    tagline: 'Enterprise IP Cameras, 4K NVRs, Society Surveillance, and 24/7 Remote Monitoring Solutions.',
    directAnswerAeo: 'Sunrise Communication provides turnkey CCTV installation, IP camera systems, and Annual Maintenance Contracts (AMC) across Thane, Mumbai, and Navi Mumbai. We offer 4K NVRs, ColorVu night vision, compound security, and 24-48h technician dispatch.',
    categoryIcon: 'flaticon-camera',
    shortDescription: 'Complete CCTV surveillance solutions for residential housing societies, corporate offices, warehouses, and commercial spaces with crystal-clear 4K imaging, AI video analytics, and reliable AMC coverage.',
    authorizedBrands: ['CP Plus', 'Hikvision', 'Dahua', 'Matrix'],
    offerings: [
      {
        title: 'IP Network Surveillance (PoE)',
        description: 'Ultra-high-definition 2MP, 4MP, 5MP, and 4K IP cameras powered via single Cat6 Ethernet cables with zero video signal degradation.',
        icon: 'fa-video-camera',
        features: ['Smart H.265+ Compression', '4K 8MP Ultra HD Resolution', 'ColorVu 24/7 Color Night Vision', 'Human & Vehicle AI Analytics']
      },
      {
        title: 'Housing Society CCTV Setup',
        description: 'Comprehensive perimeter, lobby, lift cabin, main gate, and parking surveillance engineered specifically for cooperative housing societies (CHS).',
        icon: 'fa-building',
        features: ['Multi-wing Compound Coverage', 'Vandal-proof Dome Cameras', 'Lift Cabin Travelling Cable Setup', 'Gatekeeper Monitor Display']
      },
      {
        title: 'CCTV Annual Maintenance (AMC)',
        description: 'Preventive quarterly maintenance, camera lens focus cleaning, power supply voltage checks, and guaranteed emergency breakdown service within 24 hours.',
        icon: 'fa-shield',
        features: ['Comprehensive & Non-Comprehensive', '4 Scheduled Quarterly Audits', 'Standby DVR/NVR Support', 'Unlimited Breakdown Calls']
      },
      {
        title: 'Remote Live Mobile & Cloud Setup',
        description: 'Secure remote video streaming on smartphones, tablets, and remote command centers with zero complicated router port forwarding via P2P Cloud.',
        icon: 'fa-mobile',
        features: ['Multi-user Access Control', 'gCMOB & Hik-Connect Apps', 'Instant Push Intrusion Alerts', 'PC / Mac Client Software']
      }
    ],
    comparisonMatrix: {
      title: 'Technical Decision Matrix: IP Cameras vs. HD Analog CCTV',
      subtitle: 'Compare camera architectures to select the ideal surveillance setup for your building or commercial property.',
      headers: ['Feature / Parameter', 'IP Network CCTV (Recommended)', 'HD Analog CCTV'],
      rows: [
        {
          feature: 'Maximum Resolution',
          col1: 'Up to 4K (8MP / 12MP Ultra HD)',
          col2: 'Standard 2MP (1080p) to 5MP',
          verdict: 'IP offers 4x greater forensic detail for facial and license plate identification.'
        },
        {
          feature: 'Cabling & Infrastructure',
          col1: 'Single Cat6 Ethernet cable (Power + Video + Audio via PoE)',
          col2: 'Bulky 3+1 Coaxial Cable + Separate Power Adapters',
          verdict: 'Cat6 structured cabling is cleaner, scalable, and easier to maintain long-term.'
        },
        {
          feature: 'Transmission Range',
          col1: 'Unlimited range via Network PoE Switches & Fiber Optics',
          col2: 'Limited to ~150-200m before video degradation',
          verdict: 'IP systems easily link multiple society wings across hundreds of meters.'
        },
        {
          feature: 'Smart AI Analytics',
          col1: 'Built-in Human/Vehicle Detection, Line Crossing, Intrusion',
          col2: 'Basic motion detection only (prone to false alarms)',
          verdict: 'IP camera AI eliminates 90% of false alarms from leaves, pets, or rain.'
        },
        {
          feature: 'Initial Hardware Cost',
          col1: 'Moderate (Standard Enterprise Pricing)',
          col2: 'Low to Economy (Budget Friendly)',
          verdict: 'Analog is cheaper initially, but IP has lower long-term maintenance costs.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Comprehensive CCTV AMC',
        badge: 'Recommended for Societies',
        priceHint: 'Customized per camera node',
        description: 'All-inclusive protection covering 100% labour, free spare parts replacement, and standby hardware.',
        features: [
          '4 Mandatory Quarterly Preventive Audits',
          'Free replacement of burnt/defective camera parts & SMPS',
          'Camera lens cleaning, angle realignment & focus check',
          'HDD health check & recording backup verification',
          'Emergency breakdown response within 24 hours',
          'Free standby DVR/NVR during off-site repairs'
        ],
        sla: '24-Hour Guaranteed Resolution'
      },
      {
        title: 'Non-Comprehensive CCTV AMC',
        priceHint: 'Budget-friendly maintenance',
        description: 'Covers unlimited technician visits, preventive servicing, and repairs with parts charged at actuals.',
        features: [
          '4 Mandatory Quarterly Preventive Audits',
          '100% Free labour on all maintenance visits',
          'Camera lens cleaning & power supply voltage check',
          'Firmware updates & network streaming optimization',
          'Emergency breakdown response within 24–48 hours',
          'Discounted pricing on replacement cameras & HDDs'
        ],
        sla: '24–48 Hour Response'
      }
    ],
    faqs: [
      {
        question: 'How many CCTV cameras are needed for a typical housing society in Thane?',
        answer: 'For a typical 7-story housing society with 1 wing (approx. 28-35 flats), a standard deployment requires 8 to 16 cameras: 2 for the Main Gate (entry/exit with vehicle number plate focus), 2 for the Ground Floor Lobby and Lift Entrance, 2-4 for the Stilt/Basement Parking, 2-4 for the Compound Perimeter, and 1 for the Terrace Access Door.'
      },
      {
        question: 'What is the recording storage duration with an H.265+ NVR system?',
        answer: 'With modern H.265+ smart video compression, a 4-camera 2MP setup uses approximately 15GB per camera/day, allowing a 2TB surveillance hard drive (WD Purple / Seagate SkyHawk) to store 30+ days of continuous recording. An 8-camera 4MP setup typically requires a 4TB to 6TB HDD for 30 days retention.'
      },
      {
        question: 'Can society members view CCTV cameras on their mobile phones?',
        answer: 'Yes. Sunrise Communication configures secure P2P cloud streaming (via CP Plus gCMOB or Hikvision Hik-Connect). The society management committee can grant role-based access to committee members or security personnel with encrypted passwords, preventing unauthorized viewing.'
      },
      {
        question: 'Do you provide CCTV repair and AMC services if the system was installed by another vendor?',
        answer: 'Yes! Sunrise Communication takes over existing CCTV installations from other vendors. We conduct a thorough initial site audit to test all camera streams, power supplies, cabling, and recording status before onboarding your society or office to our AMC contract.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Hiranandani Estate', 'Wagle Estate', 'Kolshet Road', 'Vartak Nagar', 'Kalwa', 'Kalyan', 'Dombivli'],
    serviceAreasMumbai: ['Mulund', 'Bhandup', 'Ghatkopar', 'Powai', 'Andheri East', 'Andheri West', 'BKC', 'Goregaon', 'Malad', 'Borivali', 'Dadar', 'Lower Parel'],
    serviceAreasNaviMumbai: ['Vashi', 'Sanpada', 'Nerul', 'Belapur', 'Kharghar', 'Panvel', 'Kopar Khairane', 'Ghansoli', 'Airoli', 'Mahape MIDC'],
    seo: {
      title: 'CCTV Camera Installation & AMC in Thane, Mumbai | Sunrise Communication',
      description: 'Expert CCTV installation, IP camera systems, and Comprehensive AMC for housing societies, offices, and warehouses across Thane, Mumbai, and Navi Mumbai. Call +91-9987555399.',
      keywords: 'CCTV Installation Thane, CCTV AMC Mumbai, Housing Society CCTV Thane West, CP Plus Camera Dealer, Hikvision IP Camera Thane, Security Camera Repair Charai'
    }
  },

  'epabx-intercom-solutions': {
    slug: 'epabx-intercom-solutions',
    name: 'EPABX & Intercom Solutions',
    heroTitle: 'Housing Society Intercom & Corporate EPABX Systems in Thane',
    tagline: 'Reliable Multi-Wing Intercom Wiring, Matrix IP-PBX, Auto-Attendants & Society Telecom AMC.',
    directAnswerAeo: 'Sunrise Communication specializes in multi-flat housing society intercom cabling, Matrix EPABX systems, and corporate IP-PBX installations across Thane and Mumbai. We provide new multi-pair wiring, fault tracing, and rapid 24-48h AMC repairs.',
    categoryIcon: 'flaticon-call',
    shortDescription: 'End-to-end intercom and EPABX telecommunication infrastructure for residential complexes (20 to 1,000+ flats) and commercial enterprises, ensuring crystal-clear voice communication and robust security guard integration.',
    authorizedBrands: ['Matrix Telecom', 'Syntel', 'Beetel', 'Panasonic', 'NEC'],
    offerings: [
      {
        title: 'Residential Society Intercom',
        description: 'Multi-pair copper and optical fiber backbone intercom systems connecting all flats directly with Main Gate Security, Society Office, and Clubhouse.',
        icon: 'fa-phone-square',
        features: ['Flat-to-Gate Security Calling', 'Flat-to-Flat Privacy Mode', 'Caller ID Display at Security Gate', 'Multi-Wing Building Linking']
      },
      {
        title: 'Enterprise IP-PBX & VoIP',
        description: 'Modern Matrix ETERNITY IP-PBX platforms supporting SIP trunks, digital extensions, remote teleworkers, IVR auto-attendants, and call recording.',
        icon: 'fa-exchange',
        features: ['Interactive Voice Response (IVR)', 'SIP Trunking & VoIP Routing', 'Call Detail Recording (CDR)', 'Multi-Branch Voice Interconnect']
      },
      {
        title: 'Intercom Cabling & Rewiring',
        description: 'Armoured 10/20/50/100-pair jelly-filled underground cable laying, junction box dressing, riser shaft cabling, and short-circuit fault rectification.',
        icon: 'fa-sitemap',
        features: ['Jelly-Filled Outdoor Armoured Cable', 'Krone Tag Block Punching', 'Riser Shaft Cable Dressing', 'Underground Ducting & Conduit']
      },
      {
        title: 'EPABX Maintenance & AMC',
        description: 'Comprehensive annual maintenance contracts for housing societies, covering dead extension repairs, cable breaks, power supply repairs, and operator console servicing.',
        icon: 'fa-wrench',
        features: ['Quarterly Line Testing', 'Free Extension Fault Rectification', 'Standby Power Supply Units', 'Rapid Response for Gate Phone Outages']
      }
    ],
    comparisonMatrix: {
      title: 'Telecom Decision Matrix: Traditional Multi-Pair Intercom vs. Pure IP-PBX',
      subtitle: 'Evaluate telecommunication architectures based on building size, budget, and desired feature set.',
      headers: ['Parameter / Feature', 'Traditional Multi-Pair Intercom', 'Modern IP-PBX / VoIP System'],
      rows: [
        {
          feature: 'Ideal For',
          col1: 'Standard Residential Housing Societies (CHS)',
          col2: 'High-Rise Luxury Towers & Commercial Offices',
          verdict: 'Traditional intercom is cost-effective and highly reliable for residential flats.'
        },
        {
          feature: 'Cabling Requirement',
          col1: 'Multi-pair telephone cable (0.5mm copper / Krone)',
          col2: 'Cat6 structured LAN cabling / Wi-Fi network',
          verdict: 'IP-PBX leverages existing IT networking infrastructure.'
        },
        {
          feature: 'Flat Instrument Hardware',
          col1: 'Standard analog telephone / basic intercom instrument',
          col2: 'IP Phone / Softphone app on smartphone / Video door phone',
          verdict: 'Traditional instruments cost significantly less per flat.'
        },
        {
          feature: 'Maintenance Simplicity',
          col1: 'Simple physical wire tracing & Krone block isolation',
          col2: 'Managed via web-based software dashboard',
          verdict: 'Traditional systems can be quickly serviced by local field technicians.'
        },
        {
          feature: 'Cost Per Flat',
          col1: 'Very Low (Most economical for large societies)',
          col2: 'Moderate to High',
          verdict: 'Traditional copper intercom delivers the best ROI for housing societies.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Housing Society Intercom AMC',
        badge: 'Top Choice for CHS in Thane',
        priceHint: 'Per Flat / Year rate',
        description: 'Complete maintenance covering all building wings, security guard gatekeeper consoles, and flat extensions.',
        features: [
          'Unlimited breakdown visits for dead extension repairs',
          'Free rewiring inside junction boxes and Krone tag blocks',
          'Regular preventive inspection of Main Gate security phone',
          'Lightning surge protector testing & power supply servicing',
          'Priority 24-hour response for Main Gate communication failures',
          'Dedicated technician assigned to your society'
        ],
        sla: '24-Hour Gate Line Guarantee'
      },
      {
        title: 'Corporate EPABX Maintenance AMC',
        priceHint: 'Quarterly / Annual billing',
        description: 'Professional support for office PBX systems, operator consoles, PRI/SIP trunks, and IVR lines.',
        features: [
          'Quarterly server and line diagnostics',
          'Extension reassignment, extension naming & routing changes',
          'Voice logger backup verification & IVR prompt updates',
          'Hardware breakdown repair & standby card replacement',
          'Guaranteed 4-hour business hour SLA for critical PBX downtime'
        ],
        sla: '4-Hour Emergency Business SLA'
      }
    ],
    faqs: [
      {
        question: 'Why do intercom extensions in housing societies frequently develop buzzing noise or go dead?',
        answer: 'Buzzing noise, cross-talk, and dead lines are typically caused by moisture ingress in junction boxes, damaged Krone tag blocks, corroded copper joints, or physical cable tampering inside riser shafts. Sunrise Communication isolates individual flat lines using high-grade jelly-filled cables and weatherproof Krone junction boxes to permanently eliminate line noise.'
      },
      {
        question: 'Can we connect multiple separate wings to a single security gate in a society?',
        answer: 'Yes! Sunrise Communication integrates multi-wing housing societies (e.g., Wings A, B, C, D) using interconnected multi-pair trunk cables or an optical fiber backbone. Security guards at the main gate can dial any flat across any wing instantly with Caller ID verification.'
      },
      {
        question: 'Can our housing society upgrade an old intercom system without breaking flat walls?',
        answer: 'In 95% of cases, yes! If existing conduit pipes inside the building shafts are intact, our team pulls new high-gauge copper cables through existing ducting without damaging flat plaster or interior decor.'
      },
      {
        question: 'Do you supply telephone instruments for residents?',
        answer: 'Yes, we supply authorized Beetel, Panasonic, and Matrix intercom instruments with numeric caller ID display, flash keys, and loud ringer volume controls designed for long-term residential durability.'
      }
    ],
    serviceAreasThane: ['Charai', 'Naupada', 'Panchpakhadi', 'Ghodbunder Road', 'Majiwada', 'Vasant Vihar', 'Hiranandani Meadows', 'Wagle Estate', 'Kolshet', 'Vartak Nagar', 'Bhopar', 'Kalyan', 'Dombivli'],
    serviceAreasMumbai: ['Mulund West', 'Mulund East', 'Bhandup', 'Ghatkopar East', 'Powai', 'Vikhroli', 'Andheri East', 'Kandivali', 'Borivali', 'Dadar'],
    serviceAreasNaviMumbai: ['Vashi Sector 17', 'Sanpada', 'Nerul', 'Seawoods', 'Belapur', 'Kharghar', 'Airoli', 'Kopar Khairane', 'Mahape'],
    seo: {
      title: 'Housing Society Intercom & EPABX Systems in Thane, Mumbai | Sunrise Communication',
      description: 'Reliable housing society intercom wiring, Matrix EPABX systems, and telecom AMC across Thane, Mumbai, and Navi Mumbai. Fast 24h repair service. Call +91-9987555399.',
      keywords: 'Society Intercom Thane, EPABX Installation Mumbai, Matrix PBX Dealer Thane, Housing Society Intercom Repair Charai, Intercom AMC Naupada, CHS Intercom Cabling'
    }
  },

  'biometric-access-control': {
    slug: 'biometric-access-control',
    name: 'Biometric & Access Control',
    heroTitle: 'Biometric Attendance & Access Control Systems in Thane & Mumbai',
    tagline: 'Fingerprint, AI Face Recognition, RFID Smart Cards, EM Door Locks & Turnstile Automation.',
    directAnswerAeo: 'Sunrise Communication installs biometric attendance machines, AI facial recognition readers, and electronic access control systems (EM locks) for offices, gyms, and housing societies in Thane and Mumbai with seamless payroll integration.',
    categoryIcon: 'flaticon-security',
    shortDescription: 'High-security biometric authentication and electronic access control hardware engineered to eliminate proxy attendance, protect sensitive server rooms, and regulate commercial premises effortlessly.',
    authorizedBrands: ['Essl Security (eSSL)', 'Matrix COSEC', 'ZKTeco', 'Hikvision', 'Realtime'],
    offerings: [
      {
        title: 'Fingerprint Attendance Terminals',
        description: 'High-speed optical fingerprint scanners with anti-spoofing algorithms, 360° rotation matching, and large storage for up to 10,000 users.',
        icon: 'fa-hand-paper-o',
        features: ['Essl X990 & K90 Series', 'Under 0.5s Identification Speed', 'Battery Backup Built-In', 'TCP/IP & USB Data Export']
      },
      {
        title: '3D AI Facial Recognition Readers',
        description: 'Contactless AI face scanners with dual visible-light cameras and live body detection preventing photo/video spoofing even in total darkness.',
        icon: 'fa-user-circle',
        features: ['Dual-Camera Anti-Spoofing', '0.3m to 2m Recognition Range', 'Mask & Glasses Recognition', 'Touchless Hygienic Verification']
      },
      {
        title: 'Electromagnetic (EM) Door Locks',
        description: 'Heavy-duty 600 lbs / 1200 lbs magnetic door lock integration for glass, wooden, and fire-exit doors with exit buttons and emergency break-glass.',
        icon: 'fa-lock',
        features: ['600 lbs / 1200 lbs Holding Force', 'Fail-Safe (Unlocks on Fire/Power Cut)', 'U-Bracket for Frameless Glass', 'Push-to-Exit & Remote Keyfob']
      },
      {
        title: 'Payroll & Cloud Software Sync',
        description: 'Automatic push data sync to desktop attendance management software, automated shift rosters, leave calculations, and direct export to Tally / ERP.',
        icon: 'fa-laptop',
        features: ['Real-time Push Technology', 'Automated Overtime & Late Marks', 'Tally & Excel Payroll Export', 'Multi-location Cloud Centralization']
      }
    ],
    comparisonMatrix: {
      title: 'Biometric Decision Matrix: AI Face Recognition vs. Optical Fingerprint',
      subtitle: 'Choose the optimal biometric authentication technology for your workplace or residential club.',
      headers: ['Criteria / Feature', 'AI Face Recognition (Recommended)', 'Optical Fingerprint'],
      rows: [
        {
          feature: 'Hygiene & Contact',
          col1: '100% Touchless & Contactless',
          col2: 'Physical finger touch required',
          verdict: 'Face recognition eliminates germ transmission in high-traffic offices.'
        },
        {
          feature: 'Verification Speed',
          col1: 'Ultra-fast (< 0.2 seconds while walking past)',
          col2: 'Fast (~ 0.5 to 1.0 second per scan)',
          verdict: 'Face recognition prevents entry-door bottlenecks during shift start.'
        },
        {
          feature: 'Rough / Dusty Hand Handling',
          col1: '100% immune to wet, oily, or scarred hands',
          col2: 'Can struggle with worn prints (factory/labor)',
          verdict: 'Face recognition is superior for manufacturing, kitchens, and gyms.'
        },
        {
          feature: 'Spoof Resistance',
          col1: 'Dual IR camera checks 3D live depth (cannot fool with photo)',
          col2: 'High (optical sensor checks ridge depth)',
          verdict: 'Both offer enterprise security; face recognition prevents proxy punches.'
        },
        {
          feature: 'System Investment',
          col1: 'Moderate',
          col2: 'Economy to Budget-Friendly',
          verdict: 'Fingerprint offers low initial cost; Face offers superior long-term UX.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Biometric System AMC',
        badge: 'Enterprise Support',
        priceHint: 'Per Machine / Year',
        description: 'Comprehensive software and hardware maintenance for attendance readers, power supplies, and EM locks.',
        features: [
          'Quarterly sensor cleaning, lens calibration & firmware updates',
          'Free software database backup & shift schedule reconfiguration',
          'EM lock alignment and magnetic holding force inspection',
          'Power supply and battery backup health testing',
          'Unlimited remote desktop support for payroll sync issues',
          'Emergency on-site breakdown response within 24 hours'
        ],
        sla: '24-Hour Technician SLA'
      },
      {
        title: 'Multi-Door Access Control AMC',
        priceHint: 'Per Door Controller / Year',
        description: 'Tailored for corporate offices and data centers with multi-door access controllers, reader heads, and fire alarms.',
        features: [
          'Monthly physical inspection of all door locks and brackets',
          'Fire alarm integration trip testing (verifying auto-release)',
          'Access card re-issuance & user credential provisioning',
          'Standby power supply unit included',
          '4-hour business priority SLA for locked/stuck access doors'
        ],
        sla: '4-Hour Door Lock Priority SLA'
      }
    ],
    faqs: [
      {
        question: 'What happens to the biometric EM lock during a power cut or fire emergency?',
        answer: 'All electronic EM locks installed by Sunrise Communication are configured as "Fail-Safe" in compliance with Indian National Building Code (NBC) safety regulations. If main power fails or the fire alarm triggers, the magnetic circuit automatically de-energizes to unlock all doors instantly for safe evacuation. We also install backup battery power supplies for normal power disruptions.'
      },
      {
        question: 'Can the attendance system handle multiple shifts and night shifts?',
        answer: 'Yes! Our Attendance Management Software (AMS) supports flexible multi-shift configurations, automatic night-shift date rollover, rotational shifts, lunch breaks, and grace-period late mark policies with direct export to payroll software.'
      },
      {
        question: 'Can we link biometric attendance across multiple branches in Mumbai and Thane?',
        answer: 'Yes. We deploy Real-Time GPRS/Wi-Fi Push Data devices. Attendance punches from branch offices in Thane, Andheri, and Vashi instantly sync to a centralized head-office server or cloud dashboard in real time.'
      },
      {
        question: 'Can we install an EM lock on a frameless glass door?',
        answer: 'Yes! We use specialized architectural U-shaped and L-shaped anodized aluminum brackets designed specifically for 10mm-12mm frameless glass doors without requiring drilling or glass cutting.'
      }
    ],
    serviceAreasThane: ['Wagle Estate IT Parks', 'Charai', 'Naupada', 'Ghodbunder Road Tech Parks', 'Majiwada', 'Panchpakhadi', 'Kolshet', 'Vartak Nagar'],
    serviceAreasMumbai: ['BKC (Bandra Kurla Complex)', 'Andheri MIDC', 'Powai SEEPZ', 'Lower Parel', 'Goregaon East', 'Malad Mindspace', 'Kanjurmarg'],
    serviceAreasNaviMumbai: ['Mahape Millennium Business Park (MBP)', 'Airoli Mindspace', 'Vashi Infotech Park', 'TTC Industrial Area', 'Ghansoli', 'Turbhe'],
    seo: {
      title: 'Biometric Attendance & Access Control in Thane, Mumbai | Sunrise Communication',
      description: 'Authorized dealer & installer for Essl, Matrix, and Hikvision biometric attendance machines & EM door locks in Thane, Mumbai, and Navi Mumbai. Call +91-9987555399.',
      keywords: 'Biometric Attendance Thane, Access Control System Mumbai, Essl Dealer Thane, Face Recognition Attendance Mahape, EM Lock Installation BKC, Time Attendance AMC'
    }
  },

  'structured-networking-cabling': {
    slug: 'structured-networking-cabling',
    name: 'Structured Cabling & Networking',
    heroTitle: 'Structured Cat6 LAN Cabling & Server Rack Dressing in Thane & Mumbai',
    tagline: 'Gigabit Cat6/Cat6A Networking, Server Rack Dressing, Fiber Splicing & Fluke Certification.',
    directAnswerAeo: 'Sunrise Communication provides certified Cat6/Cat6A structured LAN cabling, server rack dressing, patch panel termination, and optical fiber fusion splicing for corporate offices, IT parks, and server rooms across Thane and Mumbai MMR.',
    categoryIcon: 'flaticon-technology',
    shortDescription: 'High-performance data cabling and server room infrastructure delivering gigabit throughput, organized rack dressing, and zero network packet loss for modern commercial operations.',
    authorizedBrands: ['D-Link', 'Schneider Electric', 'CommScope (AMP/Systimax)', 'Molex', 'Cisco'],
    offerings: [
      {
        title: 'Cat6 / Cat6A Gigabit LAN Cabling',
        description: 'Certified UTP/STP network cabling engineered for high-bandwidth data, VoIP telephony, and PoE CCTV transmission with organized cable conduits.',
        icon: 'fa-random',
        features: ['Gigabit & 10-Gigabit Certified', 'PVC Conduit / Cable Tray Routing', 'Keystone Jack I/O Box Punching', 'Structured Numbering & Tagging']
      },
      {
        title: 'Server Rack Dressing & Management',
        description: 'Professional transformation of messy server racks into clean, color-coded, labeled patch panel environments with vertical and horizontal wire managers.',
        icon: 'fa-server',
        features: ['4U to 42U Server & Network Racks', '24-Port / 48-Port Patch Panels', 'Horizontal & Vertical Cable Dressing', 'Power Distribution Units (PDU)']
      },
      {
        title: 'Optical Fiber Splicing & OTDR Testing',
        description: 'Single-Mode (OS2) and Multi-Mode (OM3/OM4) fiber optic cable laying, core fusion splicing, LIU termination, and OTDR signal loss certification.',
        icon: 'fa-bolt',
        features: ['Core Alignment Fusion Splicing', 'Rack-mount LIU Enclosures', 'Low dB Attenuation Splicing', 'Long-Distance Inter-Building Links']
      },
      {
        title: 'PoE Network Switch & Wi-Fi Setup',
        description: 'Installation and configuration of Managed/Unmanaged Gigabit PoE switches and enterprise ceiling-mount Wi-Fi Access Points for seamless roaming.',
        icon: 'fa-wifi',
        features: ['Gigabit PoE / PoE+ Switch Setup', 'VLAN Segregation (CCTV vs Office)', 'Ceiling Access Point Distribution', 'Seamless Mesh Wi-Fi Coverage']
      }
    ],
    comparisonMatrix: {
      title: 'Cabling Decision Matrix: Category 6 (Cat6) vs. Category 6A (Cat6A)',
      subtitle: 'Select the optimal copper cabling standard based on bandwidth demand, distance, and future scalability.',
      headers: ['Cabling Parameter', 'Category 6 (Cat6) UTP', 'Category 6A (Cat6A) STP/UTP'],
      rows: [
        {
          feature: 'Bandwidth Frequency',
          col1: '250 MHz',
          col2: '500 MHz (2x Higher)',
          verdict: 'Cat6A delivers double the frequency bandwidth for demanding workloads.'
        },
        {
          feature: '10-Gigabit Data Support',
          col1: 'Up to 37–55 meters max',
          col2: 'Full 100 meters (Standard)',
          verdict: 'Cat6A guarantees true 10Gbps across the entire 100-meter channel.'
        },
        {
          feature: 'Noise & Alien Crosstalk',
          col1: 'Standard protection',
          col2: 'Superior internal spline & shielding',
          verdict: 'Cat6A is recommended alongside high-voltage electrical raceways.'
        },
        {
          feature: 'Cost-Effectiveness',
          col1: 'High (Most popular enterprise standard)',
          col2: 'Moderate (Premium investment)',
          verdict: 'Cat6 is ideal for 90% of office LANs; Cat6A is recommended for Data Centers.'
        }
      ]
    },
    amcPlans: [
      {
        title: 'Corporate Network Infrastructure AMC',
        badge: 'IT Maintenance',
        priceHint: 'Per Node / Month or Year',
        description: 'Ongoing support for enterprise network patch panels, switches, rack dressing, and I/O port health.',
        features: [
          'Quarterly patch panel port diagnostics & testing',
          'Server rack airflow and cable tie tension verification',
          'Free relocation / patching of workstation I/O ports',
          'PoE switch port load and voltage monitoring',
          'Emergency continuity fault repair within 4 business hours'
        ],
        sla: '4-Hour Emergency Response'
      },
      {
        title: 'Optical Fiber Backbone AMC',
        priceHint: 'Per Fiber Core / Year',
        description: 'Dedicated support for inter-building fiber links, LIU terminations, and media converters.',
        features: [
          'Scheduled bi-annual OTDR fiber attenuation testing',
          'Emergency fiber cut re-splicing with on-site fusion splicer',
          'LIU connector cleaning & patch cord replacement',
          'Standby media converter availability'
        ],
        sla: '6-Hour On-Site Fiber Restoration'
      }
    ],
    faqs: [
      {
        question: 'Why is professional server rack dressing important for our business?',
        answer: 'Unorganized, tangled network cables ("spaghetti racks") restrict cooling airflow, causing PoE switches and servers to overheat and fail prematurely. Professional rack dressing with color-coded patch cords, horizontal wire managers, and port labeling reduces troubleshooting time from hours to minutes and eliminates accidental cable unplugging.'
      },
      {
        question: 'What is the maximum allowed distance for a Cat6 network cable run?',
        answer: 'Under TIA/EIA-568 standards, the maximum certified distance for a horizontal Cat6 copper run is 100 meters (90 meters solid core permanent link + 10 meters patch cords). For distances exceeding 100 meters, Sunrise Communication deploys optical fiber links with Media Converters or SFP modules.'
      },
      {
        question: 'Do you test and certify every LAN point after installation?',
        answer: 'Yes. Our engineers test every terminated I/O port, patch panel keystone, and Cat6 link using digital cable continuity and wire-map testers to verify zero wire reversal, shorts, or split pairs before handover.'
      },
      {
        question: 'Can you separate our office computer network from CCTV camera traffic?',
        answer: 'Yes! We configure VLAN (Virtual Local Area Network) segregation on managed switches. This ensures high-bandwidth CCTV video streams do not slow down your daily office computers, accounting software, or internet browsing.'
      }
    ],
    serviceAreasThane: ['Wagle Industrial Estate', 'Ghodbunder Road IT Corridors', 'Charai', 'Naupada', 'Panchpakhadi', 'Majiwada', 'Kolshet Tech Zone', 'Bhiwandi Warehousing Corridor'],
    serviceAreasMumbai: ['BKC (Bandra Kurla Complex)', 'Andheri East SEEPZ', 'Powai Hiranandani Tech Park', 'Lower Parel Commercial Towers', 'Goregaon Nesco', 'Malad Infinity', 'Vikhroli West'],
    serviceAreasNaviMumbai: ['Mahape (Millennium Business Park & TTC)', 'Airoli Mindspace', 'Vashi Commercial Sectors', 'Ghansoli Reliance Corporate Park area', 'Turbhe MIDC', 'Dombivli MIDC'],
    seo: {
      title: 'Structured Cat6 Cabling & Server Rack Dressing in Thane, Mumbai | Sunrise Communication',
      description: 'Certified Cat6 LAN cabling, server rack dressing, patch panel termination, and fiber splicing across Thane, Mumbai, and Navi Mumbai. Call +91-9987555399.',
      keywords: 'Structured Cabling Thane, Cat6 LAN Cabling Mumbai, Server Rack Dressing Mahape, Fiber Optic Splicing BKC, Network Cabling Wagle Estate, D-Link Network Dealer'
    }
  }
};
