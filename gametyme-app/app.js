const express = require('express');
const app = express();
const PORT = 9101;      // 9100

const db = require('./database/db-connector.js');
const genreRouter = require('./routes/genres.js');


const {engine} = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

app.use('/genres', genreRouter);


// Home Page
// app.get('/',function (req,res) {
//     res.render('index');
// })

// Games Page
app.get('/games', function (req,res){
    res.render('games');
})

// Companies Page
app.get('/companies',function (req,res) {
    res.render('companies');
})

// Platforms Page
app.get('/platforms', function (req,res){
    res.render('platforms');
})


// Locations Page
app.get('/locations',function (req,res) {
    res.render('locations');
})

// Playthroughs Page
app.get('/playthroughs', function (req,res){
    res.render('playthroughs');
})

// Users Page
app.get('/users',function (req,res) {
    res.render('users');
})

// new-session page
app.get('/new-session', function(req,res){
    res.render('new-session');
})


app.listen(PORT, function(){
    console.log('Server listening on Port' + ' ' + PORT);
});
