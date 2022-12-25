import React from 'react'
import './Button.css'
export default function Button({onClick, className, children}) {
  return (
    <button className={`btn ${className}`} onClick={(e) => {
      e.preventDefault();
      onClick();
      }}>
      {children}
    </button>
  )
}

