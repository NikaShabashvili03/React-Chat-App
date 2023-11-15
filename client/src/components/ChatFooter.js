import React, { createRef, useState } from 'react';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');


  const ref = createRef(null);

  const onFocus = () => socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
  const onBlur = () => socket.emit('typing', undefined);

  const handleSendMessage = (e) => {
       e.preventDefault();
       if (message.trim() && localStorage.getItem('userName')) {
         socket.emit('message', {
            text: message,
            name: localStorage.getItem('userName'),
            socketID: socket.id,
          });
        }
        setMessage('');
  };
  
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          ref={ref}
          onChange={(e) => setMessage(e.target.value)}

          // onKeyDown={handleTyping}
          // onKeyUp={handleTypingOff}
          // onKeyDownCapture={handleTyping}
          // onKeyUpCapture={handleTypingOff}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;