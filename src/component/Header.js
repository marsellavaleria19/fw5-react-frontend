import React, { Component } from 'react'
import NavbarLogin from './NavbarLogin'

export class Header extends Component {
  render() {
    return (
        <header>
        <NavbarLogin/>
            <div class="jumbotron">
                <div class="content">
                    <div class="container">
                        <h1 class="heading">Explore and Travel</h1>
                        <p>Vehicle Finder</p>
                        <div class="line"></div>
                        <form class="filter-homepage">
                            <div class="d-md-flex flex-md-wrap mb-md-4">
                                <select class="form-select me-4 mb-3" aria-label="Default select example"> 
                                    <option>Location</option>
                                    <option>Yogyakarta</option>
                                    <option>Bandung</option>
                                </select>
                                <select class="form-select mb-3" aria-label="Default select example">
                                    <option>Type</option>
                                    <option>Bike</option>
                                    <option>Cars</option>
                                </select>
                            </div>
                            <div class="d-md-flex flex-md-wrap">
                                <select class="form-select me-4 mb-3" aria-label="Default select example">
                                    <option>Payment</option>
                                    <option>Cash</option>
                                    <option>Transfer</option>
                                </select>
                                <input class="form-control" type="date" />
                            </div>
                            <button class="button-filled">Explore</button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    )
  }
}

export default Header;
