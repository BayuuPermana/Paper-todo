import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const STORAGE_KEY = 'paper-todos';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsedTodos = saved ? JSON.parse(saved) : [];
    // Migration: Ensure all todos have subTasks array
    return parsedTodos.map(todo => ({
      ...todo,
      subTasks: todo.subTasks || []
    }));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const addTodo = (text) => {
    const newTodo = { id: uuidv4(), text, completed: false, subTasks: [] };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="paper-container">
      <AddTodo onAdd={addTodo} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onDelete={deleteTodo}
        />
      </DragDropContext>
    </div>
  );
}

export default App;