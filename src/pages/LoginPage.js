import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
  return (
    <div className='login-page'>
      <form onSubmit={loginUser}>
        <input type='text' name='username' placeholder='Enter Username(root: syed)'/>
        <input type='password' name='password' placeholder='Enter Password(root: syed123)'/>
        <input type='submit' className='submit'/>
      </form>
      {/* <p><Link to='/register' className='register'>Register</Link></p> */}
    </div>
  )
}

export default LoginPage