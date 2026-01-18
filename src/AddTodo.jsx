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
    <form onSubmit={handleSubmit} className="add-todo-form" style={{ position: 'relative' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        aria-label="New task description"
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <button 
          type="button" 
          onClick={() => fileInputRef.current.click()}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1.2em',
            opacity: image ? 1 : 0.4,
            filter: image ? 'none' : 'grayscale(100%)'
          }}
          title={image ? 'Image attached' : 'Attach image'}
        >
          🖼️
        </button>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? '...' : 'Add'}
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
          position: 'absolute', 
          bottom: '-25px', 
          left: '10px', 
          fontSize: '0.7em', 
          color: '#2e7d32',
          fontWeight: 'bold'
        }}>
          ✓ Visual attached
        </div>
      )}
    </form>
  );
}

    export default AddTodo;
