import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config.js';
import {io} from "socket.io-client"

const socket = io("http://localhost:5000")

const ChatComponent = ({ appointment,patientId }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const chatContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    senderId: '',
    receiverId: appointment._id, // Get receiverId from appointment
    message: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData({ ...formData, senderId: user._id });
    }
    
  }, [formData]);


  useEffect(()=>{
    getChatMessages()
  },[appointment._id])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setFormData({ ...formData, message: e.target.value }); // Update message in formData
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/chat/sendMessage`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setMessage(''); // Reset message input
      toast.success(message);
      // Get updated chat messages after sending new message
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getChatMessages = async () => {
    try {
      const res = await fetch(`${BASE_URL}/chat/messages/${appointment._id}/${patientId}`);
      console.log('result',res);
      const data = await res.json();
      setChatMessages(data.messages);
      console.log(message);
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoadingMessages(false)
    }
  };


  socket.on("newtext",(data)=>{
    if(data){
      getChatMessages()
    }
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{appointment.name}</h1>
      <div
        className="max mx-auto"
        style={{ paddingTop: "calc(100vh - 200px)", height: "400px", overflowY: "hidden" }}
        ref={chatContainerRef}
      >
        {/* Chat messages */}
        <div>
          {loadingMessages && <p>Loading messages...</p>} {/* Show loading indicator */}
          {chatMessages &&
            chatMessages.map((chatMessage) => (
              <div
                key={chatMessage._id}
                className={`${
                  chatMessage.senderId === formData.senderId
                    ? 'flex justify-end'
                    : 'flex justify-start'
                } mb-2`}
              >
                <div
                  className={`${
                    chatMessage.senderId === formData.senderId
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
      {/* Text input */}
      <div className="flex mt-16">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="border border-gray-400 rounded-l px-4 py-5 w-full"
        />
        {/* Send button */}
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

export default ChatComponent;
