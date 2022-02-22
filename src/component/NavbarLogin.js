import React, { Component } from 'react'
import logo from '../assets/images/logo2.png'

export class NavbarLogin extends Component {
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
                <div class="d-flex">
                    <button class="button-white mx-3" onclick="window.location='./login.html';">Login</button>
                    <button class="button-filled" onclick="window.location='./signup.html';">Register</button>
                </div>
            </div>
        </div>
    </nav>
    )
  }
}

export default NavbarLogin;
