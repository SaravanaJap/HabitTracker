import React, { useEffect, useState } from 'react';
import api from '../axiosInstance';
import CalendarHeatmap  from 'react-calendar-heatmap' 
import 'react-calendar-heatmap/dist/styles.css';
import '../App.css'
import HabitStatsChart from './HabitStatsChart';
import './Stat.css'


const Stat = () => {
  const [streakData, setStreakData] = useState({ habit_id: '', streak: 0 });
  const [completeddates, setCompleteddates] = useState({ habit_id: '', streak: 0 ,completed_dates:[]});
  const [habits, setHabits] = useState([]);
  const [myhabits, setMyhabits] = useState([]);
  const [heatmaps, setHeatmaps] = useState({});



  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await api.get('/habitdata/', {
          headers: {
            Authorization: `Bearer ${token}`,  // Make sure you're passing the token
          },
        });
        
        console.log('Fetched habits:', response.data.habits);
        console.log('Fetched habits:', response.data.completed_dates);
        setHabits(response.data.habits); 
        console.log('habits inside')


      } catch (error) {
        console.error('Error fetching habits:', error);
        setHabits([]);
      }
    };

    fetchHabits(); // Call the function
  }, []);

  useEffect(() => {
    const fetchAllStreaksAndHeatmaps = async () => {
      try {
        const streakRes = await api.get('streaks/');
        setMyhabits(streakRes.data);
  
        const heatmapData = {};
  
        for (let habit of streakRes.data) {
          const res = await api.get(`habit/${habit.habit_id}/heatmap/`);
          heatmapData[habit.habit_id] = res.data.completed_dates;
        }
  
        setHeatmaps(heatmapData);
      } catch (error) {
        console.error('Error fetching streaks or heatmaps:', error);
      }
    };
  
    fetchAllStreaksAndHeatmaps();
  }, []);
  


  useEffect(() => {
    const fetchAllStreaks = async () => {
      try {
        const response = await api.get('streaks/');
        console.log("All Streaks:", response.data);
        setMyhabits(response.data);
        console.log("mine",myhabits)
      } catch (error) {
        console.error('Error fetching all streaks:', error);
      }
    };
    fetchAllStreaks();
  }, []);
  
  console.log('return inside')
  return (
    <>
      <h1>📈 Habit Stats</h1>

{myhabits.map((habit) => (
    <div key={habit.habit_id} style={{ marginBottom: '40px' }}>
      <p  className='head'> <strong>{habit.habit_name}</strong> — {habit.streak} day streak!</p>
      <div style={{ maxWidth: '1000px' }}>
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
          endDate={new Date()}
          values={(heatmaps[habit.habit_id] || []).map(date => ({ date }))}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return 'color-github-4';
          }}
          showWeekdayLabels={true}
        />
      </div>
    </div>
  ))}
      
      <div style={{ maxWidth: '1500px', height: '400px' }}>
    <canvas style={{ boxSizing: 'border-box' }} />
    <HabitStatsChart habits={habits} />
</div>

      

    </>
  );
};

export default Stat;
