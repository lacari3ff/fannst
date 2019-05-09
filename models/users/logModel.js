module.exports = class Log {
    constructor(
        logObject
    ) {
        this.log_hid = logObject.log_hid;
        this.log_key = logObject.log_key;
        this.log_ip = logObject.log_ip;
        this.log_date = logObject.log_date;

    }; static save(dbo, cb) {
        dbo.collection('users_logged').insertOne(this, function(err, resdb) {
            if(err) {
                cb(false);
            } else if(resdb == null) {
                cb(false);
            } else {
                cb(true);
            }
        })
    }
}
