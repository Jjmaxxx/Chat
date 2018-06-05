let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http)

app.get("/",(req,res) => {
	res.sendFile("C:/Users/default.LAPTOP-RQ66J9LA/Documents/Chat/index.html")
});

http.listen(8080, () => {
	console.log("aaaannnnnddd we're live.")
})

io.on("connection", (socket) => {
	socket.on("chat", (result) => {
		io.sockets.emit("chat",result)
	})
});