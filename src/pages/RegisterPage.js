import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import CsrfToken from '../components/CsrfToken'

import '../App.css'

const RegisterPage = () => {
    let {RegisterUser} = useContext(AuthContext)
  return (
    <div className='register-page'>
        <h1> SIGN UP BELOW</h1>
        <form onSubmit={RegisterUser}>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="username" class="form-control" id="username" 
                placeholder="Enter Username"/>
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" 
                placeholder="Enter email"/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" 
                id="password" placeholder="Password"/>
            </div>
            <div class="form-group">
                <label for="password1">Password</label>
                <input type="password1" class="form-control" 
                id="password1" placeholder="Enter Password Again"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        
        {/* <form onSubmit={RegisterUser}>
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
        </form> */}
    </div>
  )
}

export default RegisterPage
