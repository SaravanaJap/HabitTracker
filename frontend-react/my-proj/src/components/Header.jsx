import React from 'react'
import './Header.css';
import { Link ,useNavigate} from 'react-router-dom';
import { LogContext } from '../LogProvider';
import  { useContext } from 'react'

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 className="hero-text"><Link to="/">Habitude</Link> </h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/stat">Stats |</Link></li>
          
          {isLoggedIn ? (
            <>
              <li><Link to="/">Dashboard |</Link></li>
              <li><button className="logout" onClick={handleLogout}>Logout |</button></li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register |</Link></li>
              <li><Link to="/login">Login |</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;