import React, {Fragment, useContext, useState} from 'react'
import GetDiffDays from '../utils/GetDiffDays';
import './ListItem.css'
import chevron from '../assets/chevron.svg'
import { AssignmentsContext, AssignmentsSetterContext } from '../context/AssignmentsContext'
import Button from '../components/ui/Button'


export default function ListItem({ assignment, selected, setSelected }) {

  const assignments = useContext(AssignmentsContext)
  const setAssignments = useContext(AssignmentsSetterContext)
  const {subjectId, 
    subjectName, 
    assignmentName, 
    dueDate, 
    time, 
    percentage, 
    completed, 
    id} = assignment;
    
    function toggleDropdown(id) {
      if(selected === id) {
        return setSelected(null);
      }
      setSelected(id);
    }
  // function completeAssignment(currAssignment) {
  //   setAssignments(
  //     assignments.filter(a =>
  //       a.id !== currAssignment.id
  //     )
  //   )
  // }
  function completeAssignment(currAssignment) {
    setAssignments(assignments.map(assignment => {
      if(assignment.id === currAssignment.id) {
        return ({
          ...currAssignment,
          completed: true
        })
      }
      return assignment;
    }))
    setSelected(null);
  }
  const [className, diffDays] = GetDiffDays(dueDate, time);
  return (
    <Fragment key={id}>
      <li className={`listItem ${className}`}>
        <div className='listItem__options' onClick={() => toggleDropdown(id)}>
          <div className='listItem__option'>
            {subjectId}
          </div>
          <div className='listItem__option'>
            {assignmentName}
          </div>
          <div className='listItem__option'>
            {diffDays}
          </div>
          <div className='listItem__option dropdown__btn'>
            <span>{percentage}</span>
            <img className={`chevron ${selected === id ? 'active-icon' : ''}`} src={chevron}/>
          </div>
        </div>
      <div key={id} className={`list__dropdown ${selected === id ? 'active' : ''}`}>
        <div className='dropdown__info flex__item'>
          <h2>Subject Name</h2>
          <p>{subjectName}</p>
          <h2>Due Date</h2>
          <p>{new Date(dueDate).toLocaleDateString()}</p>
        </div>
        <div className='dropdown__notes flex__item'>
          <h3>Assignment Notes</h3>
        </div>
        <div className='dropdown__btns flex__item'>
          <Button onClick={() => completeAssignment(assignment)} className='btn--CTA btn--m'>
            Complete Assignment
          </Button>
        </div>
      </div>
      </li>
    </Fragment>
  )
}

