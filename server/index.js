(function () {
    "use strict";

    /***********
     * LIBRARIES
     ***********/
    const axios = require('axios');
    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const http = require('http');

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
