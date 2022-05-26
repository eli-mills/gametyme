const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

/**
 * Loads all Locations. 
 * 
 * Route:              GET /locations
 * Route parameters:   None
 * Body:               None
 */
router.get('/', (req, res) => {
    const query = `SELECT * FROM Locations;`;
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('locations', {data: results});
        console.log('Locations loaded');
        console.log(results);
    });
}); 

/**
 * Adds a new Location.
 * 
 * Route:               POST /locations
 * Route parameters:    None
 * Body:                {city, state, country} 
 */
router.post('/', (req, res) => { 
    let data = req.body;
    const query = `INSERT INTO Locations (city,state,country) VALUES ('${data['input-city']}',
    '${data['input-state']}', '${data['input-country']}');`;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/locations');
        }
    });
});

/** Deletes the Location with the given location_id.
 * 
 * Route:               DELETE /locations/:location_id
 * Route parameters:    :location_id
 * Body:                None
 */
router.delete('/:location_id', (req, res) => {
    const location_id = req.params.location_id;
    const query = `
        DELETE FROM Locations
        WHERE location_id=${location_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('Location deleted');
        }
    });
});

/**
 * Edits the Location with the given location_id to have the
 * given attributes. 
 * 
 * Route:               PUT /locations/:location_id
 * Route Parameters:    :location_id
 * Body:                { city, state, country }
 */
router.put('/:location_id', (req, res) => {
    const location_id = req.params.location_id;
    const { city, state, country } = req.body;
    
    const query = `
        UPDATE Locations
        SET city=${city}, state=${state}, country=${country}
        WHERE location_id=${location_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
        console.log('Location edited.');
    });
});



module.exports =  router;