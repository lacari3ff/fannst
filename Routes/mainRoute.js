// Includes
const express = require('express');
//Helpers
const expressHelper = require('../help/expressHelper.js');
// Setup
const Router = express.Router();
// App configuration

// Create the routes
Router.get('/signup', function(req, res) {
    res.render('main/signup.ejs');
})
// Exports the Router
module.exports = Router;
