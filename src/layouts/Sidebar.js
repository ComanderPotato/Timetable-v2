import React, { useEffect, useState } from "react";
import { useAssignmentsState } from "../context/AssignmentContext";
import './Sidebar.css'
function Sidebar() {
  const { assignments, viewCompleted } = useAssignmentsState();
  const [subjectResults, setSubjectResults] = useState([]);
  const [isEntireSemester, setIsEntireSemester] = useState(false)
  // console.table(assignments)
  useEffect(() => {
    const assignmentsReduced = Object.values(assignments.reduce(
      (results, current) => {
       return ({
        ...results, 
        [current.subjectId]: {
          subjectId: current.subjectId,
          // marksRecieved: +current.marksRecieved + (results[current.subjectId] ? +results[current.subjectId].marksRecieved : 0),
          // totalMarks: +current.totalMarks + (results[current.subjectId] ? +results[current.subjectId].totalMarks : 0),
          recievedPercentage: +current.recievedPercentage + (results[current.subjectId] ? +results[current.subjectId].recievedPercentage: 0),
          percentage: isEntireSemester ? 100 : +current.percentage + (results[current.subjectId] ? +results[current.subjectId].percentage : 0),
          completed: current.completed
        }
      })},
      {}
    ))
    console.log(assignmentsReduced)
    setSubjectResults([...assignmentsReduced.map(result => {
        const percentage = (result.recievedPercentage / result.percentage);
        console.log(percentage)
        const mark = Math.round(
          (+result.recievedPercentage / +result.percentage) * result.percentage
          );
          
        let grade = getGrade(percentage);
        return {
          subjectId: result.subjectId,
          currentMark: mark,
          totalMark: result.percentage,
          grade: grade,
        };

    })])   
  }, [assignments, isEntireSemester]);
  // console.log(subjectResults)
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div>
          Subject ID
        </div>
        <div>
          Current
        </div>
        <div>
          Total
        </div>
        <div>
          Grade
        </div>
      </div>
      {subjectResults.map(a => (
        <div className="sidebar__items">
          <div className="sidebar__item">
            {a.subjectId}
          </div>
          <div className="sidebar__item">
            {a.currentMark}%
          </div>
          <div className="sidebar__item">
            {a.totalMark}%
          </div>
          <div className="sidebar__item">
            {a.grade}
          </div>
        </div>
      ))}
      <label>
       <input type='checkbox' onChange={() => setIsEntireSemester(prevValue => !prevValue)} checked={isEntireSemester}/>
        {isEntireSemester ? 'Display completed subject score' : 'Display overall subject score'}
      </label>
    </div>
  );
}

export default Sidebar;

function getGrade(percentage) {
  if (percentage >= .85) return "HD";
  if (percentage >= .75) return "D";
  if (percentage >= .65) return "C";
  if (percentage >= .50) return "P";
  return "F";
}