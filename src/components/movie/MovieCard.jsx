import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetMoviesGenresQuery } from '../../services/TMDB'
import Note from './Note'
import { useDispatch, useSelector } from 'react-redux'
import { setSelecteGenre } from '../../reducers/movieGenre_slice'

export default function MovieCard({ movie }) {
  const [genres, setGenres] = useState([])
  const selectedGenre = useSelector(state => state.selectedGenre)
  const dispatch = useDispatch()
  const { data: getGenre, isFetching: isFetchingGenre } = useGetMoviesGenresQuery()


  useEffect(() => {
    if (getGenre?.genres) {
      const moviesGenreData = Object.values(getGenre?.genres)
      let specificGenres = []

      for (const genre of moviesGenreData) {
        movie.genre_ids.forEach((genre_id, i) => {
          if (genre && genre_id === genre.id && movie?.genre_ids.length - 1 !== i) {
            specificGenres.push(genre.name)
          }
        });
      }
      setGenres(specificGenres)
    }
  }, [getGenre])

  if (genres.includes(selectedGenre) || selectedGenre === 'all' && (movie.poster_path))
    return (
      <li className='relative'>
        <Link to={`/movieDetail/${movie.id}`}>
          <img className='h-[400px] w-[300px]  rounded-md' src={`https://image.tmdb.org/t/p/w342${movie?.poster_path}`} alt="movie-img" />
        </Link>
        <div className='flex flex-col mt-2 w-full'>
          <Link to={`/movies/movieDetail/${movie.id}`}>
            <p className='text-xl text-white truncate max-w-[300px] hover:underline'>
              {movie.title}
            </p>
          </Link>

          <p className='text-md text-primaryText max-w-[300px]'>
            {genres?.map((genre, i) => (
              <span key={genre + i} onClick={(e) => dispatch(setSelecteGenre(genre))} className=' cursor-pointer hover:underline'> {`${genre}`}{genres.length - 1 !== i && ','} </span>
            ))}
          </p>
        </div>

        <Note note={movie.vote_average.toFixed(1)} />
      </li>
    )
}
