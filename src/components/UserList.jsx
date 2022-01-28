import React from 'react';
import {v4 as uuid} from 'uuid'
function UserList({userList,userName}) {
  return <React.Fragment>
    <div className="user_list_card">
      <h1>User List</h1>
      {
        userList.map(item=>{
          return <div key={uuid()}>
            {item === userName?"You Joined":`${item} Just Joined the Room`}
          </div>
        })
      }
    </div>
  </React.Fragment>;
}

export default UserList;
