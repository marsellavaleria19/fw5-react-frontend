import React, { Component } from 'react'

export const Input = ({ children,typeInput,variantInput, ...rest }) => {
    return ( 
        <input type={`${typeInput}`} className={`form-control ${variantInput}`} {...rest }/>
    )
}

export default Input