import React, { Component } from 'react'

export const Select = ({children,selectVarian,...rest})=> {
    return (
        <select name="location" className={`form-select ${selectVarian}`} {...rest} aria-label="Default select example">{children}</select>
    )
}

export default Select
