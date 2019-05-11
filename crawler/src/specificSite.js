// Includes
const fs = require('fs');
// Includes sources
const crawling = require('./crawling.js')
//Exports
module.exports.specificSite = function(site, dbo) {
    crawling.crawl(site, function(data) {
        dbo.collection('sites').findOne({
            ste_url: data.url
        }, function(err, resdb) {
            if(err) {
                console.log(err);
            } else {
                if(resdb == null) {
                    dbo.collection('sites').insertOne({
                        ste_title: data.title,
                        ste_keywds: data.keywords,
                        ste_rank: data.rank,
                        ste_desc: data.description,
                        ste_cpr: data.copyright,
                        ste_url: data.url,
                        ste_srank: 0
                    }, function(err) {
                        if(err) {
                            console.log(err);
                        } else {
                            crawlSubsites(dbo, data.links);
                        }
                    })
                } else {
                    crawlSubsites(dbo, data.links);
                }
            }
        })
    })
}

function crawlSubsites(dbo, links) {
    if(links != undefined) {
        links.forEach(function(link) {
            crawling.crawl(link, function(data) {
                console.log('Storing: ' + data.title + ', With the rank of: ' + data.rank)
                storeInDb(dbo, data);
            })
        })
    }
}

function storeInDb(dbo, data) {
    if(data.title != undefined && data.title != null && data.title != '') {
        dbo.collection('sites').findOne({
            ste_url: data.url
        }, function(err, resdb) {
            if(err) {
                console.log(err);
            } else {
                if(resdb == null) {
                    dbo.collection('sites').insertOne({
                        ste_title: data.title,
                        ste_keywds: data.keywords,
                        ste_rank: data.rank,
                        ste_desc: data.description,
                        ste_cpr: data.copyright,
                        ste_url: data.url,
                        ste_srank: 0
                    }, function(err) {
                        if(err) {
                            console.log(err);
                        }
                    })
                } else {
                    return;
                }
            }
        })
    } else {
        return;
    }
}
