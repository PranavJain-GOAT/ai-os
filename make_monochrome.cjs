const fs = require('fs');
const path = require('path');

const directoriesToScan = [
  'src/pages/developer',
  'src/pages/client',
  'src/pages', // For AdminDashboard.jsx
  'src/components/developer',
  'src/components/client',
  'src/components/shared',
];

// We want to transform the colors to monochrome. 
// For hex colors (e.g. #10b981, #1D9E75, #00FF41, #4D9FFF, #f59e0b, #EF4444, #a78bfa), we replace them with `hsl(var(--foreground))` or just `currentColor` where possible. But inside inline styles using template literals like \`${kpi.color}30\`, we need to be careful.
// Let's replace the Hex variables with foreground/background equivalents.
// For `rgba(x,y,z,a)`, replace the `x,y,z` with `150,150,150` for neutral grays, or 255,255,255.

const colorMap = [
  // Hex Colors
  { regex: /#(10b981|059669|34d399|1D9E75|0f7a5a|00FF41|4D9FFF|f59e0b|EF4444|a78bfa)/gi, replace: 'hsl(var(--foreground))' },
  // RGB / RGBA
  { regex: /rgba\(\s*16\s*,\s*185\s*,\s*129\s*,/g, replace: 'rgba(150,150,150,' },
  { regex: /rgba\(\s*29\s*,\s*158\s*,\s*117\s*,/g, replace: 'rgba(150,150,150,' },
  { regex: /rgba\(\s*0\s*,\s*255\s*,\s*65\s*,/g, replace: 'rgba(150,150,150,' },
  { regex: /rgba\(\s*77\s*,\s*159\s*,\s*255\s*,/g, replace: 'rgba(150,150,150,' },
  { regex: /rgba\(\s*245\s*,\s*158\s*,\s*11\s*,/g, replace: 'rgba(150,150,150,' },
  { regex: /rgba\(\s*239\s*,\s*68\s*,\s*68\s*,/g, replace: 'rgba(150,150,150,' },
  // Gradient specifically for green/neon
  { regex: /linear-gradient\([^)]*(10b981|1D9E75|00FF41|4D9FFF|f59e0b|a78bfa|EF4444)[^)]*\)/gi, replace: 'linear-gradient(135deg, hsl(var(--foreground) / 0.1), transparent)' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Manual fast replacements
  colorMap.forEach(cm => {
    content = content.replace(cm.regex, cm.replace);
  });

  // Fix up specific issues like `${kpi.color}12` if `kpi.color` is now `hsl(var(--foreground))`
  // A string like \`\${kpi.color}20\` where we used to append alpha channel.
  // We can just rely on the script and then manually fix any breaking changes.

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Modified:', filePath);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!directoriesToScan.includes(fullPath.replace(/\\/g, '/'))) continue; // skip subdirs unless matched... wait, actually we want to process everything INSIDE the directoriesToScan
    } else {
      if (file.endsWith('.jsx')) {
        processFile(fullPath);
      }
    }
  }
}

directoriesToScan.forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (fs.existsSync(fullDir)) {
    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      if (file.endsWith('.jsx')) {
        processFile(path.join(fullDir, file));
      }
    }
  }
});
