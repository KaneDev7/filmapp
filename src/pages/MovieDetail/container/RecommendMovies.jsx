import React, { useEffect, useState } from 'react'
import {useGetRecommendationsMoviesQuery, useGetSimilarMoviesQuery } from '../../../services/TMDB'
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

export default function RecommendMovies({movieId}) {
  const { data, isFetching, error } = useGetRecommendationsMoviesQuery(movieId)

  return (
    <>
      {data?.results.length > 0  &&
        <h1 className='text-primary text-3xl mb-5 mt-20 self-start font-bold'> Recommendations </h1>
    
    }

      <Swiper
       autoplay={{
        delay: 5000,
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
          data?.results.map((movie, i) => (
            <SwiperSlide key={i}>
               <MovieCard  movie={movie} />
            </SwiperSlide>
           
          ))
        }
      </Swiper>
    </>
  )
}
