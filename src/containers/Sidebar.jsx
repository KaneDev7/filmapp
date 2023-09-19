import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSelecteGenre } from '../reducers/movieGenre_slice'
import { useGetMoviesGenresQuery } from '../services/TMDB'

export default function Sidebar() {
    const [genres, setGenres] = useState([])
    const { data, isFetching, error } = useGetMoviesGenresQuery()
    const dispatch = useDispatch()
    const selectedGenre = useSelector(state => state.selectedGenre)
    if(error){
        console.log(error)
    }

    useEffect(  ()=>{
        if(data?.genres){
            const moviesGenreData = Object.values(data?.genres)
            setGenres(moviesGenreData)
         }
    },[data])

    return (
        <div className='w-[250px]  bg-[#161616] px-4 py-20  rounded-sm'>
            <ul className='p-5 space-y-3'>

                <li onClick={()=> dispatch(setSelecteGenre('all')) }
                 className={`${selectedGenre === 'all' ?'text-primary': 'text-primaryText'} text-xl hover:text-primary cursor-pointer`} >
                    <span>All Films</span>
                </li>

                {genres?.map((genre, i) => (
                    <li key={genre + i} onClick={()=> dispatch(setSelecteGenre(genre.name)) }  
                    className={`${selectedGenre === genre?.name ?'text-primary': 'text-primaryText'} text-xl hover:text-primary cursor-pointer`} >
                        <span>{genre?.name} </span>
                    </li>
                ))}

            </ul>
        </div>
    )
}
