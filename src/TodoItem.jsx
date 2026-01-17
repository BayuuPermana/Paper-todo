import React, { useState } from 'react';
import trashIcon from './assets/trash-bin-icon.png';
import SubTaskItem from './SubTaskItem';

function TodoItem({ todo, onToggleComplete, onDelete, onAddSubTask, onSubTaskToggle, onSubTaskDelete }) {
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [subTaskText, setSubTaskText] = useState('');

  const handleAddSubTask = (e) => {
    e.preventDefault();
    if (!subTaskText.trim()) return;
    onAddSubTask(todo.id, subTaskText);
    setSubTaskText('');
    setIsAddingSubTask(false);
  };

  const completedSubTasks = todo.subTasks ? todo.subTasks.filter(st => st.completed).length : 0;
  const totalSubTasks = todo.subTasks ? todo.subTasks.length : 0;

  return (
    <div className={`todo-container ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item">
        <button
          type="button"
          className={`todo-text ${todo.completed ? 'completed' : ''}`}
          onClick={() => onToggleComplete(todo.id)}
          aria-label={`Mark "${todo.text}" as ${
            todo.completed ? 'incomplete' : 'complete'
          }`}
        >
          {todo.text}
          {totalSubTasks > 0 && (
            <span className="progress-indicator" style={{ fontSize: '0.7em', marginLeft: '10px', color: '#888' }}>
              ({completedSubTasks}/{totalSubTasks} steps)
            </span>
          )}
        </button>
        <div className="todo-actions">
          <button
            className="delete-icon"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete task: ${todo.text}`}
          >
            <img src={trashIcon} alt="Delete" className="delete-icon-img" />
          </button>
        </div>
      </div>
      
      {((todo.subTasks && todo.subTasks.length > 0) || isAddingSubTask) && (
        <div className="sub-tasks-list" style={{ marginLeft: '20px', marginTop: '5px' }}>
          {todo.subTasks && todo.subTasks.map((subTask) => (
            <SubTaskItem
              key={subTask.id}
              subTask={subTask}
              onToggle={onSubTaskToggle}
              onDelete={onSubTaskDelete}
            />
          ))}
          
          {isAddingSubTask && (
            <form onSubmit={handleAddSubTask} style={{ marginTop: '5px' }}>
              <input
                type="text"
                value={subTaskText}
                onChange={(e) => setSubTaskText(e.target.value)}
                placeholder="New step"
                autoFocus
                onBlur={() => !subTaskText && setIsAddingSubTask(false)}
                style={{ fontSize: '0.9em', padding: '2px 5px' }}
              />
            </form>
          )}
        </div>
      )}

      {!isAddingSubTask && (
        <button 
          className="add-step-btn" 
          onClick={() => setIsAddingSubTask(true)}
          style={{ marginLeft: '20px', fontSize: '0.8em', color: '#888', background: 'none', border: 'none', cursor: 'pointer', marginTop: '5px' }}
        >
          + Add Step
        </button>
      )}
    </div>
  );
}
export default TodoItem;
