export function createResponse() {
  const responseBody = "Working";
  const contentLength = Buffer.byteLength(responseBody);

  return [
    `HTTP/1.1 200 OK`,
    `Content-Type: text/plain`,
    `Content-Length: ${contentLength}`,
    "",
    responseBody,
  ].join("\r\n");
}
