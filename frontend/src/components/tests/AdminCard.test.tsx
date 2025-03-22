import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminCard from '../AdminCard';

describe('AdminCard Component', () => {
  it('renders the card with the provided username and messages', () => {
    const username = 'Test User';
    const messages = ['Message 1', 'Message 2', 'Message 3'];
    render(<AdminCard username={username} message={messages} />);
    
    const usernameElement = screen.getByText(username);
    expect(usernameElement)
    
    messages.forEach((msg, index) => {
      const messageElement = screen.getByText((_, element) => {
        const hasText = (node:any) => node.textContent === `${index + 1}. ${msg}`;
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element?.children || []).every(
          (child) => !hasText(child)
        );
        return elementHasText && childrenDontHaveText;
      });
      expect(messageElement)
    });
  });

  it('applies the correct styles', () => {
    const username = 'Test User';
    const messages = ['Message 1', 'Message 2', 'Message 3'];
    const { container } = render(<AdminCard username={username} message={messages} />);
    
    const cardElement = container.firstChild;
    expect(cardElement)
  });
});