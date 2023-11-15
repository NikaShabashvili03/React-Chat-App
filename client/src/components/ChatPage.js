import React, { useEffect, useRef, useState } from 'react';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import TrashModal from './TrashModal';
import axios from 'axios';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState('');
  const [isTrashModalOpen, setTrashModalOpen] = useState(false);

  useEffect(() => {
    // fetch("api/message").then(
    //   response => response.json()
    // ).then((data) => {
    //     setMessages(data)
    //     window.scrollTo({
    //       top: 0,
    //       behavior: 'smooth',
    //    });
    //   }
    // )
    axios.get("https://reactchatapp-fnli.onrender.com/api/message").then(function (response) {
      setMessages(response.data);
      window.scrollTo({
              top: 0,
              behavior: 'smooth',
      });
    });
  }, [socket, messages])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  },[messages])


  useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);
  
  return (
      <div className="chat">
          <>
            {isTrashModalOpen && <TrashModal setTrashModalOpen={setTrashModalOpen} isTrashModalOpen={isTrashModalOpen}/>}
            <ChatBody setTrashModalOpen={setTrashModalOpen} isTrashModalOpen={isTrashModalOpen} typingStatus={typingStatus} messages={messages} lastMessageRef={lastMessageRef}/>
            <ChatFooter socket={socket}/>
          </>
      </div>
  );
};

export default ChatPage;