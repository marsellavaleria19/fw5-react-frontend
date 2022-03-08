import React, { Component, useEffect, useState } from 'react'
import Footer from '../component/Footer'
import {FaChevronLeft} from 'react-icons/fa'
import { confirmForgotPasswordProcess, forgotPasswordProcess } from '../redux/actions/forgotPassword'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../component/Input'
import Button from '../component/Button'
import { useNavigate } from 'react-router-dom'

export const ConfirmForgotPassowrd = ()=> {

    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(auth.isSubmitEmail){
            dispatch({
                type : "FORGOT_PASSWORD_FULLFILLED"
            })
        }
    },[auth.isSubmitEmail])

    useEffect(()=>{
        if(success){
            navigate("/login")
        }
    },[success])

    const goToBack = ()=>{
        window.history.back()
    }

    const confirmForgotPasswordHandle = (event)=>{
        event.preventDefault()
        var email = event.target.elements["email"].value;
        var code = event.target.elements["code"].value;
        var password = event.target.elements["password"].value;
        var confirmPassword = event.target.elements["confirm-password"].value;
        dispatch(confirmForgotPasswordProcess(email,code,password,confirmPassword))        
        setSuccess(true)
    }

    return (
      <>
        <header className="header-forgot">
            <div className="header-content">
                <div className="header-nav">
                    <div onClick={goToBack}>
                        <FaChevronLeft/>
                        <span>Back</span>
                    </div>
                </div>
                <div className="container">
                    <form onSubmit={confirmForgotPasswordHandle}>
                        {
                            auth.isError==false && auth.isSubmitEmail && 
                            <div className="alert alert-success" role="alert">
                                {auth.message}
                            </div>
                        }
                        <div>
                            <input type="text" name="email" placeholder="Email" />
                        </div>       
                        <div>
                            <input type="text" name="code" placeholder="Code" />
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <div>
                            <input type="password" name="confirm-password" placeholder="Confirm Password" />
                        </div>
                        <div>
                            <Button type="submit" className="button-send">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </header>
        <Footer/>
      </>
    )
}

export default ConfirmForgotPassowrd
