import {createSlice} from '@reduxjs/toolkit'

export const filterOptions_slice = createSlice({
    name: 'isFilterOptionsActif',
    initialState : false, 
    reducers : {
        setFilterOptions : (state, action)=>{
            return action.payload
        }
    }
})

export const {setFilterOptions} = filterOptions_slice.actions
