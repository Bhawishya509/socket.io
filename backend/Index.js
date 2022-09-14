import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "*",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  socket.on("chats", (payload) => { // line 16 or 17 wala chats same hoga jo frotend may likha ha
    io.emit("chats", payload);
  })
  // ...
  
  // jb koi discconected hot ha 
  socket.on("disconnect",(payload)=>
  {
    console.log("disconnected");
  })
  // jb koi new vist karta ha 

  socket.on("new_visitor",(payload)=>
  {
    console.log("visted");
  })
  
});

httpServer.listen(8000);