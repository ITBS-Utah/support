const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const sgMail = require('@sendgrid/mail');
const path = require('path');
const WebSocket = require("ws");
const ws = new WebSocket('ws://localhost:9000');

const whitelist = ['https://db.itbsutah.com']

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

ws.on('open', () => {
    console.log('Connected to database websocket');
});

ws.on('close', () => {
    console.log('Disconnected from database websocket');
});

function database_() {
    (this.get = async (path) => {
        ws.on('open', function open() {
            ws.send(JSON.stringify({
                path: path,
                method: 'GET'
            }));
        });

        ws.on('message', (data) => {
            //console.log('msg');
            return data;
        });
    }),
        (this.post = async (path) => {
            return '<h1>Under construction</h1>';
        })
}

const db = new database_();

app.get('/kb/:id', (req, res) => {
    const id = req.params.id;

    db.get(`/knowlagebase/${id}`).then(data => {
        res.send(data)
    })
});

app.get('/api/v1/search', async (req, res) => {
    const filter = req.query.filter;
    const query = req.query.query;

    if (filter && query) {
        /*res.json({
            valid: true,
            data: {
                results: [
                    {
                        title: 'Welcome to the ITBS Utah Fourm',
                        supportId: uuid()
                    }
                ]
            }
        });*/

        const reqToken = uuid();

        ws.send(JSON.stringify({
            path: '/knowlagebase/stuff.json',
            method: 'GET',
            reqToken: reqToken
        }));

        ws.on('message', (rawData) => {
            const data = JSON.parse(rawData)
            if (data.reqToken === reqToken) {
                res.json(data.data);
            }
        });
    } else {
        res.json({
            valid: false,
            errorMsg: 'Missing Data'
        })
    }
});

app.use(express.static(path.join(__dirname, './static/'), { extensions: ['html'] }));
app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname, './static/', 'assets/templates/404.html'));
});

const server = app.listen(2000, () => {
    console.log('ITBS Utah Support server is running');
});