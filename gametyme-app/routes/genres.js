const db = require('../database/db-connector.js');
const ut = require('../utility/utility.js');
const express = require('express');
const router = express.Router();

// Load all Genres
router.get('/', (req, res) => {
    db.query('SELECT * FROM Genres;', (error, results, fields) => {
        if (error) throw error;
        res.render('genres', {data: results});
        console.log('Genres loaded');
    });
}); 

// Add new Genre
router.post('/', (req, res) => {
    // Escape input
    ut.escapeObject(req.body);
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
router.delete('/:genre_id', (req, res) => {
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
router.put('/:genre_id', (req, res) => {
    const genre_id = req.params.genre_id;

    // Escape input
    ut.escapeObject(req.body);
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



module.exports =  router;