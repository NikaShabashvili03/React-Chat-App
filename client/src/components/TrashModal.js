import React, { useState } from 'react'
import { IoIosExit } from "react-icons/io";
import PinInput from "react-pin-input";

function TrashModal({
    setTrashModalOpen,
    isTrashModalOpen
}) {
  const [pinInput, setPinInput] = useState();

  const [pinAlert, setPinAlert] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if(pinInput === '64531'){
        setTrashModalOpen(!isTrashModalOpen);
        fetch('https://reactchatapp-fnli.onrender.com/api/message/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            cache: 'default',
          })
    }else{
        setPinAlert(true)
    }
  }
  return (
    <div className='trash'>
        <div className='trash__content'>
            <IoIosExit onClick={() => {setTrashModalOpen(!isTrashModalOpen)}} size={30} className='trash__exit'/>
            <div className='trash__header'>
                <h2>Hello, this is a window to delete all messages 💬❌, where you have to enter a pin code 💻 , only me and the programmers know this 🤐🤨</h2>
                <a href='https://github.com/NikaShabashvili03/React-Chat-App'>Project Github 🙂</a>
            </div>
            <div className='trash__body'>
                <PinInput length={5} onChange={(value) => {setPinInput(value)}} onComplete={(value) => {
                    setPinInput(value)
                }} focus type="number" inputMode="number" />
                <h2>{pinAlert && 'Your pin code is incorrect!'}</h2>
                <p>Finnaly pin: {pinInput}</p>
            </div>
            <div className='trash__footer'>
                <button onClick={handleClick}>Send</button>
            </div>
        </div>
    </div>
  )
}

export default TrashModal