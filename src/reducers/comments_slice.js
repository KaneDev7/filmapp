import {createSlice} from '@reduxjs/toolkit'

export const comments_slice = createSlice({
    name: 'comments',
    initialState : [], 
    reducers : {
        setComments: (state, action)=>{
            return  [... action.payload]
        },
        addNewComment : (state, action)=>{
            return  [...state, action.payload]
        },
    }
})

export const {setComments, addNewComment} = comments_slice.actions