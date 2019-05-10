// Includes
const fs = require('fs');
const mongodb = require('mongodb').MongoClient;
// Includes sources
const crawling = require('./src/crawling.js')
const csv = require('./src/csv.js');
const specificSite = require('./src/specificSite.js')
// Runs
mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
    var dbo = db.db('fannstdb-search');

    //csv.parseCSV(dbo, 'top-1m.csv');
    specificSite.specificSite('https://toppornsites.com/', dbo)
})
