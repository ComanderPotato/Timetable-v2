import { createContext, useReducer, useContext, useEffect } from 'react';

const AssignmentsStateContext = createContext(null);
const AssignmentsStateDispatchContext = createContext(null);


export const ACTIONS = {
  SORT_BY_ID: 'id', 
  SORT_BY_DATE: 'date',
  DELETE_ASSIGNMENT: 'delete',
  TOGGLE_DROPDOWN: 'toggle dropdown',
  EDIT_ASSIGNMENT: 'edit assignment',
  ADD_ASSIGNMENT: 'add assignment',
  VIEW_COMPLETED: 'view completed',
  COMPLETE_ASSIGNMENT: 'complete assignment'
}
const initialState = {
  assignments: localStorage.assignments ? JSON.parse(localStorage.getItem('assignments')) : [],
  sortedState: localStorage.sortedState ? JSON.parse(localStorage.getItem('sortedState')) : {date: false, id: false},
  dropdownSelectedState: null,
  viewCompleted: false,
}
export default function AssignmentsStateProvider({ children }) {

  const [state, dispatch] = useReducer(assignmentsReducer, initialState)

  // useEffect(() => {
  //   console.log(state.assignments.filter(assignment => assignment.completed));
  // }, [state.assignments]);
  return (
    <AssignmentsStateContext.Provider value={state}>
      <AssignmentsStateDispatchContext.Provider value={dispatch}>
        {children}
      </AssignmentsStateDispatchContext.Provider>
    </AssignmentsStateContext.Provider>
  )
}
export function useAssignmentsState() {
  return useContext(AssignmentsStateContext);
}

export function useAssignmentsStateDispatch() {
  return useContext(AssignmentsStateDispatchContext);
}
function assignmentsReducer(state, action) {
  const { assignments, sortedState, viewCompleted, dropdownSelectedState } = state;
  const { payload } = action;
  switch(action.type) {
    case ACTIONS.SORT_BY_ID: {
      let sortedById = sortedState.id ? 
      [...assignments.sort((a, b) => b.subjectId - a.subjectId)] : 
      [...assignments.sort((a, b) => a.subjectId - b.subjectId)]
      return {
        ...state,
        sortedState: {
          date: false,
          id: !sortedState.id
        },
        assignments: sortedById
      }
    }
    case ACTIONS.SORT_BY_DATE: {
      let sortedByDate = sortedState.date ? 
      [...assignments.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))] : 
      [...assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))]
      return {
        ...state,
        sortedState: {
          date: !sortedState.date,
          id: false,
        },
        assignments: sortedByDate
      }
    }
    case ACTIONS.DELETE_ASSIGNMENT: {
      // sort through assignments by id === payLoad.id
      // return new array with assignment filtered
      return {
        ...state,
        assignments: [...assignments.filter(assignment => assignment.id !== payload.id)]
      }
    }
    case ACTIONS.TOGGLE_DROPDOWN: {
      // sort through assignments by id === payLoad.id
      // add assignment id to setIsOpen()
      if(dropdownSelectedState === payload.id) {
        return {
          ...state,
          dropdownSelectedState: null
        }
      }
      else {
        return {
          ...state,
          dropdownSelectedState: payload.id
        }
      }
    }
    case ACTIONS.EDIT_ASSIGNMENT: {
      // sort through assignments by id === payLoad.id
      // return new array with new assignment object at position id === payLoad.id
      const {marksRecieved, totalMarks, percentage} = payload.editedAssignment
      return {
        ...state,
        assignments: assignments.map(assignment => {
          if(assignment.id === payload.id) {
            return {
              ...payload.editedAssignment,
              recievedPercentage: (marksRecieved && totalMarks && percentage) ? ((marksRecieved / totalMarks) * percentage).toFixed(2).replace(/[.,]00$/, "") : 0,
            }
          }
          return assignment
        })
      }   
    }
    case ACTIONS.ADD_ASSIGNMENT: {
      // append a new assigment on the end of current assignment array
      return {
        ...state,
        assignments: [...assignments, payload.assignment]
      }
    }
    case ACTIONS.COMPLETE_ASSIGNMENT: {
      const {marksRecieved, totalMarks} = payload.marks
      return {
        ...state,
        dropdownSelectedState: null,
        assignments: [...assignments.map(assignment => {
          if(assignment.id === payload.currAssignment.id) {
            return {
              ...payload.currAssignment,
              ...payload.marks,
              recievedPercentage: ((marksRecieved / totalMarks) * payload.currAssignment.percentage).toFixed(2).replace(/[.]00$/, ""),
              grade: getGrade(marksRecieved / totalMarks),
              completed: true,
            }
          }
          return assignment;
        })]
      }
    }
    case ACTIONS.VIEW_COMPLETED: {
      return {
        ...state,
        viewCompleted: !state.viewCompleted
      }
    }
  }
}

function getGrade(percentage) {
  if (percentage >= .85) return "HD";
  if (percentage >= .75) return "D";
  if (percentage >= .65) return "C";
  if (percentage >= .50) return "P";
  return "F";
}