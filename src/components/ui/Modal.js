import React, { useContext, useEffect, useState } from 'react'
import './Modal.css'
import FormInput from '../form/FormInput'
import SubmitButton from './SubmitButton'
import Button from './Button'
import { useAssignmentsStateDispatch, ACTIONS } from '../../context/AssignmentContext'
const initialMarks = {
  marksRecieved: '',
  totalMarks: '',
}
let error;
export default function Modal({setModalState, assignment, setSelected}) {

  const dispatch = useAssignmentsStateDispatch();
  const [marks, setMarks] = useState(initialMarks)


  function completeAssignment(event, currAssignment) {
    event.preventDefault();
    dispatch({
      type: ACTIONS.COMPLETE_ASSIGNMENT,
      payload: {
        currAssignment: currAssignment,
        marks: {
          ...marks
        }
      }
    })
      setMarks(initialMarks)
      modalState();
  }

  function modalState() {
    setModalState(prevState => !prevState)
  }
  // Work on error message and design of modal
  // Modal doesnt close when submitted marks
  return (
    <div className='modal__wrapper' onClick={modalState}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <h2>Enter your marks here</h2>
        <form onSubmit={(event) => completeAssignment(event, assignment)}>
          <div className='modal__inputs'>
            <FormInput label="Recieved Marks" type="number" name="marksRecieved" onChange={setMarks} value={marks.marksRecieved} assignment={marks} max={marks.totalMarks} error={error} />
            <FormInput label="Total Marks" type="number" name="totalMarks" onChange={setMarks} value={marks.totalMarks} assignment={marks} max={marks.totalMarks} />
          </div>
          <div className='modal__btns'>
            <SubmitButton className='btn--CTA btn--m'>
              Complete
            </SubmitButton>
            <Button onClick={modalState} className='btn--reset btn--m'>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

