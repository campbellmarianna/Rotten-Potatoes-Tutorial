// controllers/comments.js

module.exports = (app) => {
     //NEW Comment
     app.post('/Reviews/comments', (req, res) => {
         res.send('reviews comment')
     });
};
