import React, { useState } from 'react';
import trashIcon from './assets/trash-bin-icon.png';

function SubTaskItem({ subTask, onToggle, onDelete, onFocus, isFocused, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(subTask.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() && editText !== subTask.text) {
      onEdit(editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditText(subTask.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`sub-task-item ${isFocused ? 'focused' : ''}`} style={{ 
      marginLeft: '20px', 
      fontSize: '0.9em', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginBottom: '5px',
      backgroundColor: isFocused ? '#fff9c4' : 'transparent',
      borderRadius: '3px',
      padding: '2px 5px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <span style={{ marginRight: '5px' }}>-</span>
        {isEditing ? (
          <form onSubmit={handleEditSubmit} style={{ width: '100%' }}>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={handleKeyDown}
              autoFocus
              className={`todo-text ${subTask.completed ? 'completed' : ''}`}
              style={{ 
                background: 'none', 
                border: 'none', 
                borderBottom: '1px dashed black',
                cursor: 'text', 
                textAlign: 'left', 
                width: '100%',
                padding: '0'
              }}
            />
          </form>
        ) : (
          <button
            type="button"
            className={`todo-text ${subTask.completed ? 'completed' : ''}`}
            onClick={() => onToggle(subTask.id)}
            aria-label={`Mark "${subTask.text}" as ${
              subTask.completed ? 'incomplete' : 'complete'
            }`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: 'auto' }}
          >
            {subTask.text}
          </button>
        )}
      </div>
      <div className="todo-actions" style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => setIsEditing(true)}
          title="Edit subtask"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9em', marginRight: '5px' }}
        >
          ✏️
        </button>
        <button
          onClick={() => onFocus(subTask.id)}
          title="Focus on this task"
          className={isFocused ? 'persistent-visible' : ''}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1.1em',
            marginRight: '5px'
          }}
        >
          🎯
        </button>
        <button
          className="delete-icon"
          onClick={() => onDelete(subTask.id)}
          aria-label={`Delete subtask: ${subTask.text}`}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img src={trashIcon} alt="Delete" className="delete-icon-img" style={{ width: '16px', height: '16px', display: 'block' }} />
        </button>
      </div>
    </div>
  );
}

export default SubTaskItem;