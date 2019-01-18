(function () {
    "use strict";

    /*************************
     * CONFIGURATION VARIABLES
     *************************/
    const user = process.env.BLUECREW_DB_USER;
    const password = process.env.BLUECREW_DB_PASS;
    const host = process.env.BLUECREW_HOST;
    const db = process.env.BLUECREW_DB;
    const PORT = process.env.BLUECREW_SERVER_PORT || 9001;

    /***********
     * LIBRARIES
     ***********/
    const axios = require('axios');
    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const http = require('http');
    const mysql = require('mysql');

    /*******
     * SETUP
     *******/
    const app = express();
    const server = http.createServer(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cors());

    const connection = mysql.createConnection({
        host,
        user,
        password
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    connection.query('SELECT * FROM "cats";', function (error, results, fields) {
        console.log(error, results, fields);
    })
    /***********
     * ENDPOINTS
     ***********/
    app.post('/cat/register', (req, res) => {

    });

    app.post('/cat/login', (req, res) => {

    });

    app.get('/cats', (req, res) => {

    });

    app.get('/cats/random', (req, res) => {

    });
}());
