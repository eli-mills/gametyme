const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

// Load all Platforms
router.get('/', (req, res) => {
    const query = `
    SELECT Platforms.platform_id AS 'Platform ID', Platforms.platform_name AS 'Platform Name', 
    Companies.company_name AS 'Company', Companies.company_id AS 'Company ID'
    FROM Platforms JOIN Companies ON Platforms.company_id=Companies.company_id
    ORDER BY Platforms.platform_id ASC;

    SELECT company_id, company_name FROM Companies;
    `;

    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('platforms', {data: results[0], compSelect: results[1]});
        console.log('Platforms loaded');
        console.log(results);
    });
}); 


// Add New Platform

router.post('/', (req, res) => { 
    console.log(req.body);
    const { addPlatformName, addCompanyId } = req.body;
    const query = `
        INSERT INTO Platforms (platform_name, company_id) 
        VALUES ('${addPlatformName}', '${addCompanyId}');
    `;
    
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

// Edit Platforms
router.put('/:platform_id', (req, res) => {
    const platform_id = req.params.platform_id;
    const { platform_name, company_id } = req.body;
    const query = `
        UPDATE Platforms
        SET platform_name='${platform_name}', company_id=${company_id}
        WHERE platform_id=${platform_id};
    `;

    db.query(query, (error, results, fields) => {
        if (error) throw error;

        console.log(results);
        res.json(results);
    });
})



module.exports =  router;