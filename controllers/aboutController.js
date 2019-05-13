// Includes
const mongodb = require('mongodb').MongoClient;
const url = require('url');
// Controllers
const userController = require('../controllers/userController.js');
// Exports
module.exports.index = function(req, res) {
    mongodb.connect('mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb', { useNewUrlParser: true }, function(err, db) {
        if(err) {
            // Future error page
        } else {
            userController.userCheck(req, res, db, function(user) {
                if(user) {
                    res.render('about/index', {
                        rtype: 1,
                        user: user
                    })
                } else {
                    res.render('about/index', {
                        rtype: 0
                    })
                }
            })
        }
    })
}