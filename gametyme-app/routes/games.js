const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

// Load page
router.get('/', (req, res) => {
    const loadGames = `
    SELECT Games.game_id AS 'Game ID', Games.game_title AS 'Game Title', Games.game_summary AS 'Game Summary', 
    DATE_FORMAT(Games.release_date, '%b %d, %Y') AS 'Release Date', 
    Companies.company_name AS 'Company', Genres.genre_name AS 'Genre', 
    GROUP_CONCAT(Platforms.platform_name ORDER BY Platforms.platform_name ASC SEPARATOR ', ') AS 'Platforms'
    FROM Games JOIN GamesPlatforms ON Games.game_id=GamesPlatforms.game_id
    JOIN Platforms ON GamesPlatforms.platform_id=Platforms.platform_id
    JOIN Companies ON Games.company_id=Companies.company_id
    JOIN Genres ON Games.genre_id=Genres.genre_id
    GROUP BY Games.game_id;
    `;

    const loadCompanies = 'SELECT company_id, company_name FROM Companies;';
    const loadGenres = 'SELECT genre_id, genre_name FROM Genres;';
    const loadPlatforms = 'SELECT platform_id, platform_name FROM Platforms;'

    const query = loadGames.concat(loadCompanies, loadGenres, loadPlatforms); 

    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('games', {
            data:       results[0], 
            companies:  results[1], 
            genres:     results[2],
            platforms:  results[3]
        });
        console.log('Games loaded');
    });
}); 


/** Add New Game 
 *      Adds a new Game to the Games table with the given title, summary, release date,
 *      company, and genre. Additionally, runs a loop for every given platform_id to create
 *      new GamesPlatforms entries.
 * 
 * */ 

router.post('/', (req, res) => { 
    console.log('Post request received: \n', req.body);
    const { game_title, game_summary, release_date, company_id, genre_id, platform_ids } = req.body;
    let query = `
        INSERT INTO Games (game_title, game_summary, release_date, company_id, genre_id)
        VALUES ('${game_title}', '${game_summary}', '${release_date}', ${company_id}, ${genre_id});
    `;

    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        } else {
            // Game successfully added to Games table.
            console.log('POST query successful: \n', results)


            const game_id = results.insertId;
            
            // Create GamesPlatforms entries using newly-created game_id.
            for (platform_id of platform_ids) {
                gamePlatformQuery = `
                INSERT INTO GamesPlatforms (game_id, platform_id)
                VALUES (${game_id}, ${platform_id});
                `;
                console.log('Attempting query: \n', gamePlatformQuery);
                db.query(gamePlatformQuery, (error, results, fields) => {if (error) throw error});
            };


            console.log('GamesPlatforms added.');
            res.redirect('/games');
        }
    });
});

// Delete Game
router.delete('/:game_id', (req, res) => {
    const game_id = req.params.game_id;
    const query = `
        DELETE FROM Games
        WHERE game_id=${game_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('Game deleted');
        }
    });
});

/** Edit Game
 *      Updates given game ID with given title, summary, release date, company id, and genre id.
 *      Checks which GamesPlatforms need to be deleted and which need to be added, then executes
 *      the appropriate queries.
 * 
 *      URL: /games/:game_id (where game_id is a number representing game to be updated)
 * 
 *      Request body: receives a Javascript object with the following properties (names must be exact):
 *              game_title
 *              game_summary
 *              release_date
 *              company_id
 *              genre_id
 *              platform_ids (this must be an array containing all selected platforms)
 * 
 * 
 * 
*/
router.put('/:game_id', (req, res) => {
    const game_id = req.params.game_id;
    const { game_title, game_summary, release_date, company_id, genre_id, platform_ids } = req.body;
    const query = `
        UPDATE Games
        SET game_title='${game_title}', game_summary='${game_summary}', release_date='${release_date}', 
            company_id=${company_id}, genre_id=${genre_id}
        WHERE game_id=${game_id};    
    `;

    // Get current GamesPlatforms
    const gpQuery = `
        SELECT platform_id FROM GamesPlatforms WHERE game_id=${game_id};
    `;

    let existingPlatforms = [];

    db.query(gpQuery, (error, results, fields) => {
        if (error) { 
            throw error;
        } else {
            for ( let result of results ) {
                existingPlatforms.append(result.platform_id);
            }
        }
    });

    // Find GamesPlatforms that have been deleted in update (in old and not in new)
    const platsToDelete = existingPlatforms.filter(platform => {!(platform_ids.includes(platform))});

    // Find GamesPlatforms that need to be added (in new and not in old)
    const platsToAdd = platform_ids.filter(platform=>{!(existingPlatforms.includes(platform))});

    // Delete appropriate GamesPlatforms
    for (let platform_id of platsToDelete) {
        const delQuery = `
            DELETE FROM GamesPlatforms
            WHERE game_id=${game_id} AND platform_id=${platform_id};
        `
        db.query(delQuery, (error, results, fields) => {if (error) throw error;});
    }

    // Add appropriate GamesPlatforms
    for (let platform_id of platsToAdd) {
        const addQuery = `
            INSERT INTO GamesPlatforms (game_id, platform_id)
            VALUES (${game_id}, ${platform_id});
        `
        db.query(addQuery, (error, results, fields) => {if (error) throw error;});
    }

    // Update rest of Games entry
    db.query(query, (error, results, fields) => {
        if (error) throw error;

        console.log(results);
        res.json(results);
    });
})



module.exports =  router;