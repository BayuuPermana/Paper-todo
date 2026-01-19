import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import AddTodo from './AddTodo';

function TaskSidebar({ todos, selectedTodoId, onSelectTodo, onAddTodo, className }) {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div className={`task-sidebar ${className || ''}`} style={{
      padding: '20px',
      borderRight: '2px solid black',
      height: '100%',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      position: 'relative'
    }}>
      <h2 style={{ fontSize: '1.2em', margin: 0 }}>Archive Rack</h2>
      
      <AddTodo onAdd={onAddTodo} />

      <StrictModeDroppable droppableId="sidebar-todos">
        {(provided) => (
          <div 
            className="sidebar-list" 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
          >
            {todos.map((todo, index) => {
              const completedCount = todo.subTasks.filter(st => st.completed).length;
              const totalCount = todo.subTasks.length;
              
              return (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '8px'
                      }}
                    >
                      <div
                        role="button"
                        onClick={() => onSelectTodo(todo.id)}
                        style={{
                          textAlign: 'left',
                          padding: '8px 12px',
                          border: '2px solid black',
                          borderRadius: '5px',
                          backgroundColor: selectedTodoId === todo.id ? '#fff' : '#eee',
                          boxShadow: selectedTodoId === todo.id ? '2px 2px 0px black' : 'none',
                          cursor: 'grab',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.1s',
                          opacity: snapshot.isDragging ? 0.8 : 1,
                          userSelect: 'none',
                          margin: '0 5px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                          {todo.image && (
                            <img 
                              src={todo.image} 
                              alt="thumb" 
                              className="sidebar-thumbnail"
                              onMouseEnter={() => setHoveredImage(todo.image)}
                              onMouseLeave={() => setHoveredImage(null)}
                            />
                          )}
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <div className="text-content" style={{ fontWeight: 'bold' }}>{todo.text}</div>
                            <div style={{ fontSize: '0.7em', color: '#666' }}>
                              {totalCount > 0 ? `(${completedCount}/${totalCount} steps)` : 'No steps'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>

      {hoveredImage && (
        <div className="thumbnail-preview-container">
          <img src={hoveredImage} alt="Preview" />
        </div>
      )}
    </div>
  );
}

export default TaskSidebar;
