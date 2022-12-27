const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const sgMail = require('@sendgrid/mail');

const whitelist = ['https://itbsutah.com', 'https://support.itbsutah.com']

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

const server = app.listen(2000, () => {
    console.log('ITBS Utah Support server is running');
});