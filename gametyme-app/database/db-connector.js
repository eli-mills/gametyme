const mysql = require('mysql');
const {onid, db_pw} = require('./db-credentials.js');

const pool = mysql.createPool({
    connectionLimit     : 10,
    user                : 'root',
    password            : db_pw,
    database            : 'gametyme',
    multipleStatements  : true,
    debug               : true
});

module.exports = pool;