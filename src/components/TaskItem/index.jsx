import './index.css'
import React from 'react'

const TaskItem = ({taskDetails}) => {
  return (
    <li className="task-list-item">
      <p className="task-text">{taskDetails.title}</p>
      <p className="tag-text">{taskDetails.tag}</p>
    </li>
  )
}

export default TaskItem
