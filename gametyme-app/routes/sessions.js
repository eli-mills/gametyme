const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

// Add Sessions
router.post('/', (req, res) => {

    let data= req.body; 
    const addSessionQuery = `
    INSERT INTO Sessions (session_start, playthrough_id)
    VALUES ('${data['input-session-start']}', '${data['input-playthrough-id']}');
    
    `;
    

    db.query(addSessionQuery, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/playthroughs');
        }
    });
});

// Delete Sessions
router.delete('/:session_id', (req, res) => {
    const session_id = req.params.session_id;
    const query = `
        DELETE FROM Sessions
        WHERE session_id=${session_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('Session deleted');
        }
    });
});

// Edit Sessions
router.put('/:session_id', (req, res) => {
    const session_id = req.params.session_id;
    
    // Generate list of attributes to update from new values
    let updatesArray = [];
    for ( attribute in req.body ) {
        updatesArray.push(`${attribute}='${req.body[attribute]}'`);
    }
    const updateString = updatesArray.join(',');
    console.log(updateString);

    const query = `
    UPDATE Sessions
    SET ${updateString}
    WHERE session_id='${session_id}';

    `;
    console.log(query);
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
        console.log('Sessions edited.');
    });
});

module.exports =  router;