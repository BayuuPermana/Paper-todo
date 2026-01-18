import React from 'react';
import AddTodo from './AddTodo';

function TaskSidebar({ todos, selectedTodoId, onSelectTodo, onAddTodo }) {
  return (
    <div className="task-sidebar" style={{
      padding: '20px',
      borderRight: '2px solid black',
      height: '100%',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h2 style={{ fontSize: '1.2em', margin: 0 }}>Archive Rack</h2>
      
      <AddTodo onAdd={onAddTodo} />

      <div className="sidebar-list" style={{ flexGrow: 1, overflowY: 'auto' }}>
        {todos.map(todo => {
          const completedCount = todo.subTasks.filter(st => st.completed).length;
          const totalCount = todo.subTasks.length;
          
          return (
            <button
              key={todo.id}
              onClick={() => onSelectTodo(todo.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px',
                marginBottom: '10px',
                border: '2px solid black',
                borderRadius: '5px',
                backgroundColor: selectedTodoId === todo.id ? '#fff' : '#eee',
                boxShadow: selectedTodoId === todo.id ? '3px 3px 0px black' : 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{todo.text}</span>
              <span style={{ fontSize: '0.7em', color: '#666' }}>
                {totalCount > 0 ? `(${completedCount}/${totalCount} steps)` : 'No steps'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TaskSidebar;
