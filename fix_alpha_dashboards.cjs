const fs = require('fs');
const path = require('path');

const dirs = [
  'src/pages/client',
  'src/pages/developer',
];

function fixAlpha(file) {
  let content = fs.readFileSync(file, 'utf-8');
  const og = content;
  content = content.replace(/\$\{kpi\.color\}20/g, 'hsl(var(--foreground) / 0.2)');
  content = content.replace(/\$\{kpi\.color\}08/g, 'hsl(var(--foreground) / 0.08)');
  content = content.replace(/\$\{kpi\.color\}30/g, 'hsl(var(--foreground) / 0.3)');
  content = content.replace(/\$\{kpi\.color\}12/g, 'hsl(var(--foreground) / 0.12)');
  content = content.replace(/\$\{kpi\.color\}25/g, 'hsl(var(--foreground) / 0.25)');
  content = content.replace(/\$\{kpi\.color\}cc/g, 'hsl(var(--foreground) / 0.8)');
  content = content.replace(/\$\{kpi\.color\}15/g, 'hsl(var(--foreground) / 0.15)');
  
  content = content.replace(/\$\{statusColor\}20/g, 'hsl(var(--foreground) / 0.2)');
  content = content.replace(/\$\{statusColor\}60/g, 'hsl(var(--foreground) / 0.6)');
  
  content = content.replace(/\$\{color\}14/g, 'hsl(var(--foreground) / 0.08)');
  content = content.replace(/\$\{color\}30/g, 'hsl(var(--foreground) / 0.2)');
  content = content.replace(/\$\{color\}15/g, 'hsl(var(--foreground) / 0.1)');
  content = content.replace(/\$\{color\}20/g, 'hsl(var(--foreground) / 0.12)');
  content = content.replace(/\$\{color\}cc/g, 'hsl(var(--foreground) / 0.8)');

  if (content !== og) {
    fs.writeFileSync(file, content);
    console.log('Fixed alphas in:', file);
  }
}

dirs.forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (fs.existsSync(fullDir)) {
    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      if (file.endsWith('.jsx')) {
        fixAlpha(path.join(fullDir, file));
      }
    }
  }
});
