import React, { useEffect, useRef, useState } from 'react'
import {BsFillFilterSquareFill} from 'react-icons/bs'

import { useGetMovieServicesQuery } from '../services/TMDB'
import MovieCard from '../components/movie/MovieCard'
import Pages from '../components/movie/Pages'
import { useDispatch, useSelector } from 'react-redux'
import { loadArr } from '../utils/loadCardEl'
import ChargementCard from '../components/movie/ChargementCard'
import FilterOptions from '../components/movie/FilterOptions'
import { setFilterOptions } from '../reducers/filterOptions_slice'
import { setSelectePage } from '../reducers/movieFiltrage_slice'


export default function MoviesSection() {
  const selectedGenre = useSelector(state => state.selectedGenre)
  const selectedFilter = useSelector(state => state.selectedFilter)
  const dispath = useDispatch()
  const { data, isFetching, error } = useGetMovieServicesQuery(selectedFilter)
  const divRef = useRef(null)


  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' })
  },)

  if(error) return

  return (
    <div className='flex-1 flex flex-col  p-10 rounded-sm relative '> 
      <header ref={divRef} className='w-full h-[80px] flex items-center justify-between bg-bgSsidebar absolute top-0 left-0 '>
        <h2 className='text-white/80 text-2xl'> {selectedGenre === 'all' ? 'All Films' : selectedGenre + ' Films'} </h2>
       <div className='flex gap-4'>
        <p className='text-white/80 text-xl'>Filter</p>
       <BsFillFilterSquareFill onClick={() => dispath(setFilterOptions(true))} className='text-primary text-3xl hover:text-primary_hover' />
       </div>
      </header>

      <Pages total_pages={500} />

      <ul className='flex flex-wrap gap-10 justify-center  '>
        {isFetching ?
          <ChargementCard /> :
          data?.results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </ul>
      <Pages total_pages={500} />
      

    </div>
  )
}
