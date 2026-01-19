import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import PomodoroTimer from './PomodoroTimer';
import PaperCalendar from './PaperCalendar';
import TaskSidebar from './TaskSidebar';
import SavingIndicator from './SavingIndicator';
import { audio } from './utils/GodAudio';
import { getTodos, saveTodo, deleteTodoDb, getActivityLog, saveActivityLog } from './db';

function App() {
  const [todos, setTodos] = useState([]);
  const [activityLog, setActivityLog] = useState({});
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [activeTab, setActiveTab] = useState('archive'); // 'archive' or 'focus'
  const [activeSubTask, setActiveSubTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Helper for saving indication
  const withSaving = async (fn) => {
    setIsSaving(true);
    try {
      await fn();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  // Initial Data Load & Migration
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Migration from localStorage
        const savedTodos = localStorage.getItem('paper-todos');
        const savedLog = localStorage.getItem('paper-activity-log');
        
        if (savedTodos) {
          const parsed = JSON.parse(savedTodos);
          for (let i = 0; i < parsed.length; i++) {
            await saveTodo({ ...parsed[i], order_index: i });
          }
          localStorage.removeItem('paper-todos');
        }

        if (savedLog) {
          const parsed = JSON.parse(savedLog);
          for (const date in parsed) {
            await saveActivityLog(date, parsed[date]);
          }
          localStorage.removeItem('paper-activity-log');
        }

        // 2. Initial Selection from localStorage (keep for session)
        const savedSelection = localStorage.getItem('paper-selected-todo');
        if (savedSelection) setSelectedTodoId(savedSelection);

        // 3. Load from DB
        const dbTodos = await getTodos();
        const dbLog = await getActivityLog();
        setTodos(dbTodos);
        setActivityLog(dbLog);
      } catch (err) {
        console.error('Failed to load data from DB:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedTodoId) {
      localStorage.setItem('paper-selected-todo', selectedTodoId);
      if (window.innerWidth <= 1200) {
        setActiveTab('focus');
      }
    } else {
      localStorage.removeItem('paper-selected-todo');
    }
  }, [selectedTodoId]);

  // Fallback selection
  useEffect(() => {
    if (!isLoading && todos.length > 0) {
      const exists = todos.find(t => t.id === selectedTodoId);
      if (!exists) {
        setSelectedTodoId(todos[0].id);
      }
    } else if (!isLoading && todos.length === 0) {
      setSelectedTodoId(null);
    }
  }, [todos, selectedTodoId, isLoading]);

  // Neural Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') {
        if (e.key === 'Escape') e.target.blur();
        return;
      }

      if (e.key === 'n') {
        e.preventDefault();
        const input = document.querySelector('.add-todo-form input');
        if (input) input.focus();
        return;
      }

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
  }, [todos, selectedTodoId]);

  const logActivity = async (pts) => {
    const today = new Date().toLocaleDateString('en-CA');
    const newPts = Math.max(0, (activityLog[today] || 0) + pts);
    setActivityLog(prev => ({ ...prev, [today]: newPts }));
    withSaving(() => saveActivityLog(today, newPts));
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === 'sidebar-todos') {
      const newItems = Array.from(todos);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
      setTodos(newItems);
      // Persist reorder
      withSaving(async () => {
        for (let i = 0; i < newItems.length; i++) {
          await saveTodo({ ...newItems[i], order_index: i });
        }
      });
    } else if (source.droppableId.startsWith('subtasks-')) {
      const todoId = source.droppableId.replace('subtasks-', '');
      const newTodos = todos.map(todo => {
        if (todo.id === todoId) {
          const newSubTasks = Array.from(todo.subTasks);
          const [reordered] = newSubTasks.splice(source.index, 1);
          newSubTasks.splice(destination.index, 0, reordered);
          return { ...todo, subTasks: newSubTasks };
        }
        return todo;
      });
      setTodos(newTodos);
      const updatedTodo = newTodos.find(t => t.id === todoId);
      withSaving(() => saveTodo(updatedTodo));
    }
  };

  const addTodo = async (text, image = null) => {
    const newTodo = { 
      id: uuidv4(), 
      text, 
      completed: false, 
      subTasks: [], 
      image,
      order_index: todos.length
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setSelectedTodoId(newTodo.id);
    audio.playPencil();
    withSaving(() => saveTodo(newTodo));
  };

  const toggleComplete = async (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newCompleted = !todo.completed;
        logActivity(newCompleted ? 3 : -3);
        return { ...todo, completed: newCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
    audio.playPencil();
    withSaving(() => saveTodo(newTodos.find(t => t.id === id)));
  };

  const deleteTodo = async (id) => {
    audio.playCrumple();
    setTimeout(async () => {
      const todo = todos.find(t => t.id === id);
      if (todo && todo.completed) logActivity(-3);
      
      if (activeSubTask && todo?.subTasks.some(st => st.id === activeSubTask.subTaskId)) {
        setActiveSubTask(null);
      }
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      if (id === selectedTodoId) {
        setSelectedTodoId(newTodos.length > 0 ? newTodos[0].id : null);
      }
      withSaving(() => deleteTodoDb(id));
    }, 400);
  };

  const addSubTask = async (todoId, text, image = null) => {
    const newTodos = todos.map(todo => {
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
    });
    setTodos(newTodos);
    audio.playPencil();
    withSaving(() => saveTodo(newTodos.find(t => t.id === todoId)));
  };

  const toggleSubTask = async (todoId, subTaskId) => {
    const newTodos = todos.map(todo => {
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
    });
    setTodos(newTodos);
    audio.playPencil();
    withSaving(() => saveTodo(newTodos.find(t => t.id === todoId)));
  };

  const deleteSubTask = async (todoId, subTaskId) => {
    audio.playCrumple();
    const newTodos = todos.map(todo => {
      if (todo.id === todoId) {
        const subTask = todo.subTasks.find(st => st.id === subTaskId);
        if (subTask && subTask.completed) logActivity(-1);
        if (activeSubTask?.subTaskId === subTaskId) setActiveSubTask(null);
        return {
          ...todo,
          subTasks: todo.subTasks.filter(st => st.id !== subTaskId)
        };
      }
      return todo;
    });
    setTodos(newTodos);
    withSaving(() => saveTodo(newTodos.find(t => t.id === todoId)));
  };

  const editTodo = async (id, newText) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(newTodos);
    audio.playPencil();
    withSaving(() => saveTodo(newTodos.find(t => t.id === id)));
  };

  const editSubTask = async (todoId, subTaskId, newText, image = undefined) => {
    const newTodos = todos.map(todo => {
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
    });
    setTodos(newTodos);
    audio.playPencil();
    withSaving(() => saveTodo(newTodos.find(t => t.id === todoId)));
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
    
    const todayStr = checkDate.toLocaleDateString('en-CA');
    checkDate.setDate(checkDate.getDate() - 1);
    const yesterdayStr = checkDate.toLocaleDateString('en-CA');

    if (activityLog[todayStr] > 0) {
      streak = 1;
      checkDate = new Date();
    } else if (activityLog[yesterdayStr] > 0) {
      streak = 0; 
      checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      return 0;
    }

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

  if (isLoading) return <div style={{ color: '#aaa', textAlign: 'center', padding: '100px' }}>Loading Protocol...</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app-layout">
        <SavingIndicator isSaving={isSaving} />
        <div className="command-header mobile-only">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.9em', color: '#666' }}>{todayStr}</div>
            <div style={{ fontSize: '0.7em', color: '#888' }}>🔥 {calculateStreak()} Streak</div>
          </div>
          <PomodoroTimer variant="header" activeSubTaskName={getActiveSubTaskName()} />
        </div>

        <TaskSidebar
          todos={todos}
          selectedTodoId={selectedTodoId}
          onSelectTodo={setSelectedTodoId}
          onAddTodo={addTodo}
          className={activeTab === 'archive' ? 'mobile-show' : 'mobile-hide'}
        />

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
