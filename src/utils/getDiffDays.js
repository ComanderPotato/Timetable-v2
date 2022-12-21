let className;
export default function getDiffDays(dueDate) {
  let diff = new Date(dueDate).getTime() - new Date().getTime();
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (diff <= 7){
    className = 'listItem--danger';
    return [className, diff]
  }
  else if(diff <= 14 && diff > 7) {
    className = 'listItem--cautious';
    return [className, diff]
  }
  else if(diff > 14) {
    className = 'listItem--good'
    return [className, diff]
  }
  
}