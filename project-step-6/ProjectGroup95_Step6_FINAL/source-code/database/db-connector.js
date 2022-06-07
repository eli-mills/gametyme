const mysql = require('mysql');
const {onid, db_pw} = require('./db-credentials.js');

const pool = mysql.createPool({
    connectionLimit     : 10,
    host                : 'classmysql.engr.oregonstate.edu',
    user                : `cs340_${onid}`,
    password            : db_pw,
    database            : `cs340_${onid}`,
    multipleStatements  : true
});

module.exports = pool;