const fs = require('fs');
const path = require('path');

// 1. Remove Webhook/Stripe files
const filesToDelete = [
  'src/services/stripe.service.js',
  'src/controllers/webhook.controller.js',
  'src/routes/webhook.routes.js'
];

filesToDelete.forEach(file => {
  const fullPath = path.join(__dirname, 'backend', file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
});

// 2. Remove webhook routes from app.js
let appJsPath = path.join(__dirname, 'backend', 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');
appJs = appJs.replace(/const webhookRoutes = require\('\.\/routes\/webhook\.routes'\);/g, '');
appJs = appJs.replace(/app\.use\('\/api\/v1\/webhooks', express\.raw\(\{ type: 'application\/json' \}\), webhookRoutes\);/g, '');
fs.writeFileSync(appJsPath, appJs);

// 3. Clean up server.js to not crash from DB/Redis
let serverJsPath = path.join(__dirname, 'backend', 'src', 'server.js');
let serverJs = fs.readFileSync(serverJsPath, 'utf8');
serverJs = serverJs.replace(/await connectDB\(\);/g, '// await connectDB();');
serverJs = serverJs.replace(/await connectRedis\(\);/g, '// await connectRedis();');
fs.writeFileSync(serverJsPath, serverJs);

console.log('Cleanup complete');
