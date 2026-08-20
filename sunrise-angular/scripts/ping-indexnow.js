/**
 * Sunrise Communication - IndexNow Instant Indexing Ping Script
 * Notifies Bing, Yandex, DuckDuckGo, Seznam, and partner engines instantly.
 */

const https = require('https');

const HOST = 'sunrisecommunication.in';
const KEY = 'd7a489fc93b6480c85e263ab21e3f890';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/products`,
  `https://${HOST}/services`,
  `https://${HOST}/services/cctv-surveillance-systems`,
  `https://${HOST}/services/epabx-intercom-solutions`,
  `https://${HOST}/services/biometric-access-control`,
  `https://${HOST}/services/structured-networking-cabling`,
  `https://${HOST}/contact`
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URL_LIST
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log('📡 Sending IndexNow notification to Bing & partner search engines...');
console.log(`🔗 URLs (${URL_LIST.length}):\n  - ${URL_LIST.join('\n  - ')}`);

const req = https.request(options, (res) => {
  console.log(`\n📥 Response Status: ${res.statusCode} ${res.statusMessage}`);
  let responseData = '';
  res.on('data', (chunk) => { responseData += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ IndexNow notification submitted successfully!');
      console.log('⚡ Search engines (Bing, DuckDuckGo, Yandex) have queued these URLs for immediate crawling.');
    } else {
      console.log('⚠️ IndexNow response:', responseData || '(No body)');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error sending IndexNow request:', error.message);
});

req.write(payload);
req.end();
