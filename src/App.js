import React, { Component, Profiler, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassowrd from './pages/ForgotPassowrd'
import Category from './pages/Category'
import ListVehicle from './pages/ListVehicle'
import DetailVehicle from './pages/DetailVehicle'
import Reservation from './pages/Reservation'
import VerifyUser from './pages/VerifyUser'
import Payment from './pages/Payment'
import History from './pages/History'
import ProfileLayout from './pages/Profile'
import Search from './pages/Search'
import ConfirmForgotPassowrd from './pages/ConfirmForgotPassword'
import {getDataUser } from './redux/actions/auth'
import { useDispatch,useSelector } from 'react-redux'
import PrivateRoute from './routers/PrivateRouter'
import { getListCategory } from './redux/actions/category'

export const App = () => {
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    
    useEffect(()=>{
      dispatch(getListCategory())
    },[])
    
    useEffect(()=>{
        const token = window.localStorage.getItem('token')
        if(token){
          dispatch({
            type: 'LOGIN_FULFILLED',
            payload: {
              data: {
                results: {
                  token
                }
              }
            }
          })
          dispatch(getDataUser(token))
        }
    },[dispatch,auth.token])

  


    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="category" element={<Category/>}></Route>
            <Route path="category/:id" element={<ListVehicle/>}></Route>
            <Route path="vehicle" element={<ListVehicle/>}></Route>
            <Route path="category/vehicle/:id" element={<DetailVehicle/>}></Route>
            <Route path="search" element={<Search/>}></Route>
            <Route path="history/:id" element={<PrivateRoute isAuthenticated={auth.isAuthenticated}><History/></PrivateRoute>}></Route>
            <Route path="profil" element={<ProfileLayout/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="signup" element={<Signup/>}></Route>
            <Route path='verifyuser' element={<VerifyUser/>}></Route>
            <Route path="forgotpassword" element={<ForgotPassowrd/>}></Route>
            <Route path="confirmforgotpassword" element={<ConfirmForgotPassowrd/>}></Route>
            <Route path="reservation/:id" element={<PrivateRoute isAuthenticated={auth.isAuthenticated}><Reservation/></PrivateRoute>}></Route>
            <Route path="payment/:id" element={<PrivateRoute isAuthenticated={auth.isAuthenticated}><Payment/></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App