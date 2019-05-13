// Controllers
const userController = require('../controllers/userController.js');
const mongodb = require('mongodb').MongoClient;
// exports
module.exports.start = function(req, res) {
    mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
        if(err) {
            // Future error page
        } else {
            userController.userCheck(req, res, db, function(user) {
                if(user) {
                    res.render('account/start.ejs', {
                        rtype: 1,
                        user: user
                    })
                } else {
                    res.redirect(307, '/signin?service=account&url=start')
                }
            })
        }
    })
}
module.exports.personal = function(req, res) {
    mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
        if(err) {
            // Future error page
        } else {
            userController.userCheck(req, res, db, function(user) {
                if(user) {
                    res.render('account/personal-info.ejs', {
                        rtype: 1,
                        user: user
                    })
                } else {
                    res.redirect(307, '/signin?service=account&url=start')
                }
            })
        }
    })
}
