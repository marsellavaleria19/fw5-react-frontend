import React from 'react';
import logo from '../assets/images/logo3.png';
import { Link,useNavigate } from 'react-router-dom';
import Button from './Button';

export const NavbarLogin  = () =>{
   const navigate = useNavigate();
   const goToLogin = ()=>{
      navigate('/login');
   };

   const goToSignup = ()=>{
      navigate('/signup');
   };
   return (
      <nav className="navbar navbar-expand-lg navbar-light">
         <div className="container">
            <Link class="navbar-brand" to="/">
               <img src={logo} alt="Logo"/>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link class="nav-link" to="/category">Vehicle Type</Link>
                  </li>
                  <li className="nav-item">
                     <Link class="nav-link" to="/history">History</Link>
                  </li>
                  <li className="nav-item">
                     <Link class="nav-link" to="">About</Link>
                  </li>
               </ul>
               <div className='row'>
                  <div className="col-lg-6">
                     <Button  btnVarian="button-white" onClick={goToLogin}>Login</Button>
                     {/* <button className="button-white" onClick={goToLogin}>Login</button> */}
                  </div>
                  <div className="col-lg-6">
                     <Button btnVarian="button-filled" onClick={goToSignup}>Register</Button>
                     {/* <button className="button-filled" onClick={goToSignup}>Register</button> */}
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
};
export default NavbarLogin;
