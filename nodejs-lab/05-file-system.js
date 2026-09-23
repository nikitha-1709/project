const fs = require('fs');
fs.writeFileSync('node-lab-output.txt', 'Created with the Node.js fs module');
console.log(fs.readFileSync('node-lab-output.txt', 'utf8'));