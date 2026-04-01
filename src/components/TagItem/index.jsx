import './index.css'
import React from 'react'

const TagItem = ({tagDetails, isActive, setActiveTagId}) => {
  const activeTagButton = isActive ? 'active-tag-button' : ''
  const onClickTag = () => {
    setActiveTagId(tagDetails.optionId)
  }
  return (
    <li className="tag-list-item">
      <button
        className={`tag-button ${activeTagButton}`}
        type="button"
        onClick={onClickTag}
      >
        {tagDetails.displayText}
      </button>
    </li>
  )
}

export default TagItem
