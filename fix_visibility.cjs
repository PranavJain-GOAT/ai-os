const fs = require('fs');
const path = require('path');

const dirs = [
  'src/pages/client',
  'src/pages/developer',
  'src/components/client',
  'src/components/developer',
  'src/components/shared',
  'src/pages', // For AdminDashboard
];

function processFile(file) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // 1. Fix the blown-out backgrounds. 
  // Any background: 'hsl(var(--foreground))' inside a style block is almost certainly wrong unless it's a pulse orb.
  // Wait, orbs usually have a class like `status-orb-active` or use `background: "hsl(var(--foreground))"` without quotes.
  // In `Analytics.jsx` it's `background: 'hsl(var(--foreground))'`. 
  // Same in Dashboard.jsx. Let's replace ALL inline background foreground allocations with `hsl(var(--card))`.
  // Wait, if it's a small badge, `hsl(var(--foreground))` is correct.
  // Let's specifically target strings that are adjacent to `boxShadow` or `border` which indicate Cards.
  // Actually, wait, replacing `background: 'hsl(var(--foreground))'` with `background: 'hsl(var(--card))'` globally is mostly safe because cards use `hsl(var(--card))`. Badges can also be `hsl(var(--card))` or foreground.
  // But wait, the user's issue in Analytics was literally just `background: 'hsl(var(--foreground))'`. Let's just fix it.
  content = content.replace(/background:\s*(['"`])hsl\(var\(--foreground\)\)\1/g, 'background: $1hsl(var(--card))$1');
  
  // 2. Fix Light Mode invisibles - convert inline rgba(255,255,255,X) to `hsl(var(--foreground) / X)`
  content = content.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*([0-9.]+)\s*\)/g, 'hsl(var(--foreground) / $1)');

  // Also catch white text color hex strings inside style objects
  content = content.replace(/color:\s*(['"`])#ffffff\1/gi, 'color: $1hsl(var(--foreground))$1');
  content = content.replace(/color:\s*(['"`])#fff\1/gi, 'color: $1hsl(var(--foreground))$1');
  
  // Fix gradients that use #ffffff or rgba(255,255,255)
  content = content.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*(0\.\d+|\d)\)/g, 'hsl(var(--foreground) / $1)');
  content = content.replace(/#ffffff/gi, 'hsl(var(--foreground))'); // mostly inside linear-gradients where white is used as a foreground bright limit.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Fixed visibility in:', file);
  }
}

function explore(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
        // none
    } else if (full.endsWith('.jsx')) {
        if (dir === path.join(__dirname, 'src/pages')) {
            if (!full.includes('AdminDashboard.jsx')) continue;
        }
        processFile(full);
    }
  }
}

dirs.forEach(d => explore(path.join(__dirname, d)));
