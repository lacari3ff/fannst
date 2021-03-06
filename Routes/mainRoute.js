// Includes
const express = require('express');
//Helpers
const expressHelper = require('../help/expressHelper.js');
// Setup
const Router = express.Router();
// Controllers
const userController = require('../controllers/userController.js');
const searchController = require('../controllers/searchController.js');
const mainController = require('../controllers/mainController.js');
const urlShortenerController = require('../controllers/urlShortenerController.js');
// Create the routes
Router.get('/', function(req, res) {
    searchController.index(req, res);
})
Router.get('/search', function(req, res) {
    searchController.search(req, res);
})
Router.get('/visit', function(req, res) {
    searchController.visit(req, res);
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
Router.get('/support', function(req, res) {
    searchController.support(req, res);
})
Router.get('/url', function(req, res) {
    urlShortenerController.visit(req, res);
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
Router.post('/visit-dtransmit', function(req, res) {
    mainController.visitTdata(req, res);
})
Router.post('/support', function(req, res) {
    searchController.supportPost(req, res);
})
// Exports the Router
module.exports = Router;
