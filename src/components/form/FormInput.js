import React from 'react'
import './FormInput.css'
export default function FormInput({label, type, onChange, value, assignment, name}) {
  let width = `${label.length * 4}rem`


  return (
    <div className='inputBox'>
      <input 
        type={type} 
        name={name}
        style={{
          width: width
        }}
        onChange={e => onChange({
                    ...assignment,
                    [e.target.name]:e.target.value
                  })} 
        value={value} required min='0' max='100'
        ></input>
      <span>{label}</span> 
    </div>
  )
}

