import React, { useState, useEffect, useContext } from 'react'
import './Form.css'
import FormInput from '../components/form/FormInput';
import Button from '../components/ui/Button'
import { AssignmentsContext, AssignmentsSetterContext } from '../context/AssignmentsContext';
import SubmitButton from '../components/ui/SubmitButton';

const assignmentStock = {
  subjectId: '',
  subjectName: '',
  assignmentName: '',
  dueDate: '',
  time: '23:59',
  percentage: '',
  completed: false
}
export default function Form() {
  const assignments = useContext(AssignmentsContext);
  const setAssignments = useContext(AssignmentsSetterContext);
  const [assignment, setAssignment] = useState(assignmentStock)
  

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments))
  }, [assignments])

  function handleReset(e) {
    e.preventDefault();
    setAssignment(assignmentStock)
  }


  function handleAdd(event) {
      event.preventDefault();

      setAssignments([
        ...assignments,
        {
          ...assignment,
          id: crypto.randomUUID()
        }
      ])
      
      setAssignment(assignmentStock)
  }
  function clearFields(e) {
    e.preventDefault();
    setAssignments([]);
    localStorage.clear('assignments', []);
  }
  return (
    <form className='form' onSubmit={handleAdd}>
      <FormInput label='Subject ID' type='text' name='subjectId' onChange={setAssignment} value={assignment.subjectId} assignment={assignment}/>
      <FormInput label='Subject Name' type='text' name='subjectName' onChange={setAssignment} value={assignment.subjectName} assignment={assignment}/>
      <FormInput label='Assignment Name' type='text' name='assignmentName' onChange={setAssignment} value={assignment.assignmentName} assignment={assignment}/>
      <FormInput label='Due Date' type='date' name='dueDate' onChange={setAssignment} value={assignment.dueDate} assignment={assignment}/>
      <FormInput label='Time' type='time' name='time' onChange={setAssignment} value={assignment.time} assignment={assignment}/>
      <FormInput label='Percentage' type='number' name='percentage' onChange={setAssignment} value={assignment.percentage} assignment={assignment}/>

      <div className='form__btns'>
        <SubmitButton className='btn--CTA btn--m'>
          Add To Schedule
        </SubmitButton>
        <Button onClick={e => handleReset(e)} className='btn--reset btn--m'>
          Reset Fields
        </Button>
        <Button onClick={e => clearFields(e)} className='btn--CTA btn--m'>
          Clear everything
        </Button>
      </div>
    </form>
  )
}


