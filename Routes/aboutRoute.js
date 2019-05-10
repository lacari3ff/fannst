// Includes
const express = require('express');
// Setup
const Router = express.Router();
// Controllers
const accountController = require('../controllers/accountController.js');
const aboutController = require('../controllers/aboutController.js');
// Create the routes
Router.get('/index', function(req, res) {
    aboutController.index(req, res);
})
// Exports the Router
module.exports = Router;
