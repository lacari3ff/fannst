// Includes
const mongodb = require('mongodb').MongoClient;
const url = require('url');
// Controllers
const userController = require('../controllers/userController.js');
// Exports
module.exports.index = function(req, res) {
    userController.userCheck(req, res, function(user) {
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