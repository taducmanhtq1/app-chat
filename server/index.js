const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// xem co ai da truy cap vao:

io.on("connection", (socket) => {
  console.log(`user connect: ${socket.id}`);

  //tao ra cong ket noi khi nguoi dung goi toi join_room
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with Id: ${socket.id} joined room: ${data}`);
  });
  // tao ra cong ket noi khi co mot send_message dc gui toi
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    //console.log(data);
  });
  // lang nghe su kien khi ai do ngat ket noi den server
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server run");
});
