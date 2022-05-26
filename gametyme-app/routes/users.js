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




module.exports =  router;