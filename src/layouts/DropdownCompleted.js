import React, {useState} from 'react'
import Button from '../components/ui/Button';
import EditInputTest from './EditInputTest';
import { useAssignmentsStateDispatch, ACTIONS } from '../context/AssignmentContext';
import deleteIcon from '../assets/delete.svg';
import saveIcon from '../assets/save.svg'
import editIcon from '../assets/edit.svg'

import Icon from '../components/ui/Icon';

function DropdownCompleted({assignment}) {
  const [noteState, setNoteState] = useState(false)
  const [editAssignment, setEditAssignment] = useState(assignment);
  const dispatch = useAssignmentsStateDispatch();
  const [show, setShow] = useState(false)
  const {
    subjectId,
    assignmentName,
    dueDate,
    time,
    percentage,
    id,
    marksRecieved,
    totalMarks,
    recievedPercentage,
    grade
  } = assignment;

  function addNote(event) {
    event.preventDefault();
    dispatch({
      type: ACTIONS.EDIT_ASSIGNMENT,
      payload: {
        id: id,
        editedAssignment: {
          ...editAssignment,
        },
      },
    });
    //Part of old function maybe reduce??
    setNoteState(false);
  }
  function deleteAssignment(id) {
    dispatch({
      type: ACTIONS.DELETE_ASSIGNMENT,
      payload: {
        id: id,
      },
    });
  }
  function editState() {
    setNoteState(prevState => !prevState)
  }
  console.log(noteState);
  return (
    <form className='CD__options' onSubmit={addNote} key={id}>
      <div>
        <EditInputTest
          condition={noteState}
          onChange={setEditAssignment}
          editAssignment={editAssignment}
          value={editAssignment.assignmentName}
          name="assignmentName"
          text={assignmentName}
        />
      </div>
      <div>
        <EditInputTest
          condition={noteState}
          onChange={setEditAssignment}
          editAssignment={editAssignment}
          value={editAssignment.marksRecieved}
          name="marksRecieved"
          type="number"
          text={marksRecieved}
          max={totalMarks}
        />
      </div>
      <div>
        {totalMarks}
      </div>
      <div onMouseOver={() => setShow(!show)} onMouseLeave={() => setShow(false)}>
        {show ? `${recievedPercentage / percentage * 100}%`  :  `${recievedPercentage}%`} 
      </div>
      <div>
        {(show && recievedPercentage > 0) ?  `${100}%` : `${percentage}%`}

        {/* {
          noteState ? 
          <Button className='btn--CTA btn--sm' onClick={addNote}>
          Save
        </Button>:
          <Button className='btn--CTA btn--sm' onClick={() => setNoteState(!noteState)}>
          Edit
        </Button>
        } */}
      </div>
      <div>
        {grade}
      </div>
      <div className='CD__btn__container'>
        {totalMarks > 0 && (noteState ? 
        <button className='sub' type='submit'><img src={saveIcon} alt="" className='deleteIcon'/></button>: 
        <img src={editIcon} alt="" className='deleteIcon' onClick={() => setNoteState(!noteState)}/>
        )}
        {/* {totalMarks > 0 && (noteState ?
        <Icon type='submit' iconType='save' className='icon--sm'/> : 
        <Icon iconType='edit' type='button' className='icon--sm' onClick={() => setNoteState(!noteState)}/>)} */}
        <Icon iconType='delete' className='icon--sm' onClick={() => deleteAssignment(id)} />
      </div>
    </form>
  )
}

export default DropdownCompleted