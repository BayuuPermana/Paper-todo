import React, { useState, useRef } from 'react';
import trashIcon from './assets/trash-bin-icon.png';
import SubTaskItem from './SubTaskItem';
import { processImage } from './utils/ImageProcessor';

function TodoItem({ todo, onToggleComplete, onDelete, onAddSubTask, onSubTaskToggle, onSubTaskDelete, onSubTaskFocus, activeSubTaskId, onEdit, onSubTaskEdit }) {
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [subTaskText, setSubTaskText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [subTaskImage, setSubTaskImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleAddSubTask = (e) => {
    e.preventDefault();
    if (!subTaskText.trim() || isProcessing) return;
    onAddSubTask(todo.id, subTaskText, subTaskImage);
    setSubTaskText('');
    setSubTaskImage(null);
    setIsAddingSubTask(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const compressed = await processImage(file);
      setSubTaskImage(compressed);
    } catch (err) {
      console.error(err);
      alert('Failed to process image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() && editText !== todo.text) {
      onEdit(editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const completedSubTasks = todo.subTasks ? todo.subTasks.filter(st => st.completed).length : 0;
  const totalSubTasks = todo.subTasks ? todo.subTasks.length : 0;

  return (
    <div className={`todo-container ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} style={{ flexGrow: 1 }}>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={handleKeyDown}
              autoFocus
              className="todo-text"
              style={{ borderBottom: '1px dashed black' }}
            />
          </form>
        ) : (
          <button
            type="button"
            className={`todo-text ${todo.completed ? 'completed' : ''}`}
            onClick={() => onToggleComplete(todo.id)}
            aria-label={`Mark "${todo.text}" as ${
              todo.completed ? 'incomplete' : 'complete'
            }`}
          >
            {todo.text}
            {totalSubTasks > 0 && (
              <span className="progress-indicator" style={{ fontSize: '0.7em', marginLeft: '10px', color: '#888' }}>
                ({completedSubTasks}/{totalSubTasks} steps)
              </span>
            )}
          </button>
        )}
        <div className="todo-actions">
          <button
            onClick={() => setIsEditing(true)}
            title="Edit task"
            style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}
          >
            ✏️
          </button>
          <button
            className="delete-icon"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete task: ${todo.text}`}
          >
            <img src={trashIcon} alt="Delete" className="delete-icon-img" />
          </button>
        </div>
      </div>

      {todo.image && (
        <div className="taped-image-container">
          <div className="tape-top-left"></div>
          <img src={todo.image} alt="Evidence" className="taped-image" />
          <div className="tape-bottom-right"></div>
        </div>
      )}
      
      {((todo.subTasks && todo.subTasks.length > 0) || isAddingSubTask) && (
        <div className="sub-tasks-list" style={{ marginLeft: '20px', marginTop: '5px' }}>
          {todo.subTasks && todo.subTasks.map((subTask) => (
            <SubTaskItem
              key={subTask.id}
              subTask={subTask}
              onToggle={onSubTaskToggle}
              onDelete={onSubTaskDelete}
              onFocus={onSubTaskFocus}
              isFocused={activeSubTaskId === subTask.id}
              onEdit={(newText) => onSubTaskEdit(subTask.id, newText)}
            />
          ))}
          
          {isAddingSubTask && (
            <form onSubmit={handleAddSubTask} className="add-subtask-form" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <input
                type="text"
                value={subTaskText}
                onChange={(e) => setSubTaskText(e.target.value)}
                placeholder="New step"
                autoFocus
                onBlur={() => !subTaskText && !subTaskImage && setIsAddingSubTask(false)}
                style={{ width: '100%', marginBottom: '5px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current.click()}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontSize: '1.2em',
                    opacity: subTaskImage ? 1 : 0.4,
                    fontWeight: 'bold'
                  }}
                  title={subTaskImage ? 'Image attached' : 'Attach image'}
                >
                  +
                </button>
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  style={{
                    padding: '2px 10px',
                    backgroundColor: '#fff',
                    border: '1px solid black',
                    borderRadius: '3px',
                    fontSize: '1em',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {isProcessing ? '...' : '->'}
                </button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
                accept="image/*"
              />
              {subTaskImage && (
                <div style={{ fontSize: '0.6em', color: '#2e7d32', textAlign: 'right' }}>
                  ✓ Image Attached
                </div>
              )}
            </form>
          )}
        </div>
      )}

      {!isAddingSubTask && (
        <button 
          className="add-step-btn" 
          onClick={() => setIsAddingSubTask(true)}
        >
          + Add Step
        </button>
      )}
    </div>
  );
}
export default TodoItem;
