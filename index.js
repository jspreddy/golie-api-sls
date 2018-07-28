const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const log = require('debug')('golie');
const { Goals } = require('./database/goal-model');

const app = express();
app.use(bodyParser.json({ strict: false }));


app.get('/', (req, res) => {
  res.send({
    response: 'hello world!',
  });
});

app.get('/goals', (req, res) => {
  res.json({});
});

app.get('/goals/:goalId', (req, res) => {
  Goals.get(req.params.goalId, (error, goal) => {
    if (error) {
      res.status(400).json({
        error: `Could not get the goal with id: ${req.params.goalId}`,
      });
    } else {
      res.status(200).json(goal);
    }
  });
});

app.post('/goals', (req, res) => {
  const goal = {
    name: req.body.name,
  };
  Goals.create(goal, (err, item) => {
    if (err) {
      res.status(500).json(err);
    } else {
      log('Created a new goal record: %j', item);
      res.status(200).json(item);
    }
  });
});

app.post('/goals/:goalId/activity', (req, res) => {
  res.json({
    params: req.params,
    message: 'nothing to see here at the moment.',
  });
});

module.exports.handler = serverless(app);
