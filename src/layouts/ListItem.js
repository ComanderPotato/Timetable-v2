
import React, { Fragment, useContext, useState } from "react";
import getDiffDays from "../utils/getDiffDays";
import "./ListItem.css";
import chevron from "../assets/chevron.svg";
import Button from "../components/ui/Button";
import EditInput from "../components/ui/EditInput";
import Modal from "../components/ui/Modal";
import {
  useAssignmentsStateDispatch,
  ACTIONS,
} from "../context/AssignmentContext";
import Dropdown from "./Dropdown";
import EditInputTest from "./EditInputTest";


export default function ListItem({ assignment, selected }) {
  const dispatch = useAssignmentsStateDispatch();
  const {
    subjectId,
    subjectName,
    assignmentName,
    dueDate,
    time,
    percentage,
    id,
  } = assignment;
  const [noteState, setNoteState] = useState({
    isSelected: false,
    text: assignment.note ? assignment.note : "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editAssignment, setEditAssignment] = useState(assignment);

  // const assignments = useContext(AssignmentsContext)
  // const setAssignments = useContext(AssignmentsSetterContext)

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
  const [className, diffDays] = getDiffDays(dueDate, time);
  return (
    <Fragment key={id}>
      <li className={`listItem ${className}`}>
        <form onSubmit={addNote}>
          <div
            className="listItem__options"
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
            <div className="listItem__option">{diffDays}</div>
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
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
          {/* Set selected was previously the useState for dropdown? */}
        </form>
      </li>
      {modalIsOpen && (
        <Modal
          onClose={() => setModalIsOpen(!modalIsOpen)}
          assignment={assignment}
        />
      )}
    </Fragment>
  );
}
