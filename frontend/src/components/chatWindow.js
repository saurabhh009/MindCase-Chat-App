'use client'
import { useState, useEffect } from 'react';
import styles from '../components/chatWindow.module.css';
import axios from 'axios';
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

console.log(OPENAI_API_KEY)

const systemMessage = {
  role: "system",
  content: "Explain everything like I'm a customer of the text messaging app who wants to seek help from you",
};



export default function ChatWindow() {


  const [messages, setMessages] = useState([
    {
      text: "Hello, I'm Chatly Bot! Ask me anything!",
      sender: "AI",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newAiReply, setNewAiReply]=useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chats`);
        if (data && data.chatid) {
          setSelectedChat(data.chatid);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      text: inputValue,
      sender: 'User',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    setInputValue('');
    await processMessageToChatBot(newMessages);

    if (!selectedChat) {
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chats`, {
          title: 'New Chat',
          userid: localStorage.getItem('userid')
        });
        setSelectedChat(data.chatid);
      } catch (error) {
        console.error('Error creating new chat:', error);
      }
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/save-message`, {
        chatid: selectedChat,
        messagetext: inputValue,
        aireply: newAiReply
      });
      setNewAiReply(data.choices[0].message.conten)
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const processMessageToChatBot = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      return { role: messageObject.sender === 'User' ? 'user' : 'assistant', content: messageObject.text };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', apiRequestBody, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const { data } = response;
      console.log(data)
      if (data.choices && data.choices.length > 0) {
        setMessages([
          ...chatMessages,
          {
            text: data.choices[0].message.content,
            sender: 'AI',
          },
        ]);
        setIsTyping(false);
      } else {
        console.error('No response data or choices returned from the API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className={`${styles.message} AI`}>
            <p>AI is typing...</p>
          </div>
        )}
      </div>
      <div className={styles.inputBox} style={{ marginRight: '34px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
