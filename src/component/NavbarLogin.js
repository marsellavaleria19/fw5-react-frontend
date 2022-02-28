import React, { Component } from 'react'
import logo from '../assets/images/logo3.png'
import { Link,useNavigate } from 'react-router-dom';

export const NavbarLogin  = () =>{
    const navigate = useNavigate()
    const goToLogin = ()=>{
        navigate("/login");
    }

    const goToSignup = ()=>{
        navigate("/signup");
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
                    <div class="d-flex">
                        <button class="button-white mx-3" onClick={goToLogin}>Login</button>
                        <button class="button-filled" onClick={goToSignup}>Register</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default NavbarLogin;
