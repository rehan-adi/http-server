import { createServer } from "net";

// Create a TCP server that listens for incoming connections
const server = createServer((socket) => {
  // Log when a client connects to the server
  console.log("a client connected");

  // Handle the 'data' when the server receives data from the client
  socket.on("data", (clientData) => {
    console.log(clientData.toString());
    socket.write("Message recived\n");

    // End the connection after sending the response
    socket.end();
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(1111, () => {
  console.log("Server is running on 1111");
});
