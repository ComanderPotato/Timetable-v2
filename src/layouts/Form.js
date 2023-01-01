import React, { useState, useEffect, useContext } from 'react'
import './Form.css'
import FormInput from '../components/form/FormInput';
import Button from '../components/ui/Button'
import SubmitButton from '../components/ui/SubmitButton';
import { getIdSuggestions, getNameSuggestions } from '../utils/getSuggestions';
import { useAssignmentsState, useAssignmentsStateDispatch, ACTIONS } from '../context/AssignmentContext';
import Icon from '../components/ui/Icon';
const assignmentStock = {
  subjectId: '',
  subjectName: '',
  assignmentName: '',
  dueDate: '',
  time: '23:59',
  percentage: '',
  completed: false,
  totalMarks: 0,
  recievedPercentage: 0,
  marksRecieved: 0,
}
export default function Form() {
  const dispatch = useAssignmentsStateDispatch();
  const {assignments} = useAssignmentsState();
  const [assignment, setAssignment] = useState(assignmentStock)
  const [maxPercentage, setMaxPercentage] = useState();
  const [sugg, setSugg] = useState([])

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments))
  }, [assignments])

  useEffect(() => {
    let perc = assignments
    .filter(ass => ass.subjectId === assignment.subjectId)
    .reduce((acc, curr) => acc + curr.percentage, 0)
    let total = 100 - perc
    setMaxPercentage(total)
    // console.log(maxPercentage);
  },[assignment.subjectId])

  function handleReset() {

    setAssignment(assignmentStock)
  }
  // useEffect(() => {
  //   if(assignment.subjectId === "") return
  //   else {
  //     getNameSuggestions(assignment.subjectId, assignments).then(found => {
  //       setSugg([...new Set(found.map(a=> a.subjectId))])
  //     })
  //     // console.log(sugg)
  //   }
  //   },[assignment.subjectId])
  //   useEffect(() => {
  //     if(assignment.subjectName === "") return
  //   else {
  //     getIdSuggestions(assignment.subjectName, assignments).then(found => {
  //       setSugg([...new Set(found.map(a=> a.subjectName))])
  //     })
  //     console.log(sugg)
  //   }
  // }, [assignment.subjectName])
  function handleAdd(event) {
      event.preventDefault();
      dispatch({
        type: ACTIONS.ADD_ASSIGNMENT,
        payload: {
          assignment: {
            ...assignment,
            id: crypto.randomUUID()
          }
        }
      })
      setMaxPercentage(100)
      setAssignment(assignmentStock)
  }
  
  function clearFields() {
    // setAssignments([]);
    localStorage.clear('assignments', []);
  }
  // function setValue(a) {
  //   console.log(a)
  //   const [ subjectName ] = [...assignments.map(b => {if(b.subjectId === a) return b.subjectName})];
  //   setAssignment({
  //     ...assignment,
  //     subjectId: a,
  //     subjectName: subjectName
  //   })
  // }
  return (
    <form className='form' onSubmit={handleAdd}>
      <FormInput label='Subject ID' type='text' name='subjectId' onChange={setAssignment} value={assignment.subjectId} assignment={assignment}/>
      <FormInput label='Subject Name' type='text' name='subjectName' onChange={setAssignment} value={assignment.subjectName} assignment={assignment}/>
      <FormInput label='Assignment Name' type='text' name='assignmentName' onChange={setAssignment} value={assignment.assignmentName} assignment={assignment}/>
      <FormInput label='Due Date' type='date' name='dueDate' onChange={setAssignment} value={assignment.dueDate} assignment={assignment}/>
      <FormInput label='Time' type='time' name='time' onChange={setAssignment} value={assignment.time} assignment={assignment}/>
      <FormInput label='Percentage' type='number' name='percentage' max={"" + maxPercentage} onChange={setAssignment} value={assignment.percentage} assignment={assignment}/>

      {/* {sugg.length > 0 && sugg.map(a => {
        return <h1 onClick={() => setValue(a)}>{a}</h1>
      })} */}

      <div className='form__btns'>
        <SubmitButton className='btn--CTA btn--m'>
          Add To Schedule
        </SubmitButton>
        <Button onClick={handleReset} className='btn--reset btn--m'>
          Reset Fields
        </Button>
        <Button onClick={e => clearFields(e)} className='btn--CTA btn--m'>
          Clear everything
        </Button>
      </div>
    </form>
  )
}


// useEffect(() => {
//   if(assignment.subjectId === "") return
//   else {
//     getNameSuggestions(assignment.subjectId, assignments).then(found => {
//       setSugg([...new Set(found.map(a=> a.subjectId))])
//     })
//     console.log(sugg)
//   }
//   },[assignment.subjectId])
//   useEffect(() => {
//     if(assignment.subjectName === "") return
//   else {
//     getIdSuggestions(assignment.subjectName, assignments).then(found => {
//       setSugg([...new Set(found.map(a=> a.subjectName))])
//     })
//     console.log(sugg)
//   }
// }, [assignment.subjectName])