const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const sgMail = require('@sendgrid/mail');
const path = require('path');

const whitelist = ['https://itbsutah.com', 'https://support.itbsutah.com', 'https://db.itbsutah.com']

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

const app = express();

app.use(express.json());
app.use(cors(corsOptionsDelegate));

app.use(express.static(path.join(__dirname, '/static/')));

function database_() {
    (this.get = async function (path) {
        return '<h1>Under construction</h1>';
    }),
        (this.post = async function (path) {
            return '<h1>Under construction</h1>';
        })
}

const db = new database_();

app.get('/kb/:id', async (req, res) => {
    const id = req.params.id;

    db.get(`/kb/${id}`).then(data => {
        res.send(data)
    })
});

const server = app.listen(2000, () => {
    console.log('ITBS Utah Support server is running');
});