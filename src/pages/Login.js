import React, { Component } from 'react'
import logoGoogle from '../assets/images/logo-google.png'
import Footer from '../component/Footer'
import {Link, useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()

    const goToSignup = ()=>{
        navigate("/signup");
    }

    return (
        <>
        <header className="header-login-signup">
        <div className="header-content">
            <div className="container">
                <div className="row">
                    <div className="header-title col-lg">
                        <h1 className="heading">Let's Explore The World</h1>
                        <p className="text">Don't have account?</p>
                        <button className="button-dark" onClick={goToSignup}>Sign Up</button>
                    </div>
                    <div className="header-separator col-lg d-lg-flex align-items-center flex-lg-column">
                        <div className="separator-circle"></div>
                        <div className="separator-line"></div>
                        <div className="separator-circle"></div>
                    </div>
                    <div className="header-login col-lg">
                        <form className="form-login-signup">
                            <div>
                                <input type="text" name="email" placeholder="Email"/>
                            </div>
                            <div>
                                <input type="password" name="password" placeholder="Password"/>
                                <p><Link to="/forgotpassword">forgot password?</Link></p>
                            </div>
                            <div>
                                <button type="submit" className="btn p-4 button-filled login">Login</button>
                            </div>
                            <div>
                                <button className="button-google mt-4"><img src={logoGoogle} alt="Logo"/>Login With Google</button>
                            </div>
                            <div className='btn-login-signup'>
                                <p className="text">Don't have account?</p>
                                <button className="button-dark" onClick={goToSignup}>Sign Up</button>
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

export default Login