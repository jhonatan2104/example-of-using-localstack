/* eslint-disable import/no-unresolved */
import { DynamoDB } from 'aws-sdk';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IHttpRequest } from '../protocols/http';

export default class YourFunctionController {
  constructor(
    private db: DynamoDB.DocumentClient,
  ) {
    this.db = db;
  }

  async handle(request: APIGatewayEvent | IHttpRequest): Promise<APIGatewayProxyResult> {
    const body = JSON.parse(request.body);
    const { id } = body;

    const params = {
      TableName: process.env.TABLE,
      Item: {
        id,
      },
    };

    await this.db.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'ok',
      }),
    };
  }
}
