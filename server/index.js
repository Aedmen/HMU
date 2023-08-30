const server = require("ws").Server;
const express = require('express');
// import mongoose from 'mongoose'

//app config

const app = express();
const port = 8072;

//middlewares
app.use(express.json());
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*'),
  res.setHeader('Access-Control-Allow-Headers','*'),
  next()
})

//api endpoints
app.get("/",(req,res)=>res.status(200).send("hello world"));
app.get("/chat",(req,res)=>res.status(200).send("Entering chat section"));
app.get("/",(req,res)=>res.status(404).send("Error"));
//listen
app.listen(port, ()=>console.log(`listening on localhost: ${port}`));

const s = new server({ port:8001 });
var rooms = [];
var room = [];
var roomid = "";
var nameperson = "";

let genRoom = (n) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
  for (let i = 0; i < n; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
roomid = genRoom(7);
room.push(roomid);
rooms.push(room);
let connection_status = false;
s.on("connection", (ws) => {
  console.log("Server is connected!!!!");
  connection_status =true
  // console.log(rooms);
  
  let joinroom = (name) => {
    // console.log(nameperson);
    if (room.length == 3) {
      room=[];
      roomid = genRoom(7);
      room.push(roomid);
      rooms.push(room);
      room.push(name);
    } else {
      room.push(name);
    }
    ws.roomID = roomid;
    // console.log(room);
    // console.log(rooms);
    // console.log(room.length);
  };
  // let endroom = (room)=>{
  //   room=[];
  //   console.log(true)
  // }
  if(connection_status==true){
    joinroom(nameperson);
  }
  ws.on("message", (message) => {
    
    message = JSON.parse(message);

    if (message.type == "name") {
      ws.personName = message.data;
      return;
    }
    if (message.type == "text") {
      ws.chat = message.data;
      return;
    }
    nameperson = ws.personName;
    if(message.type=="endchat"){
      //Here only just find a way to associate the name with the room array and then empty the array and then change the button to join room button and trigger the join room function and for that we need to send a JSON
      ws.endchat = message.data;
      console.log(ws.endchat,nameperson);
      for(let i=0;i<rooms.length;i++){
        for(let j=0;j<3;j++){
          let found = rooms[i].find((name) => name == nameperson);
          if(found!=""){
            // console.log(rooms[i]);
            rooms[i]=[];
            console.log(nameperson);
            connection_status=true;
            // window.location.reload();
            break;
          }
        }
      }
      
      // console.log(rooms);
    }
    s.clients.forEach((client) => {
      console.log(room);
      // const found = room.find((name) => name == roomid)
      // if(found!=""){
      //   endroom(room)
      // }
      // if(1==2){
      //   endroom(room);
      // }
      if (client.roomID==ws.roomID){
        if (client != ws) {
          // console.log(client);
          // somehow try adding name and s.clients
          client.send(
            JSON.stringify({
              name: ws.personName,
              data: message.data,
              type: "recieve",
            })
          );
          // console.log(message);
        }
      }
    });
  });
});
