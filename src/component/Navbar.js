import React, { Component } from 'react'
import logo from '../assets/images/logo3.png'
import { Link,useNavigate } from 'react-router-dom';
import Button from './Button';
import { useSelector,useDispatch } from 'react-redux';
import {FaRegEnvelope,FaSearch} from 'react-icons/fa'
import profileImg from '../assets/images/profile.png'
import Profile from '../pages/Profile';

export const Navbar = () =>{
    const navigate = useNavigate()
    const goToLogin = ()=>{
        navigate("/login");
    }

    const goToSignup = ()=>{
        navigate("/signup");
    }
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    const handleSearch = (event)=>{
        event.preventDefault();
        const searchVehicle = event.target.elements["search"].value;
        // setSearchParams({searchVehicle});
        navigate(`/search?name=${searchVehicle}`,{replace:true})
        
    }

    const handleLogout = (event)=>{
        event.preventDefault()
        dispatch({
            type : 'LOGOUT'
        })

        if(auth.token==null){
            navigate('/login')
        }
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <Link class="navbar-brand" to="/">
                    <img src={logo} alt="Logo"/>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/category">Vehicle Type</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/history">History</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="">About</Link>
                        </li>
                    </ul>
                    {
                        auth.token !==null &&
                        <div className="row align-items-center">
                        <div className="col-lg">
                            <form id="search" onSubmit={handleSearch} className="d-flex position-relative search">
                                <input className="form-control" name="search" type="search" placeholder="Search Vehicle" aria-label="Search"/>
                                <button className="btn position-absolute" type="submit"><FaSearch/></button>
                            </form>
                        </div>
                        <div className="col-lg">
                            <div className="add-navbar d-flex justify-content-center align-items-center">
                                <div className="position-relative mx-5">
                                    <FaRegEnvelope/>
                                    <span className="position-absolute translate-middle badge-mail border border-light rounded-circle">1</span>
                                </div>
                                {/* <Link to="/profil" data-bs-toggle="dropdown">
                                    <img src={profile} className="profile rounded-circle" alt="profile"/>
                                </Link> */}
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Button className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                           <img src = {auth.user!==null && (auth.user.photo==null ? profileImg : auth.user.photo)} className="profile rounded-circle" alt="profile"/>
                                           {auth.user!==null && auth.user.fullName}
                                        </Button>
                                        <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
                                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li  className='dropdown-item' onClick={handleLogout}>Logout</li>
                                        </ul>
                                    </li>
                                </ul>  
                            </div>
                        </div>
                    </div> }
                    {
                      auth.token === null &&
                      <div className='row'>
                      <div className="col-lg-6">
                          <Button  btnVarian="button-white" onClick={goToLogin}>Login</Button>
                          {/* <button className="button-white" onClick={goToLogin}>Login</button> */}
                      </div>
                      <div className="col-lg-6">
                          <Button btnVarian="button-filled" onClick={goToSignup}>Register</Button>
                          {/* <button className="button-filled" onClick={goToSignup}>Register</button> */}
                      </div>
                  </div>
                    
                    }
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
