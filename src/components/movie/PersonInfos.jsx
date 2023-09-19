import React, { useEffect } from 'react'
import { useGetPersonInfosQuery } from '../../services/TMDB'
import {AiFillCloseCircle} from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setShowPersonInfos } from '../../reducers/ShowPersonInfos_slice'


export default function PersonInfos() {

    const {personId} = useSelector(state => state.isPersonInfosActif) 
    const dispatch = useDispatch()
    const {data , isFetching, error} = useGetPersonInfosQuery(personId)
    
  return (
    <div className='w-screen h-screen fixed inset-0 z-10 bg-black/50'>
      <div className='w-[1000px] max-h-[800px] overflow-auto  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-bgSsidebar p-10 rounded-md '>
        <AiFillCloseCircle onClick={() => dispatch(setShowPersonInfos({isActif: false}))}  className='absolute right-4 top-4 text-primary'  size={30}  />
        <div className='flex flex-col justify-center items-center '>

            <div className='flex flex-col justify-center items-center'>
              <img className='w-[250px] h-[250px] rounded-full' src={`https://image.tmdb.org/t/p/w342${data?.profile_path}`} alt="" />
              <p className='text-white text-4xl text-center mt-5'> {data?.name} </p>
              {data?.birthday && 
              <p className='text-primaryText text-md text-center mt-2'><span className='text-white/60'>birthday: </span> {data?.birthday} </p>
              }
            </div>

           <div className='flex flex-col gap-4 mt-5 '>
           <h2 className='text-primary text-3xl'> Biography </h2>
           <div className='overflow-y-auto '>
           {data?.biography &&
           <p className='text-white/60 text-md leading-8 '> {data?.biography} </p>
           
           } 

           </div>
           </div>
        </div>
      </div>
    </div>
  )
}
