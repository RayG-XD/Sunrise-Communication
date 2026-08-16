const fs = require('fs');
const path = require('path');

const rootGbpPath = path.join(__dirname, '..', '..', 'gbp-context.json');
if (!fs.existsSync(rootGbpPath)) {
  console.error('Error: gbp-context.json not found at repository root:', rootGbpPath);
  process.exit(1);
}

const gbp = JSON.parse(fs.readFileSync(rootGbpPath, 'utf8'));
console.log('🔄 Syncing Google Business Profile data from gbp-context.json...');
console.log(`⭐ Rating: ${gbp.reputation.ratingValue} Stars (${gbp.reputation.reviewCount} Reviews)`);

// 1. Update site-data.ts
const siteDataPath = path.join(__dirname, '..', 'src', 'app', 'core', 'constants', 'site-data.ts');
const siteDataContent = `export const SITE_DATA = {
  companyName: '${gbp.shortName}',
  legalName: '${gbp.businessName.replace(/'/g, "\\'")}',
  tagline: 'Telecommunication Sales and Services',
  establishedYear: ${gbp.establishedYear},
  gbp: {
    placeId: '${gbp.placeId}',
    cid: '${gbp.cid}',
    mapsUrl: '${gbp.mapsUrl}',
    reviewUrl: '${gbp.reviewUrl}',
    rating: ${gbp.reputation.ratingValue},
    reviewCount: ${gbp.reputation.reviewCount}
  },
  contact: {
    address: '${gbp.address.street}, ${gbp.address.city} ${gbp.address.postalCode}',
    addressUrl: '${gbp.mapsUrl}',
    primaryPhone: '${gbp.phone.primary}',
    secondaryPhone: '${gbp.phone.secondary}',
    email: 'sunrisecommunication1555@gmail.com',
    secondaryEmail: 'info@sunrisecommunication.in',
    website: '${gbp.website.replace(/\/$/, '')}',
    workingHours: '${gbp.operatingHours}'
  },
  social: {
    facebook: 'https://www.facebook.com/sunrisecommunication1555/',
    twitter: 'https://x.com/Sunrise_Comms',
    linkedin: 'https://www.linkedin.com/in/sunrise-communication/',
    instagram: 'https://www.instagram.com/sunrisecommunication.co/',
    whatsapp: 'https://wa.me/${gbp.phone.primary.replace(/[^0-9]/g, '')}'
  }
};
`;

fs.writeFileSync(siteDataPath, siteDataContent, 'utf8');
console.log('✅ Updated src/app/core/constants/site-data.ts');

console.log('🎉 GBP Context Synchronization Complete!');
