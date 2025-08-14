import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import logReducer from './logSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        logs: logReducer


    }
}
)
export default store