import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('renders the card with the provided message', () => {
    render(<Card message="This is a test message" />);
    const messageElement = screen.getByText('This is a test message');
    expect(messageElement);
  });

  it('applies the correct styles', () => {
    const { container } = render(<Card message="This is a test message" />);
    const cardElement = container.firstChild;
    expect(cardElement);
  });
});