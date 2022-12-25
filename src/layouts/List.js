import React, {useContext, useMemo, useState} from 'react'
import ListItem from './ListItem'
import './List.css'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import { AssignmentsContext, AssignmentsSetterContext } from '../context/AssignmentsContext'
import arrow from '../assets/arrow.svg'
export default function List() {
  const assignments = useContext(AssignmentsContext)
  const setAssignments = useContext(AssignmentsSetterContext)
  const [sortState, setSortState] = useState(
    localStorage.sortedState ? JSON.parse(localStorage.getItem('sortedState')) : {date: false, id: false})
  
  const [viewCompleted, setViewCompleted] = useState(false);
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  
    const filteredItems = useMemo(() => {
      return assignments.filter(assignment => {
        const queryLower = query.toLowerCase();
        return assignment.subjectId.toLowerCase().includes(queryLower) || 
               assignment.subjectName.toLowerCase().includes(queryLower) ||
               assignment.assignmentName.toLowerCase().includes(queryLower);
      })
    }, [assignments, query]);

    function sortArrayId() {
      let sortedId = [...assignments];
      if(!sortState.id) {
        sortedId = sortedId.sort((a, b) => a.subjectId - b.subjectId);
        setAssignments([...sortedId])
        setSortState({
          date: false,
          id: !sortState.id
        })
      }
      else {
        sortedId = sortedId.sort((a, b) => b.subjectId - a.subjectId);
        setAssignments([...sortedId])
        setSortState({
          date: false,
          id: !sortState.id
        })
      }
    }
    
    function sortArrayDate() {
      let sortDate = [...assignments]
      if(!sortState.date) {
        sortDate = sortDate.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        setAssignments([...sortDate])
        setSortState({
          date: !sortState.date,
          id: false,
        })
      } 
       else {
        sortDate = sortDate.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        setAssignments([...sortDate])
        setSortState({
          date: !sortState.date,
          id: false,
        })
      }
    }
  return (
    <div className='list'>
      <div className='list__filter'>
        <div>
          <SearchInput onChange={e => setQuery(e.target.value)} type="search" value={query} label="Filter Assignments"/>
          <div className='list__complete'>
            <Button onClick={() => setViewCompleted(prevVal => !prevVal)} className='btn--CTA btn--m'>
                  {viewCompleted ? 'View in progress' : 'View Completed'}
            </Button>
          </div>
        </div>
      </div>
      <div className='list__header'>
        <div className='list__option header__filter' onClick={sortArrayId}>  
          <span>Subject ID</span>
          <img src={arrow} className={`chevron ${!sortState.id ? 'active-icon' : ''}`} alt="" />
        </div>
        <div className='list__option'>
          Assignment Name
        </div>
        <div className='list__option header__filter' onClick={sortArrayDate}>
          <span>Due In</span>
          <img src={arrow} className={`chevron ${!sortState.date ? 'active-icon' : ''}`} alt="" />
        </div>
        <div className='list__option'>
          <span>%</span>
        </div>
      </div>
      <ul>
        {viewCompleted && filteredItems.map(assignment => {
          if(assignment.completed) 
            return <ListItem assignment={assignment} selected={selected} setSelected={setSelected}/>
          
        })}
        {!viewCompleted && filteredItems.map(assignment => {
          if(!assignment.completed) 
            return <ListItem assignment={assignment} selected={selected} setSelected={setSelected}/>
        })}
        {/* {viewCompleted ? 
            <ListItem assignment={filteredItems.map(assignment => assignment.completed)} 
                      selected={selected} 
                      setSelected={setSelected}/> : 
            <ListItem assignment={filteredItems.map(assignment => !assignment.completed)} 
                      selected={selected} 
                      setSelected={setSelected}/>} */}
      </ul>
      <div className='sidebar'>
        <div className='tabBar'>
          <div className='tab1'>

          </div>
          <div className='tab2'>

          </div>
        </div>
        <h1>Hello</h1>
      </div>
    </div>
  )
}

