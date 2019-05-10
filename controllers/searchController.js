// Includes
const mongodb = require('mongodb').MongoClient;
const url = require('url');
// Controllers
const userController = require('../controllers/userController.js');
// Exports
module.exports.index = function(req, res) {
    userController.userCheck(req, res, function(user) {
        if(user) {
            res.render('main/index.ejs', {
                rtype: 1,
                user: user
            })
        } else {
            res.render('main/index.ejs', {
                rtype: 0,
                user: user
            })
        }
    })
}
module.exports.search = function(req, res) {
    mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
        var urlr = url.parse(req.url, true);
        var query = urlr.query;

        if(query.params != undefined) {
            userController.userCheck(req, res, function(user) {
                if(user) {
                    var date = new Date();
                    var cdate = date.getHours() + ' ' + date.getDay() + ' ' + + date.getFullYear();

                    dbo = db.db('fannstdb');

                    dbo.collection('users_shistory').findOne({
                        $and: [
                            {
                                his_dte: cdate
                            },
                            {
                                his_hid: user.user_hid
                            }
                        ]
                    }, function(err, resdb) {
                        if(err) {
                            res.redirect(307, '/');
                        } else {
                            if(resdb) {
                                var his = resdb.his_hist;
                                if(!his.includes(query.params)) {
                                    his.push(query.params);
                                }

                                dbo = db.db('fannstdb');

                                dbo.collection('users_shistory').updateOne({
                                    $and: [
                                        {
                                            his_dte: cdate
                                        },
                                        {
                                            his_hid: user.user_hid
                                        }
                                    ]
                                }, {$set: {
                                    his_hist: his
                                }}, function(err) {
                                    if(err) {
                                        res.redirect(307, '/');
                                    }
                                })

                                // Sends site

                                var dbo = db.db('fannstdb-search');
                                dbo.collection('sites').find({
                                    $or:
                                    [
                                        {
                                            ste_title: {$regex: query.params.toLowerCase()}
                                        },
                                        {
                                            ste_keywds: {$regex: query.params.toLowerCase()}
                                        },
                                        {
                                            ste_desc: {$regex: query.params.toLowerCase()}
                                        },
                                        {
                                            ste_url: {$regex: query.params.toLowerCase()}
                                        },
                                    ]
                                }).sort({ste_srank : -1, ste_rank : -1, ste_url: -1}).limit(30).toArray(function(err, results) {
                                    if(err) {
                                        res.redirect(307, '/');
                                    } else {
                                        res.render('main/search.ejs', {
                                            rtype: 1,
                                            user: user,
                                            results: results,
                                            param: query.params
                                        })
                                    }
                                })
                            } else {
                                var his = [];
                                his.push(query.params);

                                dbo = db.db('fannstdb');

                                dbo.collection('users_shistory').insertOne({
                                    his_dte: cdate,
                                    his_hid: user.user_hid,
                                    his_hist: his
                                }, function(err) {
                                    if(err) {
                                        res.redirect(307, '/');
                                    }
                                })
                                
                                // Sends site

                                var dbo = db.db('fannstdb-search');
                                dbo.collection('sites').find({
                                    $or:
                                    [
                                        {
                                            ste_title: {$regex: query.params.toLowerCase()}
                                        },
                                        {
                                            ste_keywds: {$regex: query.params.toLowerCase()}
                                        },
                                        {
                                            ste_desc: {$regex: query.params.toLowerCase()}
                                        },
                                        {
                                            ste_url: {$regex: query.params.toLowerCase()}
                                        },
                                    ]
                                }).sort({ste_srank : -1, ste_rank : -1, ste_url: -1}).limit(30).toArray(function(err, results) {
                                    if(err) {
                                        res.redirect(307, '/');
                                    } else {
                                        res.render('main/search.ejs', {
                                            rtype: 1,
                                            user: user,
                                            results: results,
                                            param: query.params
                                        })
                                    }
                                })
                            }
                        }
                    })
                } else {
                    var dbo = db.db('fannstdb-search');
                    dbo.collection('sites').find({
                        $or:
                        [
                            {
                                ste_title: {$regex: query.params.toLowerCase()}
                            },
                            {
                                ste_keywds: {$regex: query.params.toLowerCase()}
                            },
                            {
                                ste_desc: {$regex: query.params.toLowerCase()}
                            },
                            {
                                ste_url: {$regex: query.params.toLowerCase()}
                            },
                        ]
                    }).sort({ste_srank : -1, ste_rank : -1, ste_url: -1}).limit(30).toArray(function(err, results) {
                        if(err) {
                            res.redirect(307, '/');
                        } else {
                            res.render('main/search.ejs', {
                                rtype: 0,
                                user: user,
                                results: results,
                                param: query.params
                            })
                        }
                    })
                }
            })
        } else {
            res.redirect(307, '/')
        }
    })
}
module.exports.visit = function(req, res) {
    mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
        var dbo = db.db('fannstdb');

        var urlr = url.parse(req.url, true);
        var query = urlr.query;

        if(query.url != undefined) {
            userController.userCheck(req, res, function(user) {
                if(user) {
                    var dbo = db.db('fannstdb-search');
                    dbo.collection('sites').findOne({ste_url: query.url}, function(err, resdb) {
                        if(err) {
                            res.redirect(301, '/');
                        } else {
                            var ste_srank = resdb.ste_srank + 1;
                            dbo.collection('sites').updateOne({ste_url: resdb.ste_url}, {$set: {ste_srank: ste_srank}}, function(err) {
                                if(err) {
                                    res.redirect(307, '/');
                                } else {
                                    res.redirect(307, resdb.ste_url);
                                }
                            })
                        }
                    })
                } else {
                    var dbo = db.db('fannstdb-search');
                    dbo.collection('sites').findOne({ste_url: query.url}, function(err, resdb) {
                        if(err) {
                            res.redirect(301, '/');
                        } else {
                            var ste_srank = resdb.ste_srank + 1;
                            dbo.collection('sites').updateOne({ste_url: resdb.ste_url}, {$set: {ste_srank: ste_srank}}, function(err) {
                                if(err) {
                                    res.redirect(307, '/');
                                } else {
                                    res.redirect(307, resdb.ste_url);
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
module.exports.support = function(req, res) {
    userController.userCheck(req, res, function(user) {
        if(user) {
            res.render('main/support.ejs', {
                rtype: 1,
                user: user
            });
        } else {
            res.render('main/support.ejs', {
                rtype: 0,
                user: user
            });
        }
    })
}
