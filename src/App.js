import React, { useState, useEffect, useRef } from 'react';
import "./App.css";
import userimage from './img/666201.png';
import chatbotimage from "./img/image-removebg-preview (1).png";
import sendimage from "./img/image-removebg-preview.png";

const App = () => {
  const [messages, setMessages] = useState([
    {text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState('');
  const chatRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { text: inputText, sender: "user" }]);
      setInputText('');
    }
  };

  const simulateBotResponse = (message) => {
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: `Hi, ${message}! How can I assist you further?`, sender: "bot" }]);
    }, );
  };
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    simulateBotResponse(inputText);
  };

  return (
    <div className='wrapper'>
      <header className='header'>ChatBot</header>

      <div className='main'>
        <div className='chats' ref={chatRef}>
          {messages.map((message, index) => (
            <div key={index} className={`chat_${message.sender}`}>
              {message.sender === 'bot' && (
                <div className="chat_bot">
                  <img className="bot_img" src={chatbotimage} alt="Bot" />
                  <div className="chatting">
                    <p className='txt'>{message.text}</p>
                  </div>
                </div>
              )}
              {message.sender === 'user' && (
                <div className="chat_user">
                  <div className="uchatting">
                    <p className='txt'>{message.text}</p>
                  </div>
                  <img className="user_img" src={userimage} alt="User" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


        <form className='inp' onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder='Send a Message'
            value={inputText}
            onChange={handleInputChange}
          />
          <button type="submit" className="send">
            <img className='sendimg' src={sendimage} alt="send" />
          </button>
        </form>

    </div>
  );
}

export default App;

