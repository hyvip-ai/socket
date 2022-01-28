import React, { useState } from 'react';
import BoardContainer from '../components/BoardContainer';
import Chat from '../components/Chat';
import Document from '../components/Document';
import Options from '../components/Options';
import UserList from '../components/UserList';
import Video from '../components/Video';

function Main({socket,userName,room,userList}) {
  const [show,setShow] = useState('chat')
  return <React.Fragment>
    <Options setShow={setShow}/>
      {
        show === 'chat' ? <Chat socket={socket} userName={userName} room={room} /> : null
      }
      {
        show === 'users list'?<UserList userList={userList} userName={userName}/>:null
      }
      {
        show === 'white board collaboration'?<BoardContainer socket={socket} room={room}/>:null
      }
      {
        show === 'video call'?<Video socket={socket} room={room} setShow={setShow}/>:null
      }
      {
        show === 'collaborative docs'?<Document socket={socket} room={room}/>:null
      }
  </React.Fragment>
  ;
}

export default Main;
