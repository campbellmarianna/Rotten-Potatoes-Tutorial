// models/review.js

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

module.exports = Review;
