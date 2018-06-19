const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    return {
        response:"hello world!"
    };
});

module.exports.handler = serverless(app);
