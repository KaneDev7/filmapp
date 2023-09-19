import React, { useEffect } from 'react'
import { Routes, Route, useParams, json } from 'react-router-dom'

import Sidebar from '../containers/Sidebar'
import MoviesSection from '../containers/MoviesSection'
import { useDispatch, useSelector } from 'react-redux'
import FilterOptions from '../components/movie/FilterOptions'
import { setAuth } from '../reducers/auth_slice'

export default function Home() {
 const isFilterOptionsActif = useSelector(state => state.isFilterOptionsActif)
 
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/home',
          JSON.stringify({ username: user, password: pwd }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          })
      } catch (error) {

      }
    }
  },[])

  return (
    <div className='flex m-5 '>
      {isFilterOptionsActif && <FilterOptions />}
      <Sidebar />
      <MoviesSection />
    </div>
  )
}
