import React, { Component } from 'react'
import NavbarHomeSearch from './NavbarHomeSearch'
import Footer from './Footer'

export default class Layout extends Component {
  render() {
    return (
      <>
        <NavbarHomeSearch/>
            {this.props.children}
        <Footer/>
      </>
    )
  }
}
