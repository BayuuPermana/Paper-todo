import React from 'react';
import trashIcon from './assets/trash-bin-icon.png';

function SubTaskItem({ subTask, onToggle, onDelete, onFocus, isFocused }) {
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
      </div>
      <div className="todo-actions" style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => onFocus(subTask.id)}
          title="Focus on this task"
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1.1em',
            marginRight: '5px',
            opacity: isFocused ? 1 : 0.3
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