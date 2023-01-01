
import React, { Fragment, useEffect, useState } from "react";
import getDiffDays from "../utils/getDiffDays";
import "./ListItem.css";
import chevron from "../assets/chevron.svg";
import Modal from "../components/ui/Modal";
import SubmitButton from '../components/ui/SubmitButton'
import FormInput from '../components/form/FormInput'
import {
  useAssignmentsState,
  useAssignmentsStateDispatch,
  ACTIONS,
} from "../context/AssignmentContext";
import Dropdown from "./Dropdown";
import EditInputTest from "./EditInputTest";
import ModalReusable from "../components/ui/ModalReusable";
import Button from "../components/ui/Button";
const initialMarks = {
  marksRecieved: '',
  totalMarks: '',
}

export default function ListItem({ assignment, selected }) {
  const { viewCompleted } = useAssignmentsState();
  const dispatch = useAssignmentsStateDispatch();
  const {
    subjectId,
    assignmentName,
    dueDate,
    time,
    percentage,
    id,
    marksRecieved,
    totalMarks,
    recievedPercentage
  } = assignment;
  const [noteState, setNoteState] = useState({
    isSelected: false,
    text: assignment.note ? assignment.note : "",
  });

  const [modalState, setModalState] = useState(false);
  const [editAssignment, setEditAssignment] = useState(assignment);

  function toggleDropdown(id) {
    dispatch({
      type: ACTIONS.TOGGLE_DROPDOWN,
      payload: {
        id: id,
      },
    });
    // Need to fix ...
    // setNoteState({
    //   ...noteState,
    //   isSelected: false
    // })
  }
  useEffect(() => {
    setEditAssignment(assignment)
  }, [assignment])

  function addNote(e) {
    e.preventDefault();
    dispatch({
      type: ACTIONS.EDIT_ASSIGNMENT,
      payload: {
        id: id,
        editedAssignment: {
          ...editAssignment,
          note: noteState.text,
        },
      },
    });
    //Part of old function maybe reduce??
    setNoteState({
      isSelected: false,
      note: assignment.note,
    });
  }
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

  function closeModal() {
    setModalState(prevValue => !prevValue)
  }
  const [className, diffDays] = getDiffDays(dueDate, time);
  return (
    <Fragment key={id}>
      <li className={`listItem ${className}`}>
        <form onSubmit={addNote}>
          <div
            className={`listItem__options${viewCompleted ? '__completed' : ''}`}
            onClick={() => {
              if (!noteState.isSelected) toggleDropdown(id, assignment);
            }}
          >
            <div className="listItem__option">
              <EditInputTest
                condition={noteState.isSelected}
                onChange={setEditAssignment}
                editAssignment={editAssignment}
                value={editAssignment.subjectId}
                name="assignmentId"
                text={subjectId}
              />
            </div>
            <div className="listItem__option">
               <EditInputTest
                condition={noteState.isSelected}
                onChange={setEditAssignment}
                editAssignment={editAssignment}
                value={editAssignment.assignmentName}
                name="assignmentName"
                text={assignmentName}
              />
            </div>
            <div className="listItem__option">
              {diffDays}
          </div>
              {viewCompleted && <div className="listItem__option">{recievedPercentage}</div>}
            <div className="listItem__option dropdown__btn">
              <span>
                 <EditInputTest
                  condition={noteState.isSelected}
                  onChange={setEditAssignment}
                  editAssignment={editAssignment}
                  value={editAssignment.percentage}
                  name="percentage"
                  text={percentage}
                  type="number"
                />
              </span>
              <img
                className={`chevron ${selected === id && "active-icon"}`}
                src={chevron}
                alt=""
              />
            </div>
          </div>
          <Dropdown
            assignment={assignment}
            noteState={noteState}
            setNoteState={setNoteState}
            editAssignment={editAssignment}
            setEditAssignment={setEditAssignment}
            selected={selected}
            modalIsOpen={modalState}
            setModalIsOpen={setModalState}
          />
          {/* Set selected was previously the useState for dropdown? */}
        </form>
      </li>
      {modalState && (
        <Modal
          setModalState={setModalState}
          assignment={assignment}
        />
        // <ModalReusable title='Enter your marks' setModalState={setModalState}>
        //   <form onSubmit={(event) => completeAssignment(event, assignment)}>
        //   <div className='modal__inputs'>
        //     <FormInput label="Recieved Marks" type="number" name="marksRecieved" onChange={setMarks} value={marks.marksRecieved} assignment={marks} max={marks.totalMarks} />
        //     <FormInput label="Total Marks" type="number" name="totalMarks" onChange={setMarks} value={marks.totalMarks} assignment={marks} max={marks.totalMarks} />
        //   </div>
        //   <div className='modal__btns'>
        //     <SubmitButton className='btn--CTA btn--m'>
        //       Complete
        //     </SubmitButton>
        //     <Button onClick={closeModal} className='btn--reset btn--m'>
        //       Cancel
        //     </Button>
        //   </div>
        // </form>
        // </ModalReusable>
      )}
    </Fragment>
  );
}
