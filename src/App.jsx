import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
const socket = io.connect("http://localhost:4000");
function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [userList,setUserList] = useState([])
  const joinRoom = () => {
    socket.emit("join_room", { userName, room });
  };
  useEffect(() => {
    socket.on("Joined_Room", (data) => {
      setUserList(prev=>{
        return [...prev,data.message]
      })
      navigate(`/${data.room}`);
    });
    //eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userName={userName}
              room={room}
              setRoom={setRoom}
              setUserName={setUserName}
              joinRoom={joinRoom}
            />
          }
        />
        <Route
          path="/:room"
          element={<Main userName={userName} socket={socket} room={room} userList={userList} />}
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
