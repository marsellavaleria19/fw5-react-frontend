import React, { Component } from 'react'
import NavbarHome from '../component/NavbarHome'
import Footer from '../component/Footer'
import imgProfile from '../assets/images/image-profile.png'
import {FaPencilAlt} from 'react-icons/fa'
import Button from '../component/Button'
import Input from '../component/Input'
import Image from '../component/Image'

export const Profile = ()=> {
    return (
      <>
        <NavbarHome/>
         <section className="profile container">
            <h1 className="title">Profile</h1>
            <div className="text-center">
                <div className="d-inline-block position-relative">
                    <Image photo={imgProfile} photoVarian="profile rounded-circle" alt="profile"/>
                    <Button btnVarian="position-absolute button-edit-profile rounded-circle"><FaPencilAlt/></Button>
                </div>
                <div className="profile-detail">
                    <h1 className="name">Samantha Doe</h1>
                    <div className="detail">samanthadoe@mail.com</div>
                    <div className="detail">+62833467823</div>
                    <div className="detail">Has been active since 2013</div>
                </div>
                <div className="profile-radio d-flex justify-content-center mb-5">
                    <div className="me-5">
                        <label className="radio-button">
                            <input type="radio" name="gender"/>
                            <div className="checkmark"></div>
                            <div className="text">Male</div>
                        </label>
                    </div>
                    <div>
                        <label className="radio-button">
                            <input type="radio" name="gender"/>
                            <div className="checkmark"></div>
                            <div className="text">Female</div>
                        </label>
                    </div>
                </div>
            </div>
        </section>
        <section className="profile-form container">
            <h5>Contact</h5>
            <form className="container">
                <div className="mb-5">
                    <label for="email">Email</label>
                    <Input variantInput="d-block w-100" typeInput="text" value="zulaikha17@gmail.com"/>
                </div>
                <div className="mb-5">
                    <label for="address">Address</label>
                    <textarea className="d-block w-100">Iskandar Street no. 67 Block A Near Bus Stop</textarea>
                </div>
                <div className="mb-5">
                    <label for="mobile-number">Mobile number</label>
                    <Input variantInput="d-block w-100" typeInput="text" value="(+62)813456782"/>
                </div>
                <div className="mb-5">
                    <h5>Identity</h5>
                    <div className="row">
                        <div className="col-sm">
                            <label for="mobile-number">Display name</label>
                            <Input variantInput="d-block w-100" typeInput="text" value="zulaikha"/>
                        </div>
                        <div className="col-sm">
                            <label for="mobile-number">Birth date (DD/MM/YY)</label>
                            <Input variantInput="d-block w-100" typeInput="date" value="03/09/2003"/>
                        </div>
                    </div>
                </div>
                <div className="mt-5 row">
                    <div className="col-md-4 mb-3">
                        <Button btnVarian="button-filled">Save Change</Button>
                    </div>
                    <div className="col-md-4 mb-3">
                        <Button btnVarian="button-dark">Edit Password</Button>
                    </div>
                    <div className="col-md-4 mb-3">
                        <Button btnVarian="button-gray">Cancel</Button>
                    </div>
                </div>
            </form>
        </section>
        <Footer/>
      </>
    )
}

export default Profile
