const express = require('express');
const app = express();
const PORT = 9500;


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
const platformRouter = require('./routes/platforms.js');

app.use('/genres', genreRouter);
app.use('/locations', locRouter);
app.use('/companies', compRouter);
app.use('/users', userRouter);
app.use('/platforms', platformRouter);


// Home Page
app.get('/',function (req,res) {
    res.render('index');
})

// Games Page
app.get('/games', function (req,res){
    res.render('games');
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
