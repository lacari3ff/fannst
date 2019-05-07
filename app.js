// Includes
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Setup
const app = express();
// App configuration
app.use(bodyParser.urlencoded(extended: false));
app.use(cookieParser());
// Require the Routes
const searchRoute = require('./routes/searchRoute.js');         // The route for the search section at /
const accountRoute = require('./routes/accountRoute.js');       // The route for the accounts section at /account/
const toDoRoute = require('./routes/toDoRoute.js');             // The route for the To-Do Section at /to-do/
// Link the Routes to app listeners
app.use('/', searchRoute);
app.use('/account', accountRoute);
app.use('/to-do', toDoRoute);
// Listens the port
app.listen(80);
