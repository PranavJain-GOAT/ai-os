const fs = require('fs');
const path = require('path');

const file = 'src/pages/AdminDashboard.jsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace hex alpha concatenations with CSS color-mix or rgba
content = content.replace(/\$\{kpi\.color\}20/g, 'hsl(var(--foreground) / 0.2)');
content = content.replace(/\$\{kpi\.color\}08/g, 'hsl(var(--foreground) / 0.08)');
content = content.replace(/\$\{kpi\.color\}30/g, 'hsl(var(--foreground) / 0.3)');
content = content.replace(/\$\{kpi\.color\}12/g, 'hsl(var(--foreground) / 0.12)');
content = content.replace(/\$\{kpi\.color\}25/g, 'hsl(var(--foreground) / 0.25)');
content = content.replace(/\$\{kpi\.color\}cc/g, 'hsl(var(--foreground) / 0.8)');

content = content.replace(/\$\{statusColor\}20/g, 'hsl(var(--foreground) / 0.2)');
content = content.replace(/\$\{statusColor\}60/g, 'hsl(var(--foreground) / 0.6)');

// In AdminDashboard: line 51 StatusIcon
//   if (status === "online")  return <CheckCircle className="w-3.5 h-3.5" style={{ color: "hsl(var(--foreground))" }} />;
content = content.replace(/color: "hsl\(var\(--foreground\)\)"/g, 'color: "hsl(var(--foreground))"'); // already replaced by regex

// line 312: const statusColor = isOnline ? "hsl(var(--foreground))" : isWarning ? "hsl(var(--foreground))" : "hsl(var(--foreground))"; 
// That was replaced properly but the logic is redundant, which is fine

// We also need to fix `DashBoardToggle.jsx` which might have `${color}14`, etc.
const dtFile = 'src/components/shared/DashboardToggle.jsx';
let dtContent = fs.readFileSync(dtFile, 'utf-8');
dtContent = dtContent.replace(/\$\{color\}14/g, 'hsl(var(--foreground) / 0.08)');
dtContent = dtContent.replace(/\$\{color\}30/g, 'hsl(var(--foreground) / 0.2)');
dtContent = dtContent.replace(/\$\{color\}15/g, 'hsl(var(--foreground) / 0.1)');
dtContent = dtContent.replace(/\$\{color\}20/g, 'hsl(var(--foreground) / 0.12)');
dtContent = dtContent.replace(/\$\{color\}cc/g, 'hsl(var(--foreground) / 0.8)');
fs.writeFileSync(dtFile, dtContent);

fs.writeFileSync(file, content);
console.log('Fixed Alpha values');
