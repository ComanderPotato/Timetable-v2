import React, {useContext, useMemo, useState} from 'react'
import ListItem from './ListItem'
import './List.css'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import { AssignmentsContext } from '../context/AssignmentsContext'

export default function List() {
  const assignments = useContext(AssignmentsContext)
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
  return (
    <div className='list'>
      <div className='list__filter'>
        <div>
          <SearchInput onChange={e => setQuery(e.target.value)} type="search" value={query} label="Filter List"/>
          <div className='list__complete'>
            <Button onClick={() => setViewCompleted(prevVal => !prevVal)} className='btn--CTA btn--m'>
                  {viewCompleted ? 'View in progress' : 'View Completed'}
            </Button>
          </div>
        </div>
      </div>
      <div className='list__header'>
        <div className='list__option'>  
          Subject ID
        </div>
        <div className='list__option'>
          Assignment Name
        </div>
        <div className='list__option'>
          Due In
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
      </ul>
      {/* <div className='sidebar'>
        <div className='tabBar'>
          <div className='tab1'>

          </div>
          <div className='tab2'>

          </div>
        </div>
        <h1>Hello</h1>
      </div> */}
    </div>
  )
}

