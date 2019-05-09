module.exports = class user {
    constructor(
        userObject
    ) {
        this.user_first = userObject.user_first;
        this.user_last = userObject.user_last;
        this.user_email = userObject.user_email;
        this.user_uid = userObject.user_uid;
        this.user_pass = userObject.user_pass;
        this.user_phone = userObject.user_phone;
        this.user_rest_email = userObject.user_rest_email;
        this.user_bdate = userObject.user_bdate;
        this.user_gender = userObject.user_gender;
        this.user_hid = userObject.user_hid;
        this.user_cdate = userObject.user_cdate;
        this.user_pic = 'def';
        this.user_desc = '';
        this.user_sett_location = 'true';
        this.user_sett_history = 'true';
        this.user_sett_deviceinfo = 'true';
    }; save(dbo, cb) {
        dbo.collection('users').insertOne(this, function(err, resdb) {
            if(err) {
                cb(false);
            } else {
                cb(true);
            }
        })
    }; static fetchByHid(dbo, user_hid, cb) {
        dbo.collection('users').findOne({
            user_hid: user_hid
        }, function(err, resdb) {
            if(err) {
                cb(false);
            } else if(resdb == null) {
                cb(false);
            } else {
                cb(resdb);
            }
        })
    }; static fetchByUser(dbo, user, cb) {
        dbo.collection('users').findOne({
            $or:
            [
                {
                    user_uid: user
                },
                {
                    user_phone: user
                },
                {
                    user_email: user
                }
            ]
        }, function(err, resdb) {
            if(err) {
                cb(false);
            } else if(resdb == null) {
                cb(false);
            } else {
                cb(resdb);
            }
        })
    }; static signupFindUser(dbo, user_uid, user_email, user_phone, cb) {
        if(user_phone == undefined) {
            dbo.collection('users').findOne({
                $or:
                [
                    {
                        user_uid: user_uid
                    },
                    {
                        user_email: user_email
                    }
                ]
            }, function(err, resdb) {
                if(err) {
                    cb(false);
                } else if(resdb == null) {
                    cb(true);
                } else {
                    cb(false);
                }
            })
        } else {
            dbo.collection('users').findOne({
                $or:
                [
                    {
                        user_uid: user_uid
                    },
                    {
                        user_email: user_email
                    }, {
                        user_phone: user_phone
                    }
                ]
            }, function(err, resdb) {
                if(err) {
                    cb(false);
                } else if(resdb == null) {
                    cb(true);
                } else {
                    cb(false);
                }
            })
        }
    }
}
