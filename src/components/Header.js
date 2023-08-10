import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import '../App.css'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='authnavbar'>
        <nav className="navbar navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
                Product Hub
            </NavLink>
            <span className="form-inline my-2 my-lg-0">
            {user && <span className="navbar-text username">{user.email}</span>}
        {
            user ? (
                <span className="navbar-text auth" onClick={logoutUser}>
                    logout
                </span>
            ) : (
                <NavLink to='/login' className="navbar-brand">Login</NavLink>
            )
        }
            </span>
        
      </nav>
    
      
    </div>
  )
}

export default Header
