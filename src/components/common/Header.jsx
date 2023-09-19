import React from 'react'
import logo from '../../../src/assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { RiMovie2Fill } from 'react-icons/ri'
import { PiTelevisionFill } from 'react-icons/pi'
import Search from '../movie/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectePage } from '../../reducers/movieFiltrage_slice'
import axios from '../../api/axios'
import { setAuth } from '../../reducers/auth_slice'



export default function Header() {
    const navigate = useNavigate()
    const { username: name } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogOut = async () => {
        try {
            const response = await axios.get('http://localhost:3000/logout',
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response)
            const { token, isLogin, username } = response?.data
            dispatch(setAuth({ isLogin, token, username }))
            sessionStorage.setItem('sessionToken', JSON.stringify({ isLogin, token, username }))
            sessionStorage.removeItem('sessionToken')

            navigate('/login')

            // const { token, isLogin, username } = response?.data
            // dispatch(setAuth({ isLogin, token,username }))
            // sessionStorage.setItem('sessionToken', JSON.stringify({ isLogin, token }))

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full h-20 bg-black flex justify-between px-5'>

            <div className='flex items-center gap-5'>
                <Link to='/'>
                    <img src={logo} className='w-[200px]' onClick={() => dispatch(setSelectePage(1))} alt="logo" />
                </Link>

                <nav className='flex items-center' >
                    <Link to='/tv' className='flex items-center text-gray-400 hover:text-gray-300 decoration-none text-xl mr-10'  >
                        <PiTelevisionFill className='text-primary mr-2' size={20} />
                        <span>TV</span>
                    </Link>

                    <Link to='/' className='flex items-center text-gray-400 hover:text-gray-300 decoration-none text-xl mr-10'  >
                        <RiMovie2Fill className='text-primary mr-2' size={20} />
                        <span>Movies</span>
                    </Link>
                </nav>
            </div>
            {name ?
                <div className='flex gap-4 items-center'>
                    <Search />
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={handleLogOut}
                            className='outline-none border-none bg-primary hover:bg -primary_hover text-white self-center py-2 px-4 rounded-sm'>Log out</button>
                    </div>
                    <div className='w-[50px] h-[50px] flex justify-center items-center bg-green-700 p-2 rounded-full'>
                        <p className='text-xl text-white uppercase cursor-pointer'> {name[0]} </p>
                    </div>
                </div> :

                <div className='flex gap-4 items-center'>
                    <div className='flex items-center gap-4'>
                        <Link to='/login'>
                            <button className='outline-none border-none bg-primary hover:bg -primary_hover text-white self-center py-2 px-4 rounded-sm'>Sign in</button>
                        </Link>
                        <Link to='/register'>
                            <button className='outline-none border-none bg-primary hover:bg -primary_hover text-white self-center py-2 px-4 rounded-sm'>Register</button>
                        </Link>
                    </div>
                </div>
            }

        </div>
    )
}
