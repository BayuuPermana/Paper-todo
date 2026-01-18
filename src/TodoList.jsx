import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import { StrictModeDroppable } from './StrictModeDroppable';

function TodoList({ todos, onToggleComplete, onDelete, onAddSubTask, onToggleSubTask, onDeleteSubTask, onSubTaskFocus, activeSubTaskId, onEditTodo, onEditSubTask }) {
  return (
    <StrictModeDroppable droppableId="todos">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`todo-draggable ${
                    snapshot.isDragging ? 'dragging' : ''
                  }`}
                >
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
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
}

export default TodoList;
