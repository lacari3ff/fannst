// configuration
const port = 80;
// Includes
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Setup
const app = express();
// App configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('./public'));
// Require the Routes
const mainRoute = require('./routes/mainRoute.js');         // The route for the main section at /
const accountRoute = require('./routes/accountRoute.js');       // The route for the accounts section at /account/
const toDoRoute = require('./routes/toDoRoute.js');             // The route for the To-Do Section at /to-do/
// Link the Routes to app listeners
app.use('/', mainRoute);
app.use('/account', accountRoute);
app.use('/to-do', toDoRoute);
// Listens the port
app.listen(port, function() {
    var date = new Date();
    console.log(date.toString() + '\nServer started at: ' + port);
});
