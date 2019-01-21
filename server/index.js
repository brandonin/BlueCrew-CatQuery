(function () {
    "use strict";

    /*************************
     * CONFIGURATION VARIABLES
     *************************/
    const user = process.env.BLUECREW_DB_USER;
    const secret = process.env.BLUECREW_SECRET;
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
    const jwt = require('express-jwt');


    /*******
     * SETUP
     *******/
    const app = express();
    const server = http.createServer(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

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

    /***********
     * ENDPOINTS
     ***********/
    app.post('/cat/register', (req, res) => {
        let errors = []
        if (!req.body.username) {
            errors.push("No username provided");
        }
        if (req.body.password.length < 8) {
            errors.push(" Password is less than 8 characters");
        }
        if (!req.body.name) {
            errors.push(" Name is missing!");
        }
        if (errors.length > 0) {
            res.statusMessage = errors;
            return res.status(401).end();
        }

        connection.query("SELECT * FROM `cat` WHERE username = ?",
            [req.body.username], (error, results) => {
                if (results.length > 0) {
                    res.statusMessage = "user already exists.";
                    return res.status(401).end();
                } else {
                    const hash = hashPassword(req.body.password);
                    connection.query('INSERT INTO `cat` (name, username, password, birthdate, breed, imageUrl, weight, lastSeenAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.body.name, req.body.username, hash, req.body.birthdate, req.body.breed, req.body.imageUrl, req.body.weight, new Date()], (err, result) => {
                        if (err) {
                            res.statusMessage = err;
                            return res.status(401).end();
                        } else {
                            return res.status(200).send("user created successfully");
                        }
                    })
                }
            });
    });

    app.post('/cat/login', (req, res) => {
        // query database for the user
        connection.query('SELECT id FROM `cat` WHERE `username` = ?',
            [req.body.username], (error, results) => {
                console.log(error, results);
                if(!results) {
                    res.statusMessage = "Username/Password Combination does not exist";
                    return res.status(401).end();
                }
                console.log('results', results)
                // if (checkPassword(req.body.password, hash)) {
                //     res.json( /* some information*/ );
                // } else {
                //     res.error( /* passwords don't match */ );
                // }
            })

    });

    app.get('/cats', jwt({secret}), (req, res) => {
        console.log('herro')
        if (!req.user) {
            res.statusMessage = "Please log in to continue";
            return res.status(401).end();
        }
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
