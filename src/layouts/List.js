import React, {useContext, useState} from 'react'
import ListItem from './ListItem'
import './List.css'
import Button from '../components/ui/Button'
import { AssignmentsContext } from '../context/AssignmentsContext'

export default function List() {
  const assignments = useContext(AssignmentsContext)
  const [viewCompleted, setViewCompleted] = useState(false);
  return (
    <div className='list'>
      <div className='list__header'>
        <div className='list__option'>
          Subject ID
        </div>
        <div className='list__option'>
          Assignment Name
        </div>
        <div className='list__option'>
          Days Left
        </div>
        <div className='list__option'>
          <span>%</span>
          <Button onClick={() => setViewCompleted(prevVal => !prevVal)} className='btn--CTA btn--sm'>
            {viewCompleted ? 'View in progress' : 'View Completed'}
          </Button>
        </div>
      </div>
      <ul>
        {viewCompleted && assignments.map(assignment => {
          if(assignment.completed) {
            return <ListItem assignment={assignment}/>
          }
        })}
        {!viewCompleted && assignments.map(assignment => {
          if(!assignment.completed) {
            return <ListItem assignment={assignment}/>
          }
        })}
      
      </ul>
    </div>
  )
}

