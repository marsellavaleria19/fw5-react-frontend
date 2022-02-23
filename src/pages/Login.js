import React, { Component } from 'react'
import logoGoogle from '../assets/images/logo-google.png'
import Footer from '../component/Footer'
export default class Login extends Component {
  
    constructor(props) {
        super(props);
        this.state = {email: '',password:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event){
        this.setState({email:event.target.email,password:event.target.password});
    }

    handleSubmit(event){
        // if(this.state.email==="admin@mail.com" && this.state.password==="1234"){
        //     console.log("Benar")
        // }
        event.PreventDefault();
        console.log(this.state.email);
    }
  
    render() {
    return (
        <>
        <header className="header-login-signup">
        <div className="header-content">
            <div className="container">
                <div className="row">
                    <div className="header-title col-lg">
                        <h1 className="heading">Let's Explore The World</h1>
                        <p className="text">Don't have account?</p>
                        <button className="button-dark" onclick="window.location='./signup.html';">Sign Up</button>
                    </div>
                    <div className="header-separator col-lg d-lg-flex align-items-center flex-lg-column">
                        <div className="separator-circle"></div>
                        <div className="separator-line"></div>
                        <div className="separator-circle"></div>
                    </div>
                    <div className="header-login col-lg">
                        <form className="form-login-signup" onSubmit={this.handleSubmit}>
                            <div>
                                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                            </div>
                            <div>
                                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                                <p><a href="forgot-password.html">forgot password?</a></p>
                            </div>
                            <div>
                                <button type="submit" className="btn p-4 button-filled login">Login</button>
                            </div>
                            <div>
                                <button className="button-google mt-4"><img src={logoGoogle} alt="Logo"/>Login With Google</button>
                            </div>
                            <div className='btn-login-signup'>
                                <p className="text">Don't have account?</p>
                                <button className="button-dark" onclick="window.location='./signup.html';">Sign Up</button>
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
