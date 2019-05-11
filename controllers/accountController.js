// Controllers
const userController = require('../controllers/userController.js');
// exports
module.exports.start = function(req, res) {
    userController.userCheck(req, res, function(user) {
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
module.exports.personal = function(req, res) {
    userController.userCheck(req, res, function(user) {
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
