import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
  return (
    <div className='login-page'>
      <form onSubmit={loginUser}>
        <input type='text' name='username' placeholder='Enter Username'/>
        <input type='password' name='password' placeholder='Enter Password'/>
        <input type='submit' className='submit'/>
      </form>
      <p  className='register'><Link to='/register'>Signup</Link></p>
    </div>
  )
}

export default LoginPage