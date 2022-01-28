import React, { useEffect, useMemo, useRef, useState } from "react";
import classes from "../styles/video.module.css";
import Peer from "simple-peer";
import MainVideo from "./MainVideo";
function Video({ socket, room }) {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const videoConstraints = useMemo(() => {
    return {
      height: window.innerHeight / 2,
      width: window.innerWidth / 2,
    };
  }, []);
  useEffect(() => {}, [peers]);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: false })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socket.emit("joined_video_chat", room);
        socket.on("all_users", (users) => {
          let peers = [];
          users.forEach((userId) => {
            let peer = creatrPeer(userId, socket.id, stream);
            peers.push({peer,peerId:userId});
            peersRef.current.push({
              peerId: userId,
              peer,
            });
          });
          setPeers(peers);
        });
        socket.on("received_signal_form_new_joinee", (payload) => {
          let peer = addPeer(payload.callerSignal, payload.callerId, stream);
          peersRef.current.push({
            peerId:payload.callerId,
            peer
          })
          setPeers((prev) => {
            return [...prev, {peer,peerId:payload.callerId}];
          });
        });
      });
    socket.on("received_returned_signal", (payload) => {
      const item = peersRef.current.find((peer) => peer.peerId === payload.id);
      
      item.peer.signal(payload.receiverSignal);
    });
    socket.on('user_left',id=>{
      console.log(`${id.id} left group chat`)
      console.log(peersRef.current)
      let item = peersRef.current.find(item=>item.peerId === id.id)
      console.log(item)
      item.peer.destroy()
      let newPeers = peersRef.current.filter(item=>item.peerId !== id.id)
      setPeers(newPeers)
      peersRef.current = newPeers

    })
    //eslint-disable-next-line
  }, []);
  function creatrPeer(userId, callerId, callerStream) {
    let peer = new Peer({
      initiator: true,
      trickle: false,
      stream: callerStream,
    });
    peer.on("signal", (callerSignal) => {
      socket.emit("sending_my_signal_with_my_stream", {
        callerSignal,
        userId,
        callerId,
      });
    });
    return peer;
  }
  function addPeer(incomingSignal, callerId, receiverStream) {
    let peer = new Peer({
      initiator: false,
      trickle: false,
      stream: receiverStream,
    });
    peer.on("signal", (receiverSignal) => {
      socket.emit("returning_receiver_signal", { receiverSignal, callerId });
    });
    peer.signal(incomingSignal);
    return peer;
  }
  const endVideoCall = () => {
    socket.emit("end_video_call", { id: socket.id, room });    
  };
  return (
    <>
      <div className={classes.video_grid}>
        <video playsInline autoPlay ref={userVideo} />
        {peers.map((peer, index) => {
          return <MainVideo key={peer.peerId} peer={peer.peer} />;
        })}
      </div>
      <button onClick={endVideoCall}>End Video Call</button>
    </>
  );
}

export default Video;
