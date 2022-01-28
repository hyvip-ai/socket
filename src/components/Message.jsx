import React from "react";
import classes from "../styles/chat.module.css";
function Message({ data,me }) {
  return (
    <div className={`${data.author === me?classes.mine:classes.other} ${classes.message}`}>
      {data.author === me?null:data.author}
      <br />
      {data.message}
      <br />
      {data.time}
    </div>
  );
}

export default Message;
