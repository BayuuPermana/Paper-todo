import React from 'react';
import trashIcon from './assets/trash-bin-icon.png';
import SubTaskItem from './SubTaskItem';

function TodoItem({ todo, onToggleComplete, onDelete, onSubTaskToggle, onSubTaskDelete }) {
  return (
    <div className="todo-container">
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
      {todo.subTasks && todo.subTasks.length > 0 && (
        <div className="sub-tasks-list">
          {todo.subTasks.map((subTask) => (
            <SubTaskItem
              key={subTask.id}
              subTask={subTask}
              onToggle={onSubTaskToggle}
              onDelete={onSubTaskDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default TodoItem;
