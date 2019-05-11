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

    function wait() {
        dbo.collection('sites_ti').findOne(function(err, resdb) {
            if(err) {
                wait()
            } else {
                if(resdb == null) {
                    process.stdout.write('\033c');
                    console.log('Awaiting crawl :p')
                    setTimeout(function() {
                        wait();
                    }, 2000)
                } else {
                    dbo.collection('sites_ti').deleteOne(function(err) {
                        if(err) {
                            wait();
                        } else {
                            console.log('Starting crawl: ' + resdb.ste_url);
                            specificSite.specificSite(resdb.ste_url, dbo);
                            wait();
                        }
                    })
                }
            }
        })
    }

    wait();
})
