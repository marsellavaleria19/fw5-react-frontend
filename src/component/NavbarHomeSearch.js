import React, { Component } from 'react'
import logo from '../assets/images/logo3.png'
import profile from '../assets/images/image-profile.png'
import {FaRegEnvelope} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'
import {useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const NavbarHomeSearch = () => {
    const navigate = useNavigate()

    const handleSearch = (event)=>{
        event.preventDefault();
        const searchVehicle = event.target.elements["search"].value;
        // setSearchParams({searchVehicle});
        navigate(`/search?name=${searchVehicle}`,{replace:true})
        
    }
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
                    <div className="row">
                        <div className="col-lg">
                            <form id="search" onSubmit={handleSearch} className="d-flex position-relative search">
                                <input className="form-control" name="search" type="search" placeholder="Search Vehicle" aria-label="Search"/>
                                <button className="btn position-absolute" type="submit"><FaSearch/></button>
                            </form>
                        </div>
                        <div className="col-lg">
                            <div className="add-navbar d-flex justify-content-center">
                                <a href="#" className="position-relative mx-5">
                                    <FaRegEnvelope/>
                                    <span className="position-absolute translate-middle badge-mail border border-light rounded-circle">1</span>
                                </a>
                                <Link to="/profil">
                                    <img src={profile} className="profile rounded-circle" alt="profile"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarHomeSearch
