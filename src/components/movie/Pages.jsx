import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextPage, prevPage, setSelectePage } from '../../reducers/movieFiltrage_slice'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'
import ChoosePage from './ChoosePage'


export default function pages({total_pages}) {
    const dispath = useDispatch()
    const {page : selectedPage} = useSelector(state => state.selectedFilter)
    const [isChoosPageActif, setIsChoosPageActif] = useState(false)

    const handleClick = (e) =>{
        setIsChoosPageActif(false)
        if(e.target.title === 'next'){
            dispath(nextPage(total_pages))
        }else{
            dispath(prevPage())
        }
    }

    return (
        <ul id='page' className='flex justify-center items-center gap-4  my-20 relative'>
         <ChoosePage setIsChoosPageActif={setIsChoosPageActif} isChoosPageActif={isChoosPageActif} />
            
            <li  onClick={handleClick}
                title='prev'
                className='w-[40px] h-[40px] flex justify-center items-center  text-xl text-white bg-primary opacity-[.9] hover:opacity-[1]
                           border-gray-30 rounded-full shadow-sm cursor-pointer'>
                <AiOutlineArrowLeft className='pointer-events-none' />
            </li>
          
            <li onClick={()=> setIsChoosPageActif(true)} className='flex justify-center items-center  text-md text-black bg-white opacity-[.9] hover:opacity-[1] py-1 px-3 font-bold
                         border-gray-300 top-2 rounded-full shadow-sm cursor-pointer select-none'>
                        <span className='m-1'> {selectedPage} </span> / <span className='m-1'> {total_pages} </span>
                </li>

            <li onClick={handleClick}
                title='next'
                className='w-[40px] h-[40px] flex justify-center items-center  text-xl text-white bg-primary opacity-[.9] hover:opacity-[1]
            border-gray-300  rounded-full shadow-sm cursor-pointer'>
                <AiOutlineArrowRight className='pointer-events-none' />
            </li>
        </ul>
    )
}
