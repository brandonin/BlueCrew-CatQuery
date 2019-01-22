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
    const jwt = require('jsonwebtoken');

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
                            const token = jwt.sign({username}, secret, {expiresIn:36000});
                            return res.json({status:"success", msg: token});
                        }
                    })
                }
            });
    });

    app.post('/cat/login', (req, res) => {
        // query database for the user
        const username = req.body.username,
              password = req.body.password;
        connection.query('SELECT * FROM `cat` WHERE `username` = ?',
            [username], (err, results) => {
                if (err) return res.status(500).end();
                if(!results || results === []) {
                    res.statusMessage = "Username does not exist";
                    return res.status(401).end();
                }
                if (checkPassword(password, results[0].password)) {
                    connection.query("UPDATE `cat` SET `lastSeenAt` = now() WHERE `username` = ?", [username], (err, result) => {
                        const token = jwt.sign({username}, secret,{expiresIn: 36000});
                        return res.json({
                            status: "success",
                            msg:token
                        })
                    })
                } else {
                    res.statusMessage = "Username/password combination does not exist";
                    return res.status(401).end();
                }
            })

    });

    app.get('/cats', (req, res) => {
        var token = req.headers.authToken;
        jwt.verify(token, secret, function (err, decoded) {
            if(!err){
                connection.query('SELECT birthdate, breed, username, id, imageUrl, name FROM `cat` WHERE username = ? OR id = ? OR name = ? ORDER BY lastSeenAt DESC', [req.body.username, req.body.id, req.body.name], function (error, results) {
                    if (error) return res.status(401).send();
                    if (results.length === 0) return res.status(401).send('invalid search criteria');
                    return res.send(results);
                })
            } else {
                return res.status(401).send(err);
            }
        })
    });

    app.get('/cats/random', (req, res) => {
        connection.query('SELECT imageUrl, name, breed FROM cat ORDER BY RAND() LIMIT 1', (err, result) => {
            if (err) return res.status(401).end();
            return res.json(result);
        })
    });

    /*********
     * HELPERS
     *********/

    const hashPassword = password => {
        return bcrypt.hashSync(password, 10);
    }
    const checkPassword = (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }

    server.listen(PORT, () => {
        console.log('Express server listening on localhost port: ' + PORT);
    });
}());
