import React, { useEffect, useState } from 'react';
import classes from '../styles/document.module.css'
function Document({socket,room}) {
    const [documentData,setDocumentData] = useState('')
    useEffect(()=>{
        socket.on("document_update",(data)=>{
            console.log("Update")
            setDocumentData(prev=>{
                return data.mesage
            })
        })
    },[socket])
    const changeHandler = debounce()
    function debounce(){
        let timer;
        return function(e){
            clearTimeout(timer)
            timer = setTimeout(()=>{
                socket.emit("document_write",{mesage:e.target.value,room})
            },500)
        }
    }
  return <React.Fragment>
      <h1>Interactive Document</h1>
      <textarea id="" value={documentData} className={classes.text} onChange={(e)=>{setDocumentData(e.target.value);changeHandler(e)}}></textarea>
  </React.Fragment>;
}

export default Document;
