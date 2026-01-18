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
      <form onSubmit={handleSubmit}>
        <div className="input-matrix">
          <button 
            type="button" 
            className="matrix-btn matrix-btn-left"
            onClick={() => fileInputRef.current.click()}
            style={{ opacity: image ? 1 : 0.4 }}
            title={image ? 'Image attached' : 'Attach image'}
          >
            +
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New Objective..."
            aria-label="New task description"
          />
          <button 
            type="submit" 
            className="matrix-btn matrix-btn-right"
            disabled={isProcessing}
          >
            {isProcessing ? '...' : '»'}
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
            textAlign: 'right',
            marginTop: '5px'
          }}>
            ✓ Visual Attached
          </div>
        )}
      </form>
    </div>
  );
}

    export default AddTodo;
