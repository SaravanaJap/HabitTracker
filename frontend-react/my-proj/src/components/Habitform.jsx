import './Habitform.css';
import axios from 'axios';
import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../axiosinstance';

const AddHabit = () => {
  const [habit_name, setHabit_name] = useState('')
  const [description, setDescription] = useState('')
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate()

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData = {
      habit_name,
      description,
    };
    console.log("Token:", token);
  
    try {
      console.log('inside')
      const response = await api.post('/habits/',userData)

      console.log('Habit submitted:', userData);
      navigate('/')
         
      }catch (error) {
        console.log('Error in adding habit:', error.response?.data || error.message);
      }
    
      
    };
  

  return (
    <div className="add-habit-container">
      <h2>Add New Habit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="habit_name">Habit Title:</label>
          <input
            type="text"
            id="habit_name"
            name="habit_name"
            value={habit_name}
            onChange= { (e) => { setHabit_name(e.target.value) }}
            required
          />
        </div>

        

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={description}
            onChange= { (e) => { setDescription(e.target.value) }}
          />
        </div>

        <button type="submit">Save Habit</button>
      </form>
    </div>
  );
};

export default AddHabit;
