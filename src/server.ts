import { createServer } from "net";
import { parseRequest } from "./utils/parseRequest";
import { createResponse } from "./utils/createResponse";

const port = 1111;

// Create a TCP server that listens for incoming connections
const server = createServer((socket) => {
  // Log when a client connects to the server
  console.log("a client connected");

  // Handle the 'data' when the server receives data from the client
  socket.on("data", (clientData) => {
    const { method, path, headers } = parseRequest(clientData);

    console.log(`Received request: ${method} ${path}`);
    console.log("Headers:", headers);

    // create response and send the response to the client
    const response = createResponse();
    socket.write(response);

    // End the connection after sending the response
    socket.end();
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log("Server is running");
});
