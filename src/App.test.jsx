import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';
import React from 'react';

// Mock react-beautiful-dnd
import { vi } from 'vitest';

vi.mock('./assets/trash-bin-icon.png', () => ({
  default: 'test-file-stub',
}));

vi.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => children,
  Draggable: ({ children }) => children({
    draggableProps: {},
    dragHandleProps: {},
    innerRef: () => {},
  }, { isDragging: false }),
  Droppable: ({ children }) => children({
    droppableProps: {},
    innerRef: () => {},
    placeholder: null,
  }, { isDraggingOver: false }),
}));

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds a new todo with an empty subTasks array', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    // We need to inspect the internal state or the rendered component prop.
    // For integration testing without exposing state, we can verify the app renders.
    // However, to strictly verify the data structure, we might need a more unit-test approach 
    // or inspect localStorage since App syncs to it.
    
    const savedTodos = JSON.parse(localStorage.getItem('paper-todos'));
    expect(savedTodos).toHaveLength(1);
    expect(savedTodos[0].text).toBe('New Task');
    expect(savedTodos[0].subTasks).toEqual([]); 
  });

  it('migrates existing todos to have subTasks array', () => {
    const oldTodos = [{ id: '1', text: 'Old Task', completed: false }];
    localStorage.setItem('paper-todos', JSON.stringify(oldTodos));
    
    render(<App />);
    
    // We assume the app should update the state/localstorage upon load or update
    // However, the current App.jsx only writes to localStorage when 'todos' changes.
    // And 'useState' initializer only reads.
    // If we want to support migration, we might need an effect or initial check.
    
    // Let's verify if our App handles it.
    // If we add a new task, the old task should persist.
    // If we want to guarantee structure, we should verify that.
    
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add');
    fireEvent.change(input, { target: { value: 'Trigger Update' } });
    fireEvent.click(addButton);

    const savedTodos = JSON.parse(localStorage.getItem('paper-todos'));
    // The old todo might still be missing subTasks if we don't explicitly migrate it.
    // Ideally, we want all items to have it.
    
    const oldTodo = savedTodos.find(t => t.id === '1');
    expect(oldTodo.subTasks).toBeDefined();
    expect(oldTodo.subTasks).toEqual([]);
  });
});