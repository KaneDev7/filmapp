import React from 'react'

export default function Note({note}) {
  return (
    <div className='w-[50px] h-[50px] flex justify-center items-center font-bold text-xl bg-note border-4 border-solid 
     border-gray-300 absolute right-2 top-2 rounded-full shadow-sm'>
      <span className='text-center'> {note} </span>
    </div>
  )
}
