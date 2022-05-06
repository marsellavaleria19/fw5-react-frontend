import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassowrd from './pages/ForgotPassowrd';
import Category from './pages/Category';
import ListVehicle from './pages/ListVehicle';
import DetailVehicle from './pages/DetailVehicle';
import Reservation from './pages/Reservation';
import VerifyEmail from './pages/VerifyEmail';
import Payment from './pages/Payment';
import History from './pages/History';
import ProfileLayout from './pages/Profile';
import Search from './pages/Search';
import ConfirmForgotPassowrd from './pages/ConfirmForgotPassword';
import AddVehicle from './pages/AddVehicle';
import {getDataUser } from './redux/actions/auth';
import { useDispatch,useSelector } from 'react-redux';
import { getListCategory } from './redux/actions/category';
import { getListLocation } from './redux/actions/location';
import { getListPaymentType } from './redux/actions/payment';
import EditVehicle from './pages/EditVehicle';
import { getListStatus } from './redux/actions/status';
import { getListHistory,getListHistoryByUserId } from './redux/actions/history';
import ChangePasswordLayout from './pages/ChangePassword';
import ConfirmVerifyEmailLayout from './pages/ConfirmVerifyEmail';
import ListFavoriteVehicle from './pages/ListFavoriteVehicle';

export const App = () => {
   const auth = useSelector(state=>state.auth);
   const dispatch = useDispatch();
    
   useEffect(()=>{
      dispatch(getListCategory());
      dispatch(getListLocation());
      dispatch(getListPaymentType());
      dispatch(getListStatus());
      // dispatch({
      //    type:'REFRESH_DATA_VEHICLE'
      // });
   },[]);
  
   useEffect(()=>{
      
      // dispatch({
      //    type:'REFRESH_DATA_VEHICLE'
      // });
   },[auth.user]);

   useEffect(()=>{
      if(auth.token){
         dispatch(getDataUser(auth.token));
         if(auth.user!==null){
            if(auth.user.role=='admin'){
               dispatch(getListHistory(auth.token));
            }else{
               dispatch(getListHistoryByUserId(auth.token,auth.user.id));
            }
         }
      }
   },[dispatch,auth.token]);

  


   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="category" element={<Category/>}></Route>
            <Route path="category/:id" element={<ListVehicle/>}></Route>
            <Route path="vehicle" element={<ListVehicle/>}></Route>
            <Route path="vehicle/:id" element={<DetailVehicle/>}></Route>
            <Route path="vehicle/favorite" element={<ListFavoriteVehicle/>}></Route>
            <Route path="search" element={<Search/>}></Route>
            <Route path="history" element={<History/>}></Route>
            <Route path="profile" element={<ProfileLayout/>}></Route>
            <Route path="change-password" element={<ChangePasswordLayout/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="signup" element={<Signup/>}></Route>
            <Route path='verify-email' element={<VerifyEmail/>}></Route>
            <Route path='confirm-verify-email' element={<ConfirmVerifyEmailLayout/>}></Route>
            <Route path="forgotpassword" element={<ForgotPassowrd/>}></Route>
            <Route path="vehicle/add" element={<AddVehicle/>}></Route>
            <Route path="vehicle/edit" element={<EditVehicle/>}></Route>
            <Route path="confirmforgotpassword" element={<ConfirmForgotPassowrd/>}></Route>
            <Route path="reservation" element={<Reservation/>}></Route>
            <Route path="payment" element={<Payment/>}></Route>
         </Routes>
      </BrowserRouter>
   );
};

export default App;