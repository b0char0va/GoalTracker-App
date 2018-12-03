const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./../database/model.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`listening at ${port}`);
});

app.get('/user/:email/:password', (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    db.exists(email, password, (err, data) => {
        if (err) {
            res.end(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        }
    });
});

app.post('/user', (req, res) => {
    const data = req.body;
    db.save(data, (err, data) => {
        if (err) {
            res.end(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        }
    });
});

app.post('/users/:id/goal', (req, res) => {
    const data = req.body;
    db.saveGoal(data, (err, data) => {
        if (err) {
            res.end(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        }
    });
});

app.patch('/users/:id/goal', (req, res) => {
    const data = req.body;
    db.editGoal(data, (err, data) => {
        if (err) {
            res.end(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        }
    });
});