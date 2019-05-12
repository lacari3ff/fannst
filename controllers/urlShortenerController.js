// Includes
const mongodb = require('mongodb').MongoClient;
const url = require('url');
const crypto = require('crypto');
// Tools
const dateTool = require('../tools/date');
// Controllers
const userController = require('../controllers/userController.js');
// Models
const Url = require('../models/urls/urlModel');
// Exports
module.exports.start = function(req, res) {
    userController.userCheck(req, res, function(user) {
        if(user) {
            mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
                if(err) {
                    res.redirect(307, '/');
                } else {
                    dbo = db.db('fannstdb-url-shortener');
                    
                    Url.fetchByHid(dbo, user.user_hid, function(urls) {
                        res.render('url-shortener/start', {
                            rtype: 1,
                            user: user,
                            urls: urls
                        })  
                    })
                }
            })
        } else {
            res.redirect(307, '/signin?service=url-shortener?url=start')
        }
    })
}
module.exports.removeUrl = function(req, res) {
    // Gets data
    var url_id = req.body.url_id;
    // Checks data
    if(
        url_id != undefined
    ) {
        userController.userCheck(req, res, function(user) {
            if(user) {
                mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
                    if(err) {
                        res.status(200).send({status: false, err: 'Server error'});
                    } else {
                        dbo = db.db('fannstdb-url-shortener');

                        Url.fetchById(dbo, url_id, function(url) {
                            if(url) {
                                if(url.url_hid == user.user_hid) {
                                    dbo.collection('url_shortener').deleteOne({
                                        url_id: url_id
                                    }, function(err) {
                                        if(err) {
                                            res.status(200).send({status: false, err: 'Server error'});
                                        } else {
                                            dbo.collection('url_shortener_his').deleteMany({
                                                his_id: url_id
                                            }, function(err) {
                                                if(err) {
                                                    res.status(200).send({status: false, err: 'Server error'});
                                                } else {
                                                    res.status(200).send({status: true});
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    res.status(200).send({status: false, err: 'Not authorized'});
                                }
                            } else {
                                res.status(200).send({status: false, err: 'Url not found'});
                            }
                        })
                    }
                })
            } else {
                res.status(200).send({status: false, err: 'Not authorized'});
            }
        });
    }
}
module.exports.createUrl = function(req, res) {
    // Gets data
    var urlObject = {
        url_nme: req.body.url_nme,
        url_url: req.body.url_url,
        url_nurl: req.body.url_nurl,
        url_edata: req.body.url_edata
    }
    if(
        urlObject.url_nme!=undefined&&
        urlObject.url_url!=undefined&&
        urlObject.url_nurl!=undefined&&
        urlObject.url_edata!=undefined
    ) {
        userController.userCheck(req, res, function(user) {
            if(user) {
                mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
                    if(err) {
                        res.status(200).send({status: false, err: 'Server error'});
                    } else {
                        dbo = db.db('fannstdb-url-shortener');

                        Url.fetchByHid(dbo, user.user_hid, function(urls) {
                            if(urls.length <= 14) {
                                function createUrl() {
                                    var url_id = crypto.randomBytes(16).toString('hex').substring(0, 16);
                                    
                                    Url.fetchById(dbo, url_id, function(url) {
                                        if(url) {
                                            createUrl();
                                        } else{
                                            urlObject.url_id = url_id;
                                            urlObject.url_cdate = dateTool.genDate(['d', 'M', 'y']);
                                            urlObject.url_hid = user.user_hid;
        
                                            if(urlObject.url_nurl == 'null') {
                                                urlObject.url_nurl = urlObject.url_id;
                                            } else {
                                                urlObject.url_nurl = urlObject.url_id + '-' + urlObject.url_nurl;
                                            }
                                            
                                            var urlo = new Url(urlObject);
                                            urlo.save(dbo, function(resdb) {
                                                if(resdb) {
                                                    res.status(200).send({status: true});
                                                } else {
                                                    res.status(200).send({status: false, err: 'Server error'});
                                                }
                                            })
                                        }
                                    })   
                                }
                                
                                createUrl();
                            } else {
                                res.status(200).send({status: false, err: 'Reached limit of urls, 14.'});
                            }
                        })
                    }
                })
            } else {
                res.send(200).status({status: false, err: 'Not authorized'});
            }
        })
    } else {
        res.status(200).send({status: false, err: 408});
    }
}
module.exports.visit = function(req, res) {
    var urlr = url.parse(req.url, true);
    var query = urlr.query;

    var nurl = query.id;
    if(
        nurl!=undefined
    ) {
        mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
            if(err) {
                res.status(200).send({status: false, err: 'Server error'});
            } else {
                dbo = db.db('fannstdb-url-shortener');

                Url.fetchByNurl(dbo, nurl, function(resdb) {
                    if(resdb) {
                        if(resdb.url_edata == 'true') {
                            var cdate = dateTool.genDate(['h', 'd', 'M', 'y']);
                            dbo.collection('url_shortener_his').findOne({
                                $and: [
                                    {
                                        his_id: resdb.url_id
                                    },
                                    {
                                        his_cdate: cdate
                                    }
                                ]
                            }, function(err, his) {
                                if(err) {
                                    res.redirect(307, '/')
                                } else {
                                    if(his) {
                                        var hisArray = his.his_his;
                                        hisArray.push({
                                            his_device: req.headers['user-agent'],
                                            his_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                                            his_date: dateTool.genDate(['mi'])
                                        })
                                        dbo.collection('url_shortener_his').updateOne({
                                            $and: [
                                                {
                                                    his_id: resdb.url_id
                                                },
                                                {
                                                    his_cdate: cdate
                                                }
                                            ]
                                        }, {$set: {
                                            his_his: hisArray
                                        }}, function(err) {
                                            if(err) {
                                                res.redirect(307, '/');
                                            } else {
                                                res.redirect(307, resdb.url_url);
                                            }
                                        })
                                    } else {
                                        var hisArray = [];
                                        hisArray.push({
                                            his_device: req.headers['user-agent'],
                                            his_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                                            his_date: dateTool.genDate(['mi'])
                                        })
                                        dbo.collection('url_shortener_his').insertOne({
                                            his_his: hisArray,
                                            his_cdate: cdate,
                                            his_id: resdb.url_id
                                        }, function(err) {
                                            if(err) {
                                                res.redirect(307, '/');
                                            } else {
                                                res.redirect(307, resdb.url_url);
                                            }
                                        })
                                    }
                                }
                            })
                        } else {
                            res.redirect(307, resdb.url_url);
                        }
                    } else {
                        res.redirect(307, '/');
                    }
                })
            }
        })
    } else {
        res.redirect(307, '/');
    }
}
module.exports.viewUrl = function(req, res) {
    var urlr = url.parse(req.url, true);
    var query = urlr.query;

    // Gets data
    var url_id = query.url_id;
    // Checks if data is set
    if(
        url_id!=undefined
    ) {
        userController.userCheck(req, res, function(user) {
            if(user) {
                mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
                    if(err) {
                        res.status(200).send({status: false, err: 'Server error'});
                    } else {
                        dbo = db.db('fannstdb-url-shortener');

                        Url.fetchById(dbo, url_id, function(url) {
                            if(url) {
                                if(url.url_hid == user.user_hid) {
                                    dbo.collection('url_shortener_his').find({
                                        his_id: url_id
                                    }).limit(20).toArray(function(err, his) {
                                        if(err) {
                                            res.send('Server error');
                                            res.end();
                                        } else {
                                            res.render('url-shortener/request/overlay-viewurl.ejs', {
                                                url: url,
                                                his: his
                                            })
                                        }
                                    })
                                } else {
                                    res.send('Not authorized');
                                    res.end();
                                }
                            } else {
                                res.send('Url not found');
                                res.end();
                            }
                        })
                    }
                })
            } else {
                res.send('Not authorized');
                res.end();
            }
        });
    } else {
        res.send('Invalid informaton entered');
        res.end();
    }
}