
export default function getdiffDays(dueDate, time) {
  let className = 'listItem--danger';

  let diffDays = new Date(`${dueDate}, ${time}`).getTime() - new Date().getTime();
  diffDays = Math.ceil(diffDays / (1000 * 60 * 60 * 24));

  if (diffDays <= 7){
    className = 'listItem--danger';
    return [className, diffDays]
  }
  else if(diffDays <= 14 && diffDays > 7) {
    className = 'listItem--cautious';
    return [className, diffDays]
  }
  else if(diffDays > 14) {
    className = 'listItem--good'
    return [className, diffDays]
  }
  
}