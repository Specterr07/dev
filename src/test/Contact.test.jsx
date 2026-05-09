import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Contact from '../components/Contact';

describe('Contact', () => {
  it('renders required form fields and form action', () => {
    render(<Contact />);

    const form = document.querySelector('form');
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/xwvpoveq');
    expect(form).toHaveAttribute('method', 'POST');

    expect(screen.getByLabelText(/name/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/message/i)).toBeRequired();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });
});
