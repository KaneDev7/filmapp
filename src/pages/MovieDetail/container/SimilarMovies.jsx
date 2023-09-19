import React, { useEffect, useState } from 'react'
import {useGetSimilarMoviesQuery } from '../../../services/TMDB'
import { useSelector } from 'react-redux'
import ChargementCard from '../../../components/movie/ChargementCard'
import MovieCard from '../../../components/movie/MovieCard'


import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../swiper.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

export default function SimilarMovies({movieId}) {
  const [similarMovies, setSimilarMovies] = useState([])
  const { data, isFetching, error } = useGetSimilarMoviesQuery(movieId)


  useEffect(()=>{
    if(data?.results){
      const newSimilarMovies = data?.results.filter(movie => movie.poster_path !== null && movie.vote_average > 6)
      setSimilarMovies(newSimilarMovies)
    }
   
  },[data])

  return (
    <>
    {similarMovies.length > 0  &&
        <h1 className='text-primary text-3xl mb-5 self-start font-bold'> Similar Movies </h1>
    
    }

      <Swiper
       autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
        spaceBetween={20}
        navigation={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >
       
        {isFetching ?
          <ChargementCard /> :
          similarMovies.map(movie => (
            <SwiperSlide key={movie.id} >
               <MovieCard movie={movie} />
            </SwiperSlide>
           
          ))
        }
      </Swiper>
{/* 
        <ul className='flex flex-wrap gap-10  w-[100%]'>
        {isFetching ?
          <ChargementCard /> :
          data?.results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </ul> */}
    </>
  )
}
