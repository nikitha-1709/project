const path = require('path');
console.log({directory:path.dirname(__filename), file:path.basename(__filename), extension:path.extname(__filename)});