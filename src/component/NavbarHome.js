import React from 'react';
import logo from '../assets/images/logo3.png';
import {FaRegEnvelope} from 'react-icons/fa';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import profileImg from '../assets/images/profile.png';

export const NavbarHome = () => {
   const navigate = useNavigate();
   const {auth} = useSelector(state=>state);
   const dispatch = useDispatch(); 


   const handleLogout = (event)=>{
      event.preventDefault();
      dispatch({
         type : 'LOGOUT'
      });

      if(auth.token==null){
         navigate('/login');
      }
   };

   return (
      <nav className="navbar navbar-expand-lg navbar-light">
         <div className="container">
            <Link className="navbar-brand" to="/">
               <img src={logo} alt="Logo"/>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/category">Vehicle Type</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/history">History</Link>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link">About</a>
                  </li>
               </ul>
               <div className="add-navbar d-flex justify-content-center align-items-center">
                  <a href="#" className="position-relative mx-5">
                     <FaRegEnvelope/>
                     <span className="position-absolute translate-middle badge-mail border border-light rounded-circle">1</span>
                  </a>
                  <ul className="navbar-nav">
                     <li className="nav-item dropdown">
                        <Button className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                           <img src = {auth.user!==null && (auth.user.photo==null ? profileImg : auth.user.photo)} className="profile rounded-circle" alt="profile"/>
                        </Button>
                        <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                           <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                           <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                           <li><Link className="dropdown-item" to="/verify-email">Verify Email</Link></li>
                           <li><hr className="dropdown-divider"/></li>
                           <li  className='dropdown-item' onClick={handleLogout}>Logout</li>
                        </ul>
                     </li>
                  </ul> 
               </div>
            </div>
         </div>
      </nav>
   );
};

export default NavbarHome;
