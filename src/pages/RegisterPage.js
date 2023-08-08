import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import CsrfToken from '../components/CsrfToken'

const RegisterPage = () => {
    let {RegisterUser} = useContext(AuthContext)
  return (
    <div>
        <h1> SIGN UP BELOW</h1>
        
        <form onSubmit={RegisterUser}>
            <CsrfToken />
            <p>USERNAME</p>
            <input type='text' name='username'/>
            <p>EMAIL</p>
            <input type='email' name='email'/>
            <p>PASSWORD</p>
            <input type='password' name='password'/>
            <p>ENTER YOUR PASSWORD AGAIN</p>
            <input type='password' name='password1'/><br/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default RegisterPage
