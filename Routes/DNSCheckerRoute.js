// Includes
const express = require('express');
// Setup
const Router = express.Router();
// Controllers
const accountController = require('../controllers/accountController.js');
const DNSCheckerController = require('../controllers/DNSCheckerController.js');
// Create the routes
Router.get('/start', function(req, res) {
    DNSCheckerController.start(req, res);
})
Router.get('/check', function(req, res) {
    DNSCheckerController.check(req, res);
})
// Exports the Router
module.exports = Router;
