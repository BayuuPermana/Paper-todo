import React, { useState, useRef } from 'react';
import { processImage } from './utils/ImageProcessor';

function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isProcessing) return;
    onAdd(text, image);
    setText('');
    setImage(null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const compressed = await processImage(file);
      setImage(compressed);
    } catch (err) {
      console.error(err);
      alert('Failed to process image. Make sure it is a valid image file.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="add-todo-container" style={{ marginBottom: '20px' }}>
      <form onSubmit={handleSubmit} className="add-todo-form" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px',
        borderBottom: 'none' /* We will use container styling */
      }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New Objective..."
          aria-label="New task description"
          style={{
            width: '100%',
            padding: '10px',
            border: '2px solid black',
            borderRadius: '5px',
            fontFamily: 'inherit',
            fontSize: '1em',
            boxSizing: 'border-box'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            type="button" 
            onClick={() => fileInputRef.current.click()}
            style={{ 
              background: '#eee', 
              border: '2px solid black', 
              borderRadius: '5px',
              cursor: 'pointer', 
              fontSize: '1.2em',
              padding: '5px 10px',
              opacity: image ? 1 : 0.6,
              boxShadow: '2px 2px 0px black',
              transition: 'all 0.1s'
            }}
            title={image ? 'Image attached' : 'Attach image'}
          >
            🖼️
          </button>
          <button 
            type="submit" 
            disabled={isProcessing}
            style={{
              padding: '5px 20px',
              backgroundColor: '#fff',
              border: '2px solid black',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px black'
            }}
          >
            {isProcessing ? '...' : 'Create'}
          </button>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          style={{ display: 'none' }} 
          accept="image/*"
        />
        {image && (
          <div style={{ 
            fontSize: '0.7em', 
            color: '#2e7d32',
            fontWeight: 'bold',
            textAlign: 'right'
          }}>
            ✓ Visual Attached
          </div>
        )}
      </form>
    </div>
  );
}

    export default AddTodo;
