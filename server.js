let express = require("express");
let app = express();
let http = require("http").Server(app);
let history = [];
let port = process.env.PORT || 3000;
let path = require('path');
let server = require("http").Server(app);
let io = require("socket.io")(server);
let users = [];
let allClients = [];

app.use(express.static(path.resolve(__dirname, './client')));

app.get("/",(req,res)=>{
  res.sendFile(path.resolve(__dirname, './client/index.html'))
});


server.listen(port,()=>{
  console.log("alright")
})
io.on("connection",(socket)=>{
    allClients.push(socket);
    socket.emit("chat",history);
  socket.on("chat",(name, result, time)=>{
    history.push([name, result, time]);
    //console.log(history);
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
    //console.log("new user: " + username);
    users.push(username);
    console.log(users);
    //socket.emit sends to only one person
    //io.emit sends to everyone
    io.emit("showing users",users);
    console.log("emit showing users");
  });
  socket.on("disconnect",function(){
    //console.log("disconnecting:" + socket)
    var i= allClients.indexOf(socket);
    allClients.splice(i,1);
    users.splice(i,1);
    // console.log(allClients);
    // console.log(users);
    io.emit("showing users",users);
  })
})
