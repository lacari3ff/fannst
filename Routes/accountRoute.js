// Includes
const express = require('express');
// Setup
const Router = express.Router();
// Controllers
const accountController = require('../controllers/accountController.js');
// Create the routes
Router.get('/start', function(req, res) {
    accountController.start(req, res);
})
// Exports the Router
module.exports = Router;
