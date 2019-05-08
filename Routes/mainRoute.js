// Includes
const express = require('express');
//Helpers
const expressHelper = require('../help/expressHelper.js');
// Setup
const Router = express.Router();
// Controllers
const userController = require('../controllers/userController.js');
// Create the routes
Router.get('/signup', function(req, res) {
    res.render('main/signup.ejs');
})
Router.get('/signin', function(req, res) {
    res.render('main/signin.ejs');
})
Router.post('/signup', function(req, res) {
    userController.createUser(req, res);
})
Router.post('/signin-validate', function(req, res) {
    userController.signinValidate(req, res);
})
// Exports the Router
module.exports = Router;
