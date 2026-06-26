import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    if (content.includes("react-router-dom")) {
      content = content.replace(/import\s+\{\s*(?:[^}]*,\s*)?Link(?:\s*,[^}]*)?\s*\}\s*from\s*['"]react-router-dom['"];?/g, "import Link from 'next/link';");
      changed = true;
    }
    
    if (content.match(/<Link\s+[^>]*to={?[^>]*>|to=/)) {
        content = content.replace(/(<Link\s+[^>]*?)to=/g, "$1href=");
        changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
