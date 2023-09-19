import React, { useRef, useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectePage } from '../../reducers/movieFiltrage_slice'

export default function Search() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(value.trim() !== ''){
      dispatch(setSelectePage(1))
      navigate(`/SearchResult/${value}`)
      setValue('')

    }
  }

  return (
    <div className='relative'>

     <form action="" onSubmit={handleSubmit}>
      <FiSearch className='text-primaryText absolute right-0 top-[50%] translate-x-[-50%] translate-y-[-50%] ' size={25} type='submit'/>
     <input 
      value={value}
      onChange={(e)=> setValue(e.target.value)}
      placeholder='Search'
      className='w-[300px] border border-white/20 bg-bgSsidebar outline-none
       rounded-full py-2 px-4 text-white/80 text-md' type="text" />
     </form>
    </div>
  )
}
