const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const AWS = require('aws-sdk');

const { GOALIE_TABLE } = process.env;
const dynamoDb = new AWS.DynamoDB.DocumentClient();


app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send({
    response: 'hello world!',
  });
});

app.get('/goal/:goalId', (req, res) => {
  const params = {
    TableName: GOALIE_TABLE,
    Key: {
      golieId: `goal-${req.params.goalId}`,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      res.status(400).json({
        error: `Could not get the goal with id: ${req.params.goalId}`,
      });
    }

    if (result.item) {
      res.status(200).json(result.item);
    } else {
      res.status(404).json({
        error: 'Goal not found.',
      });
    }
  });
});

app.post('/goal', (req, res) => {

});

module.exports.handler = serverless(app);
