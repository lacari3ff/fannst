// Includes
const fs = require('fs');
const csv = require('csv-parser');
const specificSite = require('./specificSite.js')
//exports
module.exports.parseCSV = function(dbo, fname) {
    // Reads csv
    fs.createReadStream('./files/' + fname)
        .pipe(csv(['Name']))
        .on('data', function(data) {
            try {
                specificSite.specificSite(data.Name, dbo)
            }
            catch(err) {
                console.log(err);
            }
        })
}
