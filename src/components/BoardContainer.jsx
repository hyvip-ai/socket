import React, { useEffect, useState } from "react";
import Board from "./Board";
import classes from "../styles/whiteboard.module.css";
function BoardContainer({ socket, room }) {
  const [color, setColor] = useState("orange");
  const [canvasData, setCanvasData] = useState("");
  const changeHandler = (e) => {
    setColor(e.target.value);
  };
  useEffect(() => {
    let image = new Image();
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    };
    image.src = canvasData;
    //eslint-disable-next-line
  }, [color]);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.color_picker_container}>
          <input type="color" name="" id="" onChange={changeHandler} />
        </div>
        <div className={classes.board_container}>
          <Board
            color={color}
            socket={socket}
            room={room}
            setCanvasData={setCanvasData}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default BoardContainer;
