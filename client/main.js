window.onload = ()=>{
  let socket = io();
  let form = document.getElementById("chat-form");
  let input = document.getElementById("msg");
  let posts = document.getElementById("posts");
  let username = "";
  let users = [];
  let usersnum = document.getElementById("users-number");
  let userslist = document.getElementById("users-list");
  let userscontent = document.getElementById("users");

  usersnum.innerHTML = "# of users:" + users.length;
  form.onsubmit = (event) =>{
    event.preventDefault();
    let now = new Date();
    socket.emit("chat",username,input.value, now);
    input.value = "";
  }
input.onkeydown = (event) => {
  if (event.key == "Backspace" && input.value.length <= 1){
    socket.emit("typing","");
  }
  else{
    socket.emit("typing",username);
  }
}
  socket.on("chat",(history)=>{

    console.log(history);

    posts.innerHTML = "";
    for(let i=0;i < history.length; i++){
      let command = "";
      if(history[i][1].indexOf("/") == 0){
        let end = history[i][1].indexOf(" ");
        command = history[i][1].slice(history[i][1].indexOf("/")+1,end);
        history[i][1] = history[i][1].slice(end);
      }

      let p = document.createElement("P");
        if(command =="blue"){
          p.style.color = "blue";
        }
        if(command =="purple"){
          p.style.color = "purple";
        }
        if(command =="red"){
          p.style.color = "red";
        }
        if(command =="green"){
          p.style.color = "green";
        }
        if(command =="pink"){
          p.style.color = "pink";
        }
        if(command =="yellow"){
          p.style.color = "yellow";
        }
        let date = new Date(history[i][2]);
        console.log(date);


        p.innerHTML =  "[" + date.toLocaleTimeString() +"]" + " " + history[i][0]+": "+ history[i][1];
        posts.appendChild(p);
    }

  });

  socket.on("typing",(result)=>{
    let p = document.getElementById("typing");
    p.innerHTML = result;
  })
  username = prompt("username");
  socket.emit("adding user",username);
  socket.on("showing users",(userslist)=>{
    console.log("userslist",userslist);
    users = userslist;
    usersnum.innerHTML = "# of users:" + users.length;
    showUsersName();
    console.log("users",users);
  });

  function showUsersName(){
    while(userscontent.firstChild){
      userscontent.removeChild(userscontent.firstChild);
    }
    console.log(users.length);
    console.log(users);
    for( let i=0;i < users.length;i++){
      let content = document.createTextNode(users[i]);
      let p = document.createElement("p");
      p.appendChild(content);
      userscontent.appendChild(p);
    }
  }
}


/*function change(){
document.getElementById("no").style.color = "red";
alert("Congrats you found a secret")
}
function start(){
alert("The commands are as follow:")
alert("/purple , /blue , /red , /green , /pink ,/yellow")
}
start();
*/
