import React, { useEffect, useState } from 'react'
import { useGetCreditsOfMovieQuery } from '../../../services/TMDB'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../swiper.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import ChargementCard from '../../../components/movie/ChargementCard';
import { Link } from 'react-router-dom';
import PersonInfos from '../../../components/movie/PersonInfos';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPersonInfos } from '../../../reducers/ShowPersonInfos_slice';

export default function Credits({ movieId }) {
    const [actors, setActors] = useState([])
    const { data, isFetching, error } = useGetCreditsOfMovieQuery(movieId)
    const dispatch = useDispatch()

    useEffect(() => {
        if (data?.cast) {
            const newActors = data.cast.filter(actor => actor.profile_path !== null)
            setActors(newActors)
        }
    }, [data])

    return (
        <div className='flex justify-center items-center flex-col '>
            <div className='w-[80%] gap-4 shadow-sm rounded-sm'>
                <h1 className='text-primary text-3xl mb-5  self-start font-bold'> Actors </h1>

                <ul className='p-10 bg-black/20 rounded-md' >
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
                            1350: {
                                slidesPerView: 5,
                            },
                            1400: {
                                slidesPerView: 7,
                            }
                        }}
                        spaceBetween={0}
                        navigation={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                        className="mySwiper"
                    >

                        {isFetching ?
                            <ChargementCard /> :
                            actors.map(person => (
                                <SwiperSlide key={person.id} className='flex flex-col justify-center items-center' onClick={()=> dispatch(setShowPersonInfos({isActif : true, personId: person.id }))}>
                                <li className='w-[150px] h-[150px] '>
                                    <img className='w-full h-full rounded-full' src={`https://image.tmdb.org/t/p/w342${person.profile_path}`} alt="" />
                                </li>
                                <p className='pt-4 text-white/75 text-sm'> {person.name} </p>

                                </SwiperSlide>

                            ))
                        }
                    </Swiper>

                </ul>
            </div>

        </div>

    )
}
