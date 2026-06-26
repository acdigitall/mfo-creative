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
    let original = content;
    
    // Remove Helmet imports
    content = content.replace(/import\s+\{\s*Helmet\s*\}\s*from\s*['"]react-helmet-async['"];?/g, "");
    
    // Remove Helmet tags
    content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, "");

    // Replace react-router-dom hooks
    let usesNextNav = false;
    let nextNavImports = [];

    if (content.includes("useNavigate")) {
        content = content.replace(/useNavigate/g, "useRouter");
        nextNavImports.push("useRouter");
        usesNextNav = true;
    }
    if (content.includes("useLocation")) {
        content = content.replace(/useLocation/g, "usePathname");
        nextNavImports.push("usePathname");
        usesNextNav = true;
    }
    if (content.includes("useParams")) {
        nextNavImports.push("useParams");
        usesNextNav = true;
    }

    // Remove react-router-dom imports
    content = content.replace(/import\s+\{([^}]*)\}\s*from\s*['"]react-router-dom['"];?/g, "");

    if (usesNextNav) {
        // Add next/navigation import
        const navImport = `import { ${[...new Set(nextNavImports)].join(', ')} } from 'next/navigation';\n`;
        content = navImport + content;
    }

    // Ensure use client if it uses next navigation
    if (usesNextNav && !content.includes('"use client"')) {
        content = '"use client";\n' + content;
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Cleaned up ${filePath}`);
    }
  }
});
