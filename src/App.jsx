import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import PomodoroTimer from './PomodoroTimer';
import PaperCalendar from './PaperCalendar';
import TaskSidebar from './TaskSidebar';

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

  const [selectedTodoId, setSelectedTodoId] = useState(() => {
    return localStorage.getItem('paper-selected-todo') || null;
  });

  const [activeSubTask, setActiveSubTask] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (selectedTodoId) {
      localStorage.setItem('paper-selected-todo', selectedTodoId);
    } else {
      localStorage.removeItem('paper-selected-todo');
    }
  }, [selectedTodoId]);

  // Fallback selection: pick the first one if current selection is invalid or null
  useEffect(() => {
    if (todos.length > 0) {
      const exists = todos.find(t => t.id === selectedTodoId);
      if (!exists) {
        setSelectedTodoId(todos[0].id);
      }
    } else {
      setSelectedTodoId(null);
    }
  }, [todos, selectedTodoId]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const addTodo = (text) => {
    const newId = uuidv4();
    const newTodo = { id: newId, text, completed: false, subTasks: [] };
    setTodos([...todos, newTodo]);
    setSelectedTodoId(newId);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    if (activeSubTask && todos.find(t => t.id === id)?.subTasks.some(st => st.id === activeSubTask.subTaskId)) {
      setActiveSubTask(null);
    }
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    if (id === selectedTodoId) {
      setSelectedTodoId(newTodos.length > 0 ? newTodos[0].id : null);
    }
  };

  const addSubTask = (todoId, text) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subTasks: [
            ...todo.subTasks,
            { id: uuidv4(), text, completed: false }
          ]
        };
      }
      return todo;
    }));
  };

  const toggleSubTask = (todoId, subTaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subTasks: todo.subTasks.map(st => {
            if (st.id === subTaskId) {
              const newCompleted = !st.completed;
              if (newCompleted && activeSubTask?.subTaskId === subTaskId) {
                setActiveSubTask(null);
              }
              return { ...st, completed: newCompleted };
            }
            return st;
          })
        };
      }
      return todo;
    }));
  };

  const deleteSubTask = (todoId, subTaskId) => {
    if (activeSubTask?.subTaskId === subTaskId) {
      setActiveSubTask(null);
    }
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subTasks: todo.subTasks.filter(st => st.id !== subTaskId)
        };
      }
      return todo;
    }));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const editSubTask = (todoId, subTaskId, newText) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subTasks: todo.subTasks.map(st => 
            st.id === subTaskId ? { ...st, text: newText } : st
          )
        };
      }
      return todo;
    }));
  };

  const startFocus = (todoId, subTaskId) => {
    setActiveSubTask({ todoId, subTaskId });
  };

  const getActiveSubTaskName = () => {
    if (!activeSubTask) return null;
    const todo = todos.find(t => t.id === activeSubTask.todoId);
    const subTask = todo?.subTasks.find(st => st.id === activeSubTask.subTaskId);
    return subTask?.text || null;
  };

  const selectedTodo = todos.find(t => t.id === selectedTodoId);

  return (
    <div className="app-layout">
      <TaskSidebar
        todos={todos}
        selectedTodoId={selectedTodoId}
        onSelectTodo={setSelectedTodoId}
        onAddTodo={addTodo}
      />
      <div className="paper-container">
        <div className="left-segment">
          {selectedTodo ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <TodoList
                todos={[selectedTodo]}
                onToggleComplete={toggleComplete}
                onDelete={deleteTodo}
                onAddSubTask={addSubTask}
                onToggleSubTask={toggleSubTask}
                onDeleteSubTask={deleteSubTask}
                onSubTaskFocus={startFocus}
                activeSubTaskId={activeSubTask?.subTaskId}
                onEditTodo={editTodo}
                onEditSubTask={editSubTask}
              />
            </DragDropContext>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px', color: '#aaa' }}>
              Select or add a task from the rack
            </div>
          )}
        </div>
        <div className="right-segment">
          <PaperCalendar />
          <PomodoroTimer activeSubTaskName={getActiveSubTaskName()} />
        </div>
      </div>
    </div>
  );
}

export default App;
