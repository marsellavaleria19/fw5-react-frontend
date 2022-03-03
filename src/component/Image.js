import React, { Component } from 'react'

export const Image = ({ children, photo, photoVarian, ...rest }) => {
    return ( 
        <img src = { photo } className = { photoVarian } {...rest }/>
    )
}

export default Image