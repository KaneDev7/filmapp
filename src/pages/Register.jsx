import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'
import { setAuth } from '../reducers/auth_slice'
import { useDispatch } from 'react-redux'
import { data } from 'autoprefixer'

const SIGNIN_URL = '/auth'

export default function Register() {

  const dispatch = useDispatch()
  const errRef = useRef()
  const inputs = useRef([])

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmpwd] = useState('')
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

    if (pwd !== confirmPwd) {
      return setErrMsg('password d\'ont match ')
    }
    try {
      const response = await axios.post('http://localhost:3000/register',
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      console.log(response?.data)
      if (response.data.error) {
        return setErrMsg(response.data.error)
      }
      setSucess(true)
    } catch (error) {
      setErrMsg('No server response')

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
              <p className='text-white/80 text-md mt-5'>
              Thank you for your registration, please <Link to='/login' className='text-primary hover:underline' > Login </Link>
              </p>
            </div> :
            <>
              <h1 className='text-white text-3xl text-center'>Register </h1>

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
                    type="text"
                    id='username'
                    required
                    autoComplete='off'
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>


                <div className='flex flex-col my-7'>
                  <label className='text-white/80 mb-2 text-md' htmlFor="password">Password</label>
                  <input
                    className='outline-none w-full h-[50px] pl-5 text-xl focus:border-2 focus:border-primary rounded-sm bg-gray-400'
                    type="password"
                    id='password'
                    required
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                  />
                </div>

                <div className='flex flex-col my-7'>
                  <label className='text-white/80 mb-2 text-md' htmlFor="password">Confirm password</label>
                  <input
                    className='outline-none w-full h-[50px] pl-5 text-xl focus:border-2 focus:border-primary rounded-sm bg-gray-400'
                    type="password"
                    id='ConfirmPassword'
                    required
                    onChange={(e) => setConfirmpwd(e.target.value)}
                    value={confirmPwd}
                  />
                </div>

                <button className='w-full h-[50px] mt-5  border-none bg-primary text-white/80 hover:bg-primary_hover rounded-sm' type='submit'> Sign in </button>
              </form>

              <p className='text-white/80 text-md mt-5'>
                Already have a acount please <Link to='/login' className='text-primary hover:underline' > Login </Link>
              </p>
            </>
          }

        </div>
      </div>
    </div>
  )
}
