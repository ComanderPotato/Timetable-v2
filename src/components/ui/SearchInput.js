import React from 'react'

export default function SearchInput({ onChange, type, label, value}) {

  return (
    <div className='inputBox'>
      <input 
        type={type} 
        className='styled__input'
        onChange={onChange} 
        value={value}
        ></input>
      <span>{label}</span> 
    </div>
  )
}


