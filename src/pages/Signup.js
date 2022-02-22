import React, { Component } from 'react'
import logoGoogle from '../assets/images/logo-google.png'
import Footer from '../component/Footer'

export default class Signup extends Component {
  render() {
    return (
        <>
            <header className="header-login-signup">
                <div className="header-content">
                    <div className="container">
                        <div className="row">
                            <div className="header-title col">
                                <h1 className="heading">Let's Explore<br/>The World</h1>
                                <p className="text">Don't have account?</p>
                                <button className="button-dark" onclick="window.location='./login.html';">Login</button>
                            </div>
                            <div className="header-separator col-lg d-flex align-items-center flex-lg-column flex-md-row">
                                <div className="separator-circle"></div>
                                <div className="separator-line"></div>
                                <div className="separator-circle"></div>
                            </div>
                            <div className="header-signup col-lg">
                                <form className="form-login-signup">
                                    <div>
                                        <input type="text" placeholder="Name" />
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Email" />
                                    </div>
                                    <div>
                                        <input type="password" placeholder="Password" />
                                    </div>
                                    <div>
                                        <button className="button-filled signup">Sign Up</button>
                                    </div>
                                    <div>
                                        <button className="button-google signup"><img src={logoGoogle} alt="Logo"/>Sign Up With Google</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Footer/>
        </>
    )
  }
}
