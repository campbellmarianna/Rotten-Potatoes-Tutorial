// controllers/reviews.js
const Review = require('../models/review');

module.exports = function(app, review) {
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
        });
    });

    //NEW
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {});
    });

    //CREATE
    app.post('/reviews', (req, res) => {
        console.log(req.body);
        Review.create(req.body).then((review) => {
            console.log(review);
            res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // SHOW
    app.get('/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            res.render('reviews-show', { review: review })
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // EDIT
    app.get('/reviews/:id/edit', function (req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review});
        });
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
        });
    });

    // DELETE
    app.delete('/reviews/:id', function (req,res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        });
    });

}
