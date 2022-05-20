const express = require('express');
const app = express();
const PORT = 9501;

const db = require('./database/db-connector.js');


const {engine} = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');
const path = require('path');
const router = express.Router();
app.use('/', router);   

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));


// Home Page
app.get('/',function (req,res) {
    res.render('index');
})


// Genres Page
// Load Genres table 
app.get('/genres', (req, res) => {
    db.query('SELECT * FROM Genres;', (error, results, fields) => {
        if (error) throw error;
        res.render('genres', {data: results});
        console.log('Genres loaded');
    });
});

// Add new Genre
app.post('/add-genres', (req, res) => {
    let genre_name = req.body; 
    const addGenreQuery = `INSERT INTO Genres (genre_name) VALUES ('${genre_name['input-genrename']}');`;
    
    db.query(addGenreQuery, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/genres');
        }
    });
});


// Delete Genre

app.delete('/delete-genre/:genre_id', (req, res) => {
    const genre_id = req.params.genre_id;
    const deleteGenreQuery = `DELETE FROM Genres WHERE genre_id='${genre_id}'`;
    
    db.query(deleteGenreQuery, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('Genre deleted');
        }
    });
});


// Edit Genre
app.put('/edit-genre/:genre_id', (req, res) => {
    const genre_id = req.params.genre_id;
    const genre_name = req.body.genre_name;
    
    const editGenreQuery = `
    UPDATE Genres 
    SET genre_name='${genre_name}' 
    WHERE genre_id='${genre_id}';
    `;
    
    db.query(editGenreQuery, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
        console.log('Genre edited.');
    });
});


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
