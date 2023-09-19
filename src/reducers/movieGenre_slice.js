import {createSlice} from '@reduxjs/toolkit'

export const moviesGenreSelected_Slice = createSlice({
    name: 'selectedGenre',
    initialState : 'all', 
    reducers : {
        setSelecteGenre: (state, action)=>{
            return action.payload
        }
    }
})

export const {setSelecteGenre} = moviesGenreSelected_Slice.actions