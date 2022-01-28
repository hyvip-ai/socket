import React from "react";

function Home({setUserName,setRoom,userName,room,joinRoom}) {
  return (
    <>
      <h1>Join a Chat</h1>
      <input
        type="text"
        placeholder="Enter Name ..."
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room Id ...."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom} disabled={userName === "" || room === ""}>
        Join Room
      </button>
    </>
  );
}

export default Home;
