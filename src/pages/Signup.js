import React, { Component } from 'react'
import logoGoogle from '../assets/images/logo-google.png'
import Footer from '../component/Footer'
import { useNavigate } from 'react-router-dom'
import Input from '../component/Input'
import Button from '../component/Button'

export const Signup = () => {
    const navigate = useNavigate()
    const goToLogin = ()=>{
        navigate("/login");
    }

    return (
        <>
            <header className="header-login-signup">
                <div className="header-content">
                    <div className="container">
                        <div className="row">
                            <div className="header-title col">
                                <h1 className="heading">Let's Explore<br/>The World</h1>
                                <p className="text">Don't have account?</p>
                                <button className="button-dark" onClick={goToLogin}>Login</button>
                            </div>
                            <div className="header-separator col-lg d-lg-flex align-items-center flex-lg-column">
                                <div className="separator-circle"></div>
                                <div className="separator-line"></div>
                                <div className="separator-circle"></div>
                            </div>
                            <div className="header-signup col-lg">
                                <form className="form-login-signup">
                                    <div>
                                        <Input type="text" placeholder="Name" />
                                    </div>
                                    <div>
                                        <Input type="text" placeholder="Email" />
                                    </div>
                                    <div>
                                        <Input type="password" placeholder="Password" />
                                    </div>
                                    <div>
                                        <Button btnVarian="button-filled mt-4">Sign Up</Button>
                                    </div>
                                    <div>
                                        <Button btnVarian="button-google mt-4"><img src={logoGoogle} alt="Logo"/>Sign Up With Google</Button>
                                    </div>
                                    <div className='btn-login-signup'>
                                        <p className="text">Have account?</p>
                                        <button className="button-dark" onClick={goToLogin}>Login</button>
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

export default Signup
