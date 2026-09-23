const os = require('os');
const util = require('util');
console.log('Platform:', os.platform());
console.log(util.format('Node version: %s', process.version));