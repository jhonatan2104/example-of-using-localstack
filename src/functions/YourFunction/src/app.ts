/* eslint-disable import/no-unresolved */
import AWS from 'aws-sdk';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import YourFunctionController from './services/core/your-function-controller';

exports.lambdaHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const yourFunctionController = new YourFunctionController(docClient);

  return yourFunctionController.handle(event);
};
