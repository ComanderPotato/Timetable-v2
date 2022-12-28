import React from "react";
import "./Dropdown.css";
import {
  useAssignmentsStateDispatch,
  ACTIONS,
} from "../context/AssignmentContext";
import EditInputTest from "./EditInputTest";
import Button from "../components/ui/Button";
import SubmitButton from "../components/ui/SubmitButton";
export default function Dropdown({
  assignment,
  noteState,
  setNoteState,
  editAssignment,
  setEditAssignment,
  selected,
  modalIsOpen,
  setModalIsOpen,
}) {
  // assignment variables: id, subjecName, time, dueDate
  const { id, subjectName, time, dueDate } = assignment;
  // editAssignment / setter

  const dispatch = useAssignmentsStateDispatch();

  function addNote(id) {
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
  function deleteAssignment(id) {
    dispatch({
      type: ACTIONS.DELETE_ASSIGNMENT,
      payload: {
        id: id,
      },
    });
  }

  return (
    <div
      key={id}
      className={`list__dropdown ${selected === id ? "active" : ""}`}
    >
      <div className="dropdown__info flex__item">
        <h2>Subject Name</h2>
        <p>
          <EditInputTest
            condition={noteState.isSelected}
            onChange={setEditAssignment}
            editAssignment={editAssignment}
            value={editAssignment.subjectName}
            name="subjectName"
            text={subjectName}
          />
        </p>
        <h2>Due Date</h2>
        <p>
          <EditInputTest
            condition={noteState.isSelected}
            onChange={setEditAssignment}
            editAssignment={editAssignment}
            value={editAssignment.dueDate}
            name="dueDate"
            type="date"
            text={new Date(dueDate).toLocaleDateString()}
          />
        </p>
        <h2>Time</h2>
        <p>
          <EditInputTest
            condition={noteState.isSelected}
            onChange={setEditAssignment}
            editAssignment={editAssignment}
            value={editAssignment.time}
            name="time"
            type="time"
            text={time}
          />
        </p>
      </div>
      <div className="dropdown__notes flex__item">
        <h2>Assignment Notes</h2>
        {noteState.isSelected ? (
          <textarea
            value={assignment.notes ? assignment.notes : noteState.text}
            name="note"
            autoFocus={true}
            onChange={(e) =>
              setNoteState({
                ...noteState,
                text: e.target.value,
              })
            }
          ></textarea>
        ) : assignment.note ? (
          <p>{assignment.note}</p>
        ) : (
          <p>Add your notes here...</p>
        )}
      </div>
      <div className="dropdown__btns flex__item">
        {noteState.isSelected ? (
          <SubmitButton className="btn--CTA btn--sm">Save</SubmitButton>
        ) : (
          <Button
            onClick={() =>
              setNoteState({
                text: assignment.note,
                isSelected: !noteState.isSelected,
              })
            }
            className="btn--CTA btn--sm"
          >
            Edit
          </Button>
        )}
        <Button
          onClick={() => setModalIsOpen(!modalIsOpen)}
          className="btn--CTA btn--sm"
        >
          Complete Assignment
        </Button>
        {/* <Button onClick={() => completeAssignment(assignment)} className='btn--CTA btn--sm'>
            Complete Assignment
          </Button> */}
        <Button
          onClick={() => deleteAssignment(id)}
          className="btn--reset btn--sm"
        >
          Delete Assignment
        </Button>
      </div>
    </div>
  );
}
