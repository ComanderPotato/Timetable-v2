import React, { Fragment, useEffect, useState } from 'react'
import Button from '../components/ui/Button';
import { useAssignmentsState, ACTIONS, useAssignmentsStateDispatch } from '../context/AssignmentContext';
import DropdownCompleted from './DropdownCompleted';
import './ListItemCompleted.css'
import chevron from "../assets/chevron.svg";

export default function ListItemCompleted({selected, entireSemester}) {
  const dispatch = useAssignmentsStateDispatch();
  const { assignments, viewCompleted, dropdownSelectedState} = useAssignmentsState();
  const [subjectResults, setSubjectResults] = useState([]);
  // const [isEntireSemester, setIsEntireSemester] = useState(false)
  const [isSelected, setIsSelected] = useState(false);
  
  const a = assignments.filter(b => b.completed)
  useEffect(() => {
    const assignmentsReduced = Object.values(assignments.reduce(
      (results, current) => {
       return ({
        ...results, 
        [current.subjectId]: {
          subjectId: current.subjectId,
          subjectName: current.subjectName,
          recievedPercentage: +current.recievedPercentage + (results[current.subjectId] ? +results[current.subjectId].recievedPercentage: 0),
          percentage: entireSemester ? 100 : +current.percentage + (results[current.subjectId] ? +results[current.subjectId].percentage : 0),
          completed: current.completed
        }
      })},
      {}
    ))
    setSubjectResults([...assignmentsReduced.map(result => {
        const percentage = (result.recievedPercentage / result.percentage);
        const mark = Math.round(
          (+result.recievedPercentage / +result.percentage) * result.percentage
          );
          
        let grade = getGrade(percentage);
        return {
          subjectId: result.subjectId,
          subjectName: result.subjectName,
          currentMark: mark,
          totalMark: result.percentage,
          grade: grade,
        };

    })])   
  }, [assignments, entireSemester]);
  function toggleDropdown(id) {
    dispatch({
      type: ACTIONS.TOGGLE_DROPDOWN,
      payload: {
        id: id,
      },
    });
    setIsSelected(!isSelected)
  }
  return (
    <>
    {subjectResults.map(result => {
      return (<Fragment key={result.subjectId}>
        <li className='listItemC'>
          <div>
            <div className='listItemC__options' onClick={() => {
               toggleDropdown(result.subjectId);
            }}>
              <div className='listItem__option'>
                {result.subjectId}
              </div>
              <div className='listItem__option'>
                {result.subjectName}
              </div>
              <div className='listItem__option'>
                {result.currentMark}%
              </div>
              <div className='listItem__option'>
                {result.totalMark}%
              </div>
              <div className='listItem__option DD__icon'>
                {result.grade}
                <img
                className={`chevron ${selected === result.subjectId && "active-icon"}`}
                src={chevron}
                alt=""
              />
              </div>
            </div>
            <div className={`C__dropdown ${selected === result.subjectId ? 'active' : ''}`}>
              <div className='CD__header'>
                <div>Assignment Name</div>
                <div>Mark</div>
                <div>Total</div>
                <div>Received</div>
                <div>Weighted</div>
                <div>Grade</div>
              </div>
            {assignments.filter(assignment => assignment.subjectId === result.subjectId).map(assignment => 
            <DropdownCompleted assignment={assignment}/>
            )}
            </div>
          </div>
        </li>
      </Fragment>)
    })}
    </>
  )
}


function getGrade(percentage) {
  if (percentage >= .85) return "HD";
  if (percentage >= .75) return "D";
  if (percentage >= .65) return "C";
  if (percentage >= .50) return "P";
  return "F";
}