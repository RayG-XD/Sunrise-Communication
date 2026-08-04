import { SITE_DATA } from './site-data';

export interface SeoMetaData {
  title: string;
  description: string;
  keywords: string;
  route: string;
}

export const DEFAULT_SEO_DATA: SeoMetaData = {
  title: 'Sunrise Communication | CCTV, EPABX, Intercom, Access Control in Mumbai, Thane, Navi Mumbai',
  description: 'Sunrise Communication offers comprehensive CCTV, EPABX, Intercom, and Access Control solutions serving businesses and homes across Mumbai, Thane, and Navi Mumbai. Ensure your premises remain secure 24/7 with our expert sales and services.',
  keywords: 'CCTV Mumbai, EPABX Thane, Access Control Navi Mumbai, Security Systems, Intercom Solutions, Biometrics, Telecommunication Services, Sunrise Communication Thane',
  route: ''
};

export const PAGE_SEO_DATA: Record<string, Partial<SeoMetaData>> = {
  '/': {
    title: 'Sunrise Communication | CCTV, EPABX, Intercom, Access Control in Mumbai, Thane, Navi Mumbai',
  },
  '/about': {
    title: 'About Us | Sunrise Communication - Security & Telecom Experts',
    description: 'Learn about Sunrise Communication, your trusted partner for CCTV surveillance, EPABX systems, and advanced security solutions in Thane and Mumbai since our inception.',
  },
  '/services': {
    title: 'Our Services | CCTV, EPABX, Networking - Sunrise Communication',
    description: 'Explore our wide range of services including CCTV Camera Systems, EPABX, Intercom, Biometric Access Control, and Network Wiring across Mumbai and Thane.',
  },
  '/services-detail': {
    title: 'Service Details | Sunrise Communication',
    description: 'Detailed insights into our security and telecommunication services, tailored for residential and commercial establishments.',
  },
  '/products': {
    title: 'Products & Solutions Catalog | CCTV, EPABX, Biometrics - Sunrise Communication',
    description: 'Browse our complete catalog of CCTV cameras, EPABX systems, biometric devices, and more. Sales, installation, and AMC services available across Mumbai, Thane, and Navi Mumbai.',
    keywords: 'CCTV products, EPABX systems, Biometric devices, CP Plus, Hikvision, Matrix, Essl, security products Thane'
  },
  '/contact': {
    title: 'Contact Us | Sunrise Communication',
    description: 'Get in touch with Sunrise Communication in Thane for all your security camera, access control, and telecom wiring needs. Call us at +91-9987555399.',
  }
};

export const STRUCTURED_DATA_BASE = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_DATA.companyName,
  image: `${SITE_DATA.contact.website}/assets/images/logo.png`,
  telephone: SITE_DATA.contact.primaryPhone,
  email: SITE_DATA.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Amar Building, Near Jyoti Book Centre, Charai',
    addressLocality: 'Thane (W)',
    addressRegion: 'Maharashtra',
    postalCode: '400601',
    addressCountry: 'IN'
  },
  url: SITE_DATA.contact.website,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_DATA.contact.primaryPhone,
    contactType: 'Customer Service',
    areaServed: [
      'Mumbai', 'Thane', 'Navi Mumbai', 'Andheri', 'Bandra', 'Bandra Kurla Complex (BKC)',
      'Bhandup', 'Borivali', 'Byculla', 'Charkop', 'Charni Road', 'Chembur', 'Chunabhatti',
      'Churchgate', 'Colaba', 'Cuffe Parade', 'Cumballa Hill', 'Dadar', 'Dahisar', 'Deonar',
      'Dharavi', 'Fort', 'Ghatkopar', 'Girgaon', 'Gorai', 'Goregaon', 'Govandi', 'Grant Road',
      'Jogeshwari', 'Juhu', 'Kandivali', 'Kanjurmarg', 'Khar', 'Kurla', 'Lokhandwala',
      'Lower Parel', 'Mahalaxmi', 'Mahim', 'Malabar Hill', 'Malad', 'Mankhurd', 'Marine Drive',
      'Marol', 'Matunga', 'Mulund', 'Nariman Point', 'Oshiwara', 'Powai', 'Prabhadevi',
      'Saki Naka', 'Santacruz', 'Sion', 'Tardeo', 'Tilak Nagar', 'Trombay', 'Versova',
      'Vidyavihar', 'Vikhroli', 'Vile Parle', 'Wadala', 'Worli', 'Ambernath', 'Anand Nagar',
      'Badlapur', 'Bhayandar', 'Bhiwandi', 'Diva', 'Dombivli', 'Ghodbunder Road', 'Hiranandani Estate',
      'Kalwa', 'Kalyan', 'Kasarvadavali', 'Kolshet', 'Kopri', 'Majiwada', 'Manpada', 'Mira Road',
      'Mira-Bhayandar', 'Mumbra', 'Murbad', 'Naupada', 'Panchpakhadi', 'Pokhran Road', 'Shahapur',
      'Shilphata', 'Thane', 'Titwala', 'Ulhasnagar', 'Vartak Nagar', 'Vasant Vihar', 'Waghbil',
      'Wagle Estate', 'Airoli', 'CBD Belapur', 'Dronagiri', 'Ghansoli', 'Juinagar', 'Kalamboli',
      'Kamothe', 'Karanjade', 'Khanda Colony', 'Khandeshwar', 'Kharghar', 'Kopar Khairane',
      'Mahape', 'Mansarovar', 'Nerul', 'Nhava Sheva', 'Panvel', 'Pushpak Nagar', 'Rabale',
      'Sanpada', 'Seawoods', 'Shiravane', 'Taloja', 'Turbhe', 'Ulwe', 'Vashi'
    ],
    availableLanguage: ['English', 'Hindi', 'Marathi']
  },
  sameAs: [
    SITE_DATA.social.facebook,
    SITE_DATA.social.linkedin,
    SITE_DATA.social.instagram,
    SITE_DATA.social.twitter
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Security and Telecommunication Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'CCTV Camera Systems Installation & Maintenance' }
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'EPABX & Intercom Systems' }
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Biometric & Access Control Systems' }
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Network & Telecom Wiring' }
      }
    ]
  }
};
