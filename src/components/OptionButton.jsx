import React from 'react';
function OptionButton({data,setShow}) {
    const clickHandler = ()=>{
        setShow(data.toLowerCase())
    }
  return <button onClick={clickHandler}>{data}</button>;
}

export default OptionButton;
