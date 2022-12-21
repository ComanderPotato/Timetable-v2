import {createContext, useState} from 'react';

export const AssignmentsContext = createContext(null);
export const AssignmentsSetterContext = createContext(null);
const initialAssignments = localStorage.assignments ? JSON.parse(localStorage.getItem('assignments')) : []


export function AssignmentsProvider({ children }) {
  const [assignments, setAssignments] = useState(initialAssignments);

  return (
    <AssignmentsContext.Provider value={assignments}>
      <AssignmentsSetterContext.Provider value={setAssignments}>
        {children}
      </AssignmentsSetterContext.Provider>
    </AssignmentsContext.Provider>
  )
}