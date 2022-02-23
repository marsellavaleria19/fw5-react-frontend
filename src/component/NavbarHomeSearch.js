import React, { Component } from 'react'
import logo from '../assets/images/logo3.png'
import profile from '../assets/images/image-profile.png'
import {FaRegEnvelope} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'

export default class NavbarHomeSearch extends Component {
  render() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <a class="navbar-brand" href="./homepage.html">
                    <img src={logo} alt="Logo"/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="./homepage.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./category.html">Vehicle Type</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./history.html">History</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">About</a>
                        </li>
                    </ul>
                    <div className="d-inline-block">
                        <form className="d-flex position-relative search">
                            <input className="form-control" type="search" placeholder="Search Vehicle" aria-label="Search"/>
                            <button className="btn position-absolute" type="submit"><FaSearch/></button>
                        </form>
                    </div>
                    <div className="add-navbar">
                        <a href="#" className="position-relative mx-5">
                            <FaRegEnvelope/>
                            <span className="position-absolute translate-middle badge-mail border border-light rounded-circle">1</span>
                        </a>
                        <a href="./profile.html">
                            <img src={profile} className="profile rounded-circle" alt="profile"/>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
  }
}
