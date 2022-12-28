import React from 'react'

export default function EditInputTest({ condition, onChange, editAssignment, value, name, text, type}) {
  return (
    <>
      {condition ? 
        <input type={type ? type : 'text'}
               onChange={e => onChange({
                 ...editAssignment,
                 [e.target.name]:e.target.value
               })}
               value={value}
               name={name}
               className='edit__inputs'
               min='0' max='100' required/>
       : 
      text}
    </>
  )
}

