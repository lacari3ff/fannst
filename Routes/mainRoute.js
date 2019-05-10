// Includes
const express = require('express');
//Helpers
const expressHelper = require('../help/expressHelper.js');
// Setup
const Router = express.Router();
// Controllers
const userController = require('../controllers/userController.js');
const searchController = require('../controllers/searchController.js');
// Create the routes
Router.get('/', function(req, res) {
    searchController.index(req, res);
})
Router.get('/search', function(req, res) {

})
Router.get('/signup', function(req, res) {
    res.render('main/signup.ejs');
})
Router.get('/signin', function(req, res) {
    res.render('main/signin.ejs');
})
Router.get('/logout', function(req, res) {
    userController.logout(req, res);
})
Router.post('/signup', function(req, res) {
    userController.createUser(req, res);
})
Router.post('/signin-validate', function(req, res) {
    userController.signinValidate(req, res);
})
Router.post('/signin', function(req, res) {
    userController.signIn(req, res);
})
// Exports the Router
module.exports = Router;
