const fs = require('fs');
const path = require('path');

const dirs = [
  'src/pages/client',
  'src/pages/developer',
  'src/components/client',
  'src/components/developer',
  'src/components/shared',
  'src/pages' // root for AdminDashboard.jsx
];

function processFile(file) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // 1. Nuke Hex Colors
  // We want to replace hex colors (like #6ee7b7, #06b6d4, #25D366, #95BF47, #E01E5A, #635BFF, #34A853)
  // But NOT #000, #fff, #ffffff, #000000, #080d0a, #060a08, etc. (dark background colors).
  const safeHex = ['#000', '#fff', '#ffffff', '#000000', '#0a0a0a', '#111', '#222', '#333'];
  
  content = content.replace(/#[0-9A-Fa-f]{3,6}\b/g, (match) => {
    if (safeHex.includes(match.toLowerCase())) return match;
    // For very dark backgrounds like #080d0a or #060a08, turn them into purely #000000
    if (['#080d0a', '#060a08', '#00ff41'].includes(match.toLowerCase())) {
         if (match.toLowerCase() === '#00ff41') return 'hsl(var(--foreground))';
         return 'transparent'; // usually background colors, better make them transparent so global bg applies
    }
    return 'hsl(var(--foreground))';
  });

  // 2. Nuke RGBA Colors
  // rgba(R, G, B, A) -> rgba(150, 150, 150, A)
  // We should preserve 0,0,0 and 255,255,255.
  content = content.replace(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,/g, (match, r, g, b) => {
    // Check if it's very dark (background)
    if (r < 20 && g < 20 && b < 20) {
      return `rgba(0,0,0,`;
    }
    // Check if it's pure white or gray
    if (r === g && g === b) {
      return match;
    }
    // It's a color! Turn it grayscale for backgrounds/borders
    return `rgba(150,150,150,`;
  });

  // 3. Nuke specific Tailwind color classes
  // e.g., text-emerald-500, bg-cyan-400/10, border-amber-300
  content = content.replace(/\b(text|bg|border|ring|shadow|from|to|via)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}(\/\d+)?\b/gi, (match, type) => {
      // Return a grayscale equivalent
      if (type === 'text') return 'text-foreground';
      if (type === 'bg') return 'bg-foreground/5';
      if (type === 'border') return 'border-foreground/10';
      return '';
  });

  // Also catch 'premium-badge-green', 'premium-badge-amber'
  content = content.replace(/premium-badge-green/g, 'premium-badge-monochrome');
  content = content.replace(/premium-badge-amber/g, 'premium-badge-monochrome');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Nuked colors in:', file);
  }
}

function explore(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
        // no recursive unless needed
    } else if (full.endsWith('.jsx')) {
        // filter out the root pages EXCEPT AdminDashboard
        if (dir === path.join(__dirname, 'src/pages')) {
            if (!full.includes('AdminDashboard.jsx')) continue;
        }
        processFile(full);
    }
  }
}

dirs.forEach(d => explore(path.join(__dirname, d)));
