import { onid, db_pw } from './db-credentials.mjs';
import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit     : 10,
    host                : 'classmysql.engr.oregonstate.edu',
    user                : `cs340_${onid}`,
    password            : db_pw,
    database            : `cs340_${onid}`
});

export {pool};