// Includes
const mongodb = require('mongodb').MongoClient;
const url = require('url');
const dns = require('dns');
// Controllers
const userController = require('../controllers/userController.js');
// Exports
module.exports.start = function(req, res) {
    mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
        if(err) {
            // Future error page
        } else {
            userController.userCheck(req, res, db, function(user) {
                if(user) {
                    res.render('DNSChecker/index.ejs', {
                        rtype: 1,
                        user: user
                    })
                } else {
                    res.render('DNSChecker/index.ejs', {
                        rtype: 0,
                        user: user
                    })
                }
            })
        }
    })
}
module.exports.check = function(req, res) {
    // Gets data
    var urlr = url.parse(req.url, true);
    var query = urlr.query;
    // Checks if data
    if(
        query.action!=''
    ) {
        mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
            if(err) {
                // Future error page
            } else {
                userController.userCheck(req, res, db, function(user) {
                    if(user) {
                       getDNS(query.action, function(cb) {
                            if(cb == false) {
                                res.redirect(307, '/DNSChecker/start');
                            } else {
                                res.render('DNSChecker/check.ejs', {
                                    rtype: 1,
                                    user: user,
                                    dns: cb,
                                    action: query.action
                                })
                            }
                       })
                    } else {
                        getDNS(query.action, function(cb) {
                            if(cb == false) {
                                res.redirect(307, '/DNSChecker/start');
                            } else {
                                res.render('DNSChecker/check.ejs', {
                                    rtype: 0,
                                    user: user,
                                    dns: cb,
                                    action: query.action
                                })
                            }
                       })
                    }
                })
            }
        })
    } else {
        res.redirect(307, '/DNSChecker/start');
    }
}

function getDNS(url, cb) {
    // Does the basic lookup
    dns.lookup(url, function(err, address, family) {
        if(err) {
            cb(false);
        } else {
            // Creates DNS object
            var dnsObject = {
                address: address,
                family: family
            }
            dns.resolve4(url, function(err, addresses) {
                if(err) {
                    cb(false);
                } else {
                    var hosts = [];
                    var processed = 0;
                    addresses.forEach(async function(a) {
                        reverseDNS(a).then(function(host) {
                            processed++
                            hosts.push({
                                address: a,
                                host: host
                            })
                            if(processed == addresses.length) {
                                dnsObject.hosts = hosts;
                                dns.resolve(url, 'ANY', function(err, records) {
                                    dnsObject.records = records;
                                    cb(dnsObject);
                                })
                            }
                        })
                    })
                }
            })
        }
    })
}

function reverseDNS(a) {
    return new Promise(function(hostname) {
        dns.reverse(a, function(err, host) {
            hostname(host)
        })
    })
}