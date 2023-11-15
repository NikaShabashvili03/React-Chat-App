import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";

const ChatBody = ({ messages, lastMessageRef, typingStatus, isTrashModalOpen, setTrashModalOpen }) => {
  // const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    // navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Nika's Chat</p>
        <FaTrashAlt onClick={() => {setTrashModalOpen(!isTrashModalOpen)}}/>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          Leave
        </button>
      </header>

      <div className="message__container">
        {messages && messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <p className='message-typing'>{typingStatus}</p>
        <div ref={lastMessageRef}/>
      </div>
    </>
  );
};

export default ChatBody;