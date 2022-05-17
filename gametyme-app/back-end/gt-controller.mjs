import express from 'express';
import {pool as db} from './gt-model.mjs';

const app = express();
const PORT = 3000;
 

app.get('/', (req, res) => {
    db.query('SELECT * FROM GENRES;', (error, rows, fields) => {
        res.send(JSON.stringify(rows));
    });
});

app.listen(PORT);