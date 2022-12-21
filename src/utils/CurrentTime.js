import { useState } from "react";

export default function CurrentTime() {
  const [clock, setClock] = useState({})

  function currentTime() {
    const currentDate = new Date();
    const period = currentDate.getHours() > 12 ? 'PM' : 'AM';
    const hours = currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours();
    const minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
    const seconds = currentDate.getSeconds() < 10 ? `0${currentDate.getSeconds()}` : currentDate.getSeconds();
    const weekDay = daysOfWeek[currentDate.getDay()];
    const month = monthsOfYear[currentDate.getMonth()];
    
    setClock({
      period: period,
      month: month,
      dayOfWeek: weekDay,
      day: currentDate.getDate(),
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    })
  }
  (function() {
    setInterval(currentTime, 1000)
  })()
  return clock
}
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const monthsOfYear = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]