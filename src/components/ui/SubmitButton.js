import React from 'react'
import './Button.css'
export default function SubmitButton({ className, children }) {

  return (
    <button className={`btn ${className}`} type="submit">
      {children}
    </button>
  )
}