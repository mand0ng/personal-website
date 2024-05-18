const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json())

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.post('/data-from-flask', (req, res) => {
  const scrapedData = req.body; // Assuming Flask sends JSON data
  // console.log("request body :", req);
  io.emit('search_result', scrapedData); // Emitting 'data' event to all connected clients
  res.status(200).json({ message: 'Data received and sent to clients' });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server listening on port ${server.address().address}:${PORT}`);
});
