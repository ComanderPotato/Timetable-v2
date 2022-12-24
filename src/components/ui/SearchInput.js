import React from 'react'

export default function SearchInput({ onChange, type, label, value}) {

  return (
    <div className='inputBox'>
      <input 
        type={type} 

        onChange={onChange} 
        value={value}
        ></input>
      <span>{label}</span> 
    </div>
  )
}


