import React, { Component } from 'react'
import profile from '../assets/images/image-profile.png'
import logo from '../assets/images/logo3.png'
import {FaRegEnvelope} from 'react-icons/fa'

export default class NavbarHome extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <a className="navbar-brand" href="./homepage-after-login.html"><img src={logo} alt="Logo"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="./homepage-after-login.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./category.html">Vehicle Type</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./history.html">History</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <a href="#" className="position-relative mx-5">
                        <FaRegEnvelope/>
                        <span className="position-absolute translate-middle badge-mail border border-light rounded-circle">1</span>
                    </a>
                    <a href="./profile.html">
                        <img src={profile} className="profile rounded-circle" alt="profile"/>
                    </a>
                </div>
            </div>
        </nav>
    )
  }
}
