// Includes
const path = require('path');
const express = require('express');
// Setup
const Router = express.Router();
// Controllers
const accountController = require('../controllers/accountController.js');
const urlShortenerController = require('../controllers/urlShortenerController.js');
// Create the routes
Router.get('/start', function(req, res) {
    urlShortenerController.start(req, res);
})
Router.get('/request/overlay-createurl', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/url-shortener/request/overlay-createurl.html'))
})
Router.get('/request/overlay-viewurl', function(req, res) {
    urlShortenerController.viewUrl(req, res);
})
Router.post('/create-url', function(req, res) {
    urlShortenerController.createUrl(req, res);
})
Router.post('/remove-url', function(req, res) {
    urlShortenerController.removeUrl(req, res);
})
// Exports the Router
module.exports = Router;
