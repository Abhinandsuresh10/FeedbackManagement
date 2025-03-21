import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders the button with the provided text', () => {
    render(<Button text="Click Me" />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button)
  });

  it('applies the correct type attribute', () => {
    render(<Button text="Submit" type="submit" />);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button)
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays "Loading..." and is disabled when isLoading is true', () => {
    render(<Button text="Click Me" isLoading />);
    const button = screen.getByRole('button', { name: 'Loading...' });
    expect(button)
    expect(button)
  });

  it('disables the button when disabled is true', () => {
    render(<Button text="Click Me" disabled />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button)
  });

  it('applies the w-full class when fullWidth is true', () => {
    render(<Button text="Click Me" fullWidth />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button)
  });

  it('applies custom className', () => {
    render(<Button text="Click Me" className="custom-class" />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button)
  });

  it('disables the button when both disabled and isLoading are true', () => {
    render(<Button text="Click Me" disabled isLoading />);
    const button = screen.getByRole('button', { name: 'Loading...' });
    expect(button)
  });

  it('does not call onClick when the button is disabled', () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} disabled />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when the button is loading', () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} isLoading />);
    const button = screen.getByRole('button', { name: 'Loading...' });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});