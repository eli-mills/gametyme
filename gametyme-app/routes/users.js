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




module.exports =  router;