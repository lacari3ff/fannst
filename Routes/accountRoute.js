// Includes
const express = require('express');
// Setup
const Router = express.Router();
// App configuration

// Create the routes
Router.get('/register', function(req, res) {
    console.log('test')
})
// Exports the Router
module.exports = Router;
