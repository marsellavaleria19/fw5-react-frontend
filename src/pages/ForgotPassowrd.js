import React, { Component } from 'react'
import Footer from '../component/Footer'
import {FaChevronLeft} from 'react-icons/fa'

export const ForgotPassowrd = ()=> {

  const goToBack = ()=>{
    window.history.back()
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
                <h1 className="heading">Don't worry, we got your back!</h1>
                <form>
                    <div>
                        <input type="email" placeholder="Enter your email address" />
                    </div>
                    <div>
                        <button className="button-send">Send link</button>
                    </div>
                </form>
                <p className="text">
                    You will receive a link to reset your password. <br/>If you haven't received any link, click <a>Resend Link</a>
                </p>
            </div>
        </header>
        <Footer/>
      </>
    )
}

export default ForgotPassowrd
