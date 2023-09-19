import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMoviesBySearchQuery } from '../services/TMDB'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/movie/MovieCard'
import Pages from '../components/movie/Pages'
import ChargementCard from '../components/movie/ChargementCard'

export default function SearchResults() {
    const {value} = useParams()
    const dispatch = useDispatch()
    const {page} = useSelector(state => state.selectedFilter)
    const { data, isFetching, error } = useGetMoviesBySearchQuery({value,page})
    const divRef = useRef(null)

    
    if(error){
        console.log(error)
    }

    return (
      <div className='flex-1 flex flex-col  p-10 rounded-sm relative '>
       
       <h2 className={`text-white/80 text-2xl`} >Result for <span className='text-primary'> {value} </span>  </h2>
       {data?.results?.length === 0 ?
        (<h1 className='text-6xl text-white/60 text-center mt-20'> We can't found a result for  <span className='text-primary'> {value} </span>  </h1>):
        <>
        <Pages total_pages={data?.total_pages} />
        <ul className='flex flex-wrap gap-10 '>
          {isFetching ?
            <ChargementCard /> :
            data?.results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
            ))
          }
        </ul>
        <Pages total_pages={data?.total_pages} />
        </>
       }

      </div>
    )
}
