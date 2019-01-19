(function () {
    "use strict";

    /*************************
     * CONFIGURATION VARIABLES
     *************************/
    const user = process.env.BLUECREW_DB_USER;
    const password = process.env.BLUECREW_DB_PASS;
    const host = process.env.BLUECREW_HOST;
    const database = process.env.BLUECREW_DB;
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
        password,
        database
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    connection.query('SELECT * FROM `cat`', function (error, results, fields) {
        console.log(error, results);
    })

    /***********
     * ENDPOINTS
     ***********/
    app.post('/cat/register', (req, res) => {
        const hash = hashPassword(req.body.password) // or req.data.password;
        // DB call to create the user
    });

    app.post('/cat/login', (req, res) => {
        // query database for the user
        if (checkPassword(req.body.password, hash)) { // or req.data.password;
            res.json(/* some information*/);
        } else {
            res.error(/* passwords don't match */);
        }
    });

    app.get('/cats', (req, res) => {
        connection.query('SELECT * FROM `cat`', function (error, results, fields) {
            console.log(error, results);
        })
    });

    app.get('/cats/random', (req, res) => {

    });

    /*********
     * HELPERS
     *********/

    const hashPassword = password => {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    const checkPassword = (password, hash) => {
        // Load hash from DB.
        return bcrypt.compareSync(password, hash); // true
    }
}());
