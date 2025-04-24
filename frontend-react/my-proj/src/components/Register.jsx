import './Register.css';
import React, { useState } from 'react';
import axios from 'axios'
import api from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const[fullname,setFullname] = useState('')
  const [username,setUsername] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmpassword] = useState('')
  const [errors,setErrors] = useState({})
  const navigate = useNavigate();


  

  const handleSubmit =  async(e) => {
    e.preventDefault();

    const userData = {
       full_name :  fullname,
       username,email,password,confirmPassword
    }

    try {
      const response = await api.post('/register/',userData)
      navigate('/')
      console.log(response.data)
    }catch(error){
      setErrors(error.response.data)
      console.error('Registration error',error.response.data)
    }

  }

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>

      <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"   
            name="fullname"
            value={fullname}
            onChange={ (e) =>{
              setFullname(e.target.value)
            } }
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={ (e) =>{
              setUsername(e.target.value)
            } }
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={ (e) =>{
              setEmail(e.target.value)
            } }
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
            onChange={ (e) =>{
              setPassword(e.target.value)
            } }
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={ (e) =>{
              setConfirmpassword(e.target.value)
            } }
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}



 export default Register
