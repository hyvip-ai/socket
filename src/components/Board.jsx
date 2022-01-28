import React, { useEffect } from "react";
import classes from "../styles/whiteboard.module.css";

function Board({ color, socket, room, setCanvasData }) {
  useEffect(() => {
    let timeout;
    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");

    const sketch = document.querySelector("#sketch");
    const sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    let mouse = { x: 0, y: 0 };
    let last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    const onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        let base64Data = canvas.toDataURL("image/png");
        setCanvasData(base64Data)
        socket.emit("white_board_send", { base64Data, room });
      }, 1000);
    };
    //eslint-disable-next-line
  }, [color, socket, room]);
  useEffect(() => {
    socket.on("white_board_receive", (data) => {
      let image = new Image();
      const canvas = document.querySelector("#board");
      const ctx = canvas.getContext("2d");
      image.onload = function () {
        ctx.drawImage(image, 0, 0);
      };
      image.src = data.base64Data;
      setCanvasData(data.base64Data);
    });
    //eslint-disable-next-line
  }, [socket]);

  return (
    <React.Fragment>
      <div id="sketch" className={classes.sketch}>
        <canvas id="board" className={classes.board}></canvas>
      </div>
    </React.Fragment>
  );
}

export default Board;
