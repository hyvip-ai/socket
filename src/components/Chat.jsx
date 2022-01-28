import React, { useEffect, useState } from "react";
import Message from "./Message";
import classes from "../styles/chat.module.css";
import {v4 as uuid} from 'uuid'
function Chat({ socket, userName, room }) {
  const [message, setMessage] = useState("");
  const [roomMessage, setRoomMessage] = useState([]);
  const sendMessage = async () => {
    const messageData = {
      message,
      room,
      author: userName,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
        id:uuid()
    };
    document.getElementById("msg").value = "";
    await socket.emit("send_message", messageData);
    setRoomMessage((prev) => {
        return [...prev, messageData];
      });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setRoomMessage((prev) => {
        return [...prev, data];
      });
    });
  }, [socket]);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.header}>Room : {room}</div>
        <div className={classes.body}>
          {roomMessage.map((item) => {
            return <Message data={item} key={item.id} me={userName}/>;
          })}
          {
              roomMessage.length===0?<p>Your Messages Will Appear Here</p>:null
          }
        </div>
        <div className={classes.form}>
          <input
            type="text"
            placeholder="Hey ..."
            id="msg"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button disabled={message === ""} onClick={sendMessage}>
            &#9658;
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Chat;
