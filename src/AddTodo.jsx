import React, { useState } from 'react';

    function AddTodo({ onAdd }) {
      const [text, setText] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
      };

      return (
        <form onSubmit={handleSubmit} className="add-todo-form">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit">Add</button>
        </form>
      );
    }

    export default AddTodo;
