const db = require('../database/db-connector.js');
const ut = require('../utility/utility.js');
const express = require('express');
const router = express.Router();

const readableTimestamp = '%b %d, %Y %r';
const htmlDateTime = '%Y-%m-%dT%H:%i:%s';
// Load all Playthroughs and Sessions
router.get('/', (req, res) => {
    const query = `
    SELECT Playthroughs.playthrough_id AS 'Playthrough ID', DATE_FORMAT(Playthroughs.start_timestamp, '${readableTimestamp}') AS 'Start Timestamp',
    DATE_FORMAT(Playthroughs.start_timestamp, '${htmlDateTime}') AS playthroughStartHtml,
    DATE_FORMAT(Playthroughs.finish_timestamp, '${readableTimestamp}') AS 'Finish Timestamp', 
    DATE_FORMAT(Playthroughs.finish_timestamp, '${htmlDateTime}') AS playthroughFinishHtml,
    Users.user_id AS 'User ID', Users.username AS 'Username',
    Games.game_id AS 'Game ID', Games.game_title AS 'Game Title'
    FROM Playthroughs JOIN Users ON Playthroughs.user_id = Users.user_id
    JOIN Games ON Playthroughs.game_id = Games.game_id
    ORDER BY Playthroughs.playthrough_id ASC;

    SELECT user_id, username AS 'Username' FROM Users;
    SELECT game_id, game_title AS 'Game Title' FROM Games;

    SELECT session_id, TIMESTAMPDIFF(HOUR, session_start, session_end) AS 'Time Played', 
    DATE_FORMAT(session_start, '${readableTimestamp}') AS session_start,
    DATE_FORMAT(session_start, '${htmlDateTime}') AS sessionStartHtml, 
    DATE_FORMAT(session_end, '${readableTimestamp}') AS session_end, 
    DATE_FORMAT(session_end, '${htmlDateTime}') AS sessionEndHtml,
    playthrough_id FROM Sessions;
    `
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('playthroughs', {data: results[0], userSelect: results[1], gameSelect: results[2],sessionSelect: results[3]});
        console.log('Playthroughs loaded');
        console.log(results);
        
    });
}); 


// Add Playthrough
router.post('/', (req, res) => {
    // Escape input
    ut.escapeObject(req.body)
    let {username, game_title}= req.body; 
    const addPlaythroughQuery = `INSERT INTO Playthroughs (start_timestamp, user_id, game_id)
    VALUES ((SELECT CURRENT_TIMESTAMP), (SELECT user_id FROM Users WHERE username = '${username}'), 
    (SELECT game_id FROM Games WHERE game_title='${game_title}'));
    
    `;
    

    db.query(addPlaythroughQuery, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/playthroughs');
        }
    });
});


// Delete Playthrough
router.delete('/:playthrough_id', (req, res) => {
    const playthrough_id = req.params.playthrough_id;
    const query = `
        DELETE FROM Playthroughs
        WHERE playthrough_id=${playthrough_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('Playthrough deleted');
        }
    });
});


// Edit Playthrough
router.put('/:playthrough_id', (req, res) => {
    console.log('edit playthrough request received');
    // Escape input
    ut.escapeObject(req.body);
    console.log('body: ', req.body);
    const playthrough_id = req.params.playthrough_id;

    // Generate list of attributes to update from new values
    let updatesArray = [];
    for ( attribute in req.body ) {
        updatesArray.push(`${attribute}='${req.body[attribute]}'`);
    }
    const updateString = updatesArray.join(',');
    console.log(updateString);

    // Run query
    const query = `
    UPDATE Playthroughs
    SET ${updateString}
    WHERE playthrough_id='${playthrough_id}';
    `;
    console.log(query);
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
        console.log('Playthroughs edited.');
    });
});

module.exports =  router;