import React, {useContext, useMemo, useState} from 'react'
import ListItem from './ListItem'
import './List.css'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import ListHeader from './ListHeader'
import { useAssignmentsState, useAssignmentsStateDispatch, ACTIONS } from '../context/AssignmentContext';
import arrow from '../assets/arrow.svg'
import Sidebar from './Sidebar'
export default function List() {
  

  const { assignments, sortedState, dropdownSelectedState, viewCompleted } = useAssignmentsState();
  const dispatch = useAssignmentsStateDispatch();


  const [query, setQuery] = useState('')
  
    // const filteredItems = useMemo(() => {
    //   return assignments.filter(assignment => {
    //     const queryLower = query.toLowerCase();
    //     return assignment.subjectId.toLowerCase().includes(queryLower) || 
    //            assignment.subjectName.toLowerCase().includes(queryLower) ||
    //            assignment.assignmentName.toLowerCase().includes(queryLower);
    //   })
    // }, [assignments, query]);

    function sortArrayId() {
      dispatch({
        type: ACTIONS.SORT_BY_ID
      })
    }
    
    function sortArrayDate() {
      dispatch({
        type: ACTIONS.SORT_BY_DATE
      })
    }
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
        <ListHeader />
        {/* <div className='list__header'>
          <div className='list__option header__filter' onClick={sortArrayId}>  
            <span>Subject ID</span>
            <img src={arrow} className={`chevron ${!sortedState.id ? 'active-icon' : ''}`} alt="" />
          </div>
          <div className='list__option'>
            Assignment Name
          </div>
          <div className='list__option header__filter' onClick={sortArrayDate}>
            <span>Due In</span>
            <img src={arrow} className={`chevron ${!sortedState.date ? 'active-icon' : ''}`} alt="" />
          </div>
          <div className='list__option'>
            <span>%</span>
          </div>
        </div> */}
      <ul>
        {viewCompleted && assignments.map(assignment => {
          if(assignment.completed) 
            return <ListItem assignment={assignment} selected={dropdownSelectedState}/>
          
        })}
        {!viewCompleted && assignments.map(assignment => {
          if(!assignment.completed) 
            return <ListItem assignment={assignment} selected={dropdownSelectedState}/>
        })}
        {/* {viewCompleted ? 
            <ListItem assignment={filteredItems.map(assignment => assignment.completed)} 
                      selected={selected} 
                      setSelected={setSelected}/> : 
            <ListItem assignment={filteredItems.map(assignment => !assignment.completed)} 
                      selected={selected} 
                      setSelected={setSelected}/>} */}
      </ul>
      <Sidebar/>
    </div>
  )
}

