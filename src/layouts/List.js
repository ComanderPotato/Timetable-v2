import React, {useContext} from 'react'
import ListItem from './ListItem'
import './List.css'
import { AssignmentsContext } from '../context/AssignmentsContext'

export default function List() {
  const assignments = useContext(AssignmentsContext)

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
          %
        </div>
      </div>
      <ul>
        {assignments.map(assignment => <ListItem assignment={assignment}/>)}
      </ul>
    </div>
  )
}

