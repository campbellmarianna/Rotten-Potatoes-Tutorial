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

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// Connect to Database via MONGOOSE
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

/*
Create Model/Data Layer - where you put the code dedicated to interacting
the database
*/
const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number,
})

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
    .catch(err => {
        console.log(err);
    })
})

//NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});

});

//CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
        console.log(err.message);
    })
});

// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message);
    })
});

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
    })
});

//UPDATE
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    })
    .catch(err => {
        console.log(err.message)
    })
});
// Web Server Check
app.listen(3000, () => {
    console.log('App listening on port 3000')
})
