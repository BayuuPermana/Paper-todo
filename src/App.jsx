import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import PomodoroTimer from './PomodoroTimer';
import PaperCalendar from './PaperCalendar';
import TaskSidebar from './TaskSidebar';
import { audio } from './utils/GodAudio';

const STORAGE_KEY = 'paper-todos';
const LOG_KEY = 'paper-activity-log';

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

  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem(LOG_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedTodoId, setSelectedTodoId] = useState(() => {
    return localStorage.getItem('paper-selected-todo') || null;
  });

  const [activeTab, setActiveTab] = useState('archive'); // 'archive' or 'focus'
  const [activeSubTask, setActiveSubTask] = useState(null);
  const [undoBuffer, setUndoBuffer] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(LOG_KEY, JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    if (selectedTodoId) {
      localStorage.setItem('paper-selected-todo', selectedTodoId);
      // Auto-switch to focus tab on mobile when a project is selected
      if (window.innerWidth <= 1200) {
        setActiveTab('focus');
      }
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

  // Neural Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (e.target.tagName === 'INPUT') {
        if (e.key === 'Escape') e.target.blur();
        return;
      }

      // Undo: Ctrl+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
        return;
      }

      // New Task: n
      if (e.key === 'n') {
        e.preventDefault();
        const input = document.querySelector('.add-todo-form input');
        if (input) input.focus();
        return;
      }

      // Navigation: j/k
      if (e.key === 'j' || e.key === 'k') {
        e.preventDefault();
        const currentIndex = todos.findIndex(t => t.id === selectedTodoId);
        let nextIndex = currentIndex;
        if (e.key === 'j') nextIndex = Math.min(todos.length - 1, currentIndex + 1);
        if (e.key === 'k') nextIndex = Math.max(0, currentIndex - 1);
        
        if (nextIndex !== currentIndex && todos[nextIndex]) {
          setSelectedTodoId(todos[nextIndex].id);
          audio.playRustle();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [todos, selectedTodoId, undoBuffer]);

  const saveHistory = () => {
    setUndoBuffer(JSON.parse(JSON.stringify(todos)));
  };

  const logActivity = (pts) => {
    const today = new Date().toLocaleDateString('en-CA');
    setActivityLog(prev => ({
      ...prev,
      [today]: Math.max(0, (prev[today] || 0) + pts)
    }));
  };

  const handleUndo = () => {
    if (undoBuffer) {
      setTodos(undoBuffer);
      setUndoBuffer(null);
      audio.playRustle();
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    saveHistory();

    if (source.droppableId === 'sidebar-todos') {
      const items = Array.from(todos);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setTodos(items);
    } else if (source.droppableId.startsWith('subtasks-')) {
      const todoId = source.droppableId.replace('subtasks-', '');
      setTodos(prev => prev.map(todo => {
        if (todo.id === todoId) {
          const newSubTasks = Array.from(todo.subTasks);
          const [reordered] = newSubTasks.splice(source.index, 1);
          newSubTasks.splice(destination.index, 0, reordered);
          return { ...todo, subTasks: newSubTasks };
        }
        return todo;
      }));
    }
  };

  const addTodo = (text, image = null) => {
    saveHistory();
    const newId = uuidv4();
    const newTodo = { id: newId, text, completed: false, subTasks: [], image };
    setTodos([...todos, newTodo]);
    setSelectedTodoId(newId);
    audio.playPencil();
  };

  const toggleComplete = (id) => {
    saveHistory();
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.completed;
          logActivity(newCompleted ? 3 : -3);
          return { ...todo, completed: newCompleted };
        }
        return todo;
      })
    );
    audio.playPencil();
  };

  const deleteTodo = (id) => {
    saveHistory();
    audio.playCrumple();
    
    // Physical delay for animation
    setTimeout(() => {
      const todo = todos.find(t => t.id === id);
      if (todo && todo.completed) logActivity(-3);
      
      if (activeSubTask && todos.find(t => t.id === id)?.subTasks.some(st => st.id === activeSubTask.subTaskId)) {
        setActiveSubTask(null);
      }
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      if (id === selectedTodoId) {
        setSelectedTodoId(newTodos.length > 0 ? newTodos[0].id : null);
      }
    }, 400);
  };

  const addSubTask = (todoId, text, image = null) => {
    saveHistory();
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subTasks: [
            ...todo.subTasks,
            { id: uuidv4(), text, completed: false, image }
          ]
        };
      }
      return todo;
    }));
    audio.playPencil();
  };

  const toggleSubTask = (todoId, subTaskId) => {
    saveHistory();
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subTasks: todo.subTasks.map(st => {
            if (st.id === subTaskId) {
              const newCompleted = !st.completed;
              logActivity(newCompleted ? 1 : -1);
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
    audio.playPencil();
  };

  const deleteSubTask = (todoId, subTaskId) => {
    saveHistory();
    audio.playCrumple();
    
    const todo = todos.find(t => t.id === todoId);
    const subTask = todo?.subTasks.find(st => st.id === subTaskId);
    if (subTask && subTask.completed) logActivity(-1);

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
    saveHistory();
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    audio.playPencil();
  };

  const editSubTask = (todoId, subTaskId, newText, image = undefined) => {
    saveHistory();
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subTasks: todo.subTasks.map(st => {
            if (st.id === subTaskId) {
              return { 
                ...st, 
                text: newText, 
                image: image !== undefined ? image : st.image 
              };
            }
            return st;
          })
        };
      }
      return todo;
    }));
    audio.playPencil();
  };

  const startFocus = (todoId, subTaskId) => {
    setActiveSubTask({ todoId, subTaskId });
    audio.playRustle();
  };

  const getActiveSubTaskName = () => {
    if (!activeSubTask) return null;
    const todo = todos.find(t => t.id === activeSubTask.todoId);
    const subTask = todo?.subTasks.find(st => st.id === activeSubTask.subTaskId);
    return subTask?.text || null;
  };

  const calculateStreak = () => {
    const dates = Object.keys(activityLog).filter(d => activityLog[d] > 0).sort().reverse();
    if (dates.length === 0) return 0;

    let streak = 0;
    let checkDate = new Date();
    
    // Check if today or yesterday has activity to start/continue streak
    const todayStr = checkDate.toLocaleDateString('en-CA');
    checkDate.setDate(checkDate.getDate() - 1);
    const yesterdayStr = checkDate.toLocaleDateString('en-CA');

    if (activityLog[todayStr] > 0) {
      streak = 1;
      checkDate = new Date();
    } else if (activityLog[yesterdayStr] > 0) {
      streak = 0; // Streak hasn't died yet, but today isn't counted yet
      checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      return 0;
    }

    // Traverse backwards
    while (true) {
      checkDate.setDate(checkDate.getDate() - 1);
      const dStr = checkDate.toLocaleDateString('en-CA');
      if (activityLog[dStr] > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const selectedTodo = todos.find(t => t.id === selectedTodoId);

  const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app-layout">
        {/* Mobile Sticky Header */}
        <div className="command-header mobile-only">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.9em', color: '#666' }}>{todayStr}</div>
            <div style={{ fontSize: '0.7em', color: '#888' }}>🔥 {calculateStreak()} Streak</div>
          </div>
          <PomodoroTimer variant="header" activeSubTaskName={getActiveSubTaskName()} />
        </div>

        <DragDropContext onDragEnd={handleDragEnd} key={activeTab}>
          <TaskSidebar
            todos={todos}
            selectedTodoId={selectedTodoId}
            onSelectTodo={setSelectedTodoId}
            onAddTodo={addTodo}
            className={activeTab === 'archive' ? 'mobile-show' : 'mobile-hide'}
          />
        </DragDropContext>

        <div className={`paper-container ${activeTab === 'focus' ? 'mobile-show' : 'mobile-hide'}`}>
          <div className="left-segment">
            {selectedTodo ? (
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
            ) : (
              <div style={{ textAlign: 'center', padding: '50px', color: '#aaa' }}>
                Select or add a task from the rack
              </div>
            )}
          </div>
          <div className="right-segment desktop-only">
            <div className="streak-display" style={{ 
              textAlign: 'center', 
              fontSize: '1.2em', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              color: '#444'
            }}>
              🔥 {calculateStreak()} Day Streak
            </div>
            <PaperCalendar activityLog={activityLog} />
            <PomodoroTimer activeSubTaskName={getActiveSubTaskName()} />
          </div>
        </div>

        {/* Mobile Bottom Matrix */}
        <div className="bottom-matrix mobile-only">
          <button 
            className={`tab-item ${activeTab === 'archive' ? 'active' : ''}`}
            onClick={() => setActiveTab('archive')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8v13H3V8" />
              <path d="M1 3h22v5H1z" />
              <path d="M10 12h4" />
            </svg>
            <span>Archive</span>
          </button>
          <button 
            className={`tab-item ${activeTab === 'focus' ? 'active' : ''}`}
            onClick={() => setActiveTab('focus')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span>Focus</span>
          </button>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
