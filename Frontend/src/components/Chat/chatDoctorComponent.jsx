import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config.js';

const ChatDoctorComponent = ({ doctorId, patientId,patientName }) => {
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

      setMessage('');
      toast.success(message);
      getChatMessages();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getChatMessages = async () => {
    try {
      const res = await fetch(`${BASE_URL}/chat/messages/${doctorId}/${patientId}`);
      console.log('result',res);
      const data = await res.json();
      console.log('data',data);
      setChatMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoadingMessages(false);
    }
  };

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
                  chatMessage.senderId === doctorId
                    ? 'flex justify-end'
                    : 'flex justify-start'
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