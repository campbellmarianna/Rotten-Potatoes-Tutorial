// Express - define routes
const express = require('express');
//MIDDLEWARE - plugins or libraries we use to extend a web framework
var exphbs = require('express-handlebars');

// Create an object in express
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




// OUR MOCK ARRARY OF PROJECTS
let reviews = [
    { title: "Great Review", movieTitle: "Batman IT" },
    { title: "Awesome Movie", movieTitle: "Titanic" },
    { title: "Funny Movie", movieTitle: "Mall Cop" }
]

//ROOT ROUTE - INDEX
app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: reviews });
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
