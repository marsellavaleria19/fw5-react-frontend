import React, { Component,useEffect,useState } from 'react'
import logoGoogle from '../assets/images/logo-google.png'
import Footer from '../component/Footer'
import { useNavigate } from 'react-router-dom'
import Input from '../component/Input'
import Button from '../component/Button'
import { verifyProcess} from '../redux/actions/registration'
import { useDispatch, useStore,connect, useSelector } from 'react-redux'

export const VerifyUser = () => {

    const {auth} = useSelector(state=>state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [success,setSuccess] = useState(false)
  
    useEffect(()=>{
        if(auth.isRegister){
            dispatch({
                type : "REGISTER_FULLFILLED"
            })
        }
    },[auth.isRegister])

    useEffect(()=>{
        if(success){
            navigate("/login")
        }
    },[success])

    const verifyHandle = (event)=>{
        event.preventDefault()
        var email = event.target.elements["email"].value;
        var password =  event.target.elements["password"].value;
        var code = event.target.elements["code"].value;
        dispatch(verifyProcess(email,password,code))
        setSuccess(true)

    }

    return (
        <>
            <header className="header-login-signup">
                <div className="header-content">
                    <div className="container">
                        <div className="row">
                            <div className="header-title col">
                                <h1 className="heading">Let's Explore<br/>The World</h1>
                            </div>
                            <div className="header-separator col-lg d-lg-flex align-items-center flex-lg-column">
                                <div className="separator-circle"></div>
                                <div className="separator-line"></div>
                                <div className="separator-circle"></div>
                            </div>
                            <div className="header-signup col-lg">
                                
                                <form onSubmit={verifyHandle} className="form-login-signup">
                                {
                                    auth.isError==false && auth.isRegister && 
                                    <div className="alert alert-success" role="alert">
                                    {auth.message}
                                </div>
                                }
                                    <div>
                                        <Input type="text" name="email" placeholder="Email" />
                                        
                                    </div>
                                    <div>
                                        <Input type="password" name="password" placeholder="Password" />
                                    </div>
                                    <div>
                                        <Input type="text" name="code" placeholder="Code" />
                                    </div>
                                    <div>
                                        <Button btnVarian="button-filled mt-4">Verify</Button>
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

export default VerifyUser
