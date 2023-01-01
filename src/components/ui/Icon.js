import React from 'react'
import arrowIcon from '../../assets/arrow.svg'
import chevronIcon from '../../assets/chevron.svg'
import clearIcon from '../../assets/clear.svg'
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import saveIcon from '../../assets/save.svg'
import addIcon from '../../assets/add.svg'
import './Icon.css'
export default function Icon({ onClick, iconType, className, type }) {

  switch(iconType) {
    case 'arrow': iconType = arrowIcon; break;
    case 'chevron': iconType = chevronIcon; break;
    case 'clear': iconType = clearIcon; break;
    case 'delete': iconType = deleteIcon; break;
    case 'edit': iconType = editIcon; break;
    case 'save': iconType = saveIcon; break;
    case 'add': iconType = addIcon; break;
  }


  return (
    <button onClick={onClick} type={type} className='icon'>
      <img src={iconType} alt="" className={className}/>
    </button>
  )
}
