const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

// Load page
router.get('/', (req, res) => {
    const query = `
    SELECT Games.game_id AS 'Game ID', Games.game_title AS 'Game Title', Games.game_summary AS 'Game Summary', Games.release_date AS 'Release Date', 
    Companies.company_name AS 'Company', Genres.genre_name AS 'Genre', 
    GROUP_CONCAT(Platforms.platform_name ORDER BY Platforms.platform_name ASC SEPARATOR ', ') AS 'Platforms'
    FROM Games JOIN GamesPlatforms ON Games.game_id=GamesPlatforms.game_id
    JOIN Platforms ON GamesPlatforms.platform_id=Platforms.platform_id
    JOIN Companies ON Games.company_id=Companies.company_id
    JOIN Genres ON Games.genre_id=Genres.genre_id
    GROUP BY Games.game_id;
    `;

    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('games', {data: results});
        console.log('Games loaded');
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