import React, { useState, useEffect } from "react";
import "./Chat.css";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import CallIcon from "@mui/icons-material/Call";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { IconButton } from "@mui/material";
const sock = new WebSocket("ws://localhost:8001");

// function Chatbox() {
//   return (
//     <div>
//       {msglist.map((message) => {
//         return (
//           <div
//             className={message.type === "send" ? "senderchat" : "recieverchat"}
//           >
//             {/* <p>You're chatting as {message.name}</p> */}
//             <h3>{message.name}</h3>
//             <p>{message.data}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function Chatinput() {
// return (
//   <div className="chatinput">
//     <button className="btn">End conversation</button>
//     <div className="chattextbar">
//       <input
//         type="text"
//         onChange={(data) => {
//           setSenmsg(data.target.value);
//         }}
//       />
//       <div className="chaticons">
//         <IconButton onClick={send}>
//           <SendIcon />
//         </IconButton>
//         <KeyboardVoiceIcon />
//         <VideoChatIcon />
//         <CallIcon />
//         <SportsEsportsIcon />
//       </div>
//     </div>
//   </div>
// );
// // }
function Chat() {
  const [senmsg, setSenmsg] = useState("");
  const [recmsg, setRecmsg] = useState("");
  const [name, setName] = useState("");
  const [msglist, setMsglist] = useState([]);
  const [type, setType] = useState("");
  const [end, setEnd] = useState("end");
  const send = () => {
    if (senmsg !== "") {
      const messagedata = {
        name: name,
        data: senmsg,
        type: "send",
      };
      sock.send(
        JSON.stringify({
          type: "name",
          data: name,
        })
      );
      sock.send(
        JSON.stringify({
          type: "message",
          data: senmsg,
        })
      );
      setMsglist((list) => [...list, messagedata]);
      console.log(msglist);
    }
  };
  function sendend(){
    setEnd("end");
    console.log("end");
    sock.send(JSON.stringify({
      data:end,
      type:"endchat"
    }))
  }
  useEffect(() => {
    sock.onmessage = (event) => {
      // alert("msg recieved");
      // setRecmsg(event.data);
      var json = JSON.parse(event.data);
      // console.log(event);
      setMsglist((list) => [...list, json]);
      console.log(msglist);
    };
  });
  sock.onopen = () => {
    setTimeout(() => {
      console.log("Heelo there!");
    }, 1000);
    setName(prompt("Enter your name: "));
  };
  return (
    <div className="chat">
      <div>
        {msglist.map((message) => {
          return (
            <div
              className={
                message.type === "send" ? "senderchat" : "recieverchat"
              }
            >
              {/* <p>You're chatting as {message.name}</p> */}
              <h3>{message.name}</h3>
              <p>{message.data}</p>
            </div>
          );
        })}
      </div>
      <div className="chatinput">
        <button className="endbtn" onClick={()=>{
          sendend();
          console.log("button clicked");
          window.location.reload();
        }}>End conversation</button>
        <div className="chattextbar">
          <input
            type="text"
            onChange={(data) => {
              setSenmsg(data.target.value);
            }}
          />
          <div className="chaticons">
            <IconButton onClick={send}>
              <SendIcon />
            </IconButton>
            <KeyboardVoiceIcon />
            <VideoChatIcon />
            <CallIcon />
            <SportsEsportsIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
