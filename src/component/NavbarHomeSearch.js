import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo-rv-3.png';
import {FaRegEnvelope} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useDispatch,useSelector } from 'react-redux';
import profileImg from '../assets/images/profile.png';

export const NavbarHomeSearch = () => {
   const navigate = useNavigate();
   const auth = useSelector(state=>state.auth);
   const dispatch = useDispatch();
   const[control,setControl] = useState(false);

   useEffect(()=>{
      if(control==true){
         setControl(false);
         if(auth.isLogout==true){
            navigate('/');
         }
      }
   },[control]);
   
   const handleSearch = (event)=>{
      event.preventDefault();
      const searchVehicle = event.target.elements['search'].value;
      // setSearchParams({searchVehicle});
      navigate(`/search?name=${searchVehicle}`,{replace:true});
   };

   const handleLogout = (event)=>{
      event.preventDefault();
      dispatch({
         type : 'LOGOUT'
      });
      setControl(true);
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
                     <Link class="nav-link" to="/category">Vehicle Type</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/history">History</Link>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link">About</a>
                  </li>
               </ul>
               <div className="row align-items-center">
                  <div className="col-lg-6">
                     <form id="search" onSubmit={handleSearch} className="search">
                        <div className='d-flex position-relative'>
                           <input className="form-control" name="search" type="search" placeholder="Search Vehicle" aria-label="Search"/>
                           <button className="btn-search position-absolute" type="submit"><FaSearch/></button>
                        </div>
                     </form>
                  </div>
                  <div className="col-lg-4">
                     <div className="add-navbar d-flex justify-content-center align-items-center">
                        <a href="#" className="position-relative mx-5">
                           <FaRegEnvelope/>
                           <span className="position-absolute translate-middle badge-mail border border-light rounded-circle">1</span>
                        </a>
                        {/* <Link to="/profil" data-bs-toggle="dropdown">
                                  <img src={profile} className="profile rounded-circle" alt="profile"/>
                              </Link> */}
                        {auth?.user!==null && auth?.user.fullName}
                        <ul className="navbar-nav">
                           <li className="nav-item dropdown">
                              <Button className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                 <img src = {auth?.user!==null && (auth?.user.photo==null ? profileImg : auth.user.photo)} className="profile rounded-circle" alt="profile"/>
                              </Button>
                              <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                                 <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                 <li><Link className="dropdown-item" to="/vehicle/favorite">My Favorite</Link></li>
                                 <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                                 {auth.user!==null && auth.user.role!=='admin' && auth.user.isVerified==0 &&<li><Link className="dropdown-item" to="/verify-email">Verify Email</Link></li>}
                                 <li><hr className="dropdown-divider"/></li>
                                 <li  className='dropdown-item' onClick={handleLogout}>Logout</li>
                              </ul>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default NavbarHomeSearch;
