// Express - define routes
const express = require('express');
//MIDDLEWARE - plugins or libraries we use to extend a web framework
var exphbs = require('express-handlebars');

// Create an object in express
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// ROOT ROUTE
app.get('/', (req,res) => {
    res.render('home', { msg: 'Handlebars are Cool!'})
})




// Check if your connected to server
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Web Server Check
app.listen(3000, () => {
    console.log('App listening on port 3000')
})
