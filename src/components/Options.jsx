import React from 'react';
import OptionButton from './OptionButton';
import {v4 as uuid} from 'uuid'
function Options({setShow}) {
    const data = ["Chat","White Board Collaboration","Users List","Screen Share","Video Call","Collaborative Docs"]
  return <React.Fragment>
      {
          data.map(item=>{
              return <OptionButton setShow={setShow} data={item} key={uuid()}/>
          })
      }
  </React.Fragment>;
}

export default Options;
