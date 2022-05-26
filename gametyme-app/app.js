const express = require('express');
const app = express();
const PORT = 9101;      // 9100


// Handlebars setup
const {engine} = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

// Form encoding middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public'));

// Routers
const genreRouter    = require('./routes/genres.js');
const locRouter      = require('./routes/locations.js');
const compRouter     = require('./routes/companies.js');
const userRouter     = require('./routes/users.js');

app.use('/genres', genreRouter);
app.use('/locations', locRouter);
app.use('/companies', compRouter);
app.use('/users', userRouter);


// Home Page
app.get('/',function (req,res) {
    res.render('index');
})

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

// Playthroughs Page
app.get('/playthroughs', function (req,res){
    res.render('playthroughs');
})

// new-session page
app.get('/new-session', function(req,res){
    res.render('new-session');
})


app.listen(PORT, function(){
    console.log('Server listening on Port' + ' ' + PORT);
});
