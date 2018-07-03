let express = require("express");
let app = express();
let http = require("http").Server(app);
let history = [];
let port = process.env.PORT || 3000;
let path = require('path');
let server = require("http").Server(app);
let io = require("socket.io")(server);
let users = [];

app.use(express.static(path.resolve(__dirname, './client')));

app.get("/",(req,res)=>{
  res.sendFile(path.resolve(__dirname, './client/index.html'))
});


server.listen(port,()=>{
  console.log("alright")
})
io.on("connection",(socket)=>{
    socket.emit("chat",history);
  socket.on("chat",(name, result, time)=>{
    history.push([name, result, time]);
    console.log(history);
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
  socket.on("adding user",(username)=>{
    console.log("new user: " + username);
    users.push(username);
    socket.emit("showing users",users);
  });
  socket.on("remove users",(username)=>{
    console.log("remove user: "  + username)
    socket.on("disconnect",function(){
      console.log("disconnecting:" + socket)
    })
  })
})
