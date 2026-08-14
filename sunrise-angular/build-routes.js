const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, 'dist', 'sunrise-angular', 'browser');
const srcHtml = fs.existsSync(path.join(browserDir, 'index.csr.html'))
  ? path.join(browserDir, 'index.csr.html')
  : path.join(browserDir, 'index.html');

if (!fs.existsSync(srcHtml)) {
  console.error('Source HTML not found in', browserDir);
  process.exit(0);
}

const htmlContent = fs.readFileSync(srcHtml, 'utf8');

// Ensure root index.html exists
fs.writeFileSync(path.join(browserDir, 'index.html'), htmlContent);

// List of all static routes in the application
const routes = [
  'about',
  'products',
  'services',
  'services/cctv-surveillance-systems',
  'services/epabx-intercom-solutions',
  'services/biometric-access-control',
  'services/structured-networking-cabling',
  'services/detail',
  'contact',
  '404'
];

routes.forEach(route => {
  const routeDir = path.join(browserDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), htmlContent);
  // Also create .html file directly for cleanUrls support
  fs.writeFileSync(path.join(browserDir, route + '.html'), htmlContent);
  console.log(`Generated route static page: /${route}`);
});

console.log('Successfully generated all static route pages for Vercel CDN deployment!');
