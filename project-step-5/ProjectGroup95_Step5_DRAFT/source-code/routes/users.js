const db = require('../database/db-connector.js');
const express = require('express');
const router = express.Router();

// Load all Users
router.get('/', (req, res) => {
    db.query('SELECT * FROM Users;', (error, results, fields) => {
        if (error) throw error;
        res.render('users', {data: results});
        console.log('Users loaded');
    });
}); 

// Add Users
router.post('/', (req, res) => { 
    let data = req.body;
    const query = `INSERT INTO Users (first_name,last_name, username,email) VALUES ('${data['input-user-fname']}',
    '${data['input-user-lname']}', '${data['input-username']}', '${data['input-user-email']}');`;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.redirect('/users');
        }
    });
});


// Delete Users
router.delete('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const query = `
        DELETE FROM Users
        WHERE user_id=${user_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error){
            throw error;
        }else{
            res.json(results);
            console.log(results);
            console.log('User deleted');
        }
    });
});

// Update Users
router.put('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    
    const query = `
        UPDATE Users
        SET first_name='${first_name}', last_name='${last_name}', username='${username}', email='${email}'
        WHERE user_id=${user_id};
    `;
    
    db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
        console.log('User edited.');
    });
});




module.exports =  router;