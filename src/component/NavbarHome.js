import React, { Component } from 'react'
import profile from '../assets/images/image-profile.png'
import logo from '../assets/images/logo3.png'
import {FaRegEnvelope} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const NavbarHome = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/"><img src={logo} alt="Logo"/></Link>
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
                            <Link className="nav-link" href="/history">History</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <a href="#" className="position-relative mx-5">
                        <FaRegEnvelope/>
                        <span className="position-absolute translate-middle badge-mail border border-light rounded-circle">1</span>
                    </a>
                    <Link to="/profile">
                        <img src={profile} className="profile rounded-circle" alt="profile"/>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavbarHome
