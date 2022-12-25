import React, {Fragment, useContext, useState} from 'react'
import GetDiffDays from '../utils/GetDiffDays';
import './ListItem.css'
import chevron from '../assets/chevron.svg'
import { AssignmentsContext, AssignmentsSetterContext } from '../context/AssignmentsContext'
import Button from '../components/ui/Button'
import EditInput from '../components/ui/EditInput';
import Modal from '../components/ui/Modal';

export default function ListItem({ assignment, selected, setSelected }) {
  const [noteState, setNoteState] = useState({
    isSelected: false,
    text: assignment.note? assignment.note : ''
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editAssignment, setEditAssignment] = useState(assignment)

  const assignments = useContext(AssignmentsContext)
  const setAssignments = useContext(AssignmentsSetterContext)
  const {subjectId, 
    subjectName, 
    assignmentName, 
    dueDate, 
    time, 
    percentage, 
    id } = assignment;
    
    function toggleDropdown(id) {
      setNoteState({
        ...noteState,
        isSelected: false
      })
      if(selected === id) {
        return setSelected(null);
      }
      setSelected(id);
    }
  function addNote(currAssignment) {
   setAssignments(assignments.map(assignment => {
    if(assignment.id === currAssignment.id) {
      return {
        ...editAssignment,
        note: noteState.text
      }
    }
    return assignment
   }))
    setNoteState({
      isSelected: false,
      note: assignment.note
    })
  }

  function deleteAssignment(currAssignment) {
    setAssignments(assignments
      .filter(assignment => currAssignment.id !== assignment.id))
  }

  const [className, diffDays] = GetDiffDays(dueDate, time);
  return (
    <Fragment key={id}>
      <li className={`listItem ${className}`}>
        <div className='listItem__options' onClick={() => {
          if(!noteState.isSelected) toggleDropdown(id, assignment)
          }}>
          <div className='listItem__option'>
            {noteState.isSelected ? <EditInput onChange={setEditAssignment} 
                                               editAssignment={editAssignment}
                                               value={editAssignment.subjectId} 
                                               name='subjectId'/> : subjectId}
          </div>
          <div className='listItem__option'>
            {noteState.isSelected ? <EditInput onChange={setEditAssignment} 
                                               editAssignment={editAssignment} 
                                               value={editAssignment.assignmentName} 
                                               name='assignmentName'/> : assignmentName}
          </div>
          <div className='listItem__option'>
            {diffDays}
          </div>
          <div className='listItem__option dropdown__btn'>
            <span>{noteState.isSelected ? <EditInput onChange={setEditAssignment} 
                                               editAssignment={editAssignment} 
                                               value={editAssignment.percentage} 
                                               name='percentage'
                                               type='number'/> : percentage}</span>
            <img className={`chevron ${selected === id ? 'active-icon' : ''}`} src={chevron} alt=""/>
          </div>
        </div>
      <div key={id} className={`list__dropdown ${selected === id ? 'active' : ''}`}>
        <div className='dropdown__info flex__item'>
          <h2>Subject Name</h2>
          <p>{noteState.isSelected ? <EditInput onChange={setEditAssignment} 
                                               editAssignment={editAssignment} 
                                               value={editAssignment.subjectName} 
                                               name='subjectName'/> : subjectName}</p>
          <h2>Due Date</h2>
          <p>{noteState.isSelected ? (<><EditInput onChange={setEditAssignment} 
                                               editAssignment={editAssignment} 
                                               value={editAssignment.dueDate} 
                                               name='dueDate'
                                               type='date'/>
                                               <EditInput onChange={setEditAssignment} 
                                               editAssignment={editAssignment} 
                                               value={editAssignment.time} 
                                               name='time'
                                               type='time'/></>) : `${new Date(dueDate).toLocaleDateString()} at ${time}`}</p>
        </div>
        <div className='dropdown__notes flex__item'>
          <h2>Assignment Notes</h2>
            {noteState.isSelected ? (
            <textarea value={assignment.notes ? assignment.notes : noteState.text} name='note' autoFocus={true} onChange={(e) => setNoteState({
              ...noteState,
              text: e.target.value
            })}></textarea>
            ): (assignment.note? <p>{assignment.note}</p> : <p>Add your notes here...</p>)}
        </div>
        <div className='dropdown__btns flex__item'>
          <Button onClick={() => setModalIsOpen(!modalIsOpen)} className='btn--CTA btn--sm'>
            Complete Assignment
          </Button>
          {/* <Button onClick={() => completeAssignment(assignment)} className='btn--CTA btn--sm'>
            Complete Assignment
          </Button> */}
          <Button onClick={() => deleteAssignment(assignment)} className='btn--reset btn--sm'>
            Delete Assignment
          </Button>
          {
            noteState.isSelected ? (
            <Button onClick={() => addNote(assignment)} className='btn--CTA btn--sm'>
              Save
          </Button>) : (
            <Button onClick={() => setNoteState({
              text: assignment.note,
              isSelected: !noteState.isSelected
            })} className='btn--CTA btn--sm'>
              Edit
          </Button>) 
          }
        </div>
      </div>
      {modalIsOpen && <Modal onClose={() => setModalIsOpen(!modalIsOpen)} setSelected={setSelected} assignment={assignment}/>}
      </li>
    </Fragment>
  )
}

