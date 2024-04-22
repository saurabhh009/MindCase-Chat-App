'use client'
import { useState, useEffect } from 'react';
import styles from "../components/sidebar.module.css"
import axios from 'axios';

export default function Sidebar() {
  const [chats, setChats] = useState({ today: [], yesterday: [], last7Days: [], last30Days: [] });

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get('/chats');
      const allChats = response.data.chats;
      const todayChats = [];
      const yesterdayChats = [];
      const last7DaysChats = [];
      const last30DaysChats = [];

      const todayDate = new Date();
      const yesterdayDate = new Date(todayDate);
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      allChats.forEach((chat) => {
        const chatDate = new Date(chat.Timestamp);
        const timeDiff = todayDate.getTime() - chatDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);

        if (daysDiff === 0) {
          todayChats.push(chat);
        } else if (daysDiff === 1) {
          yesterdayChats.push(chat);
        } else if (daysDiff <= 7) {
          last7DaysChats.push(chat);
        } else if (daysDiff <= 30) {
          last30DaysChats.push(chat);
        }
      });

      setChats({
        today: todayChats,
        yesterday: yesterdayChats,
        last7Days: last7DaysChats,
        last30Days: last30DaysChats
      });
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  return (
    <div className={styles.sidebar}>
     <ul>
        <li>Today</li>
        {chats.today.map((chat, index) => (
          <li key={index}>{chat.title}</li>
        ))}
        <li>Yesterday</li>
        {chats.yesterday.map((chat, index) => (
          <li key={index}>{chat.title}</li>
        ))}
        <li>Last 7 Days</li>
        {chats.last7Days.map((chat, index) => (
          <li key={index}>{chat.title}</li>
        ))}
        <li>Last 30 Days</li>
        {chats.last30Days.map((chat, index) => (
          <li key={index}>{chat.title}</li>
        ))}
      </ul>
    </div>
  );
}

