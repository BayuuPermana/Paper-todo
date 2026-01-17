import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SubTaskItem from './SubTaskItem';

// Mock trash icon
vi.mock('./assets/trash-bin-icon.png', () => ({
  default: 'trash-icon-stub',
}));

describe('SubTaskItem', () => {
  const mockSubTask = {
    id: 'st-1',
    text: 'Subtask 1',
    completed: false,
  };
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();

  it('renders subtask text', () => {
    render(
      <SubTaskItem
        subTask={mockSubTask}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );
    expect(screen.getByText('Subtask 1')).toBeInTheDocument();
  });

  it('calls onToggle when text is clicked', () => {
    render(
      <SubTaskItem
        subTask={mockSubTask}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );
    fireEvent.click(screen.getByText('Subtask 1'));
    expect(mockToggle).toHaveBeenCalledWith('st-1');
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <SubTaskItem
        subTask={mockSubTask}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );
    // Assuming we use the same icon or a button with aria-label
    const deleteBtn = screen.getByLabelText(/delete/i);
    fireEvent.click(deleteBtn);
    expect(mockDelete).toHaveBeenCalledWith('st-1');
  });

  it('applies completed class when completed', () => {
    const completedTask = { ...mockSubTask, completed: true };
    const { container } = render(
      <SubTaskItem
        subTask={completedTask}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );
    expect(container.querySelector('.completed')).toBeInTheDocument();
  });
});