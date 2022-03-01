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
            <div className="jumbotron">
                <div className="content">
                    <div className="container">
                        <h1 className="heading">Explore and Travel</h1>
                        <p>Vehicle Finder</p>
                        <div className="line"></div>
                        <form onSubmit={handleFilter} className="filter-homepage">
                            <div className="d-md-flex flex-md-wrap mb-md-4">
                                <select name="location" className="form-select me-4 mb-3" aria-label="Default select example"> 
                                    <option value="" style={{display:'none'}}>Location</option>
                                    <option value="Yogyakarta">Yogyakarta</option>
                                    <option value="Bandung">Bandung</option>
                                </select>
                                <select name="category_id" className="form-select mb-3" aria-label="Default select example">
                                    <option value="" style={{display:'none'}}>Type</option>
                                    <option value="1">Bike</option>
                                    <option value="2">Cars</option>
                                    <option value="3">Motorbike</option>
                                </select>
                            </div>
                            <div className="d-md-flex flex-md-wrap">
                                <select name="payment_id" className="form-select me-4 mb-3" aria-label="Default select example">
                                    <option value="" style={{display:'none'}}>Payment</option>
                                    <option value="1">Cash</option>
                                    <option value="2">Transfer</option>
                                </select>
                                <input className="form-control" type="date" name="date" />
                            </div>
                            <button className="button-filled">Explore</button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
