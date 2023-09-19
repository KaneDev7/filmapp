import {createSlice} from '@reduxjs/toolkit'

export const auth_slice = createSlice({
    name: 'auth',
    initialState : {
        token : '',
        isLogin : false,
    }, 
    reducers : {
        setAuth: (state, action)=>{
            return  {... action.payload}
        }
    }
})

export const {setAuth} = auth_slice.actions