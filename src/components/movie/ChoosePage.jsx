import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectePage } from '../../reducers/movieFiltrage_slice'

export default function ChoosePage({setIsChoosPageActif,isChoosPageActif}) {
    const dispatch = useDispatch()
    const {page} = useSelector(state => state.selectedFilter)

  const inputRef = useRef()

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(inputRef.current.value.trim() !== ''){
            dispatch(setSelectePage(inputRef.current.value))
            setIsChoosPageActif(false)
        }

    }

    useEffect(() =>{
        if(isChoosPageActif){
            document.addEventListener('click', (e)=>{
            if(e.target.offsetParent?.id !== 'choosePage' && e.target.offsetParent?.id !== 'page'){
                    setIsChoosPageActif(false)
                }
            })
        }
    },  [page, isChoosPageActif])

    if(isChoosPageActif)
  return (
    <form action="" id='choosePage' onSubmit={handleSubmit} className='h-[70px] absolute top-[-100px] flex items-center gap-2 bg-black px-4 '>
    <div>
        <input defaultValue={page} ref={inputRef} type="number" className='w-[80px] outline-none bg-bgSsidebar p-2 text-center text-white' />
    </div>
    <button type='submit' className='bg-primary text-white whitespace-nowrap border-none p-2'> Go to</button>
   </form>
  )
}
