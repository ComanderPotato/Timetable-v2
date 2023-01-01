import React, { useState } from 'react'
export default function ModalReusable({ children, title, setModalState }) {


  function modalState() {
    setModalState(prevValue => !prevValue)
  }

  return (
    <div className='modal__wrapper' onClick={modalState}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

