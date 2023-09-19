import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from '../reducers/auth_slice'
import { useDispatch } from 'react-redux'
import { data } from 'autoprefixer'

const SIGNIN_URL = '/auth'

export default function SignIn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errRef = useRef()
  const inputs = useRef([])

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMesg, setErrMsg] = useState('')
  const [sucess, setSucess] = useState(false)


  useEffect(() => {
    inputs.current[0].focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [pwd, user])


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/auth',
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },  
          withCredentials: true
        }
      )
      console.log(response?.data?.error)
      if (response?.data?.error) {
        return setErrMsg(response.data.error)
      }
      
      const {token, isLogin, username} = response?.data
       dispatch(setAuth({isLogin , token, username}))
       sessionStorage.setItem('sessionToken', JSON.stringify({isLogin , token, username}))
      
       setUser('')
       setPwd('')
       navigate('/')
    } catch (error) {
      if(!error.response){
        console.log(error)
        setErrMsg('No server response')
      }else {
        setErrMsg('error verivier vos champs')
      } 
    }

  }

  return (
    <div className='fixed w-screen  h-screen '>
      <img src="/netflix-s.avif" className='w-full h-full  absolute inset-0 object-cover' alt="" />

      <div className='w-full h-full flex justify-center items-center bg-black/60 absolute inset-0'>
        <div className='w-[450px]  bg-black/80 py-10 px-10'>
          {sucess ?
            <div >
              <h1 className='text-white text-3xl text-center my-3'>Succes </h1>
              <p className='text-primary cursor-pointer'>
                Go to home
              </p>
            </div> :
            <>
              <h1 className='text-white text-3xl text-center'>Sign in </h1>

              <p aria-aria-live='assertive' ref={errRef}
                className={`p-4 text-white/80 bg-red-400 rounded-md mt-5 ${errMesg ? 'block' : 'hidden'}`} >
                {errMesg}
              </p>

              <form onSubmit={handleSubmit} className='w-full'>

                <div className='flex flex-col my-7'>
                  <label className='text-white/80 mb-2 text-md' htmlFor="username">Useranme</label>
                  <input
                    className='outline-none w-full h-[50px] pl-5 text-xl focus:border-2 focus:border-primary rounded-sm bg-gray-400'
                    ref={addInput}
                    placeholder='Username'
                    type="text"
                    id='username'
                    required
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>


                <div className='flex flex-col my-7'>
                  <label className='text-white/80 mb-2 text-md' htmlFor="password">Password</label>
                  <input
                    className='outline-none w-full h-[50px] pl-5 text-xl focus:border-2 focus:border-primary rounded-sm bg-gray-400'
                    placeholder='Password'
                    type="password"
                    id='password'
                    required
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                  />
                </div>

                <button className='w-full h-[50px] mt-5  border-none bg-primary text-white/80 hover:bg-primary_hover rounded-sm' type='submit'> Sign in </button>
              </form>
              <p className='text-white/80 text-md mt-5'>
                D'ont have a acount please <Link to='/register' className='text-primary' > Register </Link>
              </p>
            </>
          }

        </div>
      </div>
    </div>
  )
}
