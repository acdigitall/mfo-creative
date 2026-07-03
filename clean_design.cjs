const fs = require('fs');
const path = require('path');

const dirsToScan = [
  path.join(__dirname, 'components', 'views'),
  path.join(__dirname, 'components', 'services'),
];

const filesToScan = [
  path.join(__dirname, 'components', 'Navbar.jsx'),
  path.join(__dirname, 'components', 'Footer.jsx'),
  path.join(__dirname, 'app', 'page.jsx'),
  path.join(__dirname, 'app', 'layout.jsx'),
];

// Helper to get all files
function getAllFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  let files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

dirsToScan.forEach(dir => {
  if (fs.existsSync(dir)) {
    filesToScan.push(...getAllFiles(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.js')));
  }
});

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Emojis (keep arrows and checkmarks: ✓, ▸, →, ←)
  content = content.replace(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/gu, (match) => {
    if (['✓', '▸', '→', '←', '©', '®'].includes(match)) return match;
    return '';
  });

  // Handle text gradients: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-... to-..."
  content = content.replace(/text-transparent\s+bg-clip-text\s+bg-gradient-to-[a-z]+\s+from-([a-z]+)-(\d+)(?:\/[0-9]+)?(?:\s+via-[a-z]+-\d+(?:\/[0-9]+)?)?(?:\s+to-[a-z]+-\d+(?:\/[0-9]+)?)?/g, 'text-$1-$2');
  content = content.replace(/bg-gradient-to-[a-z]+\s+from-([a-z]+)-(\d+)(?:\/[0-9]+)?(?:\s+via-[a-z]+-\d+(?:\/[0-9]+)?)?(?:\s+to-[a-z]+-\d+(?:\/[0-9]+)?)?\s+bg-clip-text\s+text-transparent/g, 'text-$1-$2');
  
  // Handle bg gradients: "bg-gradient-to-r from-blue-500 via-... to-..."
  content = content.replace(/bg-gradient-to-[a-z]+\s+from-([a-z]+)-(\d+)(?:\/[0-9]+)?(?:\s+via-[a-z]+-\d+(?:\/[0-9]+)?)?(?:\s+to-[a-z]+-\d+(?:\/[0-9]+)?)?/g, 'bg-$1-$2');
  
  // Fallbacks
  content = content.replace(/\bbg-gradient-to-[a-z]+\b/g, '');
  content = content.replace(/\bfrom-[a-z]+-\d+(?:\/[0-9]+)?\b/g, '');
  content = content.replace(/\bvia-[a-z]+-\d+(?:\/[0-9]+)?\b/g, '');
  content = content.replace(/\bto-[a-z]+-\d+(?:\/[0-9]+)?\b/g, '');
  content = content.replace(/\btext-transparent\b/g, '');
  content = content.replace(/\bbg-clip-text\b/g, '');
  content = content.replace(/\bfrom-black(?:\/[0-9]+)?\b/g, '');
  content = content.replace(/\bto-black(?:\/[0-9]+)?\b/g, '');
  content = content.replace(/\bvia-black(?:\/[0-9]+)?\b/g, '');
  content = content.replace(/\bfrom-transparent\b/g, '');
  content = content.replace(/\bto-transparent\b/g, '');
  content = content.replace(/\bvia-transparent\b/g, '');

  // Remove blur & glassmorphism
  content = content.replace(/\bbackdrop-blur-[a-z]+\b/g, '');
  content = content.replace(/\bbackdrop-blur\b/g, '');
  
  // Replace white semi-transparent backgrounds with dark solid backgrounds
  content = content.replace(/\bbg-white\/5\b/g, 'bg-gray-800');
  content = content.replace(/\bbg-white\/10\b/g, 'bg-gray-800');
  content = content.replace(/\bbg-white\/20\b/g, 'bg-gray-700');
  content = content.replace(/\bbg-white\/30\b/g, 'bg-gray-600');
  
  // Replace border semi-transparent
  content = content.replace(/\bborder-white\/10\b/g, 'border-gray-700');
  content = content.replace(/\bborder-white\/20\b/g, 'border-gray-600');
  content = content.replace(/\bborder-white\/30\b/g, 'border-gray-500');
  
  // Special inline style glassmorphism replacements
  content = content.replace(/backdropFilter:\s*["'][^"']+["'],?/g, '');
  content = content.replace(/WebkitBackdropFilter:\s*["'][^"']+["'],?/g, '');
  content = content.replace(/backgroundColor:\s*["']rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)["']/g, 'backgroundColor: "rgba(31, 41, 55, 1)"'); // equivalent to bg-gray-800

  // Fix multiple horizontal spaces created by replacements
  content = content.replace(/[ \t]{2,}/g, ' ');
  // Fix spacing around quotes in className
  content = content.replace(/className="\s+/g, 'className="');
  content = content.replace(/\s+"/g, '"');
  
  // In JSX strings, we might have ` className=" "`
  content = content.replace(/className="\s+"/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
}

filesToScan.forEach(f => {
  if (fs.existsSync(f)) {
    console.log('Processing:', f);
    processFile(f);
  }
});

console.log('Done.');
