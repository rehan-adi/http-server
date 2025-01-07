import { createServer } from "net";
import { parseRequest } from "./utils/parseRequest";
import { createResponse } from "./utils/createResponse";

const port = 1111;

let activeConnections = 0;
const maxConnections = 4000;

// Create a TCP server that listens for incoming connections
const server = createServer((socket) => {
  // Check if connection limit is reached
  if (activeConnections >= maxConnections) {
    socket.write(
      "HTTP/1.1 503 Service Unavailable\r\nContent-Type: text/plain\r\n\r\n" +
        "The server is currently too busy. Please try again later."
    );

    socket.end();
    return;
  }

  // Increment active connections
  activeConnections++;
  console.log(`Client connected. Active connections: ${activeConnections}`);

  // Handle the 'data' when the server receives data from the client
  socket.on("data", (clientData) => {
    try {
      const { method, path, headers } = parseRequest(clientData);
      console.log(`Received request: ${method} ${path}`);
      console.log("Headers:", headers);

      const response = createResponse();
      socket.write(response);
    } catch (error: any) {
      console.error(error.message);
      const errorResponse = [
        `HTTP/1.1 405 Method Not Allowed`,
        `Content-Type: text/plain`,
        `Content-Length: ${Buffer.byteLength(error.message)}`,
        "",
        error.message,
      ].join("\r\n");
      socket.write(errorResponse);
    } finally {
      socket.end();
    }
  });

  socket.on("end", () => {
    activeConnections--;
    console.log(
      `Client disconnected. Active connections: ${activeConnections}`
    );
  });
});

server.listen(port, () => {
  console.log("Server is running");
});
