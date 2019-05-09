// Includes
const mongodb = require('mongodb').MongoClient;
// Controllers
const userController = require('../controllers/userController.js');
// Exports
module.exports.index = function(req, res) {
    userController.userCheck(req, res, function(user) {
        if(user) {
            res.render('main/index.ejs', {
                rtype: 1,
                user: user
            })
        } else {
            res.render('main/index.ejs', {
                rtype: 0,
                user: user
            })
        }
    })
}
