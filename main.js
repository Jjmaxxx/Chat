let express = require("express");
let app = express();
let http = require("http").Server(app);
let history = [];
let port = process.env.PORT || 3000;
let path = require('path');
let server = require("http").Server(app);
let io = require("socket.io")(server);

app.use(express.static(path.resolve(__dirname, './client')));

app.get("/",(req,res)=>{
  res.sendFile(path.resolve(__dirname, './client/index.html'))
});


server.listen(port,()=>{
  console.log("alright")
})
io.on("connection",(socket)=>{
    socket.emit("chat",history);
  socket.on("chat",(name, result)=>{
    history.push([name, result]);
    io.sockets.emit("chat",history);
    io.sockets.emit("typing","")

  })
  socket.on("typing",(result)=>{
    if (result == ""){
      io.sockets.emit("typing", "")

    } else{
      io.sockets.emit("typing",result + " is typing a message")
    }
  });
})
