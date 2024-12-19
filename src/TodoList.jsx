import React from 'react';
    import { Droppable, Draggable } from 'react-beautiful-dnd';
    import TodoItem from './TodoItem';

    function TodoList({ todos, onToggleComplete, onDelete }) {
      return (
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`todo-item ${
                        snapshot.isDragging ? 'dragging' : ''
                      } ${todo.completed ? 'completed' : ''}`}
                    >
                      <TodoItem
                        todo={todo}
                        onToggleComplete={onToggleComplete}
                        onDelete={onDelete}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );
    }

    export default TodoList;
