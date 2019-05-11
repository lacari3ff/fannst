// Includes
const mongodb = require('mongodb').MongoClient;
const url = require('url');
// Controllers
const userController = require('../controllers/userController.js');
// Exports
module.exports.start = function(req, res) {
    userController.userCheck(req, res, function(user) {
        if(user) {
            res.render('url-shortener/start', {
                rtype: 1,
                user: user
            })
        } else {
            res.redirect(307, '/signin?service=url-shortener?url=start')
        }
    })
}