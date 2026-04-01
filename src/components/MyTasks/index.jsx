import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import TagItem from '../TagItem'
import TaskItem from '../TaskItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const MyTasks = () => {
  const [taskInput, setTaskInput] = useState('')
  const [optionId, setOptionId] = useState(tagsList[0].optionId)
  const [activeTagId, setActiveTagIdState] = useState('') // Renamed the state setter function
  const [tasksList, setTasksList] = useState([])

  const filteredTasks = () => {
    if (activeTagId === '') {
      return tasksList
    }
    const tagDisplayText = tagsList.find(
      eachTag => eachTag.optionId === activeTagId,
    )
    const {displayText} = tagDisplayText
    return tasksList.filter(eachTask => eachTask.tag === displayText)
  }

  const setActiveTagId = selectedTag => {
    if (selectedTag === activeTagId) {
      setActiveTagIdState('')
    } else {
      setActiveTagIdState(selectedTag)
    }
  }

  const onAddTask = event => {
    event.preventDefault()
    const option = tagsList.find(eachTag => eachTag.optionId === optionId)
    const {displayText} = option
    const newTask = {
      id: uuidv4(),
      title: taskInput,
      tag: displayText,
    }
    setTasksList(prevState => [...prevState, newTask])
    setTaskInput('')
    setOptionId(tagsList[0].optionId)
  }

  const onChangeOptionId = event => {
    setOptionId(event.target.value)
  }

  const renderTagsInputField = () => {
    return (
      <>
        <label className="custom-label" htmlFor="tags">
          Tags
        </label>
        <select
          className="custom-select"
          id="tags"
          value={optionId}
          onChange={onChangeOptionId}
        >
          {tagsList.map(eachTag => (
            <option
              className="custom-option"
              key={eachTag.optionId}
              value={eachTag.optionId}
            >
              {eachTag.displayText}
            </option>
          ))}
        </select>
      </>
    )
  }

  const onChangeTaskInput = event => {
    setTaskInput(event.target.value)
  }

  const renderTaskInputField = () => {
    return (
      <>
        <label className="custom-label" htmlFor="task">
          Task
        </label>
        <input
          className="custom-input"
          type="text"
          id="task"
          onChange={onChangeTaskInput}
          value={taskInput}
          placeholder="Enter the task here"
        />
      </>
    )
  }

  return (
    <div className="app-container">
      <div className="responsive-container">
        <div className="heading-and-add-task-container">
          <h1 className="heading">Create a task!</h1>
          <form className="add-task-container">
            {renderTaskInputField()}
            {renderTagsInputField()}
            <button
              className="add-task-button"
              type="submit"
              onClick={onAddTask}
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="tags-and-task-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                tagDetails={eachTag}
                setActiveTagId={setActiveTagId}
                isActive={eachTag.optionId === activeTagId}
              />
            ))}
          </ul>

          <h1 className="tasks-heading">Tasks</h1>
          <div className="tasks-container">
            {filteredTasks().length === 0 ? (
              <p className="no-tasks-found-text">No Tasks Added Yet</p>
            ) : (
              <ul className="tasks-list">
                {filteredTasks().map(eachTask => (
                  <TaskItem key={eachTask.id} taskDetails={eachTask} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTasks
