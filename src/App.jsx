
import './App.css'
import Header from './components/common/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tv from './pages/Tv'
import Sidebar from './containers/Sidebar'

import MovieDetails from './pages/MovieDetail/MovieDetails'
import SearchResults from './containers/SearchResults'
import PersonInfos from './components/movie/PersonInfos'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SignIn from './pages/SignIn'
import RequireAuth from './components/RequireAuth'
import Register from './pages/Register'

function App() {
  const auth = useSelector(state => state.auth)
  return (
    <>
      <Header />
      
      <Routes>
        {/* public routes */}
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<Register />} />

        {/* protected routes */}
        <Route element={<RequireAuth />} >
          <Route path='/' element={<Home />} />
          <Route path='/tv' element={<Tv />} />
          <Route path='/movieDetail/:id' element={<MovieDetails />} />
          <Route path='/SearchResult/:value' element={<SearchResults />} />
        </Route>


      </Routes>:
    </>
  )
}

export default App
