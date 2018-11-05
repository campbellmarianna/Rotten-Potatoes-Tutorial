// comment.js

// We need mongoose here to create the new model
const mongoose = require('mongoose')
/*
A reference to the Mongoose Schema object
This object helps Mongoose organize all of the models that it is using.
*/
const Schema = mongoose.Schema

// Comment Model saves a title and content
const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    // add new property: reviewId
    // reviewId = a reference to another Mongoose model, 'Review' in this case
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

// Exports the Comment object by attaching it to module.exports
module.exports = Comment
