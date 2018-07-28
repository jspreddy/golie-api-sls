const dynamo = require('dynamodb');
const Joi = require('joi');

const { GOALIE_TABLE } = process.env;
dynamo.AWS.config.update({ region: 'us-east-1' });

const Goals = dynamo.define('Goals', {
  tableName: GOALIE_TABLE,
  timestamps: true,
  hashKey: 'golieId',
  schema: {
    golieId: dynamo.types.uuid(),
    name: Joi.string(),
    count: Joi.number(),
  },
});

module.exports.Goals = Goals;
