import {createContext,useState} from 'react'

const LogContext = createContext()

const LogProvider = ({children}) => {

    const[isLoggedIn,setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken')
    )
  return (
    <LogContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </LogContext.Provider>
  )
}

export default LogProvider
export {LogContext,LogProvider}