import React from 'react'

export default function Button({title,id,className} ) {
    const handleClik = (e) =>{
        e.target.parentElement.querySelector('.selectedSort').classList.remove('selectedSort')
        e.target.classList.add('selectedSort')
    }
  return (
   <button 
    onClick={handleClik}
    id={id}
    className={`py-2 px-3 bg-primary hover:bg-primary_hover text-white/80 text-sm opacity-[.5] ${className}`}>
    {title}
    </button>
  )
}
