const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express()
app.use(express.json());
app.use(cors())

const connection = mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
    database: 'sql5678973',
    user: 'sql5678973',
    password: 'GnqlYWwcZ2'
})

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM productData';
    connection.query(sql, (err, data) => {
        if(err) throw err;
        return res.json(data)
    })
})

app.post('/subscriptions', (req, res) => {
    const { email } = req.body;
    const sql = 'INSERT INTO user_emails (email) VALUES (?)';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error saving email');
        }
        res.status(200).send('Email saved successfully');
    });
});

app.post('/unsubscribe', (req, res) => {
    const { email } = req.body;
    const sql = 'DELETE FROM user_emails WHERE email = ?';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error deleting email');
        }
        res.status(200).send('Email removed successfully');
    });
});





app.get('/', (req, res) => {
    return res.json('Loading Backend...')
})


app.get("*", (req, res) => {
    res.render('error', {
        title: 'ERROR',
        error: `404 Data Not Found`
    })
})

app.listen(4000, () => {
    console.log('Listening on port 4000');
})
