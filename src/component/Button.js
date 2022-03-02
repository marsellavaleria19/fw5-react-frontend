import React, { Component } from 'react'

export const Button = ({children,btnType,...rest}) => {
    return (
      <button className={`btn ${btnType}`} {...rest}>{children}</button>
    )
}

export default Button
