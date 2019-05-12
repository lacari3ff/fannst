module.exports = class Url {
    constructor(urlObject) {
        this.url_url = urlObject.url_url;
        this.url_hid = urlObject.url_hid;
        this.url_id = urlObject.url_id;
        this.url_nme = urlObject.url_nme;
        this.url_edata = urlObject.url_edata;
        this.url_cdate = urlObject.url_cdate;
        this.url_nurl = urlObject.url_nurl;
    }; save(dbo, cb) {
        dbo.collection('url_shortener').insertOne(this, function(err) {
            if(err) {
                cb(false);
            } else {
                cb(true);
            }
        })
    }; static fetchById(dbo, id, cb) {
        dbo.collection('url_shortener').findOne({
            url_id: id
        }, function(err, resdb) {
            if(err) {
                cb(false);
            } else if(resdb == null) {
                cb(false);
            } else {
                cb(resdb);
            }
        })
    }; static fetchByHid(dbo, hid, cb) {
        dbo.collection('url_shortener').find({
            url_hid: hid
        }).toArray(function(err, resdb) {
            if(err) {
                cb(false);
            } else if(resdb == null) {
                cb(false);
            } else {
                cb(resdb);
            }
        })
    }; static fetchByNurl(dbo, nurl, cb) {
        dbo.collection('url_shortener').findOne({
            url_nurl: nurl
        }, function(err, resdb) {
            if(err) {
                cb(false);
            } else if(resdb == null) {
                cb(false);
            } else {
                cb(resdb);
            }
        })
    }
}