import React, {useState, useMemo} from 'react'
import ListItem from './ListItem'
import './List.css'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import ListHeader from './ListHeader'
import Sidebar from './Sidebar'
import ListItemCompleted from './ListItemCompleted'
import { useAssignmentsState, useAssignmentsStateDispatch, ACTIONS } from '../context/AssignmentContext';
export default function List() {
  

  const { assignments, dropdownSelectedState, viewCompleted } = useAssignmentsState();
  const dispatch = useAssignmentsStateDispatch();
  const [isEntireSemester, setIsEntireSemester] = useState(false);

  const [query, setQuery] = useState('')
  
    const filteredItems = useMemo(() => {
      return assignments.filter(assignment => {
        const queryLower = query.toLowerCase();
        return assignment.subjectId.toLowerCase().includes(queryLower) || 
               assignment.subjectName.toLowerCase().includes(queryLower) ||
               assignment.assignmentName.toLowerCase().includes(queryLower);
      })
    }, [assignments, query]);

    // function sortArrayId() {
    //   dispatch({
    //     type: ACTIONS.SORT_BY_ID
    //   })
    // }
    
    // function sortArrayDate() {
    //   dispatch({
    //     type: ACTIONS.SORT_BY_DATE
    //   })
    // }
    function setViewCompleted() {
      dispatch({
      type: ACTIONS.VIEW_COMPLETED
      })
    }
  return (
    <div className='list'>

      <div className='list__filter'>
        <div>
          <SearchInput onChange={e => setQuery(e.target.value)} type="search" value={query} label="Filter Assignments"/>
          <div className='list__complete'>
            <Button onClick={setViewCompleted} className='btn--CTA btn--m'>
                  {viewCompleted ? 'View in progress' : 'View Completed'}
            </Button>
            
          </div>
          
        </div>
      </div>
      { viewCompleted && <input type='checkbox' value={isEntireSemester} onChange={() => setIsEntireSemester(!isEntireSemester)}/>}

      {/* <Sidebar/> */}
        <ListHeader />
      <ul>
        {/* {filteredItems.filter(assignment => assignment.completed === viewCompleted).map(
          assignment => <ListItem assignment={assignment} selected={dropdownSelectedState}/>
        )} */}
        {viewCompleted ? <ListItemCompleted selected={dropdownSelectedState} entireSemester={isEntireSemester}/> :  filteredItems.filter(assignment => !assignment.completed).map(assignment => <ListItem assignment={assignment} selected={dropdownSelectedState}/>)}
      </ul>
    </div>
  )
}

