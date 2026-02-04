import { Server } from "socket.io";
const io = new Server(3001, {
  cors: {
    origin: "*",
  }
});

console.log("Servidor Socket en el puerto 3001");

io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("join", (sala) => {
    socket.join(sala);
    console.log(`Usuario ${socket.id} se unió a la sala: ${sala}`);
  });


  
  socket.on("mensaje", (datos) => {
    console.log(`Mensaje recibido ${datos.sala}:`, datos.contenido);

    socket.to(datos.sala).emit("mensaje", datos);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});
