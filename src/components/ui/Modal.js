import React, { useContext, useEffect, useState } from 'react'
import './Modal.css'
import FormInput from '../form/FormInput'
import Button from './Button'
import SubmitButton from './SubmitButton'
import { AssignmentsContext, AssignmentsSetterContext } from '../../context/AssignmentsContext'

const initialMarks = {
  marksRecieved: '',
  totalMarks: '',
}
let error;
export default function Modal({onClose, assignment, setSelected}) {
  const assignments = useContext(AssignmentsContext);
  const setAssignments = useContext(AssignmentsSetterContext);
  const [marks, setMarks] = useState(initialMarks)

  useEffect(() => {
    console.log(marks)
  }, [marks.marksRecieved, marks.totalMarks]);

  function completeAssignment(currAssignment) {
    if(marks.marksRecieved <= marks.totalMarks){
      error = ''
      setAssignments(assignments.map(assignment => {
        if(assignment.id === currAssignment.id) {
          return ({
            ...currAssignment,
            ...marks,
            completed: true
          })
        }
        return assignment;
      }))
      setMarks(initialMarks)
      setSelected(null);
    } else {
      error = 'error'
    }
  }

  // Work on error message and design of modal
  return (
    <div className='modal__wrapper' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <h2>Enter your marks here</h2>
        <form onSubmit={() => completeAssignment(assignment)}>
          <div className='modal__inputs'>
            <FormInput label="Recieved Marks" type="number" name="marksRecieved" onChange={setMarks} value={marks.marksRecieved} assignment={marks} max={marks.totalMarks} error={error} />
            <FormInput label="Total Marks" type="number" name="totalMarks" onChange={setMarks} value={marks.totalMarks} assignment={marks} max={marks.totalMarks} />
          </div>
          <div className='modal__btns'>
            <SubmitButton className='btn--CTA btn--m'>
              Complete
            </SubmitButton>
            <Button onClick={onClose} className='btn--reset btn--m'>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

