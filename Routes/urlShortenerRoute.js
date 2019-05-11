// Includes
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
// Exports the Router
module.exports = Router;
