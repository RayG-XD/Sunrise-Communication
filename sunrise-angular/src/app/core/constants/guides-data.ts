export interface TechnicalGuideItem {
  slug: string;
  title: string;
  heroSubtitle: string;
  readTime: string;
  publishedDate: string;
  category: 'CCTV Surveillance' | 'Society Intercom' | 'Access Control' | 'Maintenance & AMC';
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    checklist?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const TECHNICAL_GUIDES_DATA: Record<string, TechnicalGuideItem> = {
  'housing-society-cctv-installation-guide': {
    slug: 'housing-society-cctv-installation-guide',
    title: 'Complete Housing Society CCTV Surveillance Guide: Camera Positioning, Night Vision & 30-Day Storage in Maharashtra',
    heroSubtitle: 'A comprehensive technical blueprint for Housing Society Managing Committees, Chairmen & Secretaries in Thane & Mumbai planning a new CCTV network or upgrading legacy cameras.',
    readTime: '7 min read',
    publishedDate: '2026-08-20',
    category: 'CCTV Surveillance',
    metaTitle: 'Housing Society CCTV Installation Guide (Thane & Mumbai) | Sunrise Communication',
    metaDescription: 'Authoritative guide for housing societies on CCTV camera placement, lift cabling, ColorVu night vision, 30-day HDD storage, and police guidelines in Maharashtra.',
    metaKeywords: 'Housing Society CCTV Guide, CHS CCTV Camera Placement, Lift CCTV Wiring, 30 Day CCTV Storage Thane, Society Security Maharashtra, CCTV Guidelines Mumbai Police',
    summary: 'Installing a CCTV system in a Cooperative Housing Society requires balancing high-security coverage, resident privacy, weather-proof durability, and local police statutory storage guidelines.',
    keyTakeaways: [
      'Position wide-angle 2.8mm dome cameras in lift lobbies and 4mm/6mm bullet cameras at vehicular entry gates for number plate capture.',
      'Maharashtra Police advisory recommends keeping a minimum 15 to 30 days of continuous recording backup.',
      'Use certified copper Cat6 PoE cabling inside PVC conduits to avoid weathering and rodent cuts.',
      'Employ Western Digital Purple or Seagate SkyHawk surveillance HDDs instead of desktop PC hard drives.'
    ],
    sections: [
      {
        heading: '1. Strategic Camera Positioning Across Society Zones',
        paragraphs: [
          'A reliable society surveillance network covers five critical zones: (1) Main Entrance & Exit Gates, (2) Lift Cabins & Ground Lobbies, (3) Parking Basements & Meter Rooms, (4) Boundary Perimeter Walls, and (5) Terrace & Fire Escape Exits.',
          'Entry gates require bullet cameras with smart WDR (Wide Dynamic Range) and lens sizing adjusted to capture vehicle license plates and visitor faces without headlight glare.'
        ],
        checklist: [
          'Main Gate: 4MP Bullet Camera with Smart Warm-Light / ColorVu',
          'Lift Cabins: 2.8mm Wide-Angle Low-Profile Dome Camera with Flexible Travelling Cable',
          'Basement Parking: IP67 Weatherproof Bullet with 30m IR Night Vision',
          'Society Office / Meter Room: Audio-Enabled Dome Camera'
        ]
      },
      {
        heading: '2. Lift CCTV Wiring: Standard vs Elevator Travelling Cable',
        paragraphs: [
          'Ordinary Cat6 network cables snap within months when hung inside lift shafts due to constant elevator motion and tension fatigue. Societies must insist on certified flexible elevator travelling cables with steel core support or wireless elevator bridge transmitters to guarantee zero signal dropouts.'
        ]
      },
      {
        heading: '3. Hard Drive Sizing: Calculating 30-Day Retention',
        paragraphs: [
          'Under modern H.265+ smart video compression, a 16-camera 4MP system recording 24/7 requires approximately 6 TB to 8 TB of surveillance hard disk storage to achieve 30 days of continuous retention.',
          'Always specify dedicated surveillance-grade drives (WD Purple or Seagate SkyHawk) designed for 24/7 continuous write cycles.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are CCTV cameras legally allowed inside society lift cabins in Maharashtra?',
        answer: 'Yes. CCTV in common lift cabins is fully legal and strongly encouraged for safety and deterrence, provided notice boards stating "Premises Under CCTV Surveillance" are prominently displayed.'
      },
      {
        question: 'Who should have access to society CCTV recordings?',
        answer: 'Access should be restricted to the Society Secretary, Chairman, and authorized security supervisors with password protection and audit logging enabled on the NVR.'
      }
    ]
  },

  'society-intercom-copper-vs-ip-pbx-guide': {
    slug: 'society-intercom-copper-vs-ip-pbx-guide',
    title: 'Multi-Pair Copper Cabling vs IP-PBX Society Intercom: Technical Comparison & Sizing Guide',
    heroSubtitle: 'Evaluating traditional analog multi-pair copper telephone intercoms versus modern IP-PBX & SIP systems for residential buildings in Mumbai MMR.',
    readTime: '6 min read',
    publishedDate: '2026-08-22',
    category: 'Society Intercom',
    metaTitle: 'Multi-Pair Copper vs IP-PBX Society Intercom Guide | Sunrise Communication',
    metaDescription: 'Compare copper multi-pair telephone wiring vs IP-PBX intercoms for housing societies. Sizing, Krone distribution boxes, line fault troubleshooting, and AMC cost comparison.',
    metaKeywords: 'Society Intercom Guide, Multi-Pair Copper Cabling, Matrix IP-PBX Intercom, CHS Telephone Wiring Thane, Krone DP Box Repair, Intercom AMC Mumbai',
    summary: 'A detailed engineering comparison between traditional multi-pair copper telephone intercom architectures and next-generation IP-PBX / SIP intercom networks.',
    keyTakeaways: [
      'Multi-pair copper (0.5mm armoured) remains the most cost-effective and lightning-resilient intercom medium for societies up to 200 flats.',
      'IP-PBX intercom networks excel in multi-tower mega complexes with optical fiber backbones and mobile app calling capabilities.',
      'Proper floor-by-floor Krone DP (Distribution Point) tagging prevents cross-talk and reduces maintenance turnaround time by 80%.'
    ],
    sections: [
      {
        heading: '1. Traditional Multi-Pair Copper Architecture',
        paragraphs: [
          'In a standard multi-pair copper setup, a centralized EPABX exchange (such as Matrix or Coral) connects to vertical riser cables (10-pair, 20-pair, 50-pair armoured cables) running through building utility shafts. On each floor, a Krone DP box splits connections into 2-core flat cables.',
          'Advantages include zero internet dependency, high lightning resistance, and low initial hardware costs.'
        ]
      },
      {
        heading: '2. IP-PBX & SIP Intercom Architecture',
        paragraphs: [
          'Modern IP-PBX systems use structured Cat6 cables and Ethernet switches. Security guards and flats communicate over standard VoIP data packets. While slightly higher in initial cost, IP systems allow gatekeepers to ring resident mobile phones directly if the flat intercom goes unanswered.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the lifespan of society intercom copper cabling?',
        answer: 'High-quality annealed copper cabling inside heavy PVC conduit has an operational lifespan of 12 to 15 years before natural oxidation degrades voice quality.'
      },
      {
        question: 'Can we replace broken intercom phones without replacing the central EPABX?',
        answer: 'Yes! Standard analog CLI telephone instruments are compatible with nearly all EPABX brands including Matrix, Accord, Syntel, and Panasonic.'
      }
    ]
  },

  'cctv-amc-checklist-for-societies': {
    slug: 'cctv-amc-checklist-for-societies',
    title: 'Housing Society CCTV & EPABX AMC Checklist: Inclusions, Quarterly Preventive Visits & SLAs',
    heroSubtitle: 'What Managing Committees must verify before signing an Annual Maintenance Contract for CCTV, Intercom, and Biometrics in Thane & Mumbai.',
    readTime: '5 min read',
    publishedDate: '2026-08-24',
    category: 'Maintenance & AMC',
    metaTitle: 'Housing Society CCTV & Intercom AMC Checklist | Sunrise Communication',
    metaDescription: 'Essential AMC checklist for housing society committees: Comprehensive vs Non-Comprehensive scope, quarterly preventive visits, connector cleaning, and 24h breakdown SLA.',
    metaKeywords: 'CCTV AMC Checklist, Society Intercom AMC Terms, Comprehensive AMC Thane, Security Camera Maintenance Mumbai, CCTV Service SLA Charai',
    summary: 'A complete practical guide and checklist for Managing Committees to ensure their CCTV and Intercom investments remain fully operational with zero downtime.',
    keyTakeaways: [
      'Ensure the AMC contract specifies guaranteed response times (e.g., 24-hour turnaround for breakdown calls).',
      'Preventive maintenance must include camera lens cleaning, focus adjustment, BNC/RJ45 crimping checks, and HDD health audits.',
      'Verify whether standby replacement hardware is provided while faulty units are sent for OEM warranty repairs.'
    ],
    sections: [
      {
        heading: '1. Comprehensive vs Non-Comprehensive AMC',
        paragraphs: [
          'Non-Comprehensive AMC covers all technician service visits, routine cable health checks, connector re-crimping, camera cleaning, and NVR software updates. Hardware replacements (burned power supplies, damaged camera sensors) are billed at subsidized trade rates.',
          'Comprehensive AMC includes full replacement of wear-and-tear components and power supply units with zero incremental charges.'
        ]
      },
      {
        heading: '2. Essential Quarterly Preventive Maintenance Tasks',
        paragraphs: [
          'A genuine security AMC partner conducts scheduled quarterly inspections covering: (1) Optical lens cleaning to remove spiderwebs and dust, (2) Power supply voltage testing, (3) NVR hard drive S.M.A.R.T. health checks to catch failing sectors before data loss, and (4) Tightening junction box waterproof seals.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Why do CCTV hard drives fail during monsoon or power fluctuations?',
        answer: 'Voltage spikes and humidity cause power supply fluctuations that abruptly shut down HDDs. A proper AMC ensures voltage stabilizers and offline UPS systems are tested regularly.'
      },
      {
        question: 'How many preventive visits are included in Sunrise Communication AMC?',
        answer: 'Sunrise Communication AMC includes 4 mandatory quarterly preventive maintenance visits per year plus unlimited breakdown call-outs.'
      }
    ]
  }
};
