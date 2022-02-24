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
import Profile from './pages/Profile'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="category" element={<Category/>}></Route>
            <Route path="category/:id" element={<ListVehicle/>}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}
