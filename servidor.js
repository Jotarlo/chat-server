const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});

const port = process.env.PORT || 3000;
let usernames = [];
io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.data.name = data.username
    io.emit("message", `Se ha unido al chat ${data.username}`);
    console.log(socket.data.name);
  });

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", `${socket.data.name} dice: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado!" + socket.data.name);
    io.emit("message", `${socket.data.name} se ha desconectado`);
  });
});

httpServer.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
