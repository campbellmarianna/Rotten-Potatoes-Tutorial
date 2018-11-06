// app.js
// https://rotten-potatoes-mc.herokuapp.com
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

const mongoose = require('mongoose');

// Import Comment object by require Comment in app.js
const Comment = require('./models/comment');

// Import comments by require comments in app.js
const commentsController = require('./controllers/comments');

// Import models/review.js into app.js
const Review = require('./models/review');

// Import our reviews.js file into our app.js file
const reviewsContoller = require('./controllers/reviews');

// Create engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Add Body Parser that allows express to see form data that is coming in from a POST request.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));



/*
Instead of using require you can use code below:
*/
reviewsContoller(app);
commentsController(app);

// Point this production mongodb database URI
const port = process.env.PORT || 3000;

// Mongoose Connection
const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/rotten-potatoes";
mongoose.connect(
   mongoUri,
   { useNewUrlParser: true }
);


// Web Server Check
app.listen(port, () => {
    console.log('App listening on port 3000')
})

module.exports = app;
