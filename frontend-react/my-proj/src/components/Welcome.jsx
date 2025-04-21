import React, { useState, useEffect } from 'react';
import './Welcome.css';
import './Section.jsx';
import { LogContext } from '../LogProvider.jsx';
import api from '../axiosinstance.jsx';

const Welcome = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchquote = async () => {
      try {
        const response = await api.get('/get_quote/');
        setQuote(response.data.quote); // 👈 FIXED
      } catch (error) {
        console.error("Failed to fetch quote", error);
        setQuote("Every bug is just a feature waiting to shine. 🐞✨");
      }
    };
    fetchquote();
  }, []);
  
  return (
    <div className="welcome">
      <h1 className="quote">"{quote}"</h1>
    </div>
  );
};

export default Welcome;
