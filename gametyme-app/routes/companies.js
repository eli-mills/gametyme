const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

/**
 * Loads all Companies. 
 * 
 * Route:              GET /companies
 * Route parameters:   None
 * Body:               None
 */
router.get('/', (req, res) => {
    const query = `
        SELECT Companies.company_id AS 'Company ID', Companies.company_name AS 'Company Name', 
        CONCAT_WS(', ', Locations.city, Locations.state, Locations.country) AS 'Location',
        Locations.location_id AS 'Location ID'
        FROM Companies JOIN Locations on Companies.location_id=Locations.location_id;

        SELECT location_id, CONCAT_WS(', ', city, state, country) AS 'Location' 
        FROM Locations;
    `;
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('companies', {data: results[0], locSelect: results[1]});
        console.log('Companies loaded');
        console.log(results);
    });
}); 

/**
 * Adds a new Company.
 * 
 * Route:               POST /companies
 * Route parameters:    None
 * Body:                { company_name, location_id } 
 */
router.post('/', (req, res) => { 
    let {company_name, location_id} = req.body;
    const query = `
        INSERT INTO Companies (company_name, location_id)
        VALUES ('${company_name}', '${location_id}');
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/companies');
        }
    });
});

/** Deletes the Company with the given company_id.
 * 
 * Route:               DELETE /companies/:company_id
 * Route parameters:    :company_id
 * Body:                None
 */
router.delete('/:company_id', (req, res) => {
    const company_id = req.params.company_id;
    const query = `
        DELETE FROM Companies
        WHERE company_id=${company_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('Company deleted');
        }
    });
});

/**
 * Edits the Company with the given company_id to have the
 * given attributes. 
 * 
 * Route:               PUT /companies/:company_id
 * Route Parameters:    :company_id
 * Body:                { company_name, location_id }
 */
router.put('/:company_id', (req, res) => {
    const company_id = req.params.company_id;
    const { company_name, location_id } = req.body;
    
    const query = `
        UPDATE Companies
        SET company_name='${company_name}', location_id='${location_id}'
        WHERE company_id=${company_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
        console.log('Company edited.');
    });
});



module.exports =  router;