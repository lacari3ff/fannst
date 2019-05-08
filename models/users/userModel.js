module.exports = class user {
    constructor() {
        this.user_first = user_first;
        this.user_last = user_last;
        this.user_email = user_email;
        this.user_uid = user_uid;
        this.user_pass = user_pass;
        this.user_phone = user_phone;
        this.user_rest_email = user_rest_email;
        this.user_bdate = user_bdate;
        this.user_gender = user_gender;
        this.user_hid = user_hid;
        this.user_cdate = user_cdate;
    }; save(dbo, cb) {
        dbo.collection('users').insertOne(this, function(err, resdb) {
            if(err) {
                cb(false);
            }
            cb(true);
        })
    }; static fetchByHid(dbo, hid, cb) {
        dbo.collection('users').findOne({
            user_hid
        })
    }
}
