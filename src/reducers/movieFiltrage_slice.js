import {createSlice} from '@reduxjs/toolkit'

export const moviesFilter_Slice = createSlice({
    name: 'selectedFilter',
    initialState : {
        sort_order :'popularity.desc',
        release_date_gte: '2018-01-01',
        release_date_lte: '2020-01-01',
        vote_average_gte : 5.0,
        vote_average_lte : 10.0,
        page : 1
    }, 
    reducers : {
        setMovieFilter: (state, action)=>{
             return {...state, ...action.payload }
        },  
        setSelectePage: (state, action)=>{
            return {...state, page: action.payload }
        },
        nextPage: (state, action)=>{
            if(state.page < action.payload){
                return {...state, page: Number(state.page) +1 }
            }
        },
        prevPage: (state, action)=>{
            if(state.page > 1){
                return {...state, page: Number(state.page) -1 }

            }
        }
    }
})

export const {setMovieFilter, nextPage, prevPage, setSelectePage } = moviesFilter_Slice.actions
