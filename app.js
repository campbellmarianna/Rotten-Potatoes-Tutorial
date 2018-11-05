// app.js
// Express - define routes
const express = require('express');

//MIDDLEWARE - plugins or libraries we use to extend a web framework
const exphbs = require('express-handlebars');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// MIDDLEWARE
const methodOverride = require('method-override');

// Create an object in express
const app = express();

// Create engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Add Body Parser that allows express to see form data that is coming in from a POST request.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// Import our reviews.js file into our app.js file
const reviews = require('./controllers/reviews')(app);

/*
Instead of using require you can use code below:
// reviews(app);
*/

// Point this production mongodb database URI
// const port = process.env.PORT || 3000;
// app.listen(port);

module.exports = app;


// Web Server Check
app.listen(3000, () => {
    console.log('App listening on port 3000')
})
