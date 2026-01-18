import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleComplete, onDelete, onAddSubTask, onToggleSubTask, onDeleteSubTask, onSubTaskFocus, activeSubTaskId, onEditTodo, onEditSubTask }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo.id} className="todo-draggable">
          <TodoItem
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onAddSubTask={onAddSubTask}
            onSubTaskToggle={(subTaskId) => onToggleSubTask(todo.id, subTaskId)}
            onSubTaskDelete={(subTaskId) => onDeleteSubTask(todo.id, subTaskId)}
            onSubTaskFocus={(subTaskId) => onSubTaskFocus(todo.id, subTaskId)}
            activeSubTaskId={activeSubTaskId}
            onEdit={(newText) => onEditTodo(todo.id, newText)}
            onSubTaskEdit={(subTaskId, newText) => onEditSubTask(todo.id, subTaskId, newText)}
          />
        </div>
      ))}
    </div>
  );
}

export default TodoList;