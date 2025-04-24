import React from 'react'
import './Section.css';
import { useEffect ,useState} from 'react';
import axios  from 'axios';
import api from '../axiosInstance';
const Main = () => {
    const [habits, setHabits] = useState([]);
    const [habitslog,setHabitslog] = useState([]) 




    


    const fetchHabitlogs = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await api.get('/habitlog/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched habitlogs:', response.data);
        setHabitslog(response.data); // 
      } catch (error) {
        console.error('Error fetching habit logs:', error);
      }
    };

    

    useEffect(() => {
      fetchHabitlogs();
    }, []);
  
    useEffect(() => {
      const fetchHabits = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await api.get('/habits/', {
            headers: {
              Authorization: `Bearer ${token}`,  // Make sure you're passing the token
            },
          });
          
          console.log("API Response:", response.data);

          const habitsArray = response.data.habit;

          setHabits(habitsArray); 
          console.log(length.habits)
          console.log(typeof(habits))

        } catch (error) {
          console.error('Error fetching habits:', error);
        }
      };
  
      fetchHabits(); // Call the function
    }, []);

    const deleteHabit = async (id) => {
      if (window.confirm('Are you sure you want to delete this habit?')) {
        try {
          await api.delete(`/habits/${id}/`); // Assuming `/habits/<id>/` is the endpoint for deleting a habit
          
          setHabits(habits.filter((habit) => habit.id !== id)); 
        }catch (error){
          console.error('Error deleting habit:', error);
        }
      }
    };

    const markHabit = async (id,completed) => {

      try {
        await api.post(`/habitlog/${id}/`, {
          completed
        });
        fetchHabitlogs();
      }catch (error) {
      console.error("Error logging habit:", error);
    }
  };

  
  
  return (
    
    <>

<section>
  {habits.length === 0 ? (
    <h2>No habits yet 😴</h2>
  ) : (
    <>
      <h2>Your habits</h2>
      <div className="habit-list">
        
        {habits.map((habit) => {
          const isDone = habitslog.some(log => log.habit_name === habit.id&& log.completed);
          const isSkipped = habitslog.some(log => log.habit_name === habit.id && !log.completed );
          return(
            <div className="card" key={habit.id}>
            <div key={habit.id}>{habit.name}</div>
            <div className="icon">
              <a href="#" className="delete-button" onClick={() => deleteHabit(habit.id)}>X</a>
              
            </div>
            <div className="content">
              <span className="title">{habit.habit_name}</span>
              <div className="desc">{habit.description}</div>
              <div className="actions">
                { !isSkipped &&(
                    <div>
                  
                    <a
                    href="#"
                    className={isDone ? "completed-button" : "download"}
                    onClick={isDone ? null : () => markHabit(habit.id,true)}
                  >
                    {isDone ? "✅ Completed" : "✅ Done"}
                  </a>
                    </div>
                )}
                
                { !isDone && (
                    <div>
                    <a href="#" className={isSkipped? "skipped" : "notnow"}
                    onClick={isSkipped ? null : ()=> markHabit(habit.id,false)}
                    >
                      {isSkipped ? "Skipped" : "Not today"}
                    </a>
                  </div>

                )}
                
                
              </div>
            </div>
          </div>
        )}
          )
        }
          
          
      </div>
    </>
  )}
</section>


        
    </>
  )
}

export default Main