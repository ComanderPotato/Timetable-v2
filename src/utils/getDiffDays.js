
// import { useState, useEffect } from 'react';
export default function getdiffDays(dueDate, time) {
  let className = 'listItem--danger';

  let diffDays = new Date(`${dueDate}, ${time}`).getTime() - new Date().getTime();
  diffDays = Math.ceil(diffDays / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7){
    className = 'listItem--danger';
    return [className, diffDays]
  }
  if(diffDays <= 14 && diffDays > 7) {
    className = 'listItem--cautious';
    return [className, diffDays]
  }
  else {
    className = 'listItem--good'
    return [className, diffDays]
  }
  
}


// function DateCountdownTimer(targetDate, className) {
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   }); 
  

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const hoursLeft = Math.round((targetDate - new Date()) / (1000 * 60 * 60));
//       const minutesLeft = Math.round((targetDate - new Date()) / (1000 * 60));
//       const secondsLeft = Math.round((targetDate - new Date()) / 1000);
//       setTimeLeft({
//         hours: hoursLeft,
//         minutes: minutesLeft,
//         seconds: secondsLeft
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return [className, 
//       `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds} `
//   ];
// }


