const express = require('express');


const app = express();
const port = 3001;

app.use(express.static("public")); //or single quotes
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);


/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser');


//problem 1
app.get('/getty', function (req, res) {
    res.render('gettysburg.html');
});

//problem 2
app.get('/maxMin', function (req, res) {
    res.render('maxMin.html');
});


//problem 5
app.get('/order', function (req, res) {
    res.render('price.html');
});

//problem4
app.get('/list', function (req, res) {
    res.render('hideableLists.html');
});


/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => console.log('On port!'))