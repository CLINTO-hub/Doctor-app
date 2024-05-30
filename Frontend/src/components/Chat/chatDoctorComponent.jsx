import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config.js';
import {io} from "socket.io-client"

const socket = io("https://www.medicare.clintogeorge.live")

const ChatDoctorComponent = ({ doctorId, patientId, patientName }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const chatContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    senderId: doctorId,
    receiverId: patientId,
    message: '',
  });

  useEffect(() => {
    getChatMessages();
  }, [patientId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setFormData({ ...formData, message: e.target.value });
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      senderId: doctorId,
      receiverId: patientId,
      message,
    };

    try {
      const res = await fetch(`${BASE_URL}/chat/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (res.ok) {
        const savedMessage = await res.json();
        setChatMessages([...chatMessages]);
        setMessage('');
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while sending the message');
    }
  };

  const getChatMessages = async () => {
    try {
      const res = await fetch(`${BASE_URL}/chat/messages/${doctorId}/${patientId}`);
      const data = await res.json();
      setChatMessages(data.messages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMessages(false);
    }
  };



  socket.on("newtext",(data)=>{
    if(data){
      getChatMessages()
    }
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-0">{patientName}</h1>
      <div
        className="max mx-auto"
        style={{ paddingTop: "calc(100vh - 200px)", height: "500px", overflowY: "hidden" }}
        ref={chatContainerRef}
      >
        <div>
          {loadingMessages && <p>Loading messages...</p>}
          {chatMessages &&
            chatMessages.map((chatMessage) => (
              <div
                key={chatMessage._id}
                className={`${
                  chatMessage.senderId === doctorId ? 'flex justify-end' : 'flex justify-start'
                } mb-2`}
              >
                <div
                  className={`${
                    chatMessage.senderId === doctorId
                      ? 'bg-blue-500 text-white rounded-l-lg rounded-r-lg'
                      : 'bg-gray-300 text-black rounded-l-lg rounded-r-lg'
                  } px-4 py-2`}
                >
                  {chatMessage.message}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex mt-20">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="border border-gray-400 rounded-l px-2 py-6 w-full"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDoctorComponent;
