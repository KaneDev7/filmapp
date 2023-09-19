import {createSlice} from '@reduxjs/toolkit'

export const ShowPersonInfos_slice = createSlice({
    name: 'isPersonInfosActif',
    initialState : {isActif : false, personId: null}, 
    reducers : {
        setShowPersonInfos : (state, action)=>{
            return {...state, ...action.payload}
        }
    }
})

export const {setShowPersonInfos} = ShowPersonInfos_slice.actions