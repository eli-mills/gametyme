const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

    let data= req.body; 
    const addSessionQuery = `
    INSERT INTO Sessions (session_start, playthrough_id)
    VALUES ((SELECT CURRENT_TIMESTAMP), '${data['input-playthrough-id']}');
    
    `;
    

    db.query(addSessionQuery, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/playthroughs');
        }
    });
});

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


module.exports =  router;