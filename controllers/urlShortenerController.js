// Includes
const mongodb = require('mongodb').MongoClient;
const url = require('url');
// Controllers
const userController = require('../controllers/userController.js');
// Models
const Url = require('../models/urls/urlModel');
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
module.exports.createUrl = function(req, res) {
    // Gets data
    var urlObject = {
        url_nme: req.body.url_nme,
        url_url: req.body.url_url,
        url_nurl: req.body.url_nurl,
        url_edata: req.body.url_edata
    }
    if(
        urlObject.url_nme!=undefined&&
        urlObject.url_url!=undefined&&
        urlObject.url_nurl!=undefined&&
        urlObject.url_edata!=undefined
    )
    console.log(urlObject)
    userController.userCheck(req, res, function(user) {
        if(user) {
            
        } else {
            res.send(200).status({status: false, err: 403});
        }
    })
}