import React, { Component, useEffect } from 'react'
import logoGoogle from '../assets/images/logo-google.png'
import Footer from '../component/Footer'
import {Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../component/Button'
import Input from '../component/Input'
import { loginProcess } from '../redux/actions/auth'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export const Login = () => {
   
    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const goToSignup = ()=>{
        navigate("/signup");
    }

    const loginHandle = (event)=>{
        event.preventDefault()
        var email = event.target.elements["email"].value;
        var password =  event.target.elements["password"].value;
        dispatch(loginProcess(email,password))        
    }

    return (
        <>
        {
            auth.token!==null && <Navigate to='/'/>
        }
        <header className="header-login-signup">
        <div className="header-content">
            <div className="container">
                <div className="row">
                    <div className="header-title col-lg">
                        <h1 className="heading">Let's Explore The World</h1>
                        <p className="text">Don't have account?</p>
                        <Button btnVarian="button-dark" onClick={goToSignup}>Sign Up</Button>
                    </div>
                    <div className="header-separator col-lg d-lg-flex align-items-center flex-lg-column">
                        <div className="separator-circle"></div>
                        <div className="separator-line"></div>
                        <div className="separator-circle"></div>
                    </div>
                    <div className="header-login col-lg">
                        {
                            auth.isError==true && 
                            <div class="alert alert-danger" role="alert">
                               {auth.errMessage}
                          </div>
                        }
                        <form onSubmit={loginHandle} className="form-login-signup">
                            <div>
                                <Input typeInput="text" name="email" placeholder="Email"/>
                            </div>
                            <div>
                                <Input typeInput="password" name="password" placeholder="Password"/>
                                <p><Link to="/forgotpassword">forgot password?</Link></p>
                            </div>
                            <div>
                                <Button type="submit" btnVarian="button-filled p-4 login">Login</Button>
                            </div>
                            <div>
                                <Button btnVarian="button-google mt-4"><img src={logoGoogle} alt="Logo"/>Login With Google</Button>
                            </div>
                            <div className='btn-login-signup'>
                                <p className="text">Don't have account?</p>
                                <Button btnVarian="button-dark" onClick={goToSignup}>Sign Up</Button>
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