// test-reviews.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');
// add a sampleReview
const sampleReview = {
    "title": "Super Sweet Review",
    "movie-title": "La La Land",
    "description": "A great review of a lovely movie."
}

chai.use(chaiHttp);

// tell mocha you want to test Reviews (this string is taco)
describe('Reviews', () => {
    /* use an after() test hook that mocha provides for the dump truck to come
    around and delete all our sample reviews after each test */
    after(() => {
        Review.deleteMany({title: 'Super Sweet Review'}).exec((err, reviews) => {
            cosole.log(reviews)
            reviews.remove();
        })
    });
    // make taco name for the test
    // TEST INDEX
    it('should index ALL reviews on / GET', (done) => {
        // use chai-http to make a request to your server
        chai.request(server)
            // send a GET request to root route
            .get('/')
            // wait for response
            .end((err, res) => {
                // check that the response status is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html;
                // end this test and move onto the next
                done();
            });
    });

    //TEST NEW
    it('should display new form on /reviews/new GET', (done) => {
        // send chai-http to make a request to your server
        chai.request(server)
        // send a GET request to NEW route
            .get(`/reviews/new`)
                // wait for response
                .end((err, res) => {
                    // check that the response status is = 200 (success)
                    res.should.have.status(200);
                    // check that the response is a type html
                    res.should.be.html
                    // end this test and move onto the next
                    done();
                });
    })


/*
To test the rest of the tests we'll need sample test data in our database.
We can put test data in pretty easily, but we'll also have to send a dump truck
around after testing to remove the new data we've created, otherwise every time
we run our tests, we'll be adding documents to our database.
*/

    // TEST CREATE
    it('should create a SINGLE review on /reviews POST', (done) => {
        chai.request(server)
            .post('/reviews')
            .send(sampleReview)
            //wait for response
            .end((err, res) => {
                // check that the response is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html
                // end this test and move on to the next one
                done();
            });
    });
    // TEST SHOW
    it('should show a SINGLE review /reviews/<id> GET', (done) => {
        // create a review during the SHOW route test
        var review = new Review(sampleReview);
        review.save((err, data) => {
            // send chai-http to make a request to your server
            chai.request(server)
            // send a GET request to SHOW route
            .get(`/reviews/${data._id}`)
            // wait for response
            .end((err,res) => {
                // check that the response status is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html
                // end this test and move on to the next one
                done();
            });
        });
    });

    // TEST EDIT
    it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
        // create a review during the EDIT route test
        var review = new Review(sampleReview);
        review.save((err, data) => {
            // send chai-http to make a request to your server
            chai.request(server)
            // send a GET request to EDIT route
            .get(`/reviews/${data._id}/edit`)
            //wait for a response
            .end((err, res) => {
                // check that the response status is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html
                // end this test and move on to the next one
                done();
            });
        });
    });

    /*
    For update we have to create the sample review, then send in a PUT message
    with a change and see if it responses with a 200.
    */
    // TEST UPDATE
    it('should update a SINGLE review on /reviews/<id> PUT', (done) => {
        // create a review during the UPDATE route test
        var review = new Review(sampleReview);
        review.save((err, data) => {
            // send chai-http to make a request to your server
            chai.request(server)
            // send a PUT request to UPDATE route
            .put(`/reviews/${data._id}?_method=PUT`)
            .send({'title': 'Updating the title'})
            // wait for a response
            .end((err, res) => {
                // check that the response is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html
                // end this test and move to the next one
                done();
            });
        });
    });
    /*
    We'll create the sample review, then send in a delete message to see if we
    can destroy it and get a 200 status back.
    */
    // TEST DELETE
    it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {
        // create review during DELETE route test
        var review = new Review(sampleReview);
        review.save((err, data) => {
            // send chai-http to make a request to your server
            chai.request(server)
            .delete(`/reviews/${data._id}?_method=DELETE`)
            // wait for a response
            .end((err, res) => {
                // check that the response is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html
                // end this test and move to the next one
                done();
            });
        });
    });

})
