import axios from 'axios';
import './Login.css';
import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogContext } from '../LogProvider';
import api from '../axiosInstance';


const Login =  () => {
    const [email,setEmail] = useState('')
    const [password,setPassword ] = useState('')
    const [error,setError] = useState('')
    const {isLoggedIn,setIsLoggedIn} = useContext(LogContext)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async(e)=>{
      e.preventDefault();
      const userData = {
        email,password
      }
  
      try {
        const response = await api.post('/token/', userData);
      
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          console.log('login successful');
          setIsLoggedIn(true);
          setLoading(true);  // ← fixed the `True` typo
          navigate('/');
        } else {
          console.error('Unexpected status:', response.status);
          setError('Unexpected error during login');
        }
      } catch (error) {
        console.error('Login failed:', error.response?.status, error.response?.data);
        setError('Invalid credentials');
      } finally {
        setLoading(false);
      }
      
      
  

  return (
      <>
        <div className="login-container">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange= {(e) =>{
                  setEmail(e.target.value)
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange = { (e) =>{
                  setPassword(e.target.value)
                }}
                required
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </>

    )
}

export default Login;
