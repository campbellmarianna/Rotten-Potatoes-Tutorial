// controllers/comments.js
// const Comment = require()
const Comment = require('../models/comment')

module.exports = (app) => {

     //NEW Comment
     // app.post('/reviews/comments', (req, res) => {
     // });
     // CREATE Comment
     app.post('/reviews/comments', (req, res) => {
         Comment.create(req.body).then(comment => {
             res.redirect(`/reviews/${comment.reviewId}`);
             console.log(comment)
         }).catch((err) => {
             console.log(err.message);
         });
     });
};
