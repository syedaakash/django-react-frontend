import { createContext, useState, useEffect, Children } from 'react'
import jwt_decode from 'jwt-decode'
import { Navigate, useNavigate } from 'react-router-dom'
import {variables} from '../Variables'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const api_url = variables.API_URL

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch(api_url + 'api/token/', {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 
            'password': e.target.password.value})
        })
        let data = await response.json()
        
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }
        else {
            alert('Something went wrong')
        }
    }

    let RegisterUser = async (e) => {
        e.preventDefault()
        let response = await fetch(api_url + 'api/register/', {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value,
            'email': e.target.email.value, 
            'password': e.target.password.value,
            'password1': e.target.password1.value})
        })
        let data = await response.json()
        console.log(response)
        // if (response.status === 200) {
        //     setAuthTokens(data)
        //     setUser(jwt_decode(data.access))
        //     localStorage.setItem('authTokens', JSON.stringify(data))
        //     navigate('/')
        // }
        // else {
        //     alert('Something went wrong')
        // }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        console.log('update token called')
        let response = await fetch(api_url + 'api/token/refresh/', {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'refresh':authTokens.refresh})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        RegisterUser: RegisterUser
    }

    useEffect (() => {

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}