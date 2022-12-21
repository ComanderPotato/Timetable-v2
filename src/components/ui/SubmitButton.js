import React from 'react'
import './Button.css'
export default function SubmitButton({className, children, onSubmit }) {

  return (
    <button className={`btn ${className}`} onSubmit={onSubmit}>
      {children}
    </button>
  )
}