import React, { useEffect, useState } from "react";
import { useAssignmentsState } from "../context/AssignmentContext";
import './Sidebar.css'
function Sidebar() {
  const { assignments } = useAssignmentsState();
  const [subjectResults, setSubjectResults] = useState([]);
  
  
  useEffect(() => {
    let viewTotalMarks = true;
    console.log(subjectResults)
    const assignmentsReduced = Object.values(assignments.filter(assignment => assignment.completed).reduce(
      (results, current) => ({
        ...results, 
        [current.subjectId]: {
          subjectId: current.subjectId,
          mark: current.mark + (results[current.subjectId] ? results[current.subjectId].mark : 0),
          totalMark: current.totalMark + (results[current.subjectId] ? results[current.subjectId].totalMark : 0),
          percentage: !viewTotalMarks ? current.percentage + (results[current.subjectId] ? results[current.subjectId].percentage : 0) : 100,
          completed: current.completed
        }
      }),
      {}
    ))
    setSubjectResults([...assignmentsReduced.map(result => {
        const percentage = Math.round((result.mark / result.totalMark) * 100);
        const mark = Math.round(
          (result.mark / result.totalMark) * result.percentage
          );
          
        let grade = getGrade(percentage);
        return {
          subjectId: result.subjectId,
          currentMark: mark,
          totalMark: result.percentage,
          grade: grade,
        };

    })])   
  }, [assignments]);
  console.log(subjectResults)
  return (
    <div className="sidebar">
      {subjectResults.map(results => (
        <div>
          {results}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;

function getGrade(percentage) {
  if (percentage >= 85) return "HD";
  if (percentage >= 75) return "D";
  if (percentage >= 65) return "C";
  if (percentage >= 50) return "P";
  return "F";
}