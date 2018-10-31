// Express - define routes
const express = require('express');

//MIDDLEWARE - plugins or libraries we use to extend a web framework
var exphbs = require('express-handlebars');

// Create an object in express
const app = express();

// Connect to Database via MONGOOSE
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

/*
Create Model/Data Layer - where you put the code dedicated to interacting
the database
*/
const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
})

// Create engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRARY OF PROJECTS
// let reviews = [
//     { title: "Great Review", movieTitle: "Batman IT" },
//     { title: "Awesome Movie", movieTitle: "Titanic" },
//     { title: "Funny Movie", movieTitle: "Mall Cop" }
// ]

//ROOT ROUTE - INDEX
app.get('/', (req, res) => {
    Review.find()
    // Provide a function for the Promise to call when it resolves- when it finished whatever it was doing.
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
    })
    // Provide a function for the promise to call if it is rejected. A Promise is rejected if it fails.
    .catch((err) => {
        console.log(err);
    })
})

/*
PRIOR ROOT ROUTE
app.get('/', (req,res) => {
     res.render('home', { msg: 'Handlebars are Cool!'})
})
*/

// Web Server Check
app.listen(3000, () => {
    console.log('App listening on port 3000')
})
