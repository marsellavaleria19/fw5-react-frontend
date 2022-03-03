import React, { Component, Profiler } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassowrd from './pages/ForgotPassowrd'
import Category from './pages/Category'
import ListVehicle from './pages/ListVehicle'
import DetailVehicle from './pages/DetailVehicle'
import Reservation from './pages/Reservation'
import Payment from './pages/Payment'
import History from './pages/History'
import ProfileLayout from './pages/Profile'
import Search from './pages/Search'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="category" element={<Category/>}></Route>
            <Route path="category/:id" element={<ListVehicle/>}></Route>
            <Route path="vehicle" element={<ListVehicle/>}></Route>
            <Route path="category/vehicle/:id" element={<DetailVehicle/>}></Route>
            <Route path="reservation/:id" element={<Reservation/>}></Route>
            <Route path="payment/:id" element={<Payment/>}></Route>
            <Route path="search" element={<Search/>}></Route>
            <Route path="history" element={<History/>}></Route>
            <Route path="profil" element={<ProfileLayout/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="signup" element={<Signup/>}></Route>
            <Route path="forgotpassword" element={<ForgotPassowrd/>}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}
