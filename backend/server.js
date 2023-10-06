const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

app.use("/", (req, res, next) => {
  console.log("Middleware for the home route");
  next();
});

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

// Socket.io

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("User Disconnected");
  });
  socket.on("toggle_switch", function (data) {
    console.log("message: " + data);
    socket.broadcast.emit("force_toggle_switch", data)
  });
});
io.listen(3001);

/* server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
 */