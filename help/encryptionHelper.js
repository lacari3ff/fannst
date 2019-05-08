// Includes
const crypto = require('crypto');
// Exports
module.exports.genHid = function() {
    return crypto.randomBytes(12).toString('hex').substring(0, 12);
}
