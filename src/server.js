const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'memory'
})

const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser.json())

//Routes
app.get('/top5', (req, res) => {
    // rows : les lignes retournées par le server
    // fields : extra meta data, si existantes
    db.query('SELECT time, hits FROM scores ORDER BY time ASC LIMIT 5', (err, rows, fields) => {
        res.send(rows)
    })
})

app.post('/win', (req, res) => {
    console.log('data received :', req.body)
    if (req.body.time !== undefined && req.body.hits !== undefined) {
        db.query('INSERT INTO scores (time, hits) VALUES (?, ?)', [
            req.body.time,
            req.body.hits
        ], (err, rows, fields) => {
            res.send(rows)
        })
    } else {
        res.send({error: 'data is missing', data: req.body})
    }
})

app.listen(3000, () => console.log('app is running'))