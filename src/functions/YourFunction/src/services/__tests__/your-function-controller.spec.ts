/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import AWS from 'aws-sdk';
import YourFunctionController from '../core/your-function-controller';
import { IHttpRequest } from '../protocols/http';

describe('EditStatusCampaign::Test', () => {
  const makeDocClient = () => {
    const docClient = new AWS.DynamoDB.DocumentClient({
      region: 'us-east-1',
      endpoint: 'http://localhost:4566',
    });

    return docClient;
  };

  const makeSut = () => {
    const docClient = makeDocClient();
    const sut = new YourFunctionController(docClient);

    return {
      sut,
      docClient,
    };
  };

  beforeAll(() => {
    process.env = Object.assign(process.env, {
      TABLE: 'Table',
    });
  });

  it('return success when request valid', async () => {
    const { sut, docClient } = makeSut();

    const ID_NEW_ITEM = '121212';

    const httpRequest: IHttpRequest = {
      body: JSON.stringify({
        id: ID_NEW_ITEM,
      }),
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);

    const paramGetItem: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: process.env.TABLE,
      ExpressionAttributeValues: {
        ':id': ID_NEW_ITEM,
      },
      FilterExpression: 'id = :id',
    };

    const { Items } = await docClient.scan(paramGetItem).promise();
    const item = Items[0];

    expect(item).toBeTruthy();
  });
});
