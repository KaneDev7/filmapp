import React, { useRef, useState } from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterOptions } from '../../reducers/filterOptions_slice';
import Button from './Button';
import { setMovieFilter } from '../../reducers/movieFiltrage_slice';



export default function FilterOptions() {
    const selectedFilter = useSelector(state => state.selectedFilter)
    const dispatch = useDispatch()
    const dateMaxRef = useRef()
    const dateMinRef = useRef()
    const sortByRef = useRef()


    const [ragneValue, setRagneValue] = useState([
        selectedFilter.vote_average_gte,
        selectedFilter.vote_average_lte
    ])

    const handleInputRange = (value) => {
        setRagneValue(value)
    }

    const handleSubmitFilter = ()=>{

        const newFilter = {
            release_date_gte:  dateMaxRef.current.value,
            release_date_lte: dateMinRef.current.value,
            vote_average_gte : ragneValue[0],
            vote_average_lte : ragneValue[1],
        }

        dispatch(setMovieFilter(newFilter))
        dispatch(setFilterOptions(false))
    }


    return (
        <section className='w-full h-full fixed left-0 top-0 z-10 '>
            <div className='w-screen h-screen bg-black/50 absolute inset-0 shadow-md' onClick={() => dispatch(setFilterOptions(false))} />

            <div className='w-[500px]  bg-bgSsidebar absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 shadow-red-400 rounded-md'>

                <h1 className='text-3xl text-primary mb-5'> Filter options </h1>

                <div className='border-b border-white/10 py-5'>
                    <p className='text-white/70 text-md mb-2 '> Select note palage </p>
                    <div className='flex items-center gap-4'>
                        <span className='text-white text-md'> {ragneValue[0]} </span>
                        <RangeSlider
                            min={1}
                            max={10}
                            defaultValue={[selectedFilter.vote_average_gte, selectedFilter.vote_average_lte]}
                            className='w-[200px] h-[5px] range-sm'
                            onInput={handleInputRange}
                        />
                        <span className='text-white/70 text-md'> {ragneValue[1]} </span>
                    </div>
                </div>

                <div className='border-b border-white/10 py-5'>
                    <p className='text-white/70 text-md mb-2 '>select date minimal</p>
                    <input type="date" defaultValue={selectedFilter.release_date_lte}  ref={dateMinRef} className='outline p-1' />
                </div>

                <div className='border-b border-white/10 py-5'>
                    <p className='text-white/70 text-md mb-2 '>select date maximal</p>
                    <input type="date" defaultValue={selectedFilter.release_date_gte}  ref={dateMaxRef} className='outline p-1' />
                </div>


                <button
                onClick={handleSubmitFilter}
                    className={`py-2 px-3 bg-primary hover:bg-primary_hover text-white/80 text-sm mt-5`}>
                    Save
                </button>

            </div>

        </section>
    )
}
