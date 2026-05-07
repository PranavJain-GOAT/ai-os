const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.js') || dirPath.endsWith('.jsx') || dirPath.endsWith('.ts') || dirPath.endsWith('.tsx') || dirPath.endsWith('.css') || dirPath.endsWith('.html')) {
        callback(dirPath);
      }
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  content = content.replace(/AIStack/g, 'Deployra');
  content = content.replace(/aistack/g, 'deployra');
  content = content.replace(/AISTACK/g, 'DEPLOYRA');
  content = content.replace(/AI stack/gi, 'Deployra');
  content = content.replace(/AI Stack/gi, 'Deployra');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

const dirsToSearch = ['./src', './backend/src'];

dirsToSearch.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir, processFile);
  }
});

console.log('Renaming complete.');
