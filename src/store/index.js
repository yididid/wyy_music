//1.引入configureStore
import {configureStore} from '@reduxjs/toolkit'
//2.引入刚声明的createSclice
import userslice from './modules/userslice'
import playerReducer from '../components/Layout/FootPlay/store/player'
//3.注册刚刚引入的createSclice
export default configureStore({
    reducer:{
        userslice:userslice,
        player:playerReducer,
    }
})
