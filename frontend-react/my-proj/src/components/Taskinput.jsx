import React from 'react'
import './Taskinput.css';
import { Link } from 'react-router-dom'

const Taskinput = () => {
  return (
    <>
        <div className="wrapper">  
            <Link  to={"/add_habit"}><button>+ Add Habit</button></Link>
        </div>
    </>
  )
}

export default Taskinput