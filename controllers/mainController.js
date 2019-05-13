// Includes
const mongodb = require('mongodb').MongoClient;
const url = require('url');
// Controllers
const userController = require('../controllers/userController.js');
// Exports
module.exports.visitTdata = function(req, res) {
    var l_loc = req.body.l_loc;
    if(
        l_loc!=undefined
    ) {
        mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
            if(err) {
                // Future error page
            } else {
                dbo = db.db('fannstdb');

                userController.userCheck(req, res, db, function(user) {
                    if(user) {
                        var date = new Date();
                        var cdate = date.getHours() + ' ' + date.getDay() + ' ' + + date.getFullYear();

                        dbo.collection('users_lhistory').findOne({
                            $and: [
                                {
                                    l_dte: cdate,
                                },
                                {
                                    l_hid: user.user_hid
                                }
                            ]
                        }, function(err, resdb) {
                            if(err) {
                                res.status(200).send({status:false})
                            } else {
                                if(resdb == null) {
                                    var locations = [];
                                    locations.push(l_loc);
                                    dbo.collection('users_lhistory').insertOne({
                                        l_dte: cdate,
                                        l_locs: locations,
                                        l_hid: user.user_hid
                                    }, function(err) {
                                        if(err) {
                                            res.status(200).send({status: false})
                                        }
                                    })
                                } else {
                                    var locations = resdb.l_locs;
                                    if(!locations.includes(l_loc)) {
                                        locations.push(l_loc);
                                    }
                                    dbo.collection('users_lhistory').updateOne({
                                        $and: [
                                            {
                                                l_dte: cdate,
                                            },
                                            {
                                                l_hid: user.user_hid
                                            }
                                        ]
                                    }, {$set: {
                                        l_locs: locations
                                    }}, function(err) {
                                        res.status(200).send({status: false});
                                    })
                                }
                            }
                        })
                    } else {
                        res.status(200).send({status: false})
                    }
                })
            }
        })
    } else {
        res.status(200).send({status: false})
    }
}
