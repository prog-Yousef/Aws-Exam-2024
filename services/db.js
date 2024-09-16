const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDB({
  region: process.env.AWS_REGION,
});

const db = DynamoDBDocument.from(client);

module.exports = { db };