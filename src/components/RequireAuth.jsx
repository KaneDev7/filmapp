import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import { setAuth } from '../reducers/auth_slice'
import { Navigation } from 'swiper/modules'
import axios from '../api/axios'

export default function RequireAuth() {
  const dispatch = useDispatch()
  const loaction = useLocation()
  const navigate = useNavigate()


  useEffect(() => {
    const verifyToken = async () => {
      const { isLogin, token: accessToken } = JSON.parse(sessionStorage.getItem('sessionToken')) || {}
      if(!isLogin){
        return navigate('/login')
      }
      try {
        const response = await axios.get(`http://localhost:3000/private`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true
          }
        )
        console.log(response)

        const { token, isLogin, username } = response?.data
        dispatch(setAuth({ isLogin, token,username }))
        sessionStorage.setItem('sessionToken', JSON.stringify({ isLogin, token,username }))
        
      } catch (error) {
        console.log(error)
        navigate('/login')

      }
    }
  verifyToken()

  }, [])

  useEffect(() => {
    const timeInterval = 900000
    const refreshToken = async  () =>{
      console.log( new Date().toLocaleTimeString(), 'render')
      try {
        const response = await axios.get(`http://localhost:3000/refresh`,
          {
            withCredentials: true
          }
        )
        console.log(response)
        const { token, isLogin, username } = response?.data
        dispatch(setAuth({ isLogin, token,username }))
        sessionStorage.setItem('sessionToken', JSON.stringify({ isLogin, token,username }))

      } catch (error) {
        console.log(error)    
      }
    }
    const interval = setInterval(refreshToken, timeInterval ); 

    //return () => clearInterval(interval);
  }, []); 

  return (
    <Outlet />
  )
}
