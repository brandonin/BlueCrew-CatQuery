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
    const bcrypt = require('bcrypt');

    /*******
     * SETUP
     *******/
    const app = express();
    const server = http.createServer(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Add headers
    // app.use(function (req, res, next) {

    //     // Website you wish to allow to connect
    //     res.setHeader('Access-Control-Allow-Origin', '*');

    //     // Request methods you wish to allow
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //     // Request headers you wish to allow
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //     // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    //     // res.setHeader('Access-Control-Allow-Credentials', true);

    //     // Pass to next layer of middleware
    //     next();
    // });

    app.use(cors({origin: '*'}));

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
        if (req.body.password.length < 8) {
            console.log('lhey')
            res.statusMessage = "Password is less than 8 characters";
            res.status(401).end();
        }
        res.status('hello')
        const hash = hashPassword(req.body.password) // or req.data.password;
        // DB call to create the user
    });

    app.post('/cat/login', (req, res) => {
        // query database for the user
        console.log('herrroooo')
        res.send('hello');
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

    server.listen(PORT, () => {
        console.log('Express server listening on localhost port: ' + PORT);
    });
}());
