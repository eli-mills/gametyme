const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

// Load all Platforms
router.get('/', (req, res) => {
    const query = `
    SELECT Platforms.platform_id AS 'Platform ID', Platforms.platform_name AS 'Platform Name', Companies.company_name AS 'Company'
    FROM Platforms JOIN Companies ON Platforms.company_id=Companies.company_id;
    `;
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('platforms', {data: results});
        console.log('Platforms loaded');
        console.log(results);
    });
}); 


// Add New Platform

router.post('/', (req, res) => { 
    let data = req.body;
    const query = `INSERT INTO Platforms (platform_name, company_id) VALUES ('${data['input-platform']}',
    (SELECT company_id FROM Companies WHERE company_name=${data['input-company-select']}));`;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/platforms');
        }
    });
});

// Delete Platforms
router.delete('/:platform_id', (req, res) => {
    const platform_id = req.params.platform_id;
    const query = `
        DELETE FROM Platforms
        WHERE platform_id=${platform_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('Platform deleted');
        }
    });
});



module.exports =  router;