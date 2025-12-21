// 1. import the http module to create an HTTP server
const http = require("http");

// 2. create an HTTP server
const server = http.createServer((req, res) => {
  // 3. set the response HTTP header with HTTP status and content type
  res.writeHead(200, { "Content-Type": "text/plain" });
  //   Handle incoming http requests
  // 4. send the response body "Hello, World!"
  res.end("Hello, World!\n");
});

// 5. define the port number and hostname
const PORT = 3000;
const HOSTNAME = "localhost";
// 6. make the server listen on the specified port and hostname
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
// 7. handle server errors
server.on("error", (err) => {
  console.error(`Server error: ${err}`);
});
