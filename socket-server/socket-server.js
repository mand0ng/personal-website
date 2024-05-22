const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express();
// const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3000"
// const CLIENT = "http://localhost";
const CLIENT = "https://my-personal-website-craqo.ondigitalocean.app";
console.log("SOCKET-SERVER.JS: ", CLIENT);
app.use(cors({ origin: CLIENT }));
app.use(bodyParser.json())

const server = http.createServer(app);
const io = socketIo(server, {path:"/ws"});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

app.post('/data-from-flask', (req, res) => {
  const scrapedData = req.body; // Assuming Flask sends JSON data
  // console.log("request body :", req);
  io.emit('search_result', scrapedData); // Emitting 'data' event to all connected clients
  res.status(200).json({ message: 'Data received and sent to clients' });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server listening on port ${server.address().address}:${PORT}`);
});
