import React from 'react'
import './Header.css'
import CurrentTime from '../utils/CurrentTime'
export default function Header() {

  const {period, month, dayOfWeek, day, hours, minutes, seconds} = CurrentTime();
  function getOrdinal() {
    let j = day % 10, k = day % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    } 
      return "th";
  }
  let ordinal = getOrdinal();
  return(
    <header className='header'>

        <h1 className='header__heading'>
          Assignment Planner
        </h1>
        <p className='header__time'>It's {hours}:{minutes}:{seconds}{period} on {dayOfWeek} the {day}{ordinal} of {month}</p>
    </header>
  )
  
}

