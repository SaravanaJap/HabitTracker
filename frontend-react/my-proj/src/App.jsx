import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Welcome from './components/Welcome'
import Section from './components/Section'
import Taskinput  from './components/Taskinput'
import Habitform  from './components/Habitform'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import LogProvider from './LogProvider'
import PrivateRoute from './PrivateRoute'

import Stat from './components/stat'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LogProvider>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element = {
          <PrivateRoute>
              <>
              <Welcome/>
              <Section/>
              <Taskinput/>
              </>
          </PrivateRoute>
          
        }/>
        <Route path='/Register' element = {<Register />} /> 
        <Route path='/Login' element = {<Login />} /> 
        <Route path='/stat' element = { <PrivateRoute><Stat /></PrivateRoute> } /> 
        <Route path='/add_habit' element = { <PrivateRoute><Habitform /></PrivateRoute> } /> 
      </Routes>
    </BrowserRouter>
    </LogProvider>
      
      
      

    </>
  )
}

export default App
