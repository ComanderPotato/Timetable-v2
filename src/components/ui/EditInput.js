import React from 'react'
import './EditInput.css'
export default function EditInput({ type, onChange, value, name, editAssignment }) {
  if(!type) type = 'text';

  return (
    <input 
      type={type}
      value={value}
      name={name}
      className='edit__inputs'
      onChange={e => onChange({
        ...editAssignment,
        [e.target.name]:e.target.value
      })}
      min='0' max='100' required
      />
  )
}


