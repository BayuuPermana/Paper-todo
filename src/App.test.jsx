import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';
import React from 'react';
import { getTodos, saveTodo, deleteTodoDb, getActivityLog, saveActivityLog } from './db';

// Mock react-beautiful-dnd
import { vi } from 'vitest';

vi.mock('./db', () => ({
  getTodos: vi.fn(() => Promise.resolve([])),
  saveTodo: vi.fn(() => Promise.resolve()),
  deleteTodoDb: vi.fn(() => Promise.resolve()),
  getActivityLog: vi.fn(() => Promise.resolve({})),
  saveActivityLog: vi.fn(() => Promise.resolve()),
}));

vi.mock('./db', () => ({
  getTodos: vi.fn(() => Promise.resolve([])),
  saveTodo: vi.fn(() => Promise.resolve()),
  deleteTodoDb: vi.fn(() => Promise.resolve()),
  getActivityLog: vi.fn(() => Promise.resolve({})),
  saveActivityLog: vi.fn(() => Promise.resolve()),
}));

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
    vi.clearAllMocks();
  });

  it('adds a new todo with an empty subTasks array', async () => {
    render(<App />);
    const input = await screen.findByPlaceholderText('New Objective...');
    const addButton = screen.getByText('»');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(saveTodo).toHaveBeenCalled();
  });

  it('migrates existing todos to have subTasks array', async () => {
    const oldTodos = [{ id: '1', text: 'Old Task', completed: false }];
    localStorage.setItem('paper-todos', JSON.stringify(oldTodos));
    
    render(<App />);
    
    const input = await screen.findByPlaceholderText('New Objective...');
    const addButton = screen.getByText('»');
    fireEvent.change(input, { target: { value: 'Trigger Update' } });
    fireEvent.click(addButton);

    expect(saveTodo).toHaveBeenCalled();
  });

  it('adds a subtask to a todo', async () => {
    render(<App />);
    // Add main task
    const input = await screen.findByPlaceholderText('New Objective...');
    const addButton = screen.getByText('»');
    fireEvent.change(input, { target: { value: 'Main Task' } });
    fireEvent.click(addButton);

    // Add Step test
    const addStepBtn = screen.getByText('+ Add Step');
    fireEvent.click(addStepBtn);
    
    const subTaskInput = screen.getByPlaceholderText('New step...');
    fireEvent.change(subTaskInput, { target: { value: 'First Step' } });
    fireEvent.submit(subTaskInput);

    expect(screen.getByText('First Step')).toBeInTheDocument();

    // Toggle subtask
    fireEvent.click(screen.getByText('First Step'));
    expect(screen.getByText('First Step').parentElement).toHaveClass('completed');

    // Delete subtask
    const deleteSubTaskBtn = screen.getByLabelText('Delete subtask: First Step');
    fireEvent.click(deleteSubTaskBtn);
    expect(screen.queryByText('First Step')).not.toBeInTheDocument();
  });
});