// Includes
const mongodb = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');
// Models
const User = require('../models/users/userModel.js');
// Helpers
const encryptionHelper = require('../help/encryptionHelper.js');
// RegExp
const user_email_regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const user_name_rexExp = new RegExp(/^[a-zA-Z]+$/);
const user_uid_regExp =  new RegExp(/^[a-zA-Z0-9_.]+$/);
const user_pass_regExp = new RegExp(/^[a-zA-Z]\w{3,14}$/);
const user_phone_regExp = new RegExp(/^[0-9]+$/);
// Exports
module.exports.createUser = function(req, res) {
    // Gets data
    var userObject = {
        user_first: req.body.user_first,
        user_last: req.body.user_last,
        user_email: req.body.user_email,
        user_uid: req.body.user_uid,
        user_pass: req.body.user_pass,
        user_phone: req.body.user_phone,
        user_rest_email: req.body.user_rest_email,
        user_bdate: req.body.user_bdate,
        user_gender: req.body.user_gender
    };
    // Checks if data is set and the correct type
    if(
        checkUserData(userObject)
    ) {
        mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
            if(err) {
                res.status(200).send({status: false, err: 500});
            } else {
                dbo = db.db('fannstdb');

                User.signupFindUser(dbo, userObject.user_uid, userObject.user_email, userObject.user_phone, function(cb) {
                    if(cb) {
                        genUser();
                        function genUser() {
                            var user_hid = encryptionHelper.genHid();
                            User.fetchByHid(dbo, user_hid, function(cb) {
                                if(!cb) {
                                    userObject.user_hid = user_hid;
                                    userObject.user_cdate = new Date;
                                    // Secures password
                                    bcrypt.genSalt(10, function(err, salt) {
                                        if(err) {
                                            res.status(200).send({status: false, err: 500});
                                        } else {
                                            bcrypt.hash(userObject.user_pass, salt, function(err, hash) {
                                                if(err) {
                                                    res.status(200).send({status: false, err: 500});
                                                } else {
                                                    userObject.user_pass = hash;
                                                    var user = new User(userObject);
                                                    user.save(dbo, function(cb) {
                                                        if(cb) {
                                                            res.status(200).send({status: true});
                                                        } else {
                                                            res.status(200).send({status: false, err: 500});
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                } else {{
                                    genUser();
                                }}
                            })
                        }
                    } else {
                        res.status(200).send({status: false, err: 408});
                    }
                })
            }
        })
        const user = new User(this);
    } else {
        res.status(200).send({status: false, err: 408});
    }
}

function checkUserData(userObject) {
    if(!user_name_rexExp.test(userObject.user_first)) {
        return false;
    } if(!user_name_rexExp.test(userObject.user_last)) {
        return false;
    } if(!user_email_regExp.test(userObject.user_email)) {
        return false;
    } if(!user_uid_regExp.test(userObject.user_uid)) {
        return false;
    } if(!user_pass_regExp.test(userObject.user_pass)) {
        return false;
    } if(userObject.user_rest_email!=undefined) {
        if(!user_email_regExp.test(userObject.user_rest_email)) {
            return false;
        }
    } if(userObject.user_phone!=undefined) {
        if(!user_phone_regExp.test(userObject.user_phone)) {
            return false;
        }
    } if(userObject.user_bdate==undefined) {
        return false;
    } if(userObject.user_gender==undefined) {
        return false;
    }

    return true;
}
module.exports.signinValidate = function(req, res) {
    // Gets data
    var user = req.body.user;
    // Checks if data is set
    if(
        user!=undefined
    ) {
        mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
            if(err) {
                res.status(200).send({status: false, err: 500});
            } else {
                dbo = db.db('fannstdb');

                User.fetchByUser(dbo, user, function(resdb) {
                    if(resdb) {
                        res.status(200).send({status: true, user: {
                            user_email: resdb.user_email
                        }})
                    } else {
                        res.status(200).send({status: false, err: 404});
                    }
                })
            }
        })
    } else {
        res.status(200).send({status: false, err: 408});
    }
}