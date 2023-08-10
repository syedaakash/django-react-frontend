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
            <div className="form-group">
                <label htmlFor="username">Username*</label>
                <input type="username" className="form-control" id="username" 
                placeholder="Enter Username"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address*</label>
                <input type="email" className="form-control" id="email" 
                placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input type="password" className="form-control" 
                id="password" placeholder="Password"/>
            </div>
            <div className="form-group">
                <label htmlFor="password1">Password*</label>
                <input type="password1" className="form-control" 
                id="password1" placeholder="Enter Password Again"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
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
