import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from './TodoItem';

// Mock trash icon
vi.mock('./assets/trash-bin-icon.png', () => ({
  default: 'trash-icon-stub',
}));

// Mock SubTaskItem to isolate testing
vi.mock('./SubTaskItem', () => ({
  default: ({ subTask }) => <div data-testid="sub-task-item">{subTask.text}</div>,
}));

describe('TodoItem', () => {
  const mockTodo = {
    id: 't-1',
    text: 'Main Task',
    completed: false,
    subTasks: [
      { id: 'st-1', text: 'Subtask 1', completed: false },
      { id: 'st-2', text: 'Subtask 2', completed: true },
    ],
  };
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();
  // We need new handlers for subtasks eventually, but for now passing mock
  const mockSubTaskToggle = vi.fn();
  const mockSubTaskDelete = vi.fn();

  it('renders main task text', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
      />
    );
    expect(screen.getByText('Main Task')).toBeInTheDocument();
  });

  it('renders subtasks', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockToggle}
        onDelete={mockDelete}
      />
    );
    expect(screen.getAllByTestId('sub-task-item')).toHaveLength(2);
    expect(screen.getByText('Subtask 1')).toBeInTheDocument();
    expect(screen.getByText('Subtask 2')).toBeInTheDocument();
  });
});