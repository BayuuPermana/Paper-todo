import React from 'react';
    import trashIcon from './assets/trash-bin-icon.png';

    function TodoItem({ todo, onToggleComplete, onDelete }) {
      return (
        <div className="todo-item">
          <span
            className={`todo-text ${todo.completed ? 'completed' : ''}`}
            onClick={() => onToggleComplete(todo.id)}
          >
            {todo.text}
          </span>
          <div className="todo-actions">
            <button className="delete-icon" onClick={() => onDelete(todo.id)}>
              <img src={trashIcon} alt="Delete" className="delete-icon-img" />
            </button>
          </div>
        </div>
      );
    }

    export default TodoItem;
