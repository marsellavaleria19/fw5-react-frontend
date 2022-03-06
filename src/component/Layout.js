import React, { Component } from 'react'
import NavbarHomeSearch from './NavbarHomeSearch'
import Footer from './Footer'
import Navbar from './Navbar'
import NavbarLogin from './NavbarLogin'
import { useSelector } from 'react-redux'

export const Layout  = (props) => {
    const auth = useSelector(state=>state.auth)
    return (
      <>
        {auth.token!==null ? <NavbarHomeSearch/> : <NavbarLogin/>}
            {props.children}
        <Footer/>
      </>
    )
}

export default Layout
