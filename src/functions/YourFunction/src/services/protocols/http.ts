export interface IHttpRequest {
  body?: any,
  pathParameters?: any,
  headers?: any,
}

export interface IHttpResponse {
  body?: any,
  statusCode: number,
}
