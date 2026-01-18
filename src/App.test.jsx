import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';
import React from 'react';

// Mock react-beautiful-dnd
import { vi } from 'vitest';

vi.mock('./assets/trash-bin-icon.png', () => ({
  default: 'test-file-stub',
}));

vi.mock('./StrictModeDroppable', () => ({
  StrictModeDroppable: ({ children }) => children({
    droppableProps: {},
    innerRef: () => {},
    placeholder: null,
  }),
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
    const input = screen.getByPlaceholderText('New Objective...');
    const addButton = screen.getByText('»');

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
    
    const input = screen.getByPlaceholderText('New Objective...');
    const addButton = screen.getByText('»');
    fireEvent.change(input, { target: { value: 'Trigger Update' } });
    fireEvent.click(addButton);

    const savedTodos = JSON.parse(localStorage.getItem('paper-todos'));
    // The old todo might still be missing subTasks if we don't explicitly migrate it.
    // Ideally, we want all items to have it.
    
    const oldTodo = savedTodos.find(t => t.id === '1');
    expect(oldTodo.subTasks).toBeDefined();
    expect(oldTodo.subTasks).toEqual([]);
  });

  it('adds a subtask to a todo', () => {
    render(<App />);
    // Add main task
    const input = screen.getByPlaceholderText('New Objective...');
    const addButton = screen.getByText('»');
    fireEvent.change(input, { target: { value: 'Main Task' } });
    fireEvent.click(addButton);

    // Find the add subtask button (not yet existing)
    // We'll assume a button with text "Add Step" or aria-label "Add subtask"
    // I'll assume an "Add Step" button appears or is accessible.
    // Let's assume we need to click "Add Step" to show input, or just an input is there.
    // For MVP, let's say there is a button "Add Step" that prompts or shows input.
    // Let's implement a simple prompt for now or an inline input.
    // Inline input is better.
    
    // Add Step test
    const addStepBtn = screen.getByText('+ Add Step');
    fireEvent.click(addStepBtn);
    
    // Assume it shows an input or uses window.prompt (let's avoid prompt)
    // Let's assume an input appears.
    const subTaskInput = screen.getByPlaceholderText('New step...');
    fireEvent.change(subTaskInput, { target: { value: 'First Step' } });
    fireEvent.submit(subTaskInput);

    expect(screen.getByText('First Step')).toBeInTheDocument();

    // Toggle subtask
    fireEvent.click(screen.getByText('First Step'));
    // We expect it to have class 'completed' - checking class might be brittle if we change styling
    // But SubTaskItem adds 'completed' class.
    expect(screen.getByText('First Step')).toHaveClass('completed');

    // Delete subtask
    // Find delete button for subtask
    // Assuming it's the second delete button on screen (first is main task)
    // Or we can query by aria-label if we set it correctly in SubTaskItem
    const deleteSubTaskBtn = screen.getByLabelText('Delete subtask: First Step');
    fireEvent.click(deleteSubTaskBtn);
    expect(screen.queryByText('First Step')).not.toBeInTheDocument();
  });
});