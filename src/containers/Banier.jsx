import React, { useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

// redux
import { useGetMoviesTitlesQuery } from '../services/dbMovies'
import { filterNullImg } from '../utils/filterNullImg';

export default function Banier() {
    const {data, isFetching, error} = useGetMoviesTitlesQuery()
    let titleData = [];

    if (data?.results) {
      titleData = filterNullImg([...data.results]);
}

  return (
    <div>
     <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
       {titleData?.map(title =>(
         <SwiperSlide style={{
          background : `url(${title?.primaryImage?.url && title?.primaryImage?.url})`,
          backgroundRepeat : 'none',
          backgroundSize : '100vw 120vh',
          backgroundPosition :'center',
          backgroundRepeat : 'no-repeat'
         }} 
           className='w-full h-[90vh] bg-blue-500'>
          
         </SwiperSlide>
       ))}

      </Swiper>
    </div>
  )
}
