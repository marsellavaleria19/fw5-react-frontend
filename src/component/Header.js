import React, { Component,useState } from 'react'
import NavbarLogin from './NavbarLogin'
import { useNavigate } from 'react-router-dom'

export const Header = ()=> {
    const [filledForms,setFilledForms] = useState(['category_id','location','payment_id','date'])
    const navigate = useNavigate()
    const [dataSearch,setDataSearch] = useState({})
    const [resultFillter,setResultFillter] = useState("")
   
    const handleFilter = (event)=>{
        event.preventDefault();
        
        const url = ()=>{
            var result = "";
            filledForms.forEach((item)=>{
                if(event.target.elements[item].value){
                    if(result==""){
                        result = `${item}=${event.target.elements[item].value}`;
                    }else{
                        result+=`&${item}=${event.target.elements[item].value}`;
                    }
                }
            })
            return `/search?${result}`
        }
        navigate(url(),{replace:true})
    }

    return (
        <header>
        <NavbarLogin/>
            <div class="jumbotron">
                <div class="content">
                    <div class="container">
                        <h1 class="heading">Explore and Travel</h1>
                        <p>Vehicle Finder</p>
                        <div class="line"></div>
                        <form onSubmit={handleFilter} class="filter-homepage">
                            <div class="d-md-flex flex-md-wrap mb-md-4">
                                <select name="location" class="form-select me-4 mb-3" aria-label="Default select example"> 
                                    <option value="" style={{display:'none'}}>Location</option>
                                    <option value="Yogyakarta">Yogyakarta</option>
                                    <option value="Bandung">Bandung</option>
                                </select>
                                <select name="category_id" class="form-select mb-3" aria-label="Default select example">
                                    <option value="" style={{display:'none'}}>Type</option>
                                    <option value="1">Bike</option>
                                    <option value="2">Cars</option>
                                    <option value="3">Motorbike</option>
                                </select>
                            </div>
                            <div class="d-md-flex flex-md-wrap">
                                <select name="payment_id" class="form-select me-4 mb-3" aria-label="Default select example">
                                    <option value="" style={{display:'none'}}>Payment</option>
                                    <option value="1">Cash</option>
                                    <option value="2">Transfer</option>
                                </select>
                                <input class="form-control" type="date" name="date" />
                            </div>
                            <button class="button-filled">Explore</button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
